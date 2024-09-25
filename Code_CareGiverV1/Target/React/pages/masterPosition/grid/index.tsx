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

import { useDeleteMasterPosition, useGetMasterPositionList } from '@services/masterPosition/grid';
import { IMasterPosition, IMasterPositionForm, IMasterPositionSearchForm } from '@services/masterPosition/grid/types';
import { MasterPositionModalForm } from '@components/index';
import { masterPositionSearchFormDefaultValue } from '@src/constants/masterPosition/grid/masterPosition-form';

const MasterPositionPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterPositionSearchForm>(masterPositionSearchFormDefaultValue);
  const [masterPositionFormData, setMasterPositionFormData] = useState<IMasterPositionForm | null>(null);

  // React-Query Get MasterPosition List API.
  const {
    data: masterPositionListData,
    isLoading: masterPositionListIsLoading,
    refetch: masterPositionListRefetch,
  } = useGetMasterPositionList(searchForm);

  // React-Query Delete MasterPosition API.
  const { mutate: deleteMasterPosition, isLoading: deleteMasterPositionIsLoading } =
    useDeleteMasterPosition();

  // Function to Call Delete MasterPosition Data.
  const onDeleteMasterPosition = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterPosition(id);
    }
  };

  // Refetch Get MasterPosition List API When Search Button is Toggled.
  const onSearchMasterPositionToggle = () => {
    masterPositionListRefetch();
  };

  // Function to Show or Hide MasterPosition Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterPositionFormData(null);
    }
  };

  // Function to Show Modal with MasterPosition Data for Editing. (Get Data from Fetched Table)
  const onEditMasterPosition = (data: IMasterPositionForm) => {
    setMasterPositionFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterPosition Data When onEditMasterPosition() Function Has Been Call Back.
  useEffect(() => {
    if (masterPositionFormData) {
      setIsOpen(true);
    }
  }, [masterPositionFormData]);

  // MasterPosition Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterPositionTableColumn: TableColumn<IMasterPosition>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterPosition) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterPosition) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterPosition(row as unknown as IMasterPositionForm);
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
                onDeleteMasterPosition(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขตำแหน่งราชการ',
      sortable: true,
      selector: (row: IMasterPosition) => row.code ?? '-',
      cell: (row: IMasterPosition) => {
        return row.code;
      },
    },
    {
      name: 'ชื่อตำแหน่งราชการ',
      sortable: true,
      selector: (row: IMasterPosition) => row.name ?? '-',
      cell: (row: IMasterPosition) => {
        return row.name;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterPosition) => row.remark ?? '-',
      cell: (row: IMasterPosition) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterPositionListIsLoading || deleteMasterPositionIsLoading;

  return (
    <>
      <Head>
        <title>MasterPosition</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="เลขตำแหน่งราชการ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.code}
                  onChange={(e) => {
                    searchForm.code = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="ชื่อตำแหน่งราชการ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.name}
                  onChange={(e) => {
                    searchForm.name = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchMasterPositionToggle();
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
                <DataTableComponent<IMasterPosition>
                  data={(masterPositionListData as IMasterPosition[]) ?? []}
                  columns={masterPositionTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterPositionModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterPositionFormData={masterPositionFormData as IMasterPositionForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterPositionPage;
