import { Dispatch, SetStateAction } from 'react';

import { ISurveyForm } from '@services/survey/grid/types';

export interface ISurveyModalFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpen: boolean;
  surveyFormData?: ISurveyForm;
}
