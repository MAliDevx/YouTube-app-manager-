import React from 'react';
import { cn } from '../../lib/utils';

// ─── Inject styles once ───────────────────────────────────────────────────────
const CARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .card-root {
    --card-bg: #fdfcfa;
    --card-border: rgba(180, 160, 130, 0.25);
    --card-shadow-base: 0 1px 3px rgba(100, 80, 50, 0.06), 0 4px 16px rgba(100, 80, 50, 0.08);
    --card-shadow-hover: 0 8px 32px rgba(100, 80, 50, 0.14), 0 2px 8px rgba(100, 80, 50, 0.08);
    --card-accent: #b5813a;
    --card-text-primary: #1c1713;
    --card-text-secondary: #7a6a55;
    --card-radius: 16px;
    --card-transition: 0.3s cubic-bezier(0.22, 1, 0.36, 1);

    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow-base);
    transition:
      transform var(--card-transition),
      box-shadow var(--card-transition),
      border-color var(--card-transition);
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* Subtle grain texture */
  .card-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    pointer-events: none;
    z-index: 0;
    border-radius: inherit;
  }

  /* Accent line on left edge */
  .card-root::after {
    content: '';
    position: absolute;
    top: 20%;
    bottom: 20%;
    left: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent, var(--card-accent), transparent);
    opacity: 0;
    transition: opacity var(--card-transition);
    border-radius: 0 2px 2px 0;
  }

  .card-root:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
    border-color: rgba(181, 129, 58, 0.3);
  }

  .card-root:hover::after {
    opacity: 1;
  }

  /* ── Header ── */
  .card-header {
    position: relative;
    z-index: 1;
    padding: clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px) 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* ── Title ── */
  .card-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--card-text-primary);
    margin: 0;
  }

  /* ── Description ── */
  .card-description {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.8rem, 1.5vw, 0.875rem);
    font-weight: 300;
    line-height: 1.6;
    color: var(--card-text-secondary);
    letter-spacing: 0.01em;
    margin: 0;
  }

  /* ── Content ── */
  .card-content {
    position: relative;
    z-index: 1;
    padding: clamp(16px, 3vw, 20px) clamp(20px, 4vw, 28px);
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.85rem, 1.5vw, 0.9375rem);
    color: var(--card-text-primary);
    line-height: 1.65;
  }

  /* ── Footer ── */
  .card-footer {
    position: relative;
    z-index: 1;
    padding: clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 28px) clamp(20px, 4vw, 28px);
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 1px solid rgba(180, 160, 130, 0.15);
  }

  /* ── Divider inside header ── */
  .card-header-divider {
    width: 32px;
    height: 1.5px;
    background: linear-gradient(to right, var(--card-accent), transparent);
    margin-top: 4px;
    border-radius: 2px;
  }

  /* Dark theme variant */
  .card-root.card-dark {
    --card-bg: #141210;
    --card-border: rgba(181, 129, 58, 0.2);
    --card-shadow-base: 0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.25);
    --card-shadow-hover: 0 8px 32px rgba(181, 129, 58, 0.15), 0 2px 8px rgba(0,0,0,0.3);
    --card-text-primary: #f0ebe3;
    --card-text-secondary: #9a8a73;
  }

  .card-root.card-dark::before {
    opacity: 0.04;
  }

  /* Highlight/featured variant */
  .card-root.card-featured {
    --card-border: rgba(181, 129, 58, 0.45);
    background: linear-gradient(145deg, #fdfcfa 0%, #fdf8f0 100%);
  }
`;

function injectCardStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('card-component-styles')) return;
  const style = document.createElement('style');
  style.id = 'card-component-styles';
  style.textContent = CARD_STYLES;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'featured';
}

// ─── Card ─────────────────────────────────────────────────────────────────────
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    injectCardStyles();
    return (
      <div
        ref={ref}
        className={cn(
          'card-root',
          variant === 'dark' && 'card-dark',
          variant === 'featured' && 'card-featured',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// ─── CardHeader ───────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('card-header', className)} {...props}>
      {children}
      <div className="card-header-divider" aria-hidden="true" />
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

// ─── CardTitle ────────────────────────────────────────────────────────────────
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('card-title', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

// ─── CardDescription ──────────────────────────────────────────────────────────
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('card-description', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

// ─── CardContent ──────────────────────────────────────────────────────────────
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('card-content', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// ─── CardFooter ───────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('card-footer', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };