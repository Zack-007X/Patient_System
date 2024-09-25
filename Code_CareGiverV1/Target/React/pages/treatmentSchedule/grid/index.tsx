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

import { useDeleteTreatmentSchedule, useGetTreatmentScheduleList } from '@services/treatmentSchedule/grid';
import { ITreatmentSchedule, ITreatmentScheduleForm, ITreatmentScheduleSearchForm } from '@services/treatmentSchedule/grid/types';
import { TreatmentScheduleModalForm } from '@components/index';
import { treatmentScheduleSearchFormDefaultValue } from '@src/constants/treatmentSchedule/grid/treatmentSchedule-form';

const TreatmentSchedulePage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<ITreatmentScheduleSearchForm>(treatmentScheduleSearchFormDefaultValue);
  const [treatmentScheduleFormData, setTreatmentScheduleFormData] = useState<ITreatmentScheduleForm | null>(null);

  // React-Query Get TreatmentSchedule List API.
  const {
    data: treatmentScheduleListData,
    isLoading: treatmentScheduleListIsLoading,
    refetch: treatmentScheduleListRefetch,
  } = useGetTreatmentScheduleList(searchForm);

  // React-Query Delete TreatmentSchedule API.
  const { mutate: deleteTreatmentSchedule, isLoading: deleteTreatmentScheduleIsLoading } =
    useDeleteTreatmentSchedule();

  // Function to Call Delete TreatmentSchedule Data.
  const onDeleteTreatmentSchedule = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteTreatmentSchedule(id);
    }
  };

  // Refetch Get TreatmentSchedule List API When Search Button is Toggled.
  const onSearchTreatmentScheduleToggle = () => {
    treatmentScheduleListRefetch();
  };

  // Function to Show or Hide TreatmentSchedule Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTreatmentScheduleFormData(null);
    }
  };

  // Function to Show Modal with TreatmentSchedule Data for Editing. (Get Data from Fetched Table)
  const onEditTreatmentSchedule = (data: ITreatmentScheduleForm) => {
    setTreatmentScheduleFormData({ ...data });
  };

  // Life-Cycle to Show Modal with TreatmentSchedule Data When onEditTreatmentSchedule() Function Has Been Call Back.
  useEffect(() => {
    if (treatmentScheduleFormData) {
      setIsOpen(true);
    }
  }, [treatmentScheduleFormData]);

  // TreatmentSchedule Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const treatmentScheduleTableColumn: TableColumn<ITreatmentSchedule>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: ITreatmentSchedule) => row.id,
      center: false,
      width: '115px',
      cell: (row: ITreatmentSchedule) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditTreatmentSchedule(row as unknown as ITreatmentScheduleForm);
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
                onDeleteTreatmentSchedule(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'รายงานการตรวจ',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.surveyId ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.surveyId;
      },
    },
    {
      name: 'แผน Treatment',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.planingTopic ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.planingTopic;
      },
    },
    {
      name: 'สถานะ Treatment',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.planingDetails ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.planingDetails;
      },
    },
    {
      name: 'วันเริ่มต้น Treatment',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.startTreatmentDate ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.startTreatmentDate;
      },
    },
    {
      name: 'ผู้ดูแล',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.CaregiverId ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.CaregiverId;
      },
    },
    {
      name: 'ผลการ Treatment',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.TreatmentReportTopic ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.TreatmentReportTopic;
      },
    },
    {
      name: 'รายละเอียด ผลการ Treatment',
      sortable: true,
      selector: (row: ITreatmentSchedule) => row.TreatmentReportDetails ?? '-',
      cell: (row: ITreatmentSchedule) => {
        return row.TreatmentReportDetails;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = treatmentScheduleListIsLoading || deleteTreatmentScheduleIsLoading;

  return (
    <>
      <Head>
        <title>TreatmentSchedule</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="รายงานการตรวจ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.surveyId}
                  onChange={(e) => {
                    searchForm.surveyId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="แผน Treatment"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.planingTopic}
                  onChange={(e) => {
                    searchForm.planingTopic = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="สถานะ Treatment"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.planingDetails}
                  onChange={(e) => {
                    searchForm.planingDetails = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="ผู้ดูแล"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.CaregiverId}
                  onChange={(e) => {
                    searchForm.CaregiverId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchTreatmentScheduleToggle();
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
                <DataTableComponent<ITreatmentSchedule>
                  data={(treatmentScheduleListData as ITreatmentSchedule[]) ?? []}
                  columns={treatmentScheduleTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <TreatmentScheduleModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              treatmentScheduleFormData={treatmentScheduleFormData as ITreatmentScheduleForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default TreatmentSchedulePage;
