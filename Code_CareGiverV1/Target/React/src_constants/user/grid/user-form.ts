import { IUserForm, IUserSearchForm } from '@services/user/grid/types';

export const userFormDefaultValue: IUserForm = {

  id: '',
  username: '',
  passwordHash: '',
  email: '',
  masterPrefixId: '',
  firstname: '',
  lastname: '',
  telephoneNumber: '',
  masterRoleId: '',
  remark: '',
};

export const userSearchFormDefaultValue: IUserSearchForm = {

  username: '',
  firstname: '',
  lastname: '',
};

