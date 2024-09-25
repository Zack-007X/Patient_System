import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { DatePicker, Modal } from '@components/index';

import { IPatientForm } from '@services/patient/grid/types';
import { useInsertPatient, useUpdatePatient } from '@services/patient/grid';
import { patientFormDefaultValue } from '@src/constants/patient/grid/patient-form';
import { IPatientModalFormProps } from './types';

const PatientModalForm: React.FC<IPatientModalFormProps> = ({
  setIsOpen,
  toggleModal,
  isOpen,
  patientFormData,
}) => {
  // React-Hook-Form Life-Cycle Controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPatientForm>({
    defaultValues: { ...(patientFormDefaultValue as IPatientForm) },
  });

  // React-Query Insert Patient API.
  const {
    mutate: insertPatient,
    isLoading: insertPatientIsLoading,
    isSuccess: insertPatientSuccess,
  } = useInsertPatient();

  // React-Query Update Patient API.
  const {
    mutate: editPatient,
    isLoading: editPatientIsLoading,
    isSuccess: editPatientSuccess,
  } = useUpdatePatient();

  // OnSubmit Form. The Data Will Send to Insert or Update Patient Form (Note: Case Update Work When patientFormData has an ID)
  const onSubmit = async (formData: IPatientForm): Promise<void> => {
    if (patientFormData && patientFormData?.id) {
      editPatient(formData);
    } else {
      insertPatient(formData);
    }
  };

  // Function Reset Form to Default Value (useCallback is cache function for fetch once on component load first time "It's will re-cache when reset change")
  const onFormReset = useCallback(() => {
    reset({ ...(patientFormDefaultValue as IPatientForm) });
  }, [reset]);

  // Push patientFormData from Props to Form
  useEffect(() => {
    if (patientFormData) {
      reset({
        ...patientFormData,

        id: patientFormData.id ?? '',
        masterPrefixId: patientFormData.masterPrefixId ?? '',
        firstname: patientFormData.firstname ?? '',
        lastname: patientFormData.lastname ?? '',
        brithDate: patientFormData.brithDate ?? null,
        masterGenderId: patientFormData.masterGenderId ?? '',
        age: patientFormData.age ?? 0,
        height: patientFormData.height ?? 0,
        weight: patientFormData.weight ?? 0,
        telephoneNumber: patientFormData.telephoneNumber ?? '',
        relativeName: patientFormData.relativeName ?? '',
        relativeContract: patientFormData.relativeContract ?? '',
        remark: patientFormData.remark ?? '',
      });
    }
  }, [patientFormData, reset]);

  // Handle event after Edit or Insert fetch completed.
  useEffect(() => {
    if (
      !insertPatientIsLoading &&
      !editPatientIsLoading &&
      (insertPatientSuccess || editPatientSuccess)
    ) {
      setIsOpen(false);
      onFormReset();
    }
  }, [
    editPatientIsLoading,
    editPatientSuccess,
    insertPatientIsLoading,
    insertPatientSuccess,
    onFormReset,
    setIsOpen,
  ]);

  // Page Loading Behavior
  const isLoading = insertPatientIsLoading || editPatientIsLoading;

  return (
    <Modal
      isOpen={isOpen}
      title={'บันทึกข้อมูล Patient'}
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


          {/* masterPrefixId */}
          <div className="flex flex-col">
            <label
              htmlFor="masterPrefixId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.masterPrefixId })}>
                คำนำหน้า
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* firstname */}
          <div className="flex flex-col">
            <label
              htmlFor="firstname"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.firstname })}>
                ชื่อจริงผู้ใช้
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="firstname"
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
                    id="firstname"
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
                      ['border-danger']: errors.firstname,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* lastname */}
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.lastname })}>
                นามสกุลผู้ใช้
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="lastname"
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
                    id="lastname"
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
                      ['border-danger']: errors.lastname,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* brithDate */}
          <div className="flex flex-col">
            <label
              htmlFor="brithDate"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.brithDate })}>
                เบอร์โทรศัพท์
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			<Controller
                name="brithDate"
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
                    id="brithDate"
                    language="th"
                    date={field.value}
                    required
                    onChange={(e: unknown) => {
                      field.onChange(e);
                    }}
                    tabIndex={0}
                    errors={errors.brithDate}
                    disabled={isLoading}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>

          {/* masterGenderId */}
          <div className="flex flex-col">
            <label
              htmlFor="masterGenderId"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.masterGenderId })}>
                เพศ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			
            </div>
          </div>

          {/* age */}
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.age })}>
                อายุ
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="age"
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
                    id="age"
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
                      ['border-danger']: errors.age,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* height */}
          <div className="flex flex-col">
            <label
              htmlFor="height"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.height })}>
                ส่วนสูง
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="height"
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
                    id="height"
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
                      ['border-danger']: errors.height,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* weight */}
          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.weight })}>
                น้ำหนัก
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="weight"
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
                    id="weight"
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
                      ['border-danger']: errors.weight,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* telephoneNumber */}
          <div className="flex flex-col">
            <label
              htmlFor="telephoneNumber"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.telephoneNumber })}>
                เบอร์โทรศัพท์ผู้ป่วย
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="telephoneNumber"
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
                    id="telephoneNumber"
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
                      ['border-danger']: errors.telephoneNumber,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>


          {/* relativeName */}
          <div className="flex flex-col">
            <label
              htmlFor="relativeName"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.relativeName })}>
                ชื่่อญาติที่ติดต่อได้
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="relativeName"
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
                    id="relativeName"
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
                      ['border-danger']: errors.relativeName,
                    })}
                    tabIndex={0}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
          </div>

          {/* relativeContract */}
          <div className="flex flex-col">
            <label
              htmlFor="relativeContract"
              className="mb-0 flex h-full w-full text-lg items-center justify-start md:mb-1"
            >
              <span className={clsx({ ['text-danger']: errors.relativeContract })}>
                เบอร์โทรศัพท์ญาติที่ติดต่อได้
              </span>
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="flex w-full flex-col">
			              <Controller
                name="relativeContract"
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
                    id="relativeContract"
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
                      ['border-danger']: errors.relativeContract,
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

export default PatientModalForm;
