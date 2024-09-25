import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { IDrugHistoryForm } from '@services/drugHistory/grid/types';
import { useInsertDrugHistory, useUpdateDrugHistory } from '@services/drugHistory/grid';
import { drugHistoryFormDefaultValue } from '@src/constants/drugHistory/grid/drugHistory-form';
import { IDrugHistoryModalFormProps } from './types';

const DrugHistoryModalForm: React.FC<IDrugHistoryModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  drugHistoryFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDrugHistoryForm>({
    defaultValues: { ...(drugHistoryFormDefaultValue as IDrugHistoryForm) },
  });

  // React-Query Insert DrugHistory API.
  const {
    mutate: insertDrugHistory,
    isLoading: insertDrugHistoryIsLoading,
    isSuccess: insertDrugHistorySuccess,
  } = useInsertDrugHistory();

  // React-Query Update DrugHistory API.
  const {
    mutate: editDrugHistory,
    isLoading: editDrugHistoryIsLoading,
    isSuccess: editDrugHistorySuccess,
  } = useUpdateDrugHistory();

  // OnSubmit Form. The Data Will Send to Insert or Update DrugHistory Form (Note: Case Update Work When drugHistoryFormData has an ID)
  const onSubmit = async (formData: IDrugHistoryForm): Promise<void> => {
    if (drugHistoryFormData && drugHistoryFormData?.id) {
      editDrugHistory(formData);
    } else {
      insertDrugHistory(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(drugHistoryFormDefaultValue as IDrugHistoryForm) });
  }, [reset]);

  // Push drugHistoryFormData from Props to Form
  useEffect(() => {
    if (drugHistoryFormData) {
      reset({
        ...drugHistoryFormData,

        id: drugHistoryFormData.id ?? '',
        masterDrugID: drugHistoryFormData.masterDrugID ?? '',
        treatmentScheduleId: drugHistoryFormData.treatmentScheduleId ?? '',
        amount: drugHistoryFormData.amount ?? 0,
        remark: drugHistoryFormData.remark ?? '',
      });
    }
  }, [drugHistoryFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertDrugHistoryIsLoading &&
      !editDrugHistoryIsLoading &&
      (insertDrugHistorySuccess || editDrugHistorySuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editDrugHistoryIsLoading,
    editDrugHistorySuccess,
    insertDrugHistoryIsLoading,
    insertDrugHistorySuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertDrugHistoryIsLoading || editDrugHistoryIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล DrugHistory'}
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


          {/* masterDrugID */}
          <div className="flex flex-col">
            <label
              htmlFor="masterDrugID"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.masterDrugID })}>
                ยา
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* treatmentScheduleId */}
          <div className="flex flex-col">
            <label
              htmlFor="treatmentScheduleId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.treatmentScheduleId })}>
                รายการการ Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* amount */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.amount })}>
                จำนวนยา
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="amount"
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
                    id="amount"
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
                      ['border-danger']: errors.amount,
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

export default DrugHistoryModalForm;
