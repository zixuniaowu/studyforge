import React from 'react';

// Types
interface CertNode {
  id: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
  level: 'foundational' | 'associate' | 'professional' | 'specialty';
  hasQuestionBank: boolean;
  description?: string;
}

interface CertConnection {
  from: string;
  to: string;
}

interface CertPathProps {
  className?: string;
  onClick?: (certId: string) => void;
}

// AWS Certification Data
const awsCerts: CertNode[] = [
  // Foundational
  { id: 'clf-c02', name: 'Cloud Practitioner', shortName: 'CLF-C02', x: 400, y: 60, level: 'foundational', hasQuestionBank: true, description: 'AWS Cloud fundamentals' },

  // Associate
  { id: 'saa-c03', name: 'Solutions Architect', shortName: 'SAA-C03', x: 150, y: 160, level: 'associate', hasQuestionBank: true, description: 'Design distributed systems' },
  { id: 'dva-c02', name: 'Developer', shortName: 'DVA-C02', x: 400, y: 160, level: 'associate', hasQuestionBank: false, description: 'Develop cloud applications' },
  { id: 'soa-c02', name: 'SysOps Admin', shortName: 'SOA-C02', x: 650, y: 160, level: 'associate', hasQuestionBank: false, description: 'Deploy and operate' },

  // Professional
  { id: 'sap-c02', name: 'Solutions Architect Pro', shortName: 'SAP-C02', x: 250, y: 260, level: 'professional', hasQuestionBank: false, description: 'Advanced architecture' },
  { id: 'dop-c02', name: 'DevOps Engineer Pro', shortName: 'DOP-C02', x: 550, y: 260, level: 'professional', hasQuestionBank: false, description: 'CI/CD and automation' },

  // Specialty
  { id: 'mls-c01', name: 'Machine Learning', shortName: 'MLS-C01', x: 100, y: 360, level: 'specialty', hasQuestionBank: true, description: 'ML on AWS' },
  { id: 'aif-c01', name: 'AI Practitioner', shortName: 'AIF-C01', x: 280, y: 360, level: 'specialty', hasQuestionBank: true, description: 'AI foundations' },
  { id: 'scs-c02', name: 'Security', shortName: 'SCS-C02', x: 460, y: 360, level: 'specialty', hasQuestionBank: false, description: 'Security specialty' },
  { id: 'ans-c01', name: 'Advanced Networking', shortName: 'ANS-C01', x: 640, y: 360, level: 'specialty', hasQuestionBank: false, description: 'Networking specialty' },
];

const awsConnections: CertConnection[] = [
  // Foundational to Associate
  { from: 'clf-c02', to: 'saa-c03' },
  { from: 'clf-c02', to: 'dva-c02' },
  { from: 'clf-c02', to: 'soa-c02' },
  // Associate to Professional
  { from: 'saa-c03', to: 'sap-c02' },
  { from: 'dva-c02', to: 'dop-c02' },
  { from: 'soa-c02', to: 'dop-c02' },
  // To Specialty
  { from: 'saa-c03', to: 'mls-c01' },
  { from: 'saa-c03', to: 'aif-c01' },
  { from: 'sap-c02', to: 'scs-c02' },
  { from: 'sap-c02', to: 'ans-c01' },
];

// Azure Certification Data
const azureCerts: CertNode[] = [
  // Fundamentals
  { id: 'az-900', name: 'Azure Fundamentals', shortName: 'AZ-900', x: 400, y: 60, level: 'foundational', hasQuestionBank: true, description: 'Azure cloud concepts' },
  { id: 'ai-900', name: 'AI Fundamentals', shortName: 'AI-900', x: 200, y: 60, level: 'foundational', hasQuestionBank: false, description: 'AI concepts' },
  { id: 'dp-900', name: 'Data Fundamentals', shortName: 'DP-900', x: 600, y: 60, level: 'foundational', hasQuestionBank: false, description: 'Data concepts' },

  // Associate
  { id: 'az-104', name: 'Administrator', shortName: 'AZ-104', x: 150, y: 170, level: 'associate', hasQuestionBank: true, description: 'Manage Azure resources' },
  { id: 'az-204', name: 'Developer', shortName: 'AZ-204', x: 350, y: 170, level: 'associate', hasQuestionBank: false, description: 'Develop solutions' },
  { id: 'ai-102', name: 'AI Engineer', shortName: 'AI-102', x: 550, y: 170, level: 'associate', hasQuestionBank: true, description: 'AI solutions' },
  { id: 'dp-100', name: 'Data Scientist', shortName: 'DP-100', x: 700, y: 170, level: 'associate', hasQuestionBank: true, description: 'ML models' },

  // Expert
  { id: 'az-305', name: 'Solutions Architect', shortName: 'AZ-305', x: 250, y: 280, level: 'professional', hasQuestionBank: false, description: 'Design solutions' },
  { id: 'az-400', name: 'DevOps Engineer', shortName: 'AZ-400', x: 450, y: 280, level: 'professional', hasQuestionBank: false, description: 'DevOps practices' },

  // Specialty
  { id: 'az-700', name: 'Network Engineer', shortName: 'AZ-700', x: 150, y: 380, level: 'specialty', hasQuestionBank: false, description: 'Network solutions' },
  { id: 'az-500', name: 'Security Engineer', shortName: 'AZ-500', x: 350, y: 380, level: 'specialty', hasQuestionBank: false, description: 'Security implementation' },
  { id: 'dp-203', name: 'Data Engineer', shortName: 'DP-203', x: 550, y: 380, level: 'specialty', hasQuestionBank: false, description: 'Data solutions' },
];

const azureConnections: CertConnection[] = [
  // Fundamentals to Associate
  { from: 'az-900', to: 'az-104' },
  { from: 'az-900', to: 'az-204' },
  { from: 'ai-900', to: 'ai-102' },
  { from: 'dp-900', to: 'dp-100' },
  // Associate to Expert
  { from: 'az-104', to: 'az-305' },
  { from: 'az-204', to: 'az-305' },
  { from: 'az-204', to: 'az-400' },
  // To Specialty
  { from: 'az-104', to: 'az-700' },
  { from: 'az-305', to: 'az-500' },
  { from: 'dp-100', to: 'dp-203' },
];

// GCP Certification Data
const gcpCerts: CertNode[] = [
  // Foundational
  { id: 'cdl', name: 'Cloud Digital Leader', shortName: 'CDL', x: 400, y: 60, level: 'foundational', hasQuestionBank: true, description: 'Cloud concepts' },

  // Associate
  { id: 'ace', name: 'Cloud Engineer', shortName: 'ACE', x: 400, y: 160, level: 'associate', hasQuestionBank: true, description: 'Deploy applications' },

  // Professional
  { id: 'pca', name: 'Cloud Architect', shortName: 'PCA', x: 150, y: 270, level: 'professional', hasQuestionBank: false, description: 'Design solutions' },
  { id: 'pde', name: 'Data Engineer', shortName: 'PDE', x: 350, y: 270, level: 'professional', hasQuestionBank: true, description: 'Data processing' },
  { id: 'pcde', name: 'Cloud Developer', shortName: 'PCDE', x: 550, y: 270, level: 'professional', hasQuestionBank: false, description: 'Cloud-native apps' },
  { id: 'pcne', name: 'Network Engineer', shortName: 'PCNE', x: 700, y: 270, level: 'professional', hasQuestionBank: false, description: 'Network architecture' },

  // Specialty
  { id: 'pmle', name: 'ML Engineer', shortName: 'PMLE', x: 200, y: 380, level: 'specialty', hasQuestionBank: true, description: 'ML models on GCP' },
  { id: 'pcse', name: 'Security Engineer', shortName: 'PCSE', x: 400, y: 380, level: 'specialty', hasQuestionBank: false, description: 'Security on GCP' },
  { id: 'pcdbe', name: 'Database Engineer', shortName: 'PCDBE', x: 600, y: 380, level: 'specialty', hasQuestionBank: false, description: 'Database solutions' },
];

