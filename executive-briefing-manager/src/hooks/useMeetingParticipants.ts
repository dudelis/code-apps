import { useState, useEffect } from 'react';
import { Office365UsersService } from '../generated';
import { useDataContext } from '../context';
import type { Meeting, Contact } from '../types';

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
  return name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

const COLORS = ['#6366F1', '#EC4899', '#0EA5E9', '#10B981', '#F59E0B', '#A78BFA', '#EF4444', '#14B8A6'];
function colorFor(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

export function useMeetingParticipants(meeting: Meeting): Contact[] {
  const { state } = useDataContext();
  const [participants, setParticipants] = useState<Contact[]>([]);

  useEffect(() => {
    let cancelled = false;
    setParticipants([]);

    async function resolve() {
      const resolved: Contact[] = [];
      // Track which resolved contacts are real O365 users (need photo fetch)
      const o365Ids: string[] = [];

      for (const pid of meeting.participantIds) {
        const isMockId = !pid.includes('@');

        if (isMockId) {
          // Mock contact — look up by ID
          const found = state.contacts.find((c) => c.id === pid);
          if (found) resolved.push(found);
        } else {
          // Email address — fetch from O365
          try {
            const r = await Office365UsersService.SearchUserV2(pid, 1);
            const user = r.data?.value?.[0];
            if (!user || !user.Id) continue;
            const name = user.DisplayName ?? pid;
            resolved.push({
              id: user.Id,
              name,
              role: user.JobTitle ?? '',
              company: user.Department ?? '',
              technicalStance: 'neutral',
              interests: [],
              smalltalkTopics: [],
              avatarInitials: toInitials(name),
              avatarColor: colorFor(pid),
              photoUrl: undefined,
            });
            o365Ids.push(user.Id);
          } catch {
            // skip
          }
        }
      }

      // Phase 1: show all participants with initials immediately
      if (!cancelled) setParticipants([...resolved]);

      // Phase 2: fetch photos for O365 users in parallel
      await Promise.allSettled(
        o365Ids.map(async (userId) => {
          try {
            const photoResult = await Office365UsersService.UserPhoto_V2(userId);
            if (photoResult.success && photoResult.data && !cancelled) {
              const photoUrl = extractPhotoDataUrl(photoResult.data) ?? undefined;
              if (photoUrl) {
                setParticipants((prev) =>
                  prev.map((c) => (c.id === userId ? { ...c, photoUrl } : c)),
                );
              }
            }
          } catch {
            // photo optional
          }
        }),
      );
    }

    resolve();
    return () => { cancelled = true; };
  }, [meeting.id]);

  return participants;
}
