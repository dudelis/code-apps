import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import {
  emails as mockEmails,
  metrics as mockMetrics,
} from '../data';
import {
  loadMeetingsFromDataverse,
  loadContactsFromDataverse,
  loadActionItemsFromDataverse,
  loadHighlightsFromDataverse,
  updateMeetingPhase,
  toggleActionItemInDataverse,
  createActionItemInDataverse,
} from '../services/dataverseService';
import type { Meeting, ActionItem, Contact, Email, Highlight, Metric, KanbanStatus, Priority } from '../types';

interface DataState {
  meetings: Meeting[];
  actionItems: ActionItem[];
  contacts: Contact[];
  emails: Email[];
  highlights: Highlight[];
  metrics: Metric[];
  dvLoaded: boolean;
}

type DataAction =
  | { type: 'TOGGLE_ACTION_ITEM'; payload: string }
  | { type: 'ADD_ACTION_ITEM'; payload: ActionItem }
  | { type: 'REMOVE_ACTION_ITEM'; payload: string }
  | { type: 'MOVE_KANBAN_CARD'; payload: { id: string; status: KanbanStatus } }
  | { type: 'MARK_EMAIL_READ'; payload: string }
  | { type: 'LOAD_DV_DATA'; payload: Pick<DataState, 'meetings' | 'actionItems' | 'contacts' | 'highlights'> };

const initialState: DataState = {
  meetings: [],
  actionItems: [],
  contacts: [],
  emails: mockEmails,
  highlights: [],
  metrics: mockMetrics,
  dvLoaded: false,
};

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'LOAD_DV_DATA':
      return { ...state, ...action.payload, dvLoaded: true };
    case 'ADD_ACTION_ITEM':
      return { ...state, actionItems: [action.payload, ...state.actionItems.filter(a => a.id !== action.payload.id)] };
    case 'REMOVE_ACTION_ITEM':
      return { ...state, actionItems: state.actionItems.filter(a => a.id !== action.payload) };
    case 'TOGGLE_ACTION_ITEM':
      return {
        ...state,
        actionItems: state.actionItems.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item,
        ),
      };
    case 'MOVE_KANBAN_CARD':
      return {
        ...state,
        meetings: state.meetings.map((m) =>
          m.id === action.payload.id
            ? { ...m, status: action.payload.status }
            : m,
        ),
      };
    case 'MARK_EMAIL_READ':
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.payload ? { ...e, read: true } : e,
        ),
      };
    default:
      return state;
  }
}

interface DataContextValue {
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
  // Write-back helpers that update both local state and Dataverse
  moveKanbanCard: (id: string, status: KanbanStatus) => void;
  toggleActionItem: (id: string, currentCompleted: boolean) => void;
  addActionItem: (item: { title: string; priority: Priority; dueDate: string; meetingId?: string }) => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load all data from Dataverse on mount
  useEffect(() => {
    Promise.allSettled([
      loadMeetingsFromDataverse(),
      loadContactsFromDataverse(),
      loadActionItemsFromDataverse(),
      loadHighlightsFromDataverse(),
    ]).then(([meetingsR, contactsR, actionItemsR, highlightsR]) => {
      dispatch({
        type: 'LOAD_DV_DATA',
        payload: {
          meetings: meetingsR.status === 'fulfilled' ? meetingsR.value : [],
          contacts: contactsR.status === 'fulfilled' ? contactsR.value : [],
          actionItems: actionItemsR.status === 'fulfilled' ? actionItemsR.value : [],
          highlights: highlightsR.status === 'fulfilled' ? highlightsR.value : [],
        },
      });
    });
  }, []);

  // Write-back: optimistic update + Dataverse sync
  function moveKanbanCard(id: string, status: KanbanStatus) {
    dispatch({ type: 'MOVE_KANBAN_CARD', payload: { id, status } });
    updateMeetingPhase(id, status).catch(console.error);
  }

  function toggleActionItem(id: string, currentCompleted: boolean) {
    dispatch({ type: 'TOGGLE_ACTION_ITEM', payload: id });
    toggleActionItemInDataverse(id, !currentCompleted).catch(console.error);
  }

  async function addActionItem(item: { title: string; priority: Priority; dueDate: string; meetingId?: string }) {
    // Optimistic update — show immediately in UI
    const tempId = crypto.randomUUID();
    const optimistic: ActionItem = {
      id: tempId,
      title: item.title,
      priority: item.priority,
      dueDate: item.dueDate,
      completed: false,
      meetingId: item.meetingId ?? '',
    };
    dispatch({ type: 'ADD_ACTION_ITEM', payload: optimistic });
    // Persist to Dataverse in background; patch ID if we get one back
    const realId = await createActionItemInDataverse(item);
    if (realId && realId !== tempId) {
      dispatch({ type: 'ADD_ACTION_ITEM', payload: { ...optimistic, id: realId } });
      // Remove the temp entry (replace by filtering it out then re-adding with real ID handled above)
      dispatch({ type: 'REMOVE_ACTION_ITEM', payload: tempId });
    }
  }

  return (
    <DataContext.Provider value={{ state, dispatch, moveKanbanCard, toggleActionItem, addActionItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within DataProvider');
  return ctx;
}
