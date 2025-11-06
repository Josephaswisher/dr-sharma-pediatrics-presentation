# 🎨 Dr. Sharma Pediatrics - Complete Design System

**Version**: 1.0.0
**Date**: November 6, 2025
**Design Philosophy**: Fluid Glassmorphism + Organic Animations + Depth Layering

---

## 📐 Core Design Principles

### Visual Language
- **Glassmorphism**: Frosted glass effects with backdrop blur for depth and elegance
- **Soft Shadows**: Multi-layer shadows create floating, elevated components
- **Gradient Accents**: Subtle gradients on interactive elements for visual interest
- **Spring Physics**: Natural, bouncy animations using Framer Motion
- **Breathing Effects**: Slow pulsing/scaling animations for life and movement
- **Particle Systems**: Trailing particles, sparkles, and floating elements

### Design Goals
1. **Fluid**: Everything moves smoothly with natural physics
2. **Artistic**: Beautiful, memorable, delightful to interact with
3. **Depth**: Layered components with clear visual hierarchy
4. **Responsive**: Perfect on mobile, tablet, and desktop
5. **Accessible**: WCAG 2.1 AA compliant contrast and keyboard navigation

---

## 🎨 Color System

### Brand Colors
```css
/* Primary Colors */
--inova-blue: #3B82F6;        /* Primary actions, focus states */
--inova-teal: #14B8A6;        /* Accent, secondary actions */
--inova-purple: #A78BFA;      /* Special elements, butterfly wings */

/* Semantic Colors */
--success: #10B981;           /* Success states, confirmations */
--warning: #F59E0B;           /* Warnings, caution */
--error: #EF4444;             /* Errors, destructive actions */
--info: #3B82F6;              /* Information, hints */
```

### Glass Backgrounds

#### Light Mode
```css
/* Base glass effect */
--glass-bg-light: rgba(255, 255, 255, 0.1);
--glass-bg-light-hover: rgba(255, 255, 255, 0.15);
--glass-bg-light-active: rgba(255, 255, 255, 0.2);

/* Glass borders */
--glass-border-light: rgba(255, 255, 255, 0.2);
--glass-border-light-strong: rgba(255, 255, 255, 0.3);

/* Overlay backdrop */
--overlay-bg-light: rgba(0, 0, 0, 0.3);
```

#### Dark Mode
```css
/* Base glass effect */
--glass-bg-dark: rgba(17, 24, 39, 0.7);
--glass-bg-dark-hover: rgba(17, 24, 39, 0.8);
--glass-bg-dark-active: rgba(17, 24, 39, 0.9);

/* Glass borders */
--glass-border-dark: rgba(255, 255, 255, 0.1);
--glass-border-dark-strong: rgba(255, 255, 255, 0.15);

/* Overlay backdrop */
--overlay-bg-dark: rgba(0, 0, 0, 0.5);
```

### Gradient Definitions

```css
/* Interactive gradients */
--gradient-blue-teal: linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%);
--gradient-purple-blue: linear-gradient(135deg, #A78BFA 0%, #3B82F6 100%);
--gradient-teal-purple: linear-gradient(135deg, #14B8A6 0%, #A78BFA 100%);

/* Animated shimmer gradient (for progress bars) */
--gradient-shimmer: linear-gradient(
  90deg,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 255, 255, 0.3) 50%,
  rgba(255, 255, 255, 0) 100%
);
```

---

## 🔤 Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;
```

### Type Scale
```css
--font-size-xs: 0.75rem;     /* 12px - Small labels */
--font-size-sm: 0.875rem;    /* 14px - Body small */
--font-size-base: 1rem;      /* 16px - Body text */
--font-size-lg: 1.125rem;    /* 18px - Large body */
--font-size-xl: 1.25rem;     /* 20px - Small headings */
--font-size-2xl: 1.5rem;     /* 24px - Headings */
--font-size-3xl: 1.875rem;   /* 30px - Large headings */
--font-size-4xl: 2.25rem;    /* 36px - Hero text */
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.25;   /* Headings */
--line-height-normal: 1.5;   /* Body text */
--line-height-relaxed: 1.75; /* Large body text */
```

---

## 🌊 Glassmorphism Specifications

### Component-Specific Blur Values

#### Navigation Bar
```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.1);  /* Light mode */
background: rgba(17, 24, 39, 0.7);     /* Dark mode */
border: 1px solid rgba(255, 255, 255, 0.2);
```

#### Progress Tracker Bar
```css
backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.15); /* Light mode */
background: rgba(17, 24, 39, 0.8);     /* Dark mode */
border-top: 1px solid rgba(255, 255, 255, 0.2);
```

#### Notes Panel
```css
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.12); /* Light mode */
background: rgba(17, 24, 39, 0.75);    /* Dark mode */
border-left: 1px solid rgba(255, 255, 255, 0.2);
```

#### Slide Card
```css
backdrop-filter: blur(8px);
background: rgba(255, 255, 255, 0.08); /* Light mode */
background: rgba(17, 24, 39, 0.6);     /* Dark mode */
border: 1px solid rgba(255, 255, 255, 0.15);
```

#### Category Pills
```css
backdrop-filter: blur(6px);
background: rgba(59, 130, 246, 0.1);   /* Blue category */
background: rgba(20, 184, 166, 0.1);   /* Teal category */
background: rgba(167, 139, 250, 0.1);  /* Purple category */
border: 1px solid rgba(255, 255, 255, 0.2);
```

---

## ✨ Shadow System

### Shadow Tokens

```css
/* Subtle elevation (buttons, pills) */
--shadow-sm:
  0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium elevation (cards, panels) */
--shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* High elevation (navigation, modals) */
--shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Dramatic elevation (floating elements) */
--shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Extreme elevation (hero elements) */
--shadow-2xl:
  0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Glow Effects (Interactive States)

```css
/* Blue glow (primary actions) */
--glow-blue:
  0 0 20px rgba(59, 130, 246, 0.4),
  0 0 40px rgba(59, 130, 246, 0.2);

/* Teal glow (accent actions) */
--glow-teal:
  0 0 20px rgba(20, 184, 166, 0.4),
  0 0 40px rgba(20, 184, 166, 0.2);

/* Purple glow (special elements) */
--glow-purple:
  0 0 20px rgba(167, 139, 250, 0.4),
  0 0 40px rgba(167, 139, 250, 0.2);
```

---

## 🎭 Animation Specifications

### Framer Motion Spring Parameters

#### Natural Bounce (Buttons, Pills)
```typescript
const naturalBounce = {
  type: "spring",
  stiffness: 400,
  damping: 25
};
```

#### Smooth Slide (Panels, Drawers)
```typescript
const smoothSlide = {
  type: "spring",
  stiffness: 300,
  damping: 30
};
```

#### Gentle Float (Cards, Modals)
```typescript
const gentleFloat = {
  type: "spring",
  stiffness: 200,
  damping: 20
};
```

#### Elastic Snap (Active States)
```typescript
const elasticSnap = {
  type: "spring",
  stiffness: 500,
  damping: 30
};
```

### Easing Functions

```css
/* Smooth entrance */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Natural movement */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Quick exit */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Anticipation */
--ease-anticipate: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Smooth deceleration */
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Duration Standards

```css
/* Micro interactions (hover, focus) */
--duration-fast: 150ms;

/* Standard interactions (buttons, toggles) */
--duration-normal: 250ms;

/* Content transitions (slides, panels) */
--duration-medium: 400ms;

/* Entrance animations (cards, modals) */
--duration-slow: 500ms;

/* Exit animations (quick dismissal) */
--duration-exit: 300ms;

/* Long animations (page transitions) */
--duration-long: 700ms;
```

### Stagger Delays

```typescript
// Content reveal (title → badge → content)
const contentStagger = {
  staggerChildren: 0.1,
  delayChildren: 0.2
};

// List items (navigation buttons)
const listStagger = {
  staggerChildren: 0.05,
  delayChildren: 0
};

// Particle systems (multiple elements)
const particleStagger = {
  staggerChildren: 0.02,
  delayChildren: 0
};
```

---

## 🎯 Component Interaction Patterns

### Hover States

#### Buttons & Interactive Elements
```typescript
// Scale up with glow
const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
  transition: { duration: 0.15 }
};
```

#### Cards
```typescript
// Subtle lift with shadow increase
const cardHover = {
  y: -4,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
  transition: { duration: 0.25 }
};
```

#### Pills (Category Tags)
```typescript
// Subtle scale with gradient shift
const pillHover = {
  scale: 1.03,
  background: "rgba(59, 130, 246, 0.15)",
  transition: { duration: 0.15 }
};
```

### Active States

#### Buttons
```typescript
// Press down effect
const buttonActive = {
  scale: 0.98,
  opacity: 0.9,
  transition: { duration: 0.1 }
};
```

#### Cards
```typescript
// Slight press with shadow reduction
const cardActive = {
  y: -2,
  scale: 0.99,
  transition: { duration: 0.1 }
};
```

### Focus States (Accessibility)

```css
/* Accessible focus ring (brand colors) */
--focus-ring:
  0 0 0 3px rgba(59, 130, 246, 0.3);

