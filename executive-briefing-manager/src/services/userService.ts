import { Office365UsersService } from '../generated';

export interface CurrentUser {
  name: string;
  title: string;
  email: string;
  photoDataUrl: string | null;
}

const MOCK_USER: CurrentUser = {
  name: 'Christian',
  title: 'Account Executive',
  email: 'christian@company.com',
  photoDataUrl: null,
};

/**
 * Connectors can return photos in multiple formats:
 * 1. Plain base64 string
 * 2. Power Apps binary object: { "$content": "base64...", "$content-type": "image/jpeg" }
 * 3. Already a data URL or CDN URL
 */
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

export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const profileResult = await Office365UsersService.MyProfile_V2(
      'displayName,jobTitle,mail,userPrincipalName,id',
    );
    if (!profileResult.success || !profileResult.data) return MOCK_USER;

    const { displayName, jobTitle, mail, userPrincipalName, id } = profileResult.data;

    let photoDataUrl: string | null = null;
    if (id) {
      try {
        const photoResult = await Office365UsersService.UserPhoto_V2(id);
        if (photoResult.success && photoResult.data) {
          photoDataUrl = extractPhotoDataUrl(photoResult.data);
        }
      } catch {
        // photo is optional — ignore
      }
    }

    return {
      name: displayName ?? MOCK_USER.name,
      title: jobTitle ?? MOCK_USER.title,
      email: mail ?? userPrincipalName ?? MOCK_USER.email,
      photoDataUrl,
    };
  } catch {
    return MOCK_USER;
  }
}

export async function enrichContactFromO365(email: string): Promise<{
  name?: string;
  title?: string;
  photoDataUrl?: string;
} | null> {
  try {
    const result = await Office365UsersService.SearchUserV2(email, 1);
    if (!result.success || !result.data?.value?.length) return null;

    const user = result.data.value[0];
    let photoDataUrl: string | undefined;

    if (user.Id) {
      try {
        const photoResult = await Office365UsersService.UserPhoto_V2(user.Id);
        if (photoResult.success && photoResult.data) {
          photoDataUrl = extractPhotoDataUrl(photoResult.data) ?? undefined;
        }
      } catch {
        // ignore
      }
    }

    return {
      name: user.DisplayName,
      title: user.JobTitle,
      photoDataUrl,
    };
  } catch {
    return null;
  }
}
