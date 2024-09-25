import { Dispatch, SetStateAction } from 'react';

import { IMasterPermissionForm } from '@services/masterPermission/grid/types';

export interface IMasterPermissionModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterPermissionFormData?: IMasterPermissionForm;
}
