import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { ITreatmentScheduleForm } from '@services/treatmentSchedule/grid/types';
import { useInsertTreatmentSchedule, useUpdateTreatmentSchedule } from '@services/treatmentSchedule/grid';
import { treatmentScheduleFormDefaultValue } from '@src/constants/treatmentSchedule/grid/treatmentSchedule-form';
import { ITreatmentScheduleModalFormProps } from './types';

const TreatmentScheduleModalForm: React.FC<ITreatmentScheduleModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  treatmentScheduleFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITreatmentScheduleForm>({
    defaultValues: { ...(treatmentScheduleFormDefaultValue as ITreatmentScheduleForm) },
  });

  // React-Query Insert TreatmentSchedule API.
  const {
    mutate: insertTreatmentSchedule,
    isLoading: insertTreatmentScheduleIsLoading,
    isSuccess: insertTreatmentScheduleSuccess,
  } = useInsertTreatmentSchedule();

  // React-Query Update TreatmentSchedule API.
  const {
    mutate: editTreatmentSchedule,
    isLoading: editTreatmentScheduleIsLoading,
    isSuccess: editTreatmentScheduleSuccess,
  } = useUpdateTreatmentSchedule();

  // OnSubmit Form. The Data Will Send to Insert or Update TreatmentSchedule Form (Note: Case Update Work When treatmentScheduleFormData has an ID)
  const onSubmit = async (formData: ITreatmentScheduleForm): Promise<void> => {
    if (treatmentScheduleFormData && treatmentScheduleFormData?.id) {
      editTreatmentSchedule(formData);
    } else {
      insertTreatmentSchedule(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(treatmentScheduleFormDefaultValue as ITreatmentScheduleForm) });
  }, [reset]);

  // Push treatmentScheduleFormData from Props to Form
  useEffect(() => {
    if (treatmentScheduleFormData) {
      reset({
        ...treatmentScheduleFormData,

        id: treatmentScheduleFormData.id ?? '',
        surveyId: treatmentScheduleFormData.surveyId ?? '',
        planingTopic: treatmentScheduleFormData.planingTopic ?? '',
        planingDetails: treatmentScheduleFormData.planingDetails ?? '',
        startTreatmentDate: treatmentScheduleFormData.startTreatmentDate ?? null,
        endtartTreatmentDate: treatmentScheduleFormData.endtartTreatmentDate ?? null,
        caregiverId: treatmentScheduleFormData.caregiverId ?? '',
        treatmentReportTopic: treatmentScheduleFormData.treatmentReportTopic ?? '',
        treatmentReportDetails: treatmentScheduleFormData.treatmentReportDetails ?? '',
        remark: treatmentScheduleFormData.remark ?? '',
      });
    }
  }, [treatmentScheduleFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertTreatmentScheduleIsLoading &&
      !editTreatmentScheduleIsLoading &&
      (insertTreatmentScheduleSuccess || editTreatmentScheduleSuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editTreatmentScheduleIsLoading,
    editTreatmentScheduleSuccess,
    insertTreatmentScheduleIsLoading,
    insertTreatmentScheduleSuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertTreatmentScheduleIsLoading || editTreatmentScheduleIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล TreatmentSchedule'}
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


          {/* surveyId */}
          <div className="flex flex-col">
            <label
              htmlFor="surveyId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.surveyId })}>
                รายงานการตรวจ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* planingTopic */}
          <div className="flex flex-col">
            <label
              htmlFor="planingTopic"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.planingTopic })}>
                แผน Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="planingTopic"
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
                    id="planingTopic"
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
                      ['border-danger']: errors.planingTopic,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* planingDetails */}
          <div className="flex flex-col">
            <label
              htmlFor="planingDetails"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.planingDetails })}>
                สถานะ Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="planingDetails"
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
                    id="planingDetails"
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
                      ['border-danger']: errors.planingDetails,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* startTreatmentDate */}
          <div className="flex flex-col">
            <label
              htmlFor="startTreatmentDate"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.startTreatmentDate })}>
                วันเริ่มต้น Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="startTreatmentDate"
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
                  <DatePicker
                    {...field}
                    id="startTreatmentDate"
                    language="th"
                    date={field.value}
                    required
                    onChange={(e: unknown) => {
                      field.onChange(e);
                    }}
                    tabIndex={0}
                    errors={errors.startTreatmentDate}
                    disabled={isLoading}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>

          {/* endtartTreatmentDate */}
          <div className="flex flex-col">
            <label
              htmlFor="endtartTreatmentDate"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.endtartTreatmentDate })}>
                วันสุดท้าย Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="endtartTreatmentDate"
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
                  <DatePicker
                    {...field}
                    id="endtartTreatmentDate"
                    language="th"
                    date={field.value}
                    required
                    onChange={(e: unknown) => {
                      field.onChange(e);
                    }}
                    tabIndex={0}
                    errors={errors.endtartTreatmentDate}
                    disabled={isLoading}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>

          {/* CaregiverId */}
          <div className="flex flex-col">
            <label
              htmlFor="CaregiverId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.CaregiverId })}>
                ผู้ดูแล
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>


          {/* TreatmentReportTopic */}
          <div className="flex flex-col">
            <label
              htmlFor="TreatmentReportTopic"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.TreatmentReportTopic })}>
                ผลการ Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="TreatmentReportTopic"
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
                    id="TreatmentReportTopic"
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
                      ['border-danger']: errors.TreatmentReportTopic,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* TreatmentReportDetails */}
          <div className="flex flex-col">
            <label
              htmlFor="TreatmentReportDetails"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.TreatmentReportDetails })}>
                รายละเอียด ผลการ Treatment
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="TreatmentReportDetails"
                control={control}
                rules={{
                  required: 'กรุณาระบุข้อมูล',
                  maxLength: {
                    value: 1000,
                    message:
                      'ข้อความจะต้องมีความยาวตัวอักษรไม่เกิน 1000 ตัวอักษร',
                  },
                }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="TreatmentReportDetails"
                    placeholder="กรุณาระบุข้อมูล"
                    value={field.value}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 1000) {
                        field.onChange(inputValue);
                      }
                    }}
                    onBlur={field.onBlur}
                    className={clsx(
                      'input-bordered w-full block input p-4 min-h-[100px]',
                      {
                        ['border-danger']: errors.TreatmentReportDetails,
                      },
                    )}
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

export default TreatmentScheduleModalForm;
