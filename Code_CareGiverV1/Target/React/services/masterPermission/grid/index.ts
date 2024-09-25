import axios from 'axios';
import { environment } from '@src/environments/environments';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { alertMessage } from '@src/utils/alert-message';
import { useToast } from '@components/Toast/stateManagement/context/ToastContext';

import { IMasterPermission, IMasterPermissionForm, IMasterPermissionSearchForm } from './types';
import { masterPermissionApiConfigs } from '@src/services/masterPermission/grid/masterPermission.configs';

// Get Method
export const useGetMasterPermissionList = (searchData?: IMasterPermissionSearchForm | null) => {
  const toast = useToast();

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useQuery(
    masterPermissionApiConfigs.GET_MASTERPERMISSION_LIST,
    async () => {
      const searchParams = searchData ? new URLSearchParams(
        Object.entries(searchData)
          .filter(([key, value]) => value !== undefined && value !== null)
      ).toString() : '';
      const { data } = await axios.get(
        `${environment.backendApiEndpoint}/api/v1/MasterPermission/GetListBySearch?${
          searchParams
        }`,
      );

      return (data as IMasterPermission[]) ?? [];
    },
    {
      retry: 2,
      refetchOnWindowFocus: true,
      onError: handleError,
    },
  );
};

// Delete Method
export const useDeleteMasterPermission = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(masterPermissionApiConfigs.GET_MASTERPERMISSION_LIST);
    toast?.pushSuccess('ลบข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (id: string) => {
      const { data } = await axios.delete(
        `${environment.backendApiEndpoint}/api/v1/MasterPermission/${id}`,
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
export const useInsertMasterPermission = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(masterPermissionApiConfigs.GET_MASTERPERMISSION_LIST);
    toast?.pushSuccess('บันทึกข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (value: IMasterPermissionForm) => {
      const { data } = await axios.post(
        `${environment.backendApiEndpoint}/api/v1/MasterPermission/`,
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
export const useUpdateMasterPermission = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSuccess = (): void => {
    queryClient.invalidateQueries(masterPermissionApiConfigs.GET_MASTERPERMISSION_LIST);
    toast?.pushSuccess('บันทึกข้อมูลสำเร็จ');
  };

  const handleError = (error: unknown): void => {
    toast?.pushError(alertMessage(error));
  };

  return useMutation(
    async (value: IMasterPermissionForm) => {
      if (!value?.id) {
        throw new Error('ไม่พบข้อมูล ID');
      }

      const { data } = await axios.put(
        `${environment.backendApiEndpoint}/api/v1/MasterPermission/${value?.id}`,
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
