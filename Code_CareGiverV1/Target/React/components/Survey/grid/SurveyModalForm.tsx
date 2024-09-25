import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { ISurveyForm } from '@services/survey/grid/types';
import { useInsertSurvey, useUpdateSurvey } from '@services/survey/grid';
import { surveyFormDefaultValue } from '@src/constants/survey/grid/survey-form';
import { ISurveyModalFormProps } from './types';

const SurveyModalForm: React.FC<ISurveyModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  surveyFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISurveyForm>({
    defaultValues: { ...(surveyFormDefaultValue as ISurveyForm) },
  });

  // React-Query Insert Survey API.
  const {
    mutate: insertSurvey,
    isLoading: insertSurveyIsLoading,
    isSuccess: insertSurveySuccess,
  } = useInsertSurvey();

  // React-Query Update Survey API.
  const {
    mutate: editSurvey,
    isLoading: editSurveyIsLoading,
    isSuccess: editSurveySuccess,
  } = useUpdateSurvey();

  // OnSubmit Form. The Data Will Send to Insert or Update Survey Form (Note: Case Update Work When surveyFormData has an ID)
  const onSubmit = async (formData: ISurveyForm): Promise<void> => {
    if (surveyFormData && surveyFormData?.id) {
      editSurvey(formData);
    } else {
      insertSurvey(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(surveyFormDefaultValue as ISurveyForm) });
  }, [reset]);

  // Push surveyFormData from Props to Form
  useEffect(() => {
    if (surveyFormData) {
      reset({
        ...surveyFormData,

        id: surveyFormData.id ?? '',
        patientId: surveyFormData.patientId ?? '',
        doctorId: surveyFormData.doctorId ?? '',
        bloodPressure: surveyFormData.bloodPressure ?? 0,
        oxygenLevel: surveyFormData.oxygenLevel ?? 0,
        heartRate: surveyFormData.heartRate ?? 0,
        surveyDate: surveyFormData.surveyDate ?? null,
        surveyDetail: surveyFormData.surveyDetail ?? '',
        remark: surveyFormData.remark ?? '',
      });
    }
  }, [surveyFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertSurveyIsLoading &&
      !editSurveyIsLoading &&
      (insertSurveySuccess || editSurveySuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editSurveyIsLoading,
    editSurveySuccess,
    insertSurveyIsLoading,
    insertSurveySuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertSurveyIsLoading || editSurveyIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล Survey'}
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


          {/* patientId */}
          <div className="flex flex-col">
            <label
              htmlFor="patientId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.patientId })}>
                ผู้ป่วย
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* doctorId */}
          <div className="flex flex-col">
            <label
              htmlFor="doctorId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.doctorId })}>
                หมอที่ทำการตรวจ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>


          {/* BloodPressure */}
          <div className="flex flex-col">
            <label
              htmlFor="BloodPressure"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.BloodPressure })}>
                ความดันโลหิต
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="BloodPressure"
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
                    id="BloodPressure"
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
                      ['border-danger']: errors.BloodPressure,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* OxygenLevel */}
          <div className="flex flex-col">
            <label
              htmlFor="OxygenLevel"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.OxygenLevel })}>
                ระดับเลือด
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="OxygenLevel"
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
                    id="OxygenLevel"
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
                      ['border-danger']: errors.OxygenLevel,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* HeartRate */}
          <div className="flex flex-col">
            <label
              htmlFor="HeartRate"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.HeartRate })}>
                อัตราการเต้นของหัวใจ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="HeartRate"
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
                    id="HeartRate"
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
                      ['border-danger']: errors.HeartRate,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* SurveyDate */}
          <div className="flex flex-col">
            <label
              htmlFor="SurveyDate"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.SurveyDate })}>
                วันที่ทำการตรวจ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="SurveyDate"
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
                    id="SurveyDate"
                    language="th"
                    date={field.value}
                    required
                    onChange={(e: unknown) => {
                      field.onChange(e);
                    }}
                    tabIndex={0}
                    errors={errors.SurveyDate}
                    disabled={isLoading}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>

          {/* SurveyDetail */}
          <div className="flex flex-col">
            <label
              htmlFor="SurveyDetail"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.SurveyDetail })}>
                รายละเอียดการตรวจ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="SurveyDetail"
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
                    id="SurveyDetail"
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
                        ['border-danger']: errors.SurveyDetail,
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

export default SurveyModalForm;
