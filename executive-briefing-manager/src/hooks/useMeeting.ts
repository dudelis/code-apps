import { useAppContext } from '../context';
import { useDataContext } from '../context';
import type { Meeting } from '../types';

export function useMeeting(): {
  activeMeeting: Meeting | null;
  isOpen: boolean;
  openMeeting: (meeting: Meeting) => void;
  openMeetingById: (id: string) => void;
  closeMeeting: () => void;
} {
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { state: dataState } = useDataContext();

  return {
    activeMeeting: appState.activeMeeting,
    isOpen: appState.overlayIsOpen,
    openMeeting: (meeting) => appDispatch({ type: 'OPEN_MEETING', payload: meeting }),
    // For action items / kanban that only have an ID (mock data)
    openMeetingById: (id) => {
      const meeting = dataState.meetings.find((m) => m.id === id);
      if (meeting) appDispatch({ type: 'OPEN_MEETING', payload: meeting });
    },
    closeMeeting: () => appDispatch({ type: 'CLOSE_MEETING' }),
  };
}
