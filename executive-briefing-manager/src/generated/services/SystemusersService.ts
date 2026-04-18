import type { IGetOptions, IGetAllOptions } from '../models/CommonModels';
import type { IOperationResult } from '@microsoft/power-apps/data';
import { dataSourcesInfo } from '../../../.power/schemas/appschemas/dataSourcesInfo';
import { getClient } from '@microsoft/power-apps/data';

export interface SystemuserRole {
  roleid: string;
  name: string;
}

export interface Systemuser {
  systemuserid: string;
  fullname?: string;
  internalemailaddress?: string;
  domainname?: string;
  systemuserroles_association?: SystemuserRole[];
}

export class SystemusersService {
  private static readonly dataSourceName = 'systemusers';
  private static readonly client = getClient(dataSourcesInfo);

  public static async get(id: string, options?: IGetOptions): Promise<IOperationResult<Systemuser>> {
    return SystemusersService.client.retrieveRecordAsync<Systemuser>(
      SystemusersService.dataSourceName,
      id,
      options,
    );
  }

  public static async getAll(options?: IGetAllOptions): Promise<IOperationResult<Systemuser[]>> {
    return SystemusersService.client.retrieveMultipleRecordsAsync<Systemuser>(
      SystemusersService.dataSourceName,
      options,
    );
  }
}
