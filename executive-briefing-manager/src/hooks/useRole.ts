import { useAppContext, type Role } from '../context';

export function useRole(): { role: Role; setRole: (r: Role) => void } {
  const { state, dispatch } = useAppContext();
  return {
    role: state.role,
    setRole: (r) => dispatch({ type: 'SET_ROLE', payload: r }),
  };
}
