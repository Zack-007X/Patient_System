export interface IRoleHasPermission {

  id: string;
  masterRoleId?: string;
  masterPermissionId?: string;
  create?: number;
  read?: number;
  update?: number;
  delete?: number;
  remark?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
}

export interface IRoleHasPermissionForm {

  id: string;
  masterRoleId?: string;
  masterPermissionId?: string;
  create?: number;
  read?: number;
  update?: number;
  delete?: number;
  remark?: string;
}

export interface IRoleHasPermissionSearchForm {

  masterRoleId?: string;
  masterPermissionId?: string;
}