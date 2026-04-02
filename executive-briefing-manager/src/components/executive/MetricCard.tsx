import type { Metric } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TREND_ICONS = {
  up: <TrendingUp size={13} color="var(--accent-green)" />,
  down: <TrendingDown size={13} color="var(--accent-red)" />,
  flat: <Minus size={13} color="var(--text-muted)" />,
};

const TREND_COLORS = {
  up: 'var(--accent-green)',
  down: 'var(--accent-red)',
  flat: 'var(--text-muted)',
};

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div
      style={{
        flex: '1 1 140px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        {metric.label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{metric.value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: TREND_COLORS[metric.trend] }}>
        {TREND_ICONS[metric.trend]}
        {metric.trendValue}
      </div>
    </div>
  );
}
