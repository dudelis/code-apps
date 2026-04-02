import type { Meeting } from '../../types';
import { useMeeting } from '../../hooks/useMeeting';
import { formatTimeRange } from '../../utils/formatters';
import { PHASE_LABELS } from '../../utils/formatters';

interface BriefingCardProps {
  meeting: Meeting;
}

export function BriefingCard({ meeting }: BriefingCardProps) {
  const { openMeeting } = useMeeting();

  return (
    <div
      onClick={() => openMeeting(meeting)}
      style={{
        flex: '0 0 220px',
        background: `linear-gradient(135deg, ${meeting.color}22, var(--bg-elevated))`,
        border: `1px solid ${meeting.color}44`,
        borderRadius: 'var(--radius-md)',
        padding: 18,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${meeting.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
        🏢
      </div>
      <div style={{ fontWeight: 700, fontSize: 14 }}>{meeting.company}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{meeting.title}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        {formatTimeRange(meeting.startTime, meeting.endTime)}
      </div>
      <div style={{ fontSize: 11, padding: '2px 8px', background: `${meeting.color}22`, color: meeting.color, borderRadius: 4, fontWeight: 600, alignSelf: 'flex-start' }}>
        {PHASE_LABELS[meeting.phase]}
      </div>
    </div>
  );
}
