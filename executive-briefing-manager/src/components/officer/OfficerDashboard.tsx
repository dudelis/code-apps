import { useState } from 'react';
import { WeeklyCalendar } from './calendar/WeeklyCalendar';
import { KanbanBoard } from './kanban/KanbanBoard';
import { PeopleHub } from './people/PeopleHub';
import { ActionItemsSidebar } from './sidebar/ActionItemsSidebar';
import { GlassPanel } from '../common/GlassPanel';
import { Calendar, LayoutGrid, Users } from 'lucide-react';

type Segment = 'calendar' | 'kanban' | 'people';

const SEGMENTS: { id: Segment; label: string; icon: React.ReactNode }[] = [
  { id: 'calendar', label: 'Calendar', icon: <Calendar size={14} /> },
  { id: 'kanban', label: 'Kanban', icon: <LayoutGrid size={14} /> },
  { id: 'people', label: 'People Hub', icon: <Users size={14} /> },
];

export function OfficerDashboard() {
  const [segment, setSegment] = useState<Segment>('calendar');

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%', overflow: 'hidden' }}>
      {/* Left 70% */}
      <div style={{ flex: '0 0 70%', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        {/* Segmented nav */}
        <GlassPanel style={{ padding: '6px 8px', display: 'flex', gap: 4, flexShrink: 0 }}>
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSegment(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                color: segment === s.id ? '#fff' : 'var(--text-muted)',
                background: segment === s.id ? 'var(--accent-primary)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </GlassPanel>

        {/* Active segment */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {segment === 'calendar' && <WeeklyCalendar />}
          {segment === 'kanban' && <KanbanBoard />}
          {segment === 'people' && <PeopleHub />}
        </div>
      </div>

      {/* Right 30% */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ActionItemsSidebar />
      </div>
    </div>
  );
}
