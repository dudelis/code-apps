import { useDataContext } from '../../context';
import type { HighlightType } from '../../types';

const TYPE_ICONS: Record<HighlightType, string> = {
  risk: '⚠️',
  opportunity: '🚀',
  action: '✅',
  insight: '💡',
};

export function UpcomingHighlights() {
  const { state } = useDataContext();
  const top3 = [...state.highlights].sort((a, b) => a.priority - b.priority).slice(0, 3);

  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Upcoming Highlights</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {top3.map((h) => (
          <div key={h.id} style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{TYPE_ICONS[h.type]}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{h.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{h.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
