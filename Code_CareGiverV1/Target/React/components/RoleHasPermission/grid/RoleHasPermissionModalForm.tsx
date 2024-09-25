import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { IRoleHasPermissionForm } from '@services/roleHasPermission/grid/types';
import { useInsertRoleHasPermission, useUpdateRoleHasPermission } from '@services/roleHasPermission/grid';
import { roleHasPermissionFormDefaultValue } from '@src/constants/roleHasPermission/grid/roleHasPermission-form';
import { IRoleHasPermissionModalFormProps } from './types';

const RoleHasPermissionModalForm: React.FC<IRoleHasPermissionModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  roleHasPermissionFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRoleHasPermissionForm>({
    defaultValues: { ...(roleHasPermissionFormDefaultValue as IRoleHasPermissionForm) },
  });

  // React-Query Insert RoleHasPermission API.
  const {
    mutate: insertRoleHasPermission,
    isLoading: insertRoleHasPermissionIsLoading,
    isSuccess: insertRoleHasPermissionSuccess,
  } = useInsertRoleHasPermission();

  // React-Query Update RoleHasPermission API.
  const {
    mutate: editRoleHasPermission,
    isLoading: editRoleHasPermissionIsLoading,
    isSuccess: editRoleHasPermissionSuccess,
  } = useUpdateRoleHasPermission();

  // OnSubmit Form. The Data Will Send to Insert or Update RoleHasPermission Form (Note: Case Update Work When roleHasPermissionFormData has an ID)
  const onSubmit = async (formData: IRoleHasPermissionForm): Promise<void> => {
    if (roleHasPermissionFormData && roleHasPermissionFormData?.id) {
      editRoleHasPermission(formData);
    } else {
      insertRoleHasPermission(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(roleHasPermissionFormDefaultValue as IRoleHasPermissionForm) });
  }, [reset]);

  // Push roleHasPermissionFormData from Props to Form
  useEffect(() => {
    if (roleHasPermissionFormData) {
      reset({
        ...roleHasPermissionFormData,

        id: roleHasPermissionFormData.id ?? '',
        masterRoleId: roleHasPermissionFormData.masterRoleId ?? '',
        masterPermissionId: roleHasPermissionFormData.masterPermissionId ?? '',
        create: roleHasPermissionFormData.create ?? 0,
        read: roleHasPermissionFormData.read ?? 0,
        update: roleHasPermissionFormData.update ?? 0,
        delete: roleHasPermissionFormData.delete ?? 0,
        remark: roleHasPermissionFormData.remark ?? '',
      });
    }
  }, [roleHasPermissionFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertRoleHasPermissionIsLoading &&
      !editRoleHasPermissionIsLoading &&
      (insertRoleHasPermissionSuccess || editRoleHasPermissionSuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editRoleHasPermissionIsLoading,
    editRoleHasPermissionSuccess,
    insertRoleHasPermissionIsLoading,
    insertRoleHasPermissionSuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertRoleHasPermissionIsLoading || editRoleHasPermissionIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล RoleHasPermission'}
      onRequestClose={() => {
        toggleModal();
        onFormReset();
      }}
      id="form-modal"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isLoading && 'cursor-progress'} flex flex-col gap-4`}
      >
        {/* START FORM */}




          {/* id */}
          <div className="flex flex-col">
            <label
              htmlFor="id"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.id })}>
                รหัสในระบบ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="id"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="id"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.id,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* masterRoleId */}
          <div className="flex flex-col">
            <label
              htmlFor="masterRoleId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.masterRoleId })}>
                รหัสกลุ่มผู้ใช้
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* masterPermissionId */}
          <div className="flex flex-col">
            <label
              htmlFor="masterPermissionId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.masterPermissionId })}>
                รหัสสิทธิ์การใช้งาน
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>


          {/* create */}
          <div className="flex flex-col">
            <label
              htmlFor="create"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.create })}>
                สิทธิ์การเพิ่ม
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="create"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="create"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.create,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* read */}
          <div className="flex flex-col">
            <label
              htmlFor="read"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.read })}>
                สิทธิ์การอ่าน
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="read"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="read"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.read,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* update */}
          <div className="flex flex-col">
            <label
              htmlFor="update"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.update })}>
                สิทธิ์การแก้ไข
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="update"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="update"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.update,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* delete */}
          <div className="flex flex-col">
            <label
              htmlFor="delete"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.delete })}>
                สิทธิ์การลบ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="delete"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="delete"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.delete,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* remark */}
          <div className="flex flex-col">
            <label
              htmlFor="remark"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.remark })}>
                หมายเหตุ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="remark"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 100,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 100 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="remark"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx('input-bordered w-full block input', {
                      ['border-danger']: errors.remark,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

        

        {/* END FORM */}

        <div
          id="modal-footer"
          className="mt-8 pt-4 border-t border-primary flex justify-end gap-2 flex-col md:flex-row"
        >
          <button
            type="button"
            aria-label="Cancel form"
            className="btn-primary btn w-full  md:w-auto"
            disabled={isLoading}
            tabIndex={0}
            onClick={() => {
              toggleModal();
              onFormReset();
            }}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            aria-label="Submit form"
            className="btn-success btn w-full text-white md:w-auto"
            disabled={isLoading}
            tabIndex={0}
          >
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleHasPermissionModalForm;
