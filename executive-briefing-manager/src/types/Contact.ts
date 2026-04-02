export type TechnicalStance = 'champion' | 'neutral' | 'skeptic';

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  technicalStance: TechnicalStance;
  interests: string[];
  smalltalkTopics: string[];
  avatarInitials: string;
  avatarColor: string;
  photoUrl?: string;
  linkedinUrl?: string;
}
