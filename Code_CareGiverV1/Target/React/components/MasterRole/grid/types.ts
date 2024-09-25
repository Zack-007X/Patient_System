import { Dispatch, SetStateAction } from 'react';

import { IMasterRoleForm } from '@services/masterRole/grid/types';

export interface IMasterRoleModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterRoleFormData?: IMasterRoleForm;
}
