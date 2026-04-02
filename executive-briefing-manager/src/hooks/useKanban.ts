import { useDataContext } from '../context';
import type { KanbanStatus, Meeting } from '../types';

const COLUMNS: KanbanStatus[] = [
  'inbox',
  'approved',
  'scheduled',
  'in-progress',
  'ready',
  'done',
];

export function useKanban(): {
  columns: KanbanStatus[];
  cardsByColumn: Record<KanbanStatus, Meeting[]>;
  moveCard: (id: string, status: KanbanStatus) => void;
} {
  const { state, moveKanbanCard } = useDataContext();

  const cardsByColumn = COLUMNS.reduce(
    (acc, col) => {
      acc[col] = state.meetings.filter((m) => m.status === col);
      return acc;
    },
    {} as Record<KanbanStatus, Meeting[]>,
  );

  return {
    columns: COLUMNS,
    cardsByColumn,
    moveCard: (id, status) => moveKanbanCard(id, status),
  };
}
