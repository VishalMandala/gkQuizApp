/**
 * Global Quest - Design System
 * Core design tokens and theme configuration
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary palette
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',  // Main primary - Indigo
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Secondary (Achievement/Warmth)
  secondary: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',  // Main secondary - Amber
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Success (Correct answers, growth)
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',  // Main success - Emerald
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Error (Gentle, not harsh)
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',  // Main error - Red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Backgrounds (Dark theme)
  background: {
    primary: '#0F172A',    // Slate 900 - Main background
    secondary: '#1E293B',  // Slate 800 - Cards, surfaces
    tertiary: '#334155',   // Slate 700 - Elevated elements
    elevated: '#475569',   // Slate 600 - Highest elevation
  },

  // Text
  text: {
    primary: '#F8FAFC',    // Slate 50
    secondary: '#CBD5E1',  // Slate 300
    tertiary: '#94A3B8',   // Slate 400
    muted: '#64748B',      // Slate 500
  },

  // Borders
  border: {
    subtle: '#1E293B',
    default: '#334155',
    prominent: '#475569',
  },

  // Continent colors (unique identity per continent)
  continents: {
    asia: '#F472B6',          // Pink
    africa: '#FBBF24',        // Amber
    europe: '#60A5FA',        // Blue
    northAmerica: '#34D399',  // Emerald
    southAmerica: '#A78BFA',  // Purple
    australia: '#FB923C',     // Orange
    antarctica: '#67E8F9',    // Cyan
  },

  // Special
  streak: {
    fire: '#FF6B35',
    glow: '#FFD700',
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    display: 'Outfit',  // Headlines, numbers, big text
    body: 'Inter',      // Body text, UI elements
    mono: 'JetBrains Mono',  // Code, stats
  },

  // Font sizes (in pixels, converted to rem in usage)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

// ============================================================================
// BORDERS & RADIUS
// ============================================================================

export const borders = {
  radius: {
    none: 0,
    sm: 4,
    default: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  width: {
    none: 0,
    thin: 1,
    default: 2,
    thick: 3,
  },
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 12,
  },
  // Glow effects for active/selected states
  glow: {
    primary: {
      shadowColor: colors.primary[500],
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 10,
    },
    success: {
      shadowColor: colors.success[500],
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 10,
    },
    streak: {
      shadowColor: colors.streak.fire,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 12,
    },
  },
} as const;

// ============================================================================
// ANIMATION
// ============================================================================

export const animation = {
  // Durations (in ms)
  duration: {
    instant: 50,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },

  // Easing curves
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom spring-like curves for React Native Reanimated
    spring: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    bouncy: {
      damping: 10,
      stiffness: 200,
      mass: 0.8,
    },
  },
} as const;

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const componentSizes = {
  // Button heights
  button: {
    sm: 36,
    md: 44,
    lg: 52,
    xl: 60,
  },

  // Input heights
  input: {
    sm: 40,
    md: 48,
    lg: 56,
  },

  // Icon sizes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },

  // Avatar sizes
  avatar: {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  },

  // Card min heights
  card: {
    sm: 80,
    md: 120,
    lg: 180,
  },
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  splash: 100,
} as const;

// ============================================================================
// BREAKPOINTS (for responsive design)
// ============================================================================

export const breakpoints = {
  // Width breakpoints
  sm: 375,   // Small phones
  md: 414,   // Large phones
  lg: 768,   // Tablets
  xl: 1024,  // Large tablets / small laptops
} as const;

// ============================================================================
// THEME OBJECT (Combined)
// ============================================================================

export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  animation,
  componentSizes,
  zIndex,
  breakpoints,
} as const;

export type Theme = typeof theme;
export default theme;
