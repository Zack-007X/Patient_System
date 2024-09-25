import { Dispatch, SetStateAction } from 'react';

import { IMasterPrefixForm } from '@services/masterPrefix/grid/types';

export interface IMasterPrefixModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  masterPrefixFormData?: IMasterPrefixForm;
}
