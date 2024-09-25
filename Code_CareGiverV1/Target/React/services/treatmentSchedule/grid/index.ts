import axios from 'axios';
import { environment } from '@src/environments/environments';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { alertMessage } from '@src/utils/alert-message';
import { useToast } from '@components/Toast/stateManagement/context/ToastContext';

import { ITreatmentSchedule, ITreatmentScheduleForm, ITreatmentScheduleSearchForm } from './types';
import { treatmentScheduleApiConfigs } from '@src/services/treatmentSchedule/grid/treatmentSchedule.configs';

// Get Method
export const useGetTreatmentScheduleList = (searchData?: ITreatmentScheduleSearchForm | null) => {
  const toast = useToast();

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useQuery(
    treatmentScheduleApiConfigs.GET_TREATMENTSCHEDULE_LIST,
    async () => {
      const searchParams = searchData ? new URLSearchParams(
        Object.entries(searchData)
          .filter(([key, value]) => value !== undefined && value !== null)
      ).toString() : '';
      const { data } = await axios.get(
        `${environment.backendApiEndpoint}/api/v1/TreatmentSchedule/GetListBySearch?${
          searchParams
        }`,
      );

      return (data as ITreatmentSchedule[]) ?? [];
    },
    {
      retry: 2,
      refetchOnWindowFocus: true,
      onError: handleError,
    },
  );
};

// Delete Method
export const useDeleteTreatmentSchedule = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(treatmentScheduleApiConfigs.GET_TREATMENTSCHEDULE_LIST);
    toast?.pushSuccess('ลบข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (id: string) => {
      const { data } = await axios.delete(
        `${environment.backendApiEndpoint}/api/v1/TreatmentSchedule/${id}`,
      );
      return data;
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  );
};

// POST METHOD
export const useInsertTreatmentSchedule = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(treatmentScheduleApiConfigs.GET_TREATMENTSCHEDULE_LIST);
    toast?.pushSuccess('บันทึกข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (value: ITreatmentScheduleForm) => {
      const { data } = await axios.post(
        `${environment.backendApiEndpoint}/api/v1/TreatmentSchedule/`,
        {
          ...value,
          id: '00000000-0000-0000-0000-000000000000',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return data;
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  );
};

// PUT METHOD
export const useUpdateTreatmentSchedule = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(treatmentScheduleApiConfigs.GET_TREATMENTSCHEDULE_LIST);
    toast?.pushSuccess('บันทึกข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (value: ITreatmentScheduleForm) => {
      if (!value?.id) {
        throw new Error('ไม่พบข้อมูล ID');
      }

      const { data } = await axios.put(
        `${environment.backendApiEndpoint}/api/v1/TreatmentSchedule/${value?.id}`,
        {
          ...value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return data;
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
    },
  );
};
