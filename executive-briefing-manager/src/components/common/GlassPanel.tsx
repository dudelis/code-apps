import type { ReactNode, CSSProperties } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export function GlassPanel({ children, className = '', elevated = false, style, onClick }: GlassPanelProps) {
  const base = elevated ? 'glass-elevated' : 'glass';
  return (
    <div
      className={`${base} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
