import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Award,
  Building2,
  Brain,
  Database,
  Cog,
  Shield,
  Play,
  Lock,
  LucideIcon
} from 'lucide-react';
import {
  awsCertifications,
  azureCertifications,
  gcpCertifications,
  sapCertifications,
  careerPaths,
  levelNames,
  Certification,
  Provider,
  Level
} from '../data/certifications';

// Provider configuration
const providerConfig = {
  AWS: {
    name: 'Amazon Web Services',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    bgGradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    hoverBg: 'hover:bg-orange-50',
    activeBg: 'bg-orange-500',
    activeText: 'text-white',
    lightBg: 'bg-orange-100',
    pathColor: '#F97316'
  },
  Azure: {
    name: 'Microsoft Azure',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50',
    activeBg: 'bg-blue-500',
    activeText: 'text-white',
    lightBg: 'bg-blue-100',
    pathColor: '#3B82F6'
  },
  GCP: {
    name: 'Google Cloud Platform',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    bgGradient: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    hoverBg: 'hover:bg-green-50',
    activeBg: 'bg-green-500',
    activeText: 'text-white',
    lightBg: 'bg-green-100',
    pathColor: '#22C55E'
  },
  SAP: {
    name: 'SAP',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    bgGradient: 'from-cyan-50 to-teal-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-600',
    hoverBg: 'hover:bg-cyan-50',
    activeBg: 'bg-cyan-500',
    activeText: 'text-white',
    lightBg: 'bg-cyan-100',
    pathColor: '#0891B2'
  }
};

// Career path icons
const careerIcons: Record<string, LucideIcon> = {
  'cloud-architect': Building2,
  'ai-engineer': Brain,
  'data-engineer': Database,
  'devops-engineer': Cog,
  'security-engineer': Shield,
  // SAP career paths
  'sap-consultant': Building2,
  'sap-developer': Cog,
  'sap-data-analyst': Database
};

// Level badge colors
const levelColors: Record<Level, { bg: string; text: string; border: string }> = {
  foundational: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  associate: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  professional: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  specialty: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  expert: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' }
};

