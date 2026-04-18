import { getContext } from '@microsoft/power-apps/app';
import { SystemusersService } from '../generated/services/SystemusersService';
import { RolesService } from '../generated/services/RolesService';

async function getCurrentSystemUserId(): Promise<string | null> {
  const ctx = await getContext();
  const upn = ctx.user.userPrincipalName;
  if (!upn) return null;

  const result = await SystemusersService.getAll({
    filter: `internalemailaddress eq '${upn}'`,
    select: ['systemuserid'],
    top: 1,
  });

  return result.success && result.data?.length ? result.data[0].systemuserid : null;
}

export async function getDirectSecurityRoles(): Promise<string[]> {
  const systemUserId = await getCurrentSystemUserId();
  if (!systemUserId) return [];

  const result = await RolesService.getAll({
    filter: `systemuserroles_association/any(u: u/systemuserid eq ${systemUserId})`,
    select: ['name'],
  });

  if (!result.success || !result.data?.length) return [];
  return result.data.map((r) => r.name ?? '').filter(Boolean);
}