const gcpConnections: CertConnection[] = [
  // Foundational to Associate
  { from: 'cdl', to: 'ace' },
  // Associate to Professional
  { from: 'ace', to: 'pca' },
  { from: 'ace', to: 'pde' },
  { from: 'ace', to: 'pcde' },
  { from: 'ace', to: 'pcne' },
  // Professional to Specialty
  { from: 'pca', to: 'pmle' },
  { from: 'pde', to: 'pmle' },
  { from: 'pca', to: 'pcse' },
  { from: 'pde', to: 'pcdbe' },
];

// Level labels and colors (unused but kept for reference)
// const levelConfig = {
//   foundational: { label: 'Foundational', labelEn: 'Foundational' },
//   associate: { label: 'Associate', labelEn: 'Associate' },
//   professional: { label: 'Professional/Expert', labelEn: 'Professional' },
//   specialty: { label: 'Specialty', labelEn: 'Specialty' },
// };

// Certification Node Component
const CertNodeComponent: React.FC<{
  cert: CertNode;
  primaryColor: string;
  secondaryColor: string;
  onClick?: (id: string) => void;
}> = ({ cert, primaryColor, onClick }) => {
  const radius = 38;
  const handleClick = () => onClick?.(cert.id);

  return (
    <g
      transform={`translate(${cert.x}, ${cert.y})`}
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="transition-transform hover:scale-105"
    >
      {/* Outer glow for certs with question bank */}
      {cert.hasQuestionBank && (
        <circle
          cx="0"
          cy="0"
          r={radius + 6}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.3"
        />
      )}

      {/* Main circle */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={cert.hasQuestionBank ? primaryColor : 'white'}
        stroke={primaryColor}
        strokeWidth={cert.hasQuestionBank ? 3 : 2}
        strokeDasharray={cert.hasQuestionBank ? 'none' : '6,4'}
      />

      {/* Short name */}
      <text
        x="0"
        y="0"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={cert.hasQuestionBank ? 'white' : primaryColor}
        fontSize="11"
        fontWeight="600"
      >
        {cert.shortName}
      </text>

      {/* Full name below */}
      <text
        x="0"
        y={radius + 16}
        textAnchor="middle"
        fill="#4B5563"
        fontSize="10"
        fontWeight="500"
      >
        {cert.name}
      </text>

      {/* Question bank indicator */}
      {cert.hasQuestionBank && (
        <g transform={`translate(${radius - 8}, ${-radius + 8})`}>
          <circle cx="0" cy="0" r="10" fill="#10B981" stroke="white" strokeWidth="2" />
          <text x="0" y="1" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">Q</text>
        </g>
      )}
    </g>
  );
};

// Connection Line Component
const ConnectionLine: React.FC<{
  from: CertNode;
  to: CertNode;
  color: string;
}> = ({ from, to, color }) => {
  // Calculate control points for curved line
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const controlOffset = Math.min(Math.abs(dx) * 0.3, 30);

  const path = `M ${from.x} ${from.y + 38}
                Q ${from.x} ${midY + controlOffset} ${(from.x + to.x) / 2} ${midY}
                Q ${to.x} ${midY - controlOffset} ${to.x} ${to.y - 38}`;

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="2"
      opacity="0.4"
      markerEnd={`url(#arrow-${color.replace('#', '')})`}
    />
  );
};

