import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types';
import {  
  Card,
  DashboardLayout,
  DataTableComponent,
} from '@components/index';

import { useDeletePatient, useGetPatientList } from '@services/patient/grid';
import { IPatient, IPatientForm, IPatientSearchForm } from '@services/patient/grid/types';
import { PatientModalForm } from '@components/index';
import { patientSearchFormDefaultValue } from '@src/constants/patient/grid/patient-form';

const PatientPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IPatientSearchForm>(patientSearchFormDefaultValue);
  const [patientFormData, setPatientFormData] = useState<IPatientForm | null>(null);

  // React-Query Get Patient List API.
  const {
    data: patientListData,
    isLoading: patientListIsLoading,
    refetch: patientListRefetch,
  } = useGetPatientList(searchForm);

  // React-Query Delete Patient API.
  const { mutate: deletePatient, isLoading: deletePatientIsLoading } =
    useDeletePatient();

  // Function to Call Delete Patient Data.
  const onDeletePatient = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deletePatient(id);
    }
  };

  // Refetch Get Patient List API When Search Button is Toggled.
  const onSearchPatientToggle = () => {
    patientListRefetch();
  };

  // Function to Show or Hide Patient Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setPatientFormData(null);
    }
  };

  // Function to Show Modal with Patient Data for Editing. (Get Data from Fetched Table)
  const onEditPatient = (data: IPatientForm) => {
    setPatientFormData({ ...data });
  };

  // Life-Cycle to Show Modal with Patient Data When onEditPatient() Function Has Been Call Back.
  useEffect(() => {
    if (patientFormData) {
      setIsOpen(true);
    }
  }, [patientFormData]);

  // Patient Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const patientTableColumn: TableColumn<IPatient>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IPatient) => row.id,
      center: false,
      width: '115px',
      cell: (row: IPatient) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditPatient(row as unknown as IPatientForm);
              }}
              aria-label="Edit data event"
              type="button"
              className="rounded-md bg-warning p-1 text-center"
            >
              <PencilSquareIcon width={20} height={20} />
            </button>
            <button
              type="button"
              className="rounded-md bg-danger text-white p-1 text-center"
              aria-label="Delete data event"
              onClick={() => {
                onDeletePatient(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'คำนำหน้า',
      sortable: true,
      selector: (row: IPatient) => row.masterPrefixId ?? '-',
      cell: (row: IPatient) => {
        return row.masterPrefixId;
      },
    },
    {
      name: 'ชื่อจริงผู้ใช้',
      sortable: true,
      selector: (row: IPatient) => row.firstname ?? '-',
      cell: (row: IPatient) => {
        return row.firstname;
      },
    },
    {
      name: 'นามสกุลผู้ใช้',
      sortable: true,
      selector: (row: IPatient) => row.lastname ?? '-',
      cell: (row: IPatient) => {
        return row.lastname;
      },
    },
    {
      name: 'เบอร์โทรศัพท์',
      sortable: true,
      selector: (row: IPatient) => row.brithDate ?? '-',
      cell: (row: IPatient) => {
        return row.brithDate;
      },
    },
    {
      name: 'เพศ',
      sortable: true,
      selector: (row: IPatient) => row.masterGenderId ?? '-',
      cell: (row: IPatient) => {
        return row.masterGenderId;
      },
    },
    {
      name: 'อายุ',
      sortable: true,
      selector: (row: IPatient) => row.age ?? '-',
      cell: (row: IPatient) => {
        return row.age;
      },
    },
    {
      name: 'ส่วนสูง',
      sortable: true,
      selector: (row: IPatient) => row.height ?? '-',
      cell: (row: IPatient) => {
        return row.height;
      },
    },
    {
      name: 'น้ำหนัก',
      sortable: true,
      selector: (row: IPatient) => row.weight ?? '-',
      cell: (row: IPatient) => {
        return row.weight;
      },
    },
    {
      name: 'เบอร์โทรศัพท์ผู้ป่วย',
      sortable: true,
      selector: (row: IPatient) => row.telephoneNumber ?? '-',
      cell: (row: IPatient) => {
        return row.telephoneNumber;
      },
    },
    {
      name: 'ชื่่อญาติที่ติดต่อได้',
      sortable: true,
      selector: (row: IPatient) => row.relativeName ?? '-',
      cell: (row: IPatient) => {
        return row.relativeName;
      },
    },
    {
      name: 'เบอร์โทรศัพท์ญาติที่ติดต่อได้',
      sortable: true,
      selector: (row: IPatient) => row.relativeContract ?? '-',
      cell: (row: IPatient) => {
        return row.relativeContract;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IPatient) => row.remark ?? '-',
      cell: (row: IPatient) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = patientListIsLoading || deletePatientIsLoading;

  return (
    <>
      <Head>
        <title>Patient</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="ชื่อจริงผู้ใช้"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.firstname}
                  onChange={(e) => {
                    searchForm.firstname = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="นามสกุลผู้ใช้"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.lastname}
                  onChange={(e) => {
                    searchForm.lastname = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchPatientToggle();
                    }}
                    type="button"
                    aria-label="Submit search"
                    className="btn w-full md:w-auto btn-primary flex gap-1 items-center justify-center"
                    disabled={isLoading}
                  >
                    <MagnifyingGlassIcon height={24} width={24} />
                    ค้นหา
                  </button>
                  <button
                    onClick={() => {
                      toggleModal();
                    }}
                    type="button"
                    aria-label="Add form"
                    className="btn w-full md:w-auto btn-primary flex gap-1 items-center justify-center"
                    disabled={isLoading}
                  >
                    <PlusIcon height={24} width={24} />
                    เพิ่มรายการ
                  </button>
                </div>
              </div>
            </Card>
            <Card>
              <div className="pt-4">
                <DataTableComponent<IPatient>
                  data={(patientListData as IPatient[]) ?? []}
                  columns={patientTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <PatientModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              patientFormData={patientFormData as IPatientForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default PatientPage;
