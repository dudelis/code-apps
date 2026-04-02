export interface Email {
  id: string;
  meetingId: string;
  from: string;
  fromInitials: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  hasAttachment: boolean;
}