// Level Band Component
const LevelBand: React.FC<{
  y: number;
  height: number;
  label: string;
  color: string;
  width: number;
}> = ({ y, height, label, color, width }) => (
  <g>
    <rect
      x="0"
      y={y - 20}
      width={width}
      height={height}
      fill={color}
      opacity="0.05"
    />
    <line
      x1="0"
      y1={y - 20}
      x2={width}
      y2={y - 20}
      stroke={color}
      strokeWidth="1"
      opacity="0.2"
      strokeDasharray="4,4"
    />
    <rect
      x="10"
      y={y - 10}
      width="100"
      height="24"
      rx="12"
      fill={color}
      opacity="0.1"
    />
    <text
      x="60"
      y={y + 5}
      textAnchor="middle"
      fill={color}
      fontSize="10"
      fontWeight="600"
    >
      {label}
    </text>
  </g>
);

// AWS Path SVG
export const AWSPathSVG: React.FC<CertPathProps> = ({ className, onClick }) => {
  const primaryColor = '#FF9900';
  const secondaryColor = '#232F3E';
  const width = 800;
  const height = 450;

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[800px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aws-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.05" />
          </linearGradient>
          <marker
            id={`arrow-${primaryColor.replace('#', '')}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={primaryColor} opacity="0.5" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="url(#aws-grad)" rx="16" />

        {/* Title */}
        <g transform="translate(400, 25)">
          <text x="0" y="0" textAnchor="middle" fill={secondaryColor} fontSize="20" fontWeight="700">
            AWS Certification Path
          </text>
        </g>

        {/* Level Bands */}
        <LevelBand y={60} height={80} label="Foundational" color={primaryColor} width={width} />
        <LevelBand y={160} height={80} label="Associate" color={primaryColor} width={width} />
        <LevelBand y={260} height={80} label="Professional" color={primaryColor} width={width} />
        <LevelBand y={360} height={80} label="Specialty" color={primaryColor} width={width} />

        {/* Connections */}
        {awsConnections.map((conn, i) => {
          const from = awsCerts.find(c => c.id === conn.from);
          const to = awsCerts.find(c => c.id === conn.to);
          if (from && to) {
            return <ConnectionLine key={i} from={from} to={to} color={primaryColor} />;
          }
          return null;
        })}

        {/* Nodes */}
        {awsCerts.map(cert => (
          <CertNodeComponent
            key={cert.id}
            cert={cert}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onClick={onClick}
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${width - 180}, ${height - 60})`}>
          <rect x="0" y="0" width="170" height="50" rx="8" fill="white" stroke="#E5E7EB" />
          <circle cx="20" cy="18" r="10" fill={primaryColor} />
          <text x="40" y="22" fill="#374151" fontSize="10">Has Question Bank</text>
          <circle cx="20" cy="38" r="10" fill="white" stroke={primaryColor} strokeWidth="2" strokeDasharray="4,2" />
          <text x="40" y="42" fill="#374151" fontSize="10">Coming Soon</text>
        </g>
      </svg>
    </div>
  );
};

// Azure Path SVG
export const AzurePathSVG: React.FC<CertPathProps> = ({ className, onClick }) => {
  const primaryColor = '#0078D4';
  const secondaryColor = '#50E6FF';
  const width = 850;
  const height = 470;

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[850px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="azure-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.05" />
          </linearGradient>
          <marker
            id={`arrow-${primaryColor.replace('#', '')}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={primaryColor} opacity="0.5" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="url(#azure-grad)" rx="16" />

        {/* Title */}
        <g transform="translate(425, 25)">
          <text x="0" y="0" textAnchor="middle" fill={primaryColor} fontSize="20" fontWeight="700">
            Microsoft Azure Certification Path
          </text>
        </g>

        {/* Level Bands */}
        <LevelBand y={60} height={90} label="Fundamentals" color={primaryColor} width={width} />
        <LevelBand y={170} height={90} label="Associate" color={primaryColor} width={width} />
        <LevelBand y={280} height={80} label="Expert" color={primaryColor} width={width} />
        <LevelBand y={380} height={80} label="Specialty" color={primaryColor} width={width} />

        {/* Connections */}
        {azureConnections.map((conn, i) => {
          const from = azureCerts.find(c => c.id === conn.from);
          const to = azureCerts.find(c => c.id === conn.to);
          if (from && to) {
            return <ConnectionLine key={i} from={from} to={to} color={primaryColor} />;
          }
          return null;
        })}

        {/* Nodes */}
        {azureCerts.map(cert => (
          <CertNodeComponent
            key={cert.id}
            cert={cert}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onClick={onClick}
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${width - 180}, ${height - 60})`}>
          <rect x="0" y="0" width="170" height="50" rx="8" fill="white" stroke="#E5E7EB" />
          <circle cx="20" cy="18" r="10" fill={primaryColor} />
          <text x="40" y="22" fill="#374151" fontSize="10">Has Question Bank</text>
          <circle cx="20" cy="38" r="10" fill="white" stroke={primaryColor} strokeWidth="2" strokeDasharray="4,2" />
          <text x="40" y="42" fill="#374151" fontSize="10">Coming Soon</text>
        </g>
      </svg>
    </div>
  );
};

