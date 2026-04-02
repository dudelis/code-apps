import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import type { Meeting } from '../types';

export type Role = 'officer' | 'executive';

interface AppState {
  role: Role;
  activeMeeting: Meeting | null;
  overlayIsOpen: boolean;
}

type AppAction =
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'OPEN_MEETING'; payload: Meeting }
  | { type: 'CLOSE_MEETING' };

const initialState: AppState = {
  role: 'officer',
  activeMeeting: null,
  overlayIsOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'OPEN_MEETING':
      return { ...state, activeMeeting: action.payload, overlayIsOpen: true };
    case 'CLOSE_MEETING':
      return { ...state, activeMeeting: null, overlayIsOpen: false };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
