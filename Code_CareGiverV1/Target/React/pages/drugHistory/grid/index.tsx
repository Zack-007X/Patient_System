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

import { useDeleteDrugHistory, useGetDrugHistoryList } from '@services/drugHistory/grid';
import { IDrugHistory, IDrugHistoryForm, IDrugHistorySearchForm } from '@services/drugHistory/grid/types';
import { DrugHistoryModalForm } from '@components/index';
import { drugHistorySearchFormDefaultValue } from '@src/constants/drugHistory/grid/drugHistory-form';

const DrugHistoryPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IDrugHistorySearchForm>(drugHistorySearchFormDefaultValue);
  const [drugHistoryFormData, setDrugHistoryFormData] = useState<IDrugHistoryForm | null>(null);

  // React-Query Get DrugHistory List API.
  const {
    data: drugHistoryListData,
    isLoading: drugHistoryListIsLoading,
    refetch: drugHistoryListRefetch,
  } = useGetDrugHistoryList(searchForm);

  // React-Query Delete DrugHistory API.
  const { mutate: deleteDrugHistory, isLoading: deleteDrugHistoryIsLoading } =
    useDeleteDrugHistory();

  // Function to Call Delete DrugHistory Data.
  const onDeleteDrugHistory = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteDrugHistory(id);
    }
  };

  // Refetch Get DrugHistory List API When Search Button is Toggled.
  const onSearchDrugHistoryToggle = () => {
    drugHistoryListRefetch();
  };

  // Function to Show or Hide DrugHistory Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setDrugHistoryFormData(null);
    }
  };

  // Function to Show Modal with DrugHistory Data for Editing. (Get Data from Fetched Table)
  const onEditDrugHistory = (data: IDrugHistoryForm) => {
    setDrugHistoryFormData({ ...data });
  };

  // Life-Cycle to Show Modal with DrugHistory Data When onEditDrugHistory() Function Has Been Call Back.
  useEffect(() => {
    if (drugHistoryFormData) {
      setIsOpen(true);
    }
  }, [drugHistoryFormData]);

  // DrugHistory Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const drugHistoryTableColumn: TableColumn<IDrugHistory>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IDrugHistory) => row.id,
      center: false,
      width: '115px',
      cell: (row: IDrugHistory) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditDrugHistory(row as unknown as IDrugHistoryForm);
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
                onDeleteDrugHistory(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'ยา',
      sortable: true,
      selector: (row: IDrugHistory) => row.masterDrugID ?? '-',
      cell: (row: IDrugHistory) => {
        return row.masterDrugID;
      },
    },
    {
      name: 'รายการการ Treatment',
      sortable: true,
      selector: (row: IDrugHistory) => row.treatmentScheduleId ?? '-',
      cell: (row: IDrugHistory) => {
        return row.treatmentScheduleId;
      },
    },
    {
      name: 'จำนวนยา',
      sortable: true,
      selector: (row: IDrugHistory) => row.amount ?? '-',
      cell: (row: IDrugHistory) => {
        return row.amount;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IDrugHistory) => row.remark ?? '-',
      cell: (row: IDrugHistory) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = drugHistoryListIsLoading || deleteDrugHistoryIsLoading;

  return (
    <>
      <Head>
        <title>DrugHistory</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="ยา"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.masterDrugID}
                  onChange={(e) => {
                    searchForm.masterDrugID = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="รายการการ Treatment"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.treatmentScheduleId}
                  onChange={(e) => {
                    searchForm.treatmentScheduleId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchDrugHistoryToggle();
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
                <DataTableComponent<IDrugHistory>
                  data={(drugHistoryListData as IDrugHistory[]) ?? []}
                  columns={drugHistoryTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <DrugHistoryModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              drugHistoryFormData={drugHistoryFormData as IDrugHistoryForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default DrugHistoryPage;
