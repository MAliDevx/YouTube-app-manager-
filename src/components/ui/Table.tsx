import React from 'react';
import { cn } from '../../lib/utils';

// ─── Styles ───────────────────────────────────────────────────────────────────
const TABLE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  .tbl-wrap {
    --v: #4F39F6;
    --v-light: #ede9fe;
    --v-mid: #7c6af8;
    --v-dark: #3120d4;
    --v-glow: rgba(79, 57, 246, 0.18);
    --v-row-hover: rgba(79, 57, 246, 0.045);
    --v-selected: rgba(79, 57, 246, 0.09);
    --ink: #0e0c1a;
    --ink-muted: #6b6880;
    --border: rgba(79, 57, 246, 0.14);
    --bg: #ffffff;
    --head-bg: #f7f6ff;
    --foot-bg: #f0eeff;
    --radius: 14px;
    --font-body: 'Syne', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;

    position: relative;
    width: 100%;
    overflow-x: auto;
    border-radius: var(--radius);
    border: 1.5px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(79, 57, 246, 0.06),
      0 4px 24px rgba(79, 57, 246, 0.1),
      0 1px 4px rgba(14, 12, 26, 0.05);
    background: var(--bg);
    font-family: var(--font-body);

    /* Scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: var(--v-light) transparent;
  }

  .tbl-wrap::-webkit-scrollbar {
    height: 5px;
  }
  .tbl-wrap::-webkit-scrollbar-track {
    background: transparent;
  }
  .tbl-wrap::-webkit-scrollbar-thumb {
    background: var(--v-light);
    border-radius: 99px;
  }

  /* Top accent bar */
  .tbl-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--v-dark) 0%, var(--v) 40%, var(--v-mid) 70%, #a78bfa 100%);
    border-radius: var(--radius) var(--radius) 0 0;
    z-index: 2;
  }

  /* ── Table base ── */
  .tbl-root {
    width: 100%;
    border-collapse: collapse;
    caption-side: bottom;
    font-size: clamp(0.8rem, 1.3vw, 0.875rem);
    color: var(--ink);
  }

  /* ── Header section ── */
  .tbl-header {
    background: var(--head-bg);
    position: relative;
  }

  .tbl-header tr {
    border-bottom: 1.5px solid var(--border);
  }

  /* ── Body ── */
  .tbl-body tr:last-child {
    border-bottom: none;
  }

  /* ── Footer ── */
  .tbl-footer {
    background: var(--foot-bg);
    border-top: 1.5px solid var(--border);
    font-weight: 500;
  }

  .tbl-footer > tr:last-child {
    border-bottom: none;
  }

  /* ── Row ── */
  .tbl-row {
    border-bottom: 1px solid rgba(79, 57, 246, 0.08);
    transition: background 0.15s ease;
  }

  .tbl-row:hover {
    background: var(--v-row-hover);
  }

  .tbl-row[data-state="selected"] {
    background: var(--v-selected);
  }

  /* ── Head cell ── */
  .tbl-head {
    height: 48px;
    padding: 0 16px;
    text-align: left;
    vertical-align: middle;
    font-family: var(--font-body);
    font-size: clamp(0.7rem, 1.2vw, 0.78rem);
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--v);
    white-space: nowrap;
  }

  .tbl-head:has([role=checkbox]) {
    padding-right: 0;
  }

  /* Column index indicator on first th */
  .tbl-head:first-child {
    padding-left: 20px;
  }

  /* ── Body cell ── */
  .tbl-cell {
    padding: 14px 16px;
    vertical-align: middle;
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
  }

  .tbl-cell:first-child {
    padding-left: 20px;
    font-weight: 500;
  }

  .tbl-cell:has([role=checkbox]) {
    padding-right: 0;
  }

  /* Mono variant for numeric/code cells */
  .tbl-cell-mono {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--v-dark);
  }

  /* ── Badge inside cells ── */
  .tbl-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: 99px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    background: var(--v-light);
    color: var(--v-dark);
    border: 1px solid rgba(79, 57, 246, 0.2);
  }

  /* ── Stripe variant ── */
  .tbl-wrap.tbl-striped .tbl-body .tbl-row:nth-child(even) {
    background: rgba(79, 57, 246, 0.025);
  }

  /* ── Compact variant ── */
  .tbl-wrap.tbl-compact .tbl-head {
    height: 36px;
    padding: 0 12px;
  }

  .tbl-wrap.tbl-compact .tbl-cell {
    padding: 10px 12px;
  }

  /* ── Dark variant ── */
  .tbl-wrap.tbl-dark {
    --bg: #0d0b1a;
    --head-bg: #120f24;
    --foot-bg: #120f24;
    --ink: #e8e4ff;
    --ink-muted: #8b85b0;
    --border: rgba(79, 57, 246, 0.28);
    --v-row-hover: rgba(79, 57, 246, 0.1);
    --v-selected: rgba(79, 57, 246, 0.2);
    --v-light: rgba(79, 57, 246, 0.2);
    box-shadow:
      0 0 0 1px rgba(79, 57, 246, 0.15),
      0 4px 32px rgba(79, 57, 246, 0.25),
      0 1px 4px rgba(0,0,0,0.4);
  }

  .tbl-wrap.tbl-dark .tbl-badge {
    background: rgba(79, 57, 246, 0.25);
    color: #c4baff;
    border-color: rgba(79, 57, 246, 0.35);
  }

  .tbl-wrap.tbl-dark .tbl-cell-mono {
    color: #a78bfa;
  }

  /* ── Animate rows in ── */
  @keyframes tbl-row-in {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .tbl-body .tbl-row {
    animation: tbl-row-in 0.22s ease both;
  }

  .tbl-body .tbl-row:nth-child(1)  { animation-delay: 0.03s; }
  .tbl-body .tbl-row:nth-child(2)  { animation-delay: 0.07s; }
  .tbl-body .tbl-row:nth-child(3)  { animation-delay: 0.11s; }
  .tbl-body .tbl-row:nth-child(4)  { animation-delay: 0.15s; }
  .tbl-body .tbl-row:nth-child(5)  { animation-delay: 0.19s; }
  .tbl-body .tbl-row:nth-child(n+6) { animation-delay: 0.22s; }
`;

function injectTableStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('table-component-styles')) return;
  const style = document.createElement('style');
  style.id = 'table-component-styles';
  style.textContent = TABLE_STYLES;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface TableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark';
  striped?: boolean;
  compact?: boolean;
}

// ─── Table ────────────────────────────────────────────────────────────────────
const Table = React.forwardRef<HTMLTableElement, TableWrapperProps>(
  ({ className, variant = 'default', striped = false, compact = false, ...props }, ref) => {
    injectTableStyles();
    // Separate div props from table props
    const { children, ...tableProps } = props;
    return (
      <div
        className={cn(
          'tbl-wrap',
          variant === 'dark' && 'tbl-dark',
          striped && 'tbl-striped',
          compact && 'tbl-compact',
          className
        )}
      >
        <table ref={ref} className="tbl-root" {...tableProps}>
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = 'Table';

// ─── TableHeader ──────────────────────────────────────────────────────────────
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('tbl-header', className)} {...props} />
  )
);
TableHeader.displayName = 'TableHeader';

// ─── TableBody ────────────────────────────────────────────────────────────────
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('tbl-body', className)} {...props} />
  )
);
TableBody.displayName = 'TableBody';

// ─── TableFooter ──────────────────────────────────────────────────────────────
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('tbl-footer', className)} {...props} />
  )
);
TableFooter.displayName = 'TableFooter';

// ─── TableRow ─────────────────────────────────────────────────────────────────
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('tbl-row', className)} {...props} />
  )
);
TableRow.displayName = 'TableRow';

// ─── TableHead ────────────────────────────────────────────────────────────────
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn('tbl-head', className)} {...props} />
  )
);
TableHead.displayName = 'TableHead';

// ─── TableCell ────────────────────────────────────────────────────────────────
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('tbl-cell', className)} {...props} />
  )
);
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };