// Theme-based decorations for each unit
export type UnitTheme = 'forest' | 'city' | 'ocean' | 'space';

interface MapDecorationsProps {
  theme: UnitTheme;
  width: number;
  height: number;
}

// Decoration elements for each theme
const themeDecorations: Record<UnitTheme, { emojis: string[]; bgGradient: string; floating: string[] }> = {
  forest: {
    emojis: ['🌲', '🌳', '🌿', '🍄', '🦋', '🐦', '🌸', '🌺'],
    bgGradient: 'linear-gradient(180deg, #A8E6CF 0%, #88D8B0 50%, #6BC5A0 100%)',
    floating: ['🍃', '🦋', '✨'],
  },
  city: {
    emojis: ['🏙️', '🏢', '🏬', '🚗', '🚌', '🚦', '🏪', '🎡'],
    bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #ADD8E6 100%)',
    floating: ['☁️', '🎈', '🕊️'],
  },
  ocean: {
    emojis: ['🌊', '🐠', '🐟', '🐙', '🦀', '🐚', '🪸', '⚓'],
    bgGradient: 'linear-gradient(180deg, #48D1CC 0%, #40E0D0 50%, #20B2AA 100%)',
    floating: ['🫧', '🐠', '✨'],
  },
  space: {
    emojis: ['🚀', '🛸', '🌟', '⭐', '🌙', '🪐', '☄️', '🌌'],
    bgGradient: 'linear-gradient(180deg, #2D1B69 0%, #1A0A3A 50%, #0D0520 100%)',
    floating: ['✨', '💫', '⭐'],
  },
};

export const MapDecorations = ({ theme, width, height }: MapDecorationsProps) => {
  const decorations = themeDecorations[theme];

  // Generate random positions for decorations
  const generateDecorations = () => {
    const items = [];
    const positions: { x: number; y: number }[] = [];

    for (let i = 0; i < 12; i++) {
      let x: number, y: number;
      let attempts = 0;

      // Avoid overlapping
      do {
        x = Math.random() * (width - 60) + 30;
        y = Math.random() * (height - 60) + 30;
        attempts++;
      } while (
        positions.some(p => Math.abs(p.x - x) < 50 && Math.abs(p.y - y) < 50) &&
        attempts < 10
      );

      positions.push({ x, y });
      items.push({
        emoji: decorations.emojis[i % decorations.emojis.length],
        x,
        y,
        delay: i * 0.3,
        scale: 0.8 + Math.random() * 0.4,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }

    return items;
  };

  const items = generateDecorations();

  return (
    <>
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: decorations.bgGradient,
          opacity: 0.4,
        }}
      />

      {/* Static decorations */}
      {items.map((item, index) => (
        <div
          key={`deco-${index}`}
          className="absolute pointer-events-none select-none animate-float"
          style={{
            left: item.x,
            top: item.y,
            fontSize: `${24 * item.scale}px`,
            opacity: item.opacity,
            animationDelay: `${item.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`float-${i}`}
          className="absolute pointer-events-none select-none animate-float-slow"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            fontSize: '20px',
            opacity: 0.5,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {decorations.floating[i % decorations.floating.length]}
        </div>
      ))}

      {/* Theme-specific overlay effects */}
      {theme === 'space' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Stars for space theme */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                opacity: 0.5 + Math.random() * 0.5,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme === 'ocean' && (
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          {/* Waves for ocean theme */}
          <div
            className="absolute bottom-0 left-0 right-0 h-full animate-wave"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(32, 178, 170, 0.3) 100%)',
            }}
          />
        </div>
      )}
    </>
  );
};

// Theme badge for unit header
export const ThemeBadge = ({ theme }: { theme: UnitTheme }) => {
  const badges: Record<UnitTheme, { emoji: string; label: string }> = {
    forest: { emoji: '🌲', label: '森林世界' },
    city: { emoji: '🏙️', label: '城市探索' },
    ocean: { emoji: '🌊', label: '海洋冒险' },
    space: { emoji: '🚀', label: '太空之旅' },
  };

  const badge = badges[theme];

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
      <span className="text-2xl">{badge.emoji}</span>
      <span className="font-bold text-gray-700">{badge.label}</span>
    </div>
  );
};
