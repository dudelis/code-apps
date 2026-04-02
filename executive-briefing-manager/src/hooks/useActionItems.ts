import { useMemo } from 'react';
import { useDataContext } from '../context';
import type { ActionItem, Priority } from '../types';

type SortBy = 'date' | 'priority';

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function useActionItems(sortBy: SortBy = 'date'): ActionItem[] {
  const { state } = useDataContext();

  return useMemo(() => {
    const sorted = [...state.actionItems];
    if (sortBy === 'date') {
      sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else {
      sorted.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    }
    return sorted;
  }, [state.actionItems, sortBy]);
}
