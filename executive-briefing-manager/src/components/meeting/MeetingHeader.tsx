import type { Meeting } from '../../types';
import { AvatarGroup } from '../common/AvatarGroup';
import { useMeetingParticipants } from '../../hooks/useMeetingParticipants';
import { formatTimeRange } from '../../utils/formatters';

interface MeetingHeaderProps {
  meeting: Meeting;
  onAvatarClick: (contactId: string) => void;
}

export function MeetingHeader({ meeting, onAvatarClick }: MeetingHeaderProps) {
  const participants = useMeetingParticipants(meeting);

  return (
    <div
      style={{
        padding: '32px 40px 24px',
        background: `linear-gradient(135deg, ${meeting.color}33 0%, transparent 70%), var(--bg-surface)`,
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: meeting.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            {meeting.industry}
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>{meeting.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {meeting.company} · {formatTimeRange(meeting.startTime, meeting.endTime)}
          </div>
        </div>
        <AvatarGroup contacts={participants} onAvatarClick={onAvatarClick} size={40} />
      </div>
    </div>
  );
}
