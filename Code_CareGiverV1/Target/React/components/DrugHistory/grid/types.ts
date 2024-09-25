import { Dispatch, SetStateAction } from 'react';

import { IDrugHistoryForm } from '@services/drugHistory/grid/types';

export interface IDrugHistoryModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  drugHistoryFormData?: IDrugHistoryForm;
}