/* High contrast focus ring */
--focus-ring-contrast:
  0 0 0 2px #ffffff,
  0 0 0 4px #3B82F6;
```

```typescript
// Focus animation
const focusState = {
  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
  transition: { duration: 0.2 }
};
```

### Loading States

```typescript
// Pulsing animation
const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
```

```typescript
// Shimmer effect (progress bars)
const shimmerAnimation = {
  backgroundPosition: ["0% 50%", "100% 50%"],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }
};
```

---

## 📦 Component Specifications

### 1. Navigation Bar

#### Structure
```
┌─────────────────────────────────────────────────────┐
│ [Category Pills] [Category Pills]    [Dark Toggle]  │
└─────────────────────────────────────────────────────┘
```

#### Dimensions
- Height: `80px`
- Padding: `16px 32px`
- Gap between pills: `12px`

#### Glass Effect
```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.1);
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: var(--shadow-lg);
```

#### Category Pills
```css
/* Base state */
padding: 8px 20px;
border-radius: 24px;
font-size: 14px;
font-weight: 500;
backdrop-filter: blur(6px);

/* Active state */
background: linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%);
color: white;
box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
```

#### Dark Mode Toggle
```css
/* Base state */
width: 40px;
height: 40px;
border-radius: 50%;
backdrop-filter: blur(6px);
background: rgba(255, 255, 255, 0.1);

/* Hover state */
transform: scale(1.05);
box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
```

#### Animations
```typescript
// Entrance animation
const navEntrance = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// Category pill stagger
const pillStagger = {
  staggerChildren: 0.05,
  delayChildren: 0.2
};
```

---

### 2. Progress Tracker Bar

#### Structure
```
┌─────────────────────────────────────────────────────┐
│ [<] ████████████░░░░░░░░░░░░░░░░░░  [Slide 15/24] [>] │
└─────────────────────────────────────────────────────┘
```

#### Dimensions
- Height: `72px`
- Progress bar height: `6px`
- Button size: `48px` (circular)
- Padding: `16px 32px`

#### Glass Effect
```css
backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.15);
border-top: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: var(--shadow-xl);
```

#### Progress Bar
```css
/* Container */
height: 6px;
border-radius: 9999px;
background: rgba(255, 255, 255, 0.2);
overflow: hidden;

/* Fill */
height: 100%;
background: linear-gradient(90deg, #3B82F6 0%, #14B8A6 50%, #A78BFA 100%);
border-radius: 9999px;
box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
```

#### Shimmer Effect
```css
/* Overlay layer */
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: linear-gradient(
  90deg,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 255, 255, 0.4) 50%,
  rgba(255, 255, 255, 0) 100%
);
animation: shimmer 1.5s linear infinite;

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

#### Navigation Buttons
```css
/* Base state */
width: 48px;
height: 48px;
border-radius: 50%;
backdrop-filter: blur(8px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);

/* Hover state */
transform: scale(1.1);
background: rgba(59, 130, 246, 0.2);
box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
```

#### Slide Counter
```css
padding: 8px 16px;
border-radius: 24px;
backdrop-filter: blur(6px);
background: rgba(255, 255, 255, 0.1);
font-size: 14px;
font-weight: 600;
```

#### Animations
```typescript
// Progress bar animation
const progressAnimation = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Slide counter fade
const counterAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
```

#### Particle Trail System
```typescript
// Particle properties
const particle = {
  size: "4px",
  color: "#3B82F6",
  blur: "2px",
  lifetime: 1000, // ms
  spawnRate: 50 // ms between particles
};

// Particle animation
const particleMotion = {
  initial: {
    opacity: 1,
    scale: 1,
    y: 0
  },
  animate: {
    opacity: 0,
    scale: 0.5,
    y: -20,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};
```

---

### 3. Notes Panel

#### Structure
```
┌────────────────┐
│ [×]            │ ← Close button
│                │
│ Notes Header   │
│ ─────────────  │ ← Gradient divider
│                │
│ Note content   │
│ ...            │
│                │
│ ─────────────  │ ← Gradient divider
│                │
│ ⏱ 5 mins      │ ← Time badge
└────────────────┘
```

#### Dimensions
- Width: `400px` (desktop), `100%` (mobile)
- Padding: `32px`
- Close button: `40px`

