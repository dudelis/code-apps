import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { KanbanStatus, Meeting } from '../../../types';
import { KanbanCard } from './KanbanCard';
import { GlassPanel } from '../../common/GlassPanel';

const COLUMN_LABELS: Record<KanbanStatus, string> = {
  inbox: 'Inbox',
  approved: 'Approved',
  scheduled: 'Scheduled',
  'in-progress': 'In Progress',
  ready: 'Ready',
  done: 'Done',
};

interface KanbanColumnProps {
  status: KanbanStatus;
  cards: Meeting[];
}

export function KanbanColumn({ status, cards }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <GlassPanel
      style={{
        flex: '0 0 180px',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: 300,
        background: isOver ? 'rgba(99,102,241,0.08)' : undefined,
        transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {COLUMN_LABELS[status]}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-elevated)', borderRadius: 10, padding: '1px 6px' }}>
          {cards.length}
        </span>
      </div>
      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {cards.map((card) => (
            <KanbanCard key={card.id} meeting={card} />
          ))}
        </div>
      </SortableContext>
    </GlassPanel>
  );
}
