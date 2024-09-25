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

import { useDeleteSurvey, useGetSurveyList } from '@services/survey/grid';
import { ISurvey, ISurveyForm, ISurveySearchForm } from '@services/survey/grid/types';
import { SurveyModalForm } from '@components/index';
import { surveySearchFormDefaultValue } from '@src/constants/survey/grid/survey-form';

const SurveyPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<ISurveySearchForm>(surveySearchFormDefaultValue);
  const [surveyFormData, setSurveyFormData] = useState<ISurveyForm | null>(null);

  // React-Query Get Survey List API.
  const {
    data: surveyListData,
    isLoading: surveyListIsLoading,
    refetch: surveyListRefetch,
  } = useGetSurveyList(searchForm);

  // React-Query Delete Survey API.
  const { mutate: deleteSurvey, isLoading: deleteSurveyIsLoading } =
    useDeleteSurvey();

  // Function to Call Delete Survey Data.
  const onDeleteSurvey = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteSurvey(id);
    }
  };

  // Refetch Get Survey List API When Search Button is Toggled.
  const onSearchSurveyToggle = () => {
    surveyListRefetch();
  };

  // Function to Show or Hide Survey Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSurveyFormData(null);
    }
  };

  // Function to Show Modal with Survey Data for Editing. (Get Data from Fetched Table)
  const onEditSurvey = (data: ISurveyForm) => {
    setSurveyFormData({ ...data });
  };

  // Life-Cycle to Show Modal with Survey Data When onEditSurvey() Function Has Been Call Back.
  useEffect(() => {
    if (surveyFormData) {
      setIsOpen(true);
    }
  }, [surveyFormData]);

  // Survey Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const surveyTableColumn: TableColumn<ISurvey>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: ISurvey) => row.id,
      center: false,
      width: '115px',
      cell: (row: ISurvey) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditSurvey(row as unknown as ISurveyForm);
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
                onDeleteSurvey(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'ผู้ป่วย',
      sortable: true,
      selector: (row: ISurvey) => row.patientId ?? '-',
      cell: (row: ISurvey) => {
        return row.patientId;
      },
    },
    {
      name: 'หมอที่ทำการตรวจ',
      sortable: true,
      selector: (row: ISurvey) => row.doctorId ?? '-',
      cell: (row: ISurvey) => {
        return row.doctorId;
      },
    },
    {
      name: 'ความดันโลหิต',
      sortable: true,
      selector: (row: ISurvey) => row.BloodPressure ?? '-',
      cell: (row: ISurvey) => {
        return row.BloodPressure;
      },
    },
    {
      name: 'ระดับเลือด',
      sortable: true,
      selector: (row: ISurvey) => row.OxygenLevel ?? '-',
      cell: (row: ISurvey) => {
        return row.OxygenLevel;
      },
    },
    {
      name: 'อัตราการเต้นของหัวใจ',
      sortable: true,
      selector: (row: ISurvey) => row.HeartRate ?? '-',
      cell: (row: ISurvey) => {
        return row.HeartRate;
      },
    },
    {
      name: 'วันที่ทำการตรวจ',
      sortable: true,
      selector: (row: ISurvey) => row.SurveyDate ?? '-',
      cell: (row: ISurvey) => {
        return row.SurveyDate;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = surveyListIsLoading || deleteSurveyIsLoading;

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="ผู้ป่วย"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.patientId}
                  onChange={(e) => {
                    searchForm.patientId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="หมอที่ทำการตรวจ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.doctorId}
                  onChange={(e) => {
                    searchForm.doctorId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchSurveyToggle();
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
                <DataTableComponent<ISurvey>
                  data={(surveyListData as ISurvey[]) ?? []}
                  columns={surveyTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <SurveyModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              surveyFormData={surveyFormData as ISurveyForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default SurveyPage;
