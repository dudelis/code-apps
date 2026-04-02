import type { ActionItem } from '../../../types';
import { formatDate } from '../../../utils/formatters';
import { PRIORITY_COLORS } from '../../../utils/formatters';

interface CalendarTaskBlockProps {
  item: ActionItem;
}

export function CalendarTaskBlock({ item }: CalendarTaskBlockProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 8px',
        background: 'rgba(148,163,184,0.08)',
        border: '1px solid rgba(148,163,184,0.15)',
        borderRadius: 6,
        marginBottom: 4,
        opacity: item.completed ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: PRIORITY_COLORS[item.priority],
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.title}
      </span>
      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{formatDate(item.dueDate)}</span>
    </div>
  );
}
