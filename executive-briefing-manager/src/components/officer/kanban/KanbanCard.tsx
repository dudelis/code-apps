import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Meeting } from '../../../types';
import { Avatar } from '../../common/Avatar';
import { Badge } from '../../common/Badge';
import { useMeeting } from '../../../hooks/useMeeting';
import { useDataContext } from '../../../context';

interface KanbanCardProps {
  meeting: Meeting;
}

export function KanbanCard({ meeting }: KanbanCardProps) {
  const { openMeeting } = useMeeting();
  const { state } = useDataContext();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: meeting.id });

  const firstContact = state.contacts.find((c) => c.id === meeting.participantIds[0]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
      onClick={() => openMeeting(meeting)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{meeting.company}</div>
        {firstContact && (
          <Avatar initials={firstContact.avatarInitials} color={firstContact.avatarColor} size={24} />
        )}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{meeting.title}</div>
      <Badge label={meeting.phase} variant="default" />
    </div>
  );
}
