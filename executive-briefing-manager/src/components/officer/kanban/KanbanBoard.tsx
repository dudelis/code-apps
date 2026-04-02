import { DndContext, type DragEndEvent, closestCorners } from '@dnd-kit/core';
import { useKanban } from '../../../hooks/useKanban';
import { KanbanColumn } from './KanbanColumn';
import type { KanbanStatus } from '../../../types';

export function KanbanBoard() {
  const { columns, cardsByColumn, moveCard } = useKanban();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as KanbanStatus;
    moveCard(active.id as string, newStatus);
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', height: '100%', paddingBottom: 8 }}>
        {columns.map((col) => (
          <KanbanColumn key={col} status={col} cards={cardsByColumn[col]} />
        ))}
      </div>
    </DndContext>
  );
}