#### Glass Effect
```css
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.12);
border-left: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: var(--shadow-2xl);
```

#### Close Button
```css
/* Base state */
width: 40px;
height: 40px;
border-radius: 50%;
backdrop-filter: blur(6px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);

/* Hover state */
transform: scale(1.1) rotate(90deg);
background: rgba(239, 68, 68, 0.2);
box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
```

#### Gradient Divider
```css
height: 1px;
background: linear-gradient(
  90deg,
  transparent 0%,
  rgba(59, 130, 246, 0.5) 50%,
  transparent 100%
);
margin: 24px 0;
```

#### Time Badge
```css
display: inline-flex;
align-items: center;
gap: 8px;
padding: 8px 16px;
border-radius: 24px;
backdrop-filter: blur(6px);
background: rgba(59, 130, 246, 0.1);
border: 1px solid rgba(59, 130, 246, 0.2);
font-size: 14px;
font-weight: 500;
```

#### Backdrop Overlay
```css
/* When panel is open */
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
backdrop-filter: blur(4px);
background: rgba(0, 0, 0, 0.3);
```

#### Animations
```typescript
// Panel slide-in
const panelSlide = {
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
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Backdrop fade
const backdropFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Time badge pulse
const badgePulse = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.9, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
```

---

### 4. Slide Card (Renderer)

#### Structure
```
┌─────────────────────────────────────┐
│ [Category Badge]                    │
│                                     │
│ Slide Title                         │
│ ───────────────────                 │
│                                     │
│ Content content content...          │
│ Content content content...          │
│                                     │
└─────────────────────────────────────┘
```

#### Dimensions
- Max width: `1200px`
- Padding: `64px` (desktop), `32px` (mobile)
- Border radius: `24px`

#### Glass Effect
```css
backdrop-filter: blur(8px);
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: var(--shadow-xl);
```

#### Category Badge
```css
/* Floating badge (absolute positioned) */
padding: 8px 20px;
border-radius: 24px;
backdrop-filter: blur(6px);
font-size: 13px;
font-weight: 600;
letter-spacing: 0.5px;
text-transform: uppercase;

/* Category-specific gradients */
/* Clinical Pearl */
background: linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%);

/* Diagnostic Approach */
background: linear-gradient(135deg, #14B8A6 0%, #A78BFA 100%);

/* Management */
background: linear-gradient(135deg, #A78BFA 0%, #3B82F6 100%);

/* Always add glow */
box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
```

#### Animations
```typescript
// Slide transition (AnimatePresence)
const slideTransition = {
  initial: {
    x: 100,
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  exit: {
    x: -100,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Content stagger reveal
const contentStagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const contentChild = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Parallax hover effect
const parallaxHover = {
  rotateX: 2,
  rotateY: -2,
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};
```

---

### 5. Butterfly Background

#### Particle System Enhancements

```typescript
// Butterfly properties
const butterfly = {
  size: "60px",
  colors: ["#3B82F6", "#14B8A6", "#A78BFA"],
  speed: 2, // seconds per flight segment
  interactionRadius: 100 // px
};

// Flight path animation
const flightPath = {
  x: [0, 100, 50, -50, 0],
  y: [0, -80, -120, -80, 0],
  rotate: [0, 15, -10, 20, 0],
  scale: [1, 1.1, 0.9, 1.05, 1],
  transition: {
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Interactive hover response
const interactiveResponse = {
  // When cursor within interactionRadius
  x: (cursorX) => (cursorX - butterflyX) * 0.3,
  y: (cursorY) => (cursorY - butterflyY) * 0.3,
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15
  }
};

// Color transition based on slide category
const colorTransition = {
  filter: "hue-rotate(0deg)", // Clinical Pearl (blue)
  // or
  filter: "hue-rotate(120deg)", // Diagnostic (teal)
  // or
  filter: "hue-rotate(240deg)", // Management (purple)
  transition: {
    duration: 1,
    ease: "easeInOut"
  }
};
```

#### Petal/Sparkle System
```typescript
// Sparkle particle
const sparkle = {
  size: "3px",
  color: "#ffffff",
  opacity: 0.8,
  lifetime: 2000, // ms
  spawnRate: 200 // ms between particles
};

// Sparkle animation
const sparkleMotion = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 0
  },
  animate: {
    opacity: [0, 0.8, 0],
    scale: [0, 1, 0.5],
    y: -100,
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
};
```

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile (portrait) */
@media (max-width: 640px) {
  /* Navigation: stack vertically */
  /* Notes panel: full screen overlay */
  /* Slide card: reduced padding (32px) */
  /* Progress bar: simplified layout */
}

