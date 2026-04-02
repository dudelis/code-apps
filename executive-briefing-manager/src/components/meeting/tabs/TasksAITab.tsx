import { useState } from 'react';
import type { Meeting } from '../../../types';
import { useDataContext } from '../../../context';
import { Badge } from '../../common/Badge';
import { formatDate } from '../../../utils/formatters';
import { Wand2, RefreshCw, Plus } from 'lucide-react';
import { AddActionItemModal } from '../../common/AddActionItemModal';

interface TasksAITabProps {
  meeting: Meeting;
}

export function TasksAITab({ meeting }: TasksAITabProps) {
  const { state, toggleActionItem } = useDataContext();
  const [showModal, setShowModal] = useState(false);
  // Show all action items for this meeting (by meetingId OR actionItemIds)
  const tasks = state.actionItems.filter(
    (a) => a.meetingId === meeting.id || meeting.actionItemIds.includes(a.id)
  );

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--accent-primary)', fontWeight: 600 }}>
          <Wand2 size={13} /> Generate follow-up email
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--accent-green)', fontWeight: 600 }}>
          <RefreshCw size={13} /> Suggest next steps
        </button>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: '#f59e0b', fontWeight: 600, marginLeft: 'auto' }}
        >
          <Plus size={13} /> Add Task
        </button>
      </div>
      {showModal && (
        <AddActionItemModal
          onClose={() => setShowModal(false)}
          meetingId={meeting.id}
          meetingTitle={meeting.title}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleActionItem(task.id, task.completed)}
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {task.title}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Due {formatDate(task.dueDate)}</div>
            </div>
            <Badge label={task.priority} variant={task.priority} />
          </div>
        ))}
      </div>
    </div>
  );
}
