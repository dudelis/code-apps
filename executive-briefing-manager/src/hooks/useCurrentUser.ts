import { useState, useEffect } from 'react';
import { getCurrentUser, type CurrentUser } from '../services/userService';

const FALLBACK: CurrentUser = {
  name: 'Christian',
  title: 'Account Executive',
  email: '',
  photoDataUrl: null,
};

export function useCurrentUser(): { user: CurrentUser; loading: boolean } {
  const [user, setUser] = useState<CurrentUser>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
