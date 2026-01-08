FROM nginx:alpine

# Copy built files to nginx
COPY dist/ /usr/share/nginx/html/

# Configure nginx for SPA routing
RUN echo 'server { \
    listen 7860; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 7860

CMD ["nginx", "-g", "daemon off;"]
