import type { ActionItem } from '../../../types';
import { Badge } from '../../common/Badge';
import { formatDate } from '../../../utils/formatters';
import { useDataContext } from '../../../context';
import { useMeeting } from '../../../hooks/useMeeting';

interface ActionItemRowProps {
  item: ActionItem;
}

export function ActionItemRow({ item }: ActionItemRowProps) {
  const { toggleActionItem } = useDataContext();
  const { openMeetingById } = useMeeting();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
      }}
      onClick={() => openMeetingById(item.meetingId)}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={(e) => {
          e.stopPropagation();
          toggleActionItem(item.id, item.completed);
        }}
        style={{ marginTop: 3, accentColor: 'var(--accent-primary)', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)',
            textDecoration: item.completed ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
          Due {formatDate(item.dueDate)}
        </div>
      </div>
      <Badge label={item.priority} variant={item.priority} />
    </div>
  );
}