// GCP Path SVG
export const GCPPathSVG: React.FC<CertPathProps> = ({ className, onClick }) => {
  const primaryColor = '#4285F4';
  const secondaryColor = '#34A853';
  const accentColor = '#FBBC04';
  const width = 800;
  const height = 470;

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[800px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gcp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.08" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.08" />
          </linearGradient>
          <marker
            id={`arrow-${secondaryColor.replace('#', '')}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={secondaryColor} opacity="0.5" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="url(#gcp-grad)" rx="16" />

        {/* Title */}
        <g transform="translate(400, 25)">
          <text x="0" y="0" textAnchor="middle" fill="#202124" fontSize="20" fontWeight="700">
            Google Cloud Certification Path
          </text>
        </g>

        {/* Level Bands */}
        <LevelBand y={60} height={80} label="Foundational" color={primaryColor} width={width} />
        <LevelBand y={160} height={90} label="Associate" color={secondaryColor} width={width} />
        <LevelBand y={270} height={90} label="Professional" color={secondaryColor} width={width} />
        <LevelBand y={380} height={80} label="Specialty" color={accentColor} width={width} />

        {/* Connections */}
        {gcpConnections.map((conn, i) => {
          const from = gcpCerts.find(c => c.id === conn.from);
          const to = gcpCerts.find(c => c.id === conn.to);
          if (from && to) {
            return <ConnectionLine key={i} from={from} to={to} color={secondaryColor} />;
          }
          return null;
        })}

        {/* Nodes */}
        {gcpCerts.map(cert => (
          <CertNodeComponent
            key={cert.id}
            cert={cert}
            primaryColor={secondaryColor}
            secondaryColor={primaryColor}
            onClick={onClick}
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${width - 180}, ${height - 60})`}>
          <rect x="0" y="0" width="170" height="50" rx="8" fill="white" stroke="#E5E7EB" />
          <circle cx="20" cy="18" r="10" fill={secondaryColor} />
          <text x="40" y="22" fill="#374151" fontSize="10">Has Question Bank</text>
          <circle cx="20" cy="38" r="10" fill="white" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4,2" />
          <text x="40" y="42" fill="#374151" fontSize="10">Coming Soon</text>
        </g>
      </svg>
    </div>
  );
};

// Combined view component for all three paths
export const AllCertPathsSVG: React.FC<CertPathProps & { provider?: 'aws' | 'azure' | 'gcp' }> = ({
  className,
  onClick,
  provider
}) => {
  if (provider === 'aws') return <AWSPathSVG className={className} onClick={onClick} />;
  if (provider === 'azure') return <AzurePathSVG className={className} onClick={onClick} />;
  if (provider === 'gcp') return <GCPPathSVG className={className} onClick={onClick} />;

  return (
    <div className={`space-y-8 ${className || ''}`}>
      <AWSPathSVG onClick={onClick} />
      <AzurePathSVG onClick={onClick} />
      <GCPPathSVG onClick={onClick} />
    </div>
  );
};

export default {
  AWSPathSVG,
  AzurePathSVG,
  GCPPathSVG,
  AllCertPathsSVG,
};
