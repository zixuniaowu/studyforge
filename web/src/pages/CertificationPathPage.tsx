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
  }
};

// Career path icons
const careerIcons: Record<string, LucideIcon> = {
  'cloud-architect': Building2,
  'ai-engineer': Brain,
  'data-engineer': Database,
  'devops-engineer': Cog,
  'security-engineer': Shield
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
  language: 'zh' | 'ja'
}> = ({ provider, certifications, highlightedCertIds, language }) => {
  const config = providerConfig[provider];
  const hasHighlight = highlightedCertIds && highlightedCertIds.length > 0;

  // Group certifications by level
  const levels: Level[] = ['foundational', 'associate', 'professional', 'specialty', 'expert'];
  const certsByLevel = levels.reduce((acc, level) => {
    acc[level] = certifications.filter(c => c.level === level);
    return acc;
  }, {} as Record<Level, Certification[]>);

  const levelLabels = {
    foundational: language === 'ja' ? '入門' : '入门',
    associate: language === 'ja' ? 'アソシエイト' : '助理',
    professional: language === 'ja' ? 'プロフェッショナル' : '专业',
    specialty: language === 'ja' ? 'スペシャリティ' : '专家',
    expert: language === 'ja' ? 'エキスパート' : '专家'
  };

  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
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
      <rect x="0" y="0" width="800" height="420" fill="#FAFAFA" rx="12" />

      {/* Level lanes */}
      {['foundational', 'associate', 'professional', 'specialty'].map((level, i) => (
        <g key={level}>
          <rect
            x="30"
            y={40 + i * 95}
            width="740"
            height="85"
            fill={i % 2 === 0 ? '#F8FAFC' : '#FFFFFF'}
            rx="8"
          />
          <text
            x="50"
            y={70 + i * 95}
            fill="#9CA3AF"
            fontSize="11"
            fontWeight="500"
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
          const nodeOpacity = hasHighlight && !isHighlighted ? 0.3 : 1;

          return (
            <g key={cert.id} transform={`translate(${x}, ${y})`} filter="url(#shadow)" opacity={nodeOpacity}>
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
              {isHighlighted && cert.hasExamData && (
                <rect
                  x="0"
                  y="0"
                  width="130"
                  height="60"
                  rx="10"
                  fill={config.pathColor}
                  opacity="0.1"
                />
              )}
              {isHighlighted && hasHighlight && (
                <rect
                  x="-3"
                  y="-3"
                  width="136"
                  height="66"
                  rx="12"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
              )}
              <text
                x="65"
                y="22"
                textAnchor="middle"
                fill={isHighlighted ? '#374151' : '#9CA3AF'}
                fontSize="11"
                fontWeight="600"
              >
                {cert.code}
              </text>
              <text
                x="65"
                y="40"
                textAnchor="middle"
                fill={isHighlighted ? '#6B7280' : '#D1D5DB'}
                fontSize="9"
              >
                {cert.name[language].length > 12 ? cert.name[language].slice(0, 12) + '...' : cert.name[language]}
              </text>
              {cert.hasExamData && (
                <circle cx="115" cy="12" r="6" fill={isHighlighted ? config.pathColor : '#D1D5DB'}>
                  <title>{language === 'ja' ? '練習可能' : '可练习'}</title>
                </circle>
              )}
            </g>
          );
        })
      ))}

      {/* Legend */}
      <g transform="translate(600, 390)">
        <circle cx="0" cy="0" r="6" fill={config.pathColor} />
        <text x="15" y="4" fill="#6B7280" fontSize="10">
          {language === 'ja' ? '練習問題あり' : '有题库'}
        </text>
        <circle cx="100" cy="0" r="6" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <text x="115" y="4" fill="#6B7280" fontSize="10">
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
}> = ({ cert, provider, language, onStartQuiz }) => {
  const config = providerConfig[provider];
  const levelStyle = levelColors[cert.level];

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border ${config.borderColor}`}>
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
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

// Career Path Card Component
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
      className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'
      }`}
    >
      <div className={`p-3 rounded-xl mb-2 ${isSelected ? 'bg-white/20' : 'bg-indigo-100'}`}>
        <IconComponent size={24} className={isSelected ? 'text-white' : 'text-indigo-600'} />
      </div>
      <h3 className="text-sm font-semibold text-center">{path.name[language]}</h3>
      <p className={`text-xs mt-1 text-center line-clamp-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        {path.description[language]}
      </p>
    </button>
  );
};

// Get certifications for a provider
const getCertificationsByProvider = (provider: Provider): Certification[] => {
  switch (provider) {
    case 'AWS': return awsCertifications;
    case 'Azure': return azureCertifications;
    case 'GCP': return gcpCertifications;
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

    const providers: Provider[] = ['AWS', 'Azure', 'GCP'];
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

  // Filter certifications for single provider mode
  const filteredCertifications = useMemo(() => {
    if (!selectedCareerPath || highlightedCertIds.length === 0) return certifications;
    return certifications.filter(c => highlightedCertIds.includes(c.id));
  }, [certifications, selectedCareerPath, highlightedCertIds]);

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

  const config = providerConfig[selectedProvider];

  const pageTitle = lang === 'ja' ? '認証学習パス' : '认证学习路径';
  const backText = lang === 'ja' ? 'ホームに戻る' : '返回首页';
  const careerTitle = lang === 'ja' ? 'キャリアパス推奨' : '职业路径推荐';
  const careerSubtitle = lang === 'ja' ? 'あなたのキャリア目標に合った認定を見つけましょう' : '找到适合你职业目标的认证';
  const pathTitle = lang === 'ja' ? '認定パスマップ' : '认证路径图';
  const certTitle = lang === 'ja' ? '認定一覧' : '认证列表';
  const viewAllText = lang === 'ja' ? 'すべての認定を表示' : '查看全部认证';

  // Career mode: show all providers for selected career
  const isCareerMode = selectedCareerPath && certsByProvider;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className={`bg-gradient-to-r ${isCareerMode ? 'from-indigo-50 to-purple-50' : config.bgGradient} border-b ${isCareerMode ? 'border-indigo-200' : config.borderColor}`}>
        <div className="px-6 lg:px-10 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{backText}</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-gradient-to-br ${isCareerMode ? 'from-indigo-500 to-purple-600' : config.gradient} rounded-2xl shadow-lg`}>
                <Award size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {isCareerMode ? currentCareerPath?.name[lang] : pageTitle}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isCareerMode
                    ? currentCareerPath?.description[lang]
                    : config.name
                  }
                </p>
              </div>
            </div>

            {/* Provider Tabs - only show when not in career mode */}
            {!isCareerMode && (
              <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-sm">
                {(['AWS', 'Azure', 'GCP'] as Provider[]).map((provider) => {
                  const pConfig = providerConfig[provider];
                  const isActive = selectedProvider === provider;
                  return (
                    <button
                      key={provider}
                      onClick={() => {
                        setSelectedProvider(provider);
                        setSelectedCareerPath(null);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
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
            )}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
        {/* Career Paths Section */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{careerTitle}</h2>
            <p className="text-gray-500 text-sm">{careerSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

          {selectedCareerPath && (
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedCareerPath(null)}
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
                <section key={provider} className="mb-12">
                  {/* Provider Header */}
                  <div className={`flex items-center gap-4 mb-6 p-4 rounded-2xl bg-gradient-to-r ${pConfig.bgGradient} border ${pConfig.borderColor}`}>
                    <div className={`p-3 bg-gradient-to-br ${pConfig.gradient} rounded-xl shadow-lg`}>
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{provider}</h2>
                      <p className="text-sm text-gray-600">{pConfig.name}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${pConfig.lightBg} ${pConfig.textColor}`}>
                        {certs.length} {lang === 'ja' ? '件の認定' : '个认证'}
                      </span>
                    </div>
                  </div>

                  {/* SVG Path for this provider */}
                  <div className={`bg-white rounded-2xl p-6 shadow-sm border ${pConfig.borderColor} mb-6`}>
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
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">{pathTitle}</h2>
              <div className={`bg-white rounded-2xl p-6 shadow-sm border ${config.borderColor}`}>
                <CertificationPathSVG
                  provider={selectedProvider}
                  certifications={certifications}
                  highlightedCertIds={highlightedCertIds}
                  language={lang}
                />
              </div>
            </section>

            {/* Certification Cards Grid */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{certTitle}</h2>

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
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 bg-white/50">
        <div className="text-center">
          <p className="text-gray-500">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">StudyForge</span>
            <span className="mx-2">-</span>
            {lang === 'ja' ? '認証学習プラットフォーム' : '认证学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CertificationPathPage;
