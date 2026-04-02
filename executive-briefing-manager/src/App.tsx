import { AppProvider, DataProvider } from './context';
import { useRole } from './hooks/useRole';
import { ShellBar } from './components/shell/ShellBar';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { ExecutiveDashboard } from './components/executive/ExecutiveDashboard';
import { MeetingOverlay } from './components/meeting/MeetingOverlay';

function AppContent() {
  const { role } = useRole();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ShellBar />
      <main style={{ flex: 1, overflow: 'hidden', marginTop: 'var(--shell-height)', padding: 20 }}>
        {role === 'officer' ? <OfficerDashboard /> : <ExecutiveDashboard />}
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
