import { Dispatch, SetStateAction } from 'react';

import { IRoleHasPermissionForm } from '@services/roleHasPermission/grid/types';

export interface IRoleHasPermissionModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  roleHasPermissionFormData?: IRoleHasPermissionForm;
}
