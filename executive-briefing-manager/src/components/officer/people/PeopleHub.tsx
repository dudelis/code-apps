import { useDataContext } from '../../../context';
import { useTenantUsers } from '../../../hooks/useTenantUsers';
import { ProfileCard } from './ProfileCard';

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        paddingBottom: 4,
        borderBottom: '1px solid var(--border)',
        marginTop: 4,
      }}
    >
      {title}
    </div>
  );
}

export function PeopleHub() {
  const { state } = useDataContext();
  const { users: tenantUsers, loading } = useTenantUsers();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 16,
        padding: 4,
        overflowY: 'auto',
        height: '100%',
        alignContent: 'start',
      }}
    >
      {/* Tenant colleagues */}
      <SectionHeader title="My Colleagues" />
      {loading && (
        <div style={{ gridColumn: '1 / -1', fontSize: 12, color: 'var(--text-muted)' }}>
          ⟳ Loading colleagues…
        </div>
      )}
      {tenantUsers.map((contact) => (
        <ProfileCard key={contact.id} contact={contact} />
      ))}

      {/* External customer contacts */}
      <SectionHeader title="Customer Contacts" />
      {state.contacts.map((contact) => (
        <ProfileCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
