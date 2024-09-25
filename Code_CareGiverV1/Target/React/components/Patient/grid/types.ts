import { Dispatch, SetStateAction } from 'react';

import { IPatientForm } from '@services/patient/grid/types';

export interface IPatientModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  patientFormData?: IPatientForm;
}