// Certification Path SVG Component
const CertificationPathSVG: React.FC<{
  provider: Provider;
  certifications: Certification[];
  highlightedCertIds?: string[];
  language: 'zh' | 'ja';
  onCertClick?: (certId: string) => void;
}> = ({ provider, certifications, highlightedCertIds, language, onCertClick }) => {
  const config = providerConfig[provider];
  const hasHighlight = highlightedCertIds && highlightedCertIds.length > 0;

  // Group certifications by level
  const allLevels: Level[] = ['foundational', 'associate', 'professional', 'specialty', 'expert'];
  const certsByLevel = allLevels.reduce((acc, level) => {
    acc[level] = certifications.filter(c => c.level === level);
    return acc;
  }, {} as Record<Level, Certification[]>);

  // Only show levels that have certifications
  const levels = allLevels.filter(level => certsByLevel[level].length > 0);

  const levelLabels = {
    foundational: language === 'ja' ? '入門' : '入门',
    associate: language === 'ja' ? 'アソシエイト' : '助理',
    professional: language === 'ja' ? 'プロフェッショナル' : '专业',
    specialty: language === 'ja' ? 'スペシャリティ' : '高级专项',
    expert: language === 'ja' ? 'エキスパート' : '专家'
  };

  // Calculate SVG dimensions - use FIXED width for consistent font size across all providers
  // Fixed viewBox width of 1800px ensures consistent scaling/font size
  // This accommodates the largest provider (Azure with ~11 certs/level)
  const svgWidth = 1800;
  const svgHeight = 40 + levels.length * 95 + 20;

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`pathGrad-${provider}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={config.pathColor} stopOpacity="0.2" />
          <stop offset="50%" stopColor={config.pathColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={config.pathColor} stopOpacity="0.2" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="1800" height={svgHeight} fill="#FAFAFA" rx="12" />

      {/* Level lanes - only levels with certifications */}
      {levels.map((level, i) => (
        <g key={level}>
          <rect
            x="30"
            y={40 + i * 95}
            width="1740"
            height="85"
            fill={i % 2 === 0 ? '#F8FAFC' : '#FFFFFF'}
            rx="8"
          />
          <text
            x="50"
            y={70 + i * 95}
            fill="#6B7280"
            fontSize="13"
            fontWeight="600"
          >
            {levelLabels[level as Level]}
          </text>
        </g>
      ))}

      {/* Connection paths */}
      {certifications.map((cert) => {
        const prereqs = cert.prerequisites || [];
        return prereqs.map((prereqId) => {
          const prereq = certifications.find(c => c.id === prereqId);
          if (!prereq) return null;

          const fromLevel = levels.indexOf(prereq.level);
          const toLevel = levels.indexOf(cert.level);
          const fromIndex = certsByLevel[prereq.level].indexOf(prereq);
          const toIndex = certsByLevel[cert.level].indexOf(cert);

          const fromX = 150 + fromIndex * 160;
          const fromY = 85 + fromLevel * 95;
          const toX = 150 + toIndex * 160;
          const toY = 60 + toLevel * 95;

          return (
            <path
              key={`${cert.id}-${prereqId}`}
              d={`M ${fromX} ${fromY} C ${fromX} ${fromY + 30}, ${toX} ${toY - 30}, ${toX} ${toY}`}
              fill="none"
              stroke={config.pathColor}
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          );
        });
      })}

      {/* Certification nodes */}
      {levels.map((level, levelIndex) => (
        certsByLevel[level].map((cert, certIndex) => {
          const x = 100 + certIndex * 160;
          const y = 55 + levelIndex * 95;
          const isHighlighted = !hasHighlight || (highlightedCertIds && highlightedCertIds.includes(cert.id));
          const nodeOpacity = hasHighlight && !isHighlighted ? 0.4 : 1;
          const isClickable = cert.hasExamData && onCertClick;

          return (
            <g
              key={cert.id}
              transform={`translate(${x}, ${y})`}
              filter="url(#shadow)"
              opacity={nodeOpacity}
              onClick={() => isClickable && onCertClick(cert.id)}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
              className={isClickable ? 'hover:opacity-80 transition-opacity' : ''}
            >
              {/* Clickable area */}
              <rect
                x="0"
                y="0"
                width="130"
                height="60"
                rx="10"
                fill="white"
                stroke={isHighlighted && cert.hasExamData ? config.pathColor : (isHighlighted ? '#9CA3AF' : '#E5E7EB')}
                strokeWidth={isHighlighted ? 3 : 2}
              />
              {/* Highlighted background for career path items */}
              {isHighlighted && cert.hasExamData && (
                <rect
                  x="0"
                  y="0"
                  width="130"
                  height="60"
                  rx="10"
                  fill={config.pathColor}
                  opacity="0.15"
                />
              )}
              {/* Career path indicator border */}
              {isHighlighted && hasHighlight && (
                <rect
                  x="-3"
                  y="-3"
                  width="136"
                  height="66"
                  rx="12"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeDasharray="6,3"
                  className="animate-pulse"
                />
              )}
              <text
                x="65"
                y="24"
                textAnchor="middle"
                fill={isHighlighted ? '#374151' : '#9CA3AF'}
                fontSize="14"
                fontWeight="700"
              >
                {cert.code}
              </text>
              <text
                x="65"
                y="44"
                textAnchor="middle"
                fill={isHighlighted ? '#6B7280' : '#D1D5DB'}
                fontSize="12"
                fontWeight="500"
              >
                {cert.name[language].length > 10 ? cert.name[language].slice(0, 10) + '...' : cert.name[language]}
              </text>
              {cert.hasExamData && (
                <g>
                  <circle cx="115" cy="12" r="8" fill={isHighlighted ? config.pathColor : '#D1D5DB'}>
                    <title>{language === 'ja' ? 'クリックして練習' : '点击练习'}</title>
                  </circle>
                  <text x="115" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">▶</text>
                </g>
              )}
            </g>
          );
        })
      ))}

      {/* Legend - positioned at bottom right */}
      <g transform={`translate(1560, ${svgHeight - 25})`}>
        <circle cx="0" cy="0" r="7" fill={config.pathColor} />
        <text x="15" y="5" fill="#6B7280" fontSize="12" fontWeight="500">
          {language === 'ja' ? '練習問題あり' : '有题库'}
        </text>
        <circle cx="110" cy="0" r="7" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <text x="125" y="5" fill="#6B7280" fontSize="12" fontWeight="500">
          {language === 'ja' ? '準備中' : '即将推出'}
        </text>
      </g>
    </svg>
  );
};

// Certification Card Component
const CertificationCard: React.FC<{
  cert: Certification;
  provider: Provider;
  language: 'zh' | 'ja';
  onStartQuiz: (provider: Provider, certCode: string) => void;
  isCareerPathItem?: boolean;
}> = ({ cert, provider, language, onStartQuiz, isCareerPathItem = false }) => {
  const config = providerConfig[provider];
  const levelStyle = levelColors[cert.level];

  return (
    <div
      id={`cert-card-${cert.id}`}
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${
        isCareerPathItem
          ? 'border-purple-400 ring-2 ring-purple-200 ring-opacity-50'
          : config.borderColor
      }`}
    >
      {/* Career path indicator */}
      {isCareerPathItem && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-purple-500 border-l-[40px] border-l-transparent">
          <span className="absolute -top-[35px] -left-[15px] text-white text-xs">★</span>
        </div>
      )}
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isCareerPathItem ? 'from-purple-500 to-indigo-600' : config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelStyle.bg} ${levelStyle.text} border ${levelStyle.border}`}>
            {levelNames[cert.level][language]}
          </span>
          {cert.hasExamData ? (
            <span className={`flex items-center gap-1 text-xs ${config.textColor} font-medium`}>
              <Play size={12} />
              {language === 'ja' ? '練習可能' : '可练习'}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Lock size={12} />
              {language === 'ja' ? '準備中' : '即将推出'}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="mb-3">
          <p className={`text-sm font-mono ${config.textColor} mb-1`}>{cert.code}</p>
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            {cert.name[language]}
          </h3>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
            <Clock size={12} className="text-gray-400" />
            <span>{cert.examDuration}{language === 'ja' ? '分' : '分钟'}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
            <BookOpen size={12} className="text-gray-400" />
            <span>{cert.questionCount}{language === 'ja' ? '問' : '题'}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
            <Award size={12} className="text-gray-400" />
            <span>{cert.passingScore}%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">
          {cert.description[language]}
        </p>

        {/* Action Button */}
        {cert.hasExamData ? (
          <button
            onClick={() => onStartQuiz(provider, cert.code)}
            className={`w-full py-2.5 px-4 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
          >
            <Play size={16} />
            {language === 'ja' ? '問題集を見る' : '查看题库'}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lock size={16} />
            {language === 'ja' ? '近日公開' : '即将推出'}
          </button>
        )}
      </div>
    </div>
  );
};

