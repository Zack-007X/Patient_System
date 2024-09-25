export interface IMasterPermission {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IMasterPermissionForm {

  id: string;
  code?: string;
  name?: string;
  remark?: string;
}

export interface IMasterPermissionSearchForm {

  code?: string;
  name?: string;
}