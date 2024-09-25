import { IRoleHasPermissionForm, IRoleHasPermissionSearchForm } from '@services/roleHasPermission/grid/types';

export const roleHasPermissionFormDefaultValue: IRoleHasPermissionForm = {

  id: '',
  masterRoleId: '',
  masterPermissionId: '',
  create: 0,
  read: 0,
  update: 0,
  delete: 0,
  remark: '',
};

export const roleHasPermissionSearchFormDefaultValue: IRoleHasPermissionSearchForm = {

  masterRoleId: '',
  masterPermissionId: '',
};

