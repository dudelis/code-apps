import type { CSSProperties } from 'react';

type BadgeVariant = 'high' | 'medium' | 'low' | 'champion' | 'neutral' | 'skeptic' | 'default';

const VARIANT_STYLES: Record<BadgeVariant, CSSProperties> = {
  high: { background: 'rgba(239,68,68,0.15)', color: 'var(--accent-red)', border: '1px solid rgba(239,68,68,0.3)' },
  medium: { background: 'rgba(245,158,11,0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.3)' },
  low: { background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)', border: '1px solid rgba(16,185,129,0.3)' },
  champion: { background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)', border: '1px solid rgba(16,185,129,0.3)' },
  neutral: { background: 'rgba(148,163,184,0.15)', color: 'var(--text-secondary)', border: '1px solid rgba(148,163,184,0.3)' },
  skeptic: { background: 'rgba(239,68,68,0.15)', color: 'var(--accent-red)', border: '1px solid rgba(239,68,68,0.3)' },
  default: { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      style={{
        ...VARIANT_STYLES[variant],
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'capitalize',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
