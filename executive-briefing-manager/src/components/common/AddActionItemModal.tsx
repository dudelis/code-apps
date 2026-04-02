import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useDataContext } from '../../context';
import type { Priority } from '../../types';

interface Props {
  onClose: () => void;
  /** Pre-fill and lock the meeting when opened from a meeting overlay */
  meetingId?: string;
  meetingTitle?: string;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];
const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

export function AddActionItemModal({ onClose, meetingId, meetingTitle }: Props) {
  const { addActionItem, state } = useDataContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  );
  const [selectedMeetingId, setSelectedMeetingId] = useState(meetingId ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!title.trim()) { setError('Title is required'); return; }
    setSaving(true);
    try {
      await addActionItem({
        title: title.trim(),
        priority,
        dueDate,
        meetingId: selectedMeetingId || undefined,
      });
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        width: 420, background: 'rgba(15,20,35,0.97)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 16, padding: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={14} color="var(--accent-primary)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>New Action Item</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
            Title *
          </label>
          <input
            autoFocus
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="What needs to be done?"
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
              borderRadius: 8, padding: '10px 12px', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none',
            }}
          />
          {error && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{error}</div>}
        </div>

        {/* Priority */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
            Priority
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', textTransform: 'capitalize',
                  border: `1px solid ${priority === p ? PRIORITY_COLORS[p] : 'var(--border)'}`,
                  background: priority === p ? `${PRIORITY_COLORS[p]}22` : 'rgba(255,255,255,0.03)',
                  color: priority === p ? PRIORITY_COLORS[p] : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 12px', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none', colorScheme: 'dark',
            }}
          />
        </div>

        {/* Meeting link (hidden if pre-set) */}
        {!meetingId && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
              Link to Briefing (optional)
            </label>
            <select
              value={selectedMeetingId}
              onChange={(e) => setSelectedMeetingId(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '10px 12px', color: 'var(--text-primary)',
                fontSize: 13, outline: 'none', colorScheme: 'dark',
              }}
            >
              <option value="">— No briefing —</option>
              {state.meetings.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
        )}

        {meetingId && (
          <div style={{ marginBottom: 24, padding: '8px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--accent-primary)' }}>
            📎 Linked to: <strong>{meetingTitle}</strong>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid var(--border)', background: 'none', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            style={{
              flex: 2, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, cursor: saving ? 'wait' : 'pointer',
              background: saving || !title.trim() ? 'rgba(99,102,241,0.3)' : 'var(--accent-primary)',
              color: 'white', transition: 'background 0.15s',
            }}
          >
            {saving ? 'Saving…' : 'Add Action Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
