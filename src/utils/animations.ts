/**
 * Reusable Animation Variants for Framer Motion
 *
 * Design Philosophy: Fluid, organic animations with spring physics
 * Usage: Import and apply to motion components
 */

import { Variants } from 'framer-motion';

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

/**
 * Fade in from bottom with upward movement
 * Perfect for: Cards, modals, content sections
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 }
  }
};

/**
 * Fade in from top with downward movement
 * Perfect for: Navigation bars, headers, dropdown menus
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

/**
 * Scale in with fade (zoom effect)
 * Perfect for: Buttons, badges, interactive elements
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

/**
 * Scale in from zero (pop effect)
 * Perfect for: Notifications, tooltips, floating elements
 */
export const popIn: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2 }
  }
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

/**
 * Slide in from right with spring physics
 * Perfect for: Side panels, drawers, navigation slides
 */
export const slideInRight: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Slide in from left with spring physics
 * Perfect for: Side panels, navigation menus, left drawers
 */
export const slideInLeft: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// ============================================
// PAGE TRANSITION ANIMATIONS
// ============================================

/**
 * Cinematic slide transition (current slides left, next enters from right)
 * Perfect for: Slide presentations, multi-step forms, carousels
 */
export const slideTransition: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  })
};

/**
 * Cross-fade between content
 * Perfect for: Image galleries, content switching, tab panels
 */
export const crossFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// ============================================
// INTERACTIVE ANIMATIONS
// ============================================

/**
 * Hover scale with smooth spring
 * Perfect for: Buttons, cards, interactive elements
 */
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  },
  tap: {
    scale: 0.95
  }
};

/**
 * Float animation (gentle up/down oscillation)
 * Perfect for: Decorative elements, floating buttons, attention grabbers
 */
export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * Pulse animation (gentle scale breathing effect)
 * Perfect for: Progress indicators, active states, breathing badges
 */
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

/**
 * Container for staggered children animations
 * Perfect for: Lists, grids, sequential content reveals
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Child items for staggered animations
 * Use with staggerContainer parent
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

// ============================================
// GLASSMORPHISM ANIMATIONS
// ============================================

/**
 * Glassmorphic reveal (fade + blur transition)
 * Perfect for: Glassmorphic panels, modals, overlays
 */
export const glassReveal: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: "blur(0px)"
  },
  animate: {
    opacity: 1,
    backdropFilter: "blur(10px)",
    transition: {
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create custom delay for sequential animations
 */
export const withDelay = (delay: number, variants: Variants): Variants => {
  return {
    ...variants,
    animate: {
      ...variants.animate,
      transition: {
        ...(variants.animate as any).transition,
        delay
      }
    }
  };
};

/**
 * Combine multiple animation variants
 */
export const combineVariants = (...variantsArray: Variants[]): Variants => {
  return variantsArray.reduce((acc, curr) => ({
    ...acc,
    ...curr,
    animate: {
      ...acc.animate,
      ...curr.animate
    }
  }), {});
};

// ============================================
// PRESET COMBINATIONS
// ============================================

/**
 * Hero section entrance (fade + scale + float)
 * Perfect for: Hero sections, main content areas
 */
export const heroEntrance: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.2
    }
  }
};

/**
 * Card grid item animation
 * Perfect for: Grid layouts, card collections
 */
export const gridItem: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};
