import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useActionItems } from '../../../hooks/useActionItems';
import { ActionItemRow } from './ActionItemRow';
import { GlassPanel } from '../../common/GlassPanel';
import { SortDropdown } from '../../common/SortDropdown';
import { AddActionItemModal } from '../../common/AddActionItemModal';

export function ActionItemsSidebar() {
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [showModal, setShowModal] = useState(false);
  const items = useActionItems(sortBy);

  return (
    <>
      <GlassPanel style={{ height: '100%', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>My Action Items</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setShowModal(true)}
              title="Add action item"
              style={{
                width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(99,102,241,0.4)',
                background: 'rgba(99,102,241,0.15)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)',
              }}
            >
              <Plus size={14} />
            </button>
            <SortDropdown
              value={sortBy}
              onChange={(v) => setSortBy(v as 'date' | 'priority')}
              options={[
                { label: 'By Date', value: 'date' },
                { label: 'By Priority', value: 'priority' },
              ]}
            />
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {items.map((item) => (
            <ActionItemRow key={item.id} item={item} />
          ))}
        </div>
      </GlassPanel>
      {showModal && <AddActionItemModal onClose={() => setShowModal(false)} />}
    </>
  );
}