// Career Path Card Component - Compact pill style
const CareerPathCard: React.FC<{
  path: typeof careerPaths[0];
  language: 'zh' | 'ja';
  isSelected: boolean;
  onClick: () => void;
}> = ({ path, language, isSelected, onClick }) => {
  const IconComponent = careerIcons[path.id] || Building2;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
        isSelected
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
      }`}
    >
      <IconComponent size={16} className={isSelected ? 'text-white' : 'text-indigo-600'} />
      <span className="text-sm font-medium whitespace-nowrap">{path.name[language]}</span>
    </button>
  );
};

// Get certifications for a provider
const getCertificationsByProvider = (provider: Provider): Certification[] => {
  switch (provider) {
    case 'AWS': return awsCertifications;
    case 'Azure': return azureCertifications;
    case 'GCP': return gcpCertifications;
    case 'SAP': return sapCertifications;
  }
};

// Main Page Component
export const CertificationPathPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const language = useLanguageStore(state => state.language);
  const lang = language === 'ja' ? 'ja' : 'zh';

  const [selectedProvider, setSelectedProvider] = useState<Provider>('AWS');
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);

  // Read career from URL query parameter
  useEffect(() => {
    const careerFromUrl = searchParams.get('career');
    if (careerFromUrl && careerPaths.some(p => p.id === careerFromUrl)) {
      setSelectedCareerPath(careerFromUrl);
    }
  }, [searchParams]);

  // Get current career path data
  const currentCareerPath = useMemo(() => {
    return careerPaths.find(p => p.id === selectedCareerPath);
  }, [selectedCareerPath]);

  // Get certifications for selected provider (single provider mode)
  const certifications = useMemo(() => {
    return getCertificationsByProvider(selectedProvider);
  }, [selectedProvider]);

  // Get certifications by provider for career view (all providers mode)
  const certsByProvider = useMemo(() => {
    if (!currentCareerPath) return null;

    const providers: Provider[] = ['AWS', 'Azure', 'GCP', 'SAP'];
    return providers.map(provider => {
      const allCerts = getCertificationsByProvider(provider);
      const relevantCertIds = currentCareerPath.certifications
        .filter(c => c.provider === provider)
        .map(c => c.certId);
      const filteredCerts = allCerts.filter(c => relevantCertIds.includes(c.id));

      return {
        provider,
        certifications: allCerts,
        filteredCertifications: filteredCerts,
        highlightedCertIds: relevantCertIds
      };
    }).filter(p => p.filteredCertifications.length > 0);
  }, [currentCareerPath]);

  // Get highlighted certification IDs for single provider mode
  const highlightedCertIds = useMemo(() => {
    if (!selectedCareerPath) return [];

    const path = careerPaths.find(p => p.id === selectedCareerPath);
    if (!path) return [];

    return path.certifications
      .filter(c => c.provider === selectedProvider)
      .map(c => c.certId);
  }, [selectedCareerPath, selectedProvider]);

  // Always show all certifications, highlighting is done via highlightedCertIds
  const filteredCertifications = certifications;

  // Group by level for single provider mode
  const certsByLevel = useMemo(() => {
    const levels: Level[] = ['foundational', 'associate', 'professional', 'specialty', 'expert'];
    return levels
      .map(level => ({
        level,
        certs: filteredCertifications.filter(c => c.level === level)
      }))
      .filter(g => g.certs.length > 0);
  }, [filteredCertifications]);

  const handleStartQuiz = (provider: Provider, certCode: string) => {
    // Navigate to homepage with provider and cert code to filter exams
    navigate('/', { state: { provider, certCode: certCode.toLowerCase() } });
  };

  // Handle certification click from SVG
  const handleCertClick = (certId: string) => {
    const cert = certifications.find(c => c.id === certId);
    if (cert && cert.hasExamData) {
      handleStartQuiz(selectedProvider, cert.code);
    }
  };

  const config = providerConfig[selectedProvider];

  const pageTitle = lang === 'ja' ? '認証学習パス' : '认证学习路径';
  const backText = lang === 'ja' ? 'ホームに戻る' : '返回首页';
  const careerTitle = lang === 'ja' ? 'キャリアパス推奨' : '职业路径推荐';
  const pathTitle = lang === 'ja' ? '認定パスマップ' : '认证路径图';
  const certTitle = lang === 'ja' ? '認定一覧' : '认证列表';
  const viewAllText = lang === 'ja' ? 'すべての認定を表示' : '查看全部认证';

  // Always show single provider mode, career path just affects highlighting
  const isCareerMode = false; // Disabled - always show single provider with tabs

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header - Very Compact */}
      <div className={`bg-gradient-to-r ${isCareerMode ? 'from-indigo-50 to-purple-50' : config.bgGradient} border-b ${isCareerMode ? 'border-indigo-200' : config.borderColor}`}>
        <div className="px-3 lg:px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-xs"
              >
                <ArrowLeft size={14} />
                <span>{backText}</span>
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <h1 className="text-base font-bold text-gray-900">
                {isCareerMode ? currentCareerPath?.name[lang] : pageTitle}
              </h1>
            </div>

            {/* Provider Tabs - always visible */}
            <div className="flex items-center gap-1 p-0.5 bg-white rounded-lg shadow-sm">
              {(['AWS', 'Azure', 'GCP', 'SAP'] as Provider[]).map((provider) => {
                const pConfig = providerConfig[provider];
                const isActive = selectedProvider === provider;
                return (
                  <button
                    key={provider}
                    onClick={() => setSelectedProvider(provider)}
                    className={`px-3 py-1 rounded-md font-medium text-xs transition-all ${
                      isActive
                        ? `${pConfig.activeBg} ${pConfig.activeText}`
                        : `text-gray-600 ${pConfig.hoverBg}`
                    }`}
                  >
                    {provider}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 lg:px-4 py-2">
        {/* Career Paths Section - Very Compact */}
        <section className="mb-4">
          {!isCareerMode ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">{careerTitle}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {careerPaths.map((path) => (
                  <CareerPathCard
                    key={path.id}
                    path={path}
                    language={lang}
                    isSelected={selectedCareerPath === path.id}
                    onClick={() => setSelectedCareerPath(
                      selectedCareerPath === path.id ? null : path.id
                    )}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{lang === 'ja' ? '選択中:' : '当前路径:'}</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {currentCareerPath?.name[lang]}
                </span>
              </div>
              <button
                onClick={() => navigate('/certification-path')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {viewAllText}
              </button>
            </div>
          )}
        </section>

        {/* Career Mode: Show all providers */}
        {isCareerMode && certsByProvider && (
          <>
            {certsByProvider.map(({ provider, certifications: allCerts, filteredCertifications: certs, highlightedCertIds: highlighted }) => {
              const pConfig = providerConfig[provider];
              const levels: Level[] = ['foundational', 'associate', 'professional', 'specialty', 'expert'];
              const certsByLevelForProvider = levels
                .map(level => ({
                  level,
                  certs: certs.filter(c => c.level === level)
                }))
                .filter(g => g.certs.length > 0);

              return (
                <section key={provider} className="mb-6">
                  {/* Provider Header - Compact inline */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 bg-gradient-to-br ${pConfig.gradient} rounded-lg`}>
                      <Award size={16} className="text-white" />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">{provider}</h2>
                    <span className="text-xs text-gray-500">({allCerts.length} {lang === 'ja' ? '件' : '个'})</span>
                  </div>

                  {/* SVG Path for this provider */}
                  <div className={`bg-white rounded-lg p-2 shadow-sm border ${pConfig.borderColor} mb-3 overflow-x-auto`}>
                    <CertificationPathSVG
                      provider={provider}
                      certifications={allCerts}
                      highlightedCertIds={highlighted}
                      language={lang}
                    />
                  </div>

                  {/* Certification Cards for this provider */}
                  {certsByLevelForProvider.map(({ level, certs: levelCerts }) => (
                    <div key={`${provider}-${level}`} className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${levelColors[level].bg} ${levelColors[level].text} border ${levelColors[level].border}`}>
                          {levelNames[level][lang]}
                        </div>
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-400">{levelCerts.length} {lang === 'ja' ? '件' : '个'}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {levelCerts.map((cert) => (
                          <CertificationCard
                            key={cert.id}
                            cert={cert}
                            provider={provider}
                            language={lang}
                            onStartQuiz={handleStartQuiz}
                            isCareerPathItem={highlighted.includes(cert.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              );
            })}
          </>
        )}

        {/* Single Provider Mode */}
        {!isCareerMode && (
          <>
            {/* Certification Path SVG */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">{pathTitle}</h2>
                {selectedCareerPath && (
                  <span className="text-sm text-purple-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    {lang === 'ja' ? '紫の点線 = 推奨認定' : '紫色虚线 = 推荐认证'}
                  </span>
                )}
              </div>
              <div className={`bg-white rounded-xl p-4 shadow-sm border ${config.borderColor} overflow-x-auto`}>
                <CertificationPathSVG
                  provider={selectedProvider}
                  certifications={certifications}
                  highlightedCertIds={highlightedCertIds}
                  language={lang}
                  onCertClick={handleCertClick}
                />
              </div>
            </section>

            {/* Certification Cards Grid */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{certTitle}</h2>

              {certsByLevel.map(({ level, certs }) => (
                <div key={level} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${levelColors[level].bg} ${levelColors[level].text} border ${levelColors[level].border}`}>
                      {levelNames[level][lang]}
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">{certs.length} {lang === 'ja' ? '件' : '个'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {certs.map((cert) => (
                      <CertificationCard
                        key={cert.id}
                        cert={cert}
                        provider={selectedProvider}
                        language={lang}
                        onStartQuiz={handleStartQuiz}
                        isCareerPathItem={highlightedCertIds.includes(cert.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </div>

      {/* Footer - Compact */}
      <footer className="py-3 border-t border-gray-100 bg-white/50">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">·</span>
            {lang === 'ja' ? '認証学習プラットフォーム' : '认证学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CertificationPathPage;
