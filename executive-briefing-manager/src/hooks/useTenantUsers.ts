import { useState, useEffect } from 'react';
import { Office365UsersService } from '../generated';
import type { Contact } from '../types';

const TENANT_EMAILS = [
  'BB8@fallenorder.onmicrosoft.com',
  'Darth.Vader@fallenorder.onmicrosoft.com',
  'Luke.Skywalker@fallenorder.onmicrosoft.com',
];

const AVATAR_COLORS = [
  '#6366F1', '#EC4899', '#0EA5E9', '#10B981',
  '#F59E0B', '#A78BFA', '#EF4444', '#14B8A6',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPhotoDataUrl(data: any): string | null {
  if (!data) return null;
  if (typeof data === 'string') {
    if (data.startsWith('data:')) return data;
    if (data.startsWith('http')) return data;
    return `data:image/jpeg;base64,${data}`;
  }
  if (typeof data === 'object') {
    const content = data['$content'] ?? data.content ?? data.data;
    const contentType = data['$content-type'] ?? data.contentType ?? 'image/jpeg';
    if (content) return `data:${contentType};base64,${content}`;
  }
  return null;
}

function toInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function useTenantUsers(): { users: Contact[]; loading: boolean } {
  const [users, setUsers] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const results = await Promise.allSettled(
          TENANT_EMAILS.map((email) =>
            Office365UsersService.SearchUserV2(email, 1),
          ),
        );

        const contacts: Contact[] = [];

        for (let i = 0; i < results.length; i++) {
          const r = results[i];
          if (r.status !== 'fulfilled' || !r.value.success) continue;
          const user = r.value.data?.value?.[0];
          if (!user) continue;

          const name = user.DisplayName ?? TENANT_EMAILS[i];
          contacts.push({
            id: user.Id ?? `tenant-${i}`,
            name,
            role: user.JobTitle ?? 'Team Member',
            company: user.Department ?? 'Fallen Order',
            technicalStance: 'neutral',
            interests: [],
            smalltalkTopics: [],
            avatarInitials: toInitials(name),
            avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
            photoUrl: undefined,
          });
        }

        if (!cancelled) setUsers(contacts);

        // Fetch photos in parallel, update each as it arrives
        await Promise.allSettled(
          contacts.map(async (contact) => {
            try {
              const photoResult = await Office365UsersService.UserPhoto_V2(contact.id);
              if (photoResult.success && photoResult.data) {
                const photoUrl = extractPhotoDataUrl(photoResult.data);
                if (photoUrl && !cancelled) {
                  setUsers((prev) =>
                    prev.map((c) => (c.id === contact.id ? { ...c, photoUrl } : c)),
                  );
                }
              }
            } catch {
              // photo optional
            }
          }),
        );
      } catch {
        // connector unavailable — PeopleHub falls back to mock contacts
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();
    return () => { cancelled = true; };
  }, []);

  return { users, loading };
}
