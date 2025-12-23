"""
Authentication router - Google OAuth
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from google.oauth2 import id_token
from google.auth.transport import requests
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
import uuid

from models.schemas import GoogleAuthRequest, AuthResponse, User
from models.database import Database, get_db
from config import settings

router = APIRouter()
security = HTTPBearer(auto_error=False)


def create_access_token(user_id: str) -> str:
    """Create JWT access token"""
    expire = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRE_HOURS)
    payload = {
        "sub": user_id,
        "exp": expire,
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_token(token: str) -> Optional[str]:
    """Verify JWT token and return user_id"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Database = Depends(get_db)
) -> Optional[dict]:
    """Get current user from JWT token"""
    if not credentials:
        return None

    user_id = verify_token(credentials.credentials)
    if not user_id:
        return None

    return await db.get_user_by_id(user_id)


async def require_user(
    user: Optional[dict] = Depends(get_current_user)
) -> dict:
    """Require authenticated user"""
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@router.post("/google", response_model=AuthResponse)
async def google_auth(
    request: GoogleAuthRequest,
    db: Database = Depends(get_db)
):
    """
    Authenticate with Google ID token.

    Frontend sends the ID token received from Google Sign-In.
    Backend verifies it and returns a JWT token.
    """
    try:
        # Verify Google ID token
        if settings.GOOGLE_CLIENT_ID:
            idinfo = id_token.verify_oauth2_token(
                request.id_token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )
        else:
            # Demo mode: decode without verification
            # This is for development only!
            import base64
            import json
            parts = request.id_token.split('.')
            if len(parts) >= 2:
                payload = parts[1]
                # Add padding if needed
                payload += '=' * (4 - len(payload) % 4)
                idinfo = json.loads(base64.urlsafe_b64decode(payload))
            else:
                raise HTTPException(status_code=400, detail="Invalid token format")

        google_id = idinfo.get("sub")
        email = idinfo.get("email")
        name = idinfo.get("name", email.split("@")[0])
        avatar = idinfo.get("picture")

        if not google_id or not email:
            raise HTTPException(status_code=400, detail="Invalid token data")

        # Check if user exists
        user = await db.get_user_by_google_id(google_id)

        if user:
            # Update user info
            user = await db.update_user(user["id"], {
                "name": name,
                "avatar": avatar,
                "email": email
            })
        else:
            # Create new user
            user = await db.create_user({
                "id": str(uuid.uuid4()),
                "google_id": google_id,
                "email": email,
                "name": name,
                "avatar": avatar
            })

        # Create JWT token
        access_token = create_access_token(user["id"])

        return AuthResponse(
            access_token=access_token,
            user=User(**user)
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        # If database not connected, create a demo user response
        if not db.is_connected:
            demo_user = {
                "id": "demo-user",
                "google_id": "demo",
                "email": "demo@studyforge.app",
                "name": "Demo User",
                "avatar": None,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            access_token = create_access_token(demo_user["id"])
            return AuthResponse(
                access_token=access_token,
                user=User(**demo_user)
            )
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/me", response_model=User)
async def get_me(user: dict = Depends(require_user)):
    """Get current user info"""
    return User(**user)


@router.post("/logout")
async def logout():
    """Logout - client should discard the token"""
    return {"message": "Logged out successfully"}


@router.get("/demo")
async def demo_login():
    """
    Demo login for testing without Google OAuth.
    Returns a demo user token.
    """
    demo_user = {
        "id": "demo-user-" + str(uuid.uuid4())[:8],
        "google_id": "demo",
        "email": "demo@studyforge.app",
        "name": "Demo User",
        "avatar": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    access_token = create_access_token(demo_user["id"])

    return AuthResponse(
        access_token=access_token,
        user=User(**demo_user)
    )
