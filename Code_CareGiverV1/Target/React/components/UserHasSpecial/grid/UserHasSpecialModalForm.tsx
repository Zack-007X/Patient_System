import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { IUserHasSpecialForm } from '@services/userHasSpecial/grid/types';
import { useInsertUserHasSpecial, useUpdateUserHasSpecial } from '@services/userHasSpecial/grid';
import { userHasSpecialFormDefaultValue } from '@src/constants/userHasSpecial/grid/userHasSpecial-form';
import { IUserHasSpecialModalFormProps } from './types';

const UserHasSpecialModalForm: React.FC<IUserHasSpecialModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  userHasSpecialFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserHasSpecialForm>({
    defaultValues: { ...(userHasSpecialFormDefaultValue as IUserHasSpecialForm) },
  });

  // React-Query Insert UserHasSpecial API.
  const {
    mutate: insertUserHasSpecial,
    isLoading: insertUserHasSpecialIsLoading,
    isSuccess: insertUserHasSpecialSuccess,
  } = useInsertUserHasSpecial();

  // React-Query Update UserHasSpecial API.
  const {
    mutate: editUserHasSpecial,
    isLoading: editUserHasSpecialIsLoading,
    isSuccess: editUserHasSpecialSuccess,
  } = useUpdateUserHasSpecial();

  // OnSubmit Form. The Data Will Send to Insert or Update UserHasSpecial Form (Note: Case Update Work When userHasSpecialFormData has an ID)
  const onSubmit = async (formData: IUserHasSpecialForm): Promise<void> => {
    if (userHasSpecialFormData && userHasSpecialFormData?.id) {
      editUserHasSpecial(formData);
    } else {
      insertUserHasSpecial(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(userHasSpecialFormDefaultValue as IUserHasSpecialForm) });
  }, [reset]);

  // Push userHasSpecialFormData from Props to Form
  useEffect(() => {
    if (userHasSpecialFormData) {
      reset({
        ...userHasSpecialFormData,

        id: userHasSpecialFormData.id ?? '',
        masterRoleId: userHasSpecialFormData.masterRoleId ?? '',
        specialSkill: userHasSpecialFormData.specialSkill ?? '',
        remark: userHasSpecialFormData.remark ?? '',
      });
    }
  }, [userHasSpecialFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertUserHasSpecialIsLoading &&
      !editUserHasSpecialIsLoading &&
      (insertUserHasSpecialSuccess || editUserHasSpecialSuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editUserHasSpecialIsLoading,
    editUserHasSpecialSuccess,
    insertUserHasSpecialIsLoading,
    insertUserHasSpecialSuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertUserHasSpecialIsLoading || editUserHasSpecialIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล UserHasSpecial'}
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

          {/* specialSkill */}
          <div className="flex flex-col">
            <label
              htmlFor="specialSkill"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.specialSkill })}>
                ความเชี่ยวชาญ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="specialSkill"
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
                    id="specialSkill"
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
                      ['border-danger']: errors.specialSkill,
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

export default UserHasSpecialModalForm;
