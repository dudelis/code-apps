import { Office365OutlookService } from '../generated';
import type { Email } from '../types';

export async function getRecentEmails(
  subjectFilter?: string,
  top = 10,
): Promise<Email[]> {
  try {
    const result = await Office365OutlookService.GetEmailsV3(
      'Inbox',
      undefined, // to
      undefined, // cc
      undefined, // toOrCc
      undefined, // from
      undefined, // importance
      undefined, // fetchOnlyWithAttachment
      subjectFilter,
      undefined, // fetchOnlyUnread
      undefined, // fetchOnlyFlagged
      undefined, // mailboxAddress
      false,     // includeAttachments
      undefined, // searchQuery
      top,
    );

    if (!result.success || !result.data?.value?.length) return [];

    return result.data.value.map((msg): Email => {
      const fromName = msg._from?.split('<')[0].trim() || msg._from || 'Unknown';
      const initials = fromName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

      return {
        id: msg.id ?? `email-${Math.random().toString(36).slice(2)}`,
        meetingId: '',          // caller must assign after domain matching
        from: fromName,
        fromInitials: initials || '?',
        subject: msg.subject ?? '(no subject)',
        preview: msg.bodyPreview ?? '',
        body: msg.body ?? '',
        date: msg.receivedDateTime?.slice(0, 10) ?? '',
        read: msg.isRead ?? false,
        hasAttachment: msg.hasAttachments ?? false,
      };
    });
  } catch {
    return [];
  }
}
