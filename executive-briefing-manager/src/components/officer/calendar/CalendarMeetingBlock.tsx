import type { Meeting } from '../../../types';
import { useMeeting } from '../../../hooks/useMeeting';

interface CalendarMeetingBlockProps {
  meeting: Meeting;
  topPercent: number;
  heightPercent: number;
}

export function CalendarMeetingBlock({ meeting, topPercent, heightPercent }: CalendarMeetingBlockProps) {
  const { openMeeting } = useMeeting();

  return (
    <div
      onClick={() => openMeeting(meeting)}
      style={{
        position: 'absolute',
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
        left: 2,
        right: 2,
        background: `${meeting.color}22`,
        border: `1px solid ${meeting.color}66`,
        borderLeft: `3px solid ${meeting.color}`,
        borderRadius: 6,
        padding: '4px 8px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: meeting.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {meeting.title}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {meeting.company !== 'External' ? meeting.company : meeting.startTime + ' – ' + meeting.endTime}
      </div>
    </div>
  );
}
