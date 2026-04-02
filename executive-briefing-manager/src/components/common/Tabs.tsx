import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeId: string) => ReactNode;
}

export function Tabs({ tabs, children }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '0 4px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 500,
              color: active === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: active === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              marginBottom: -1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children(active)}
      </div>
    </div>
  );
}
