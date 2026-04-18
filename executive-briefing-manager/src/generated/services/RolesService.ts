import type { IGetAllOptions } from '../models/CommonModels';
import type { IOperationResult } from '@microsoft/power-apps/data';
import { dataSourcesInfo } from '../../../.power/schemas/appschemas/dataSourcesInfo';
import { getClient } from '@microsoft/power-apps/data';

export interface Role {
  roleid: string;
  name?: string;
}

export class RolesService {
  private static readonly dataSourceName = 'roles';
  private static readonly client = getClient(dataSourcesInfo);

  public static async getAll(options?: IGetAllOptions): Promise<IOperationResult<Role[]>> {
    return RolesService.client.retrieveMultipleRecordsAsync<Role>(
      RolesService.dataSourceName,
      options,
    );
  }
}