/* Tablet (portrait) */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Navigation: wrap category pills */
  /* Notes panel: 80% width */
  /* Slide card: moderate padding (48px) */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Navigation: single row */
  /* Notes panel: fixed 400px width */
  /* Slide card: full padding (64px) */
}
```

---

## ♿ Accessibility Standards

### Focus Management
```css
/* Visible focus indicators */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order must be logical (top to bottom, left to right)
- Escape key closes panels and modals
- Arrow keys navigate slides
- Enter/Space activates buttons

### Color Contrast (WCAG 2.1 AA)
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Screen Reader Support
```jsx
// Example: Category badge
<span
  aria-label="Category: Clinical Pearl"
  role="status"
>
  Clinical Pearl
</span>

// Example: Progress tracker
<nav aria-label="Slide navigation">
  <button aria-label="Previous slide">←</button>
  <div aria-label="Slide 15 of 24" role="status">15/24</div>
  <button aria-label="Next slide">→</button>
</nav>
```

---

## 🚀 Performance Optimization

### Animation Performance
```css
/* Use GPU-accelerated properties only */
✅ transform (translateX, scale, rotate)
✅ opacity
❌ width, height, top, left (causes reflow)
```

```css
/* Enable hardware acceleration */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

### Lazy Loading
```typescript
// Load heavy animations only when visible
const { ref, inView } = useInView({
  threshold: 0.1,
  triggerOnce: true
});

return (
  <motion.div
    ref={ref}
    animate={inView ? "visible" : "hidden"}
  >
    {/* Content */}
  </motion.div>
);
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// Respect user preference
const shouldReduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animation = shouldReduceMotion
  ? { duration: 0 }
  : { type: "spring", stiffness: 300, damping: 30 };
```

---

## 🎨 Tailwind CSS Custom Utilities

### Glass Utilities
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Add to utilities
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-hover': {
          background: 'rgba(255, 255, 255, 0.15)',
        },
        '.glass-dark-hover': {
          background: 'rgba(17, 24, 39, 0.8)',
        },
        '.glass-strong': {
          backdropFilter: 'blur(20px)',
        },
        '.glass-subtle': {
          backdropFilter: 'blur(6px)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'dark'])
    }
  ]
}
```

### Shadow Utilities
```javascript
// Add to theme.extend.boxShadow
boxShadow: {
  'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
  'glow-teal': '0 0 20px rgba(20, 184, 166, 0.4), 0 0 40px rgba(20, 184, 166, 0.2)',
  'glow-purple': '0 0 20px rgba(167, 139, 250, 0.4), 0 0 40px rgba(167, 139, 250, 0.2)',
}
```

---

## 📖 Shared Animation Variants Library

Create file: `src/utils/animations.ts`

```typescript
// Fade & Scale
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

// Slide Transitions
export const slideInRight = {
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
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const slideInLeft = {
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
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// Stagger Containers
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Hover Effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.15 }
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
  transition: { duration: 0.15 }
};

// Active States
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Loading States
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Add glassmorphism utilities to `tailwind.config.js`
- [ ] Create shared animation variants library (`src/utils/animations.ts`)
- [ ] Set up Framer Motion dependencies
- [ ] Configure responsive breakpoints

### Phase 2: Component Redesign
- [ ] Navigation component with glassmorphism
- [ ] Progress tracker with particle system
- [ ] Notes panel with spring animations
- [ ] Slide renderer with transitions
- [ ] Butterfly background enhancements

### Phase 3: Testing
- [ ] Test all animations at 60fps
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Test dark mode consistency
- [ ] Accessibility audit (keyboard nav, screen readers, contrast)
- [ ] Reduced motion support

### Phase 4: Polish
- [ ] Performance optimization
- [ ] Bundle size check
- [ ] Final visual review
- [ ] User testing

---

## 📊 Success Metrics

### Performance
- [ ] All animations run at 60fps (no jank)
- [ ] Time to Interactive < 2s
- [ ] Lighthouse Performance Score > 90

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation 100% functional
- [ ] Screen reader tested (NVDA/JAWS)

### Visual Quality
- [ ] Glassmorphism consistent across all components
- [ ] Animations feel natural (spring physics)
- [ ] Dark mode cohesive and beautiful
- [ ] User feedback: "wow factor" achieved

---

**Design System Complete** ✅

This document provides pixel-perfect specifications for all components. Proceed to Phase 2 with Builder Agents implementing each component based on these specifications.
