import { useEffect } from 'react';
import { AppProvider, DataProvider } from './context';
import { useRole } from './hooks/useRole';
import { useAppContext } from './context/AppContext';
import { ShellBar } from './components/shell/ShellBar';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { ExecutiveDashboard } from './components/executive/ExecutiveDashboard';
import { MeetingOverlay } from './components/meeting/MeetingOverlay';
import { TestDashboard } from './components/test/TestDashboard';
import { getDirectSecurityRoles } from './services/securityRoleService';

function AppContent() {
  const { role } = useRole();
  const { dispatch } = useAppContext();

  useEffect(() => {
    getDirectSecurityRoles()
      .then((roles) => dispatch({ type: 'SET_SECURITY_ROLES', payload: roles }))
      .catch(console.error);
  }, [dispatch]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ShellBar />
      <main style={{ flex: 1, overflow: 'hidden', marginTop: 'var(--shell-height)', padding: 20 }}>
        {role === 'test' ? <TestDashboard /> : role === 'officer' ? <OfficerDashboard /> : <ExecutiveDashboard />}
      </main>
      <MeetingOverlay />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AppProvider>
  );
}
