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

import { useDeleteMasterDrug, useGetMasterDrugList } from '@services/masterDrug/grid';
import { IMasterDrug, IMasterDrugForm, IMasterDrugSearchForm } from '@services/masterDrug/grid/types';
import { MasterDrugModalForm } from '@components/index';
import { masterDrugSearchFormDefaultValue } from '@src/constants/masterDrug/grid/masterDrug-form';

const MasterDrugPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterDrugSearchForm>(masterDrugSearchFormDefaultValue);
  const [masterDrugFormData, setMasterDrugFormData] = useState<IMasterDrugForm | null>(null);

  // React-Query Get MasterDrug List API.
  const {
    data: masterDrugListData,
    isLoading: masterDrugListIsLoading,
    refetch: masterDrugListRefetch,
  } = useGetMasterDrugList(searchForm);

  // React-Query Delete MasterDrug API.
  const { mutate: deleteMasterDrug, isLoading: deleteMasterDrugIsLoading } =
    useDeleteMasterDrug();

  // Function to Call Delete MasterDrug Data.
  const onDeleteMasterDrug = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterDrug(id);
    }
  };

  // Refetch Get MasterDrug List API When Search Button is Toggled.
  const onSearchMasterDrugToggle = () => {
    masterDrugListRefetch();
  };

  // Function to Show or Hide MasterDrug Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterDrugFormData(null);
    }
  };

  // Function to Show Modal with MasterDrug Data for Editing. (Get Data from Fetched Table)
  const onEditMasterDrug = (data: IMasterDrugForm) => {
    setMasterDrugFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterDrug Data When onEditMasterDrug() Function Has Been Call Back.
  useEffect(() => {
    if (masterDrugFormData) {
      setIsOpen(true);
    }
  }, [masterDrugFormData]);

  // MasterDrug Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterDrugTableColumn: TableColumn<IMasterDrug>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterDrug) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterDrug) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterDrug(row as unknown as IMasterDrugForm);
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
                onDeleteMasterDrug(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขสถานะผู้ป่วย',
      sortable: true,
      selector: (row: IMasterDrug) => row.code ?? '-',
      cell: (row: IMasterDrug) => {
        return row.code;
      },
    },
    {
      name: 'สถานะผู้ป่วย',
      sortable: true,
      selector: (row: IMasterDrug) => row.name ?? '-',
      cell: (row: IMasterDrug) => {
        return row.name;
      },
    },
    {
      name: 'ปริมาณ',
      sortable: true,
      selector: (row: IMasterDrug) => row.dosage ?? '-',
      cell: (row: IMasterDrug) => {
        return row.dosage;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterDrug) => row.remark ?? '-',
      cell: (row: IMasterDrug) => {
        return row.remark;
      },
    },
    {
      name: 'รายละเอียดยา',
      sortable: true,
      selector: (row: IMasterDrug) => row.details ?? '-',
      cell: (row: IMasterDrug) => {
        return row.details;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterDrugListIsLoading || deleteMasterDrugIsLoading;

  return (
    <>
      <Head>
        <title>MasterDrug</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="เลขสถานะผู้ป่วย"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.code}
                  onChange={(e) => {
                    searchForm.code = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="สถานะผู้ป่วย"
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
                      onSearchMasterDrugToggle();
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
                <DataTableComponent<IMasterDrug>
                  data={(masterDrugListData as IMasterDrug[]) ?? []}
                  columns={masterDrugTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterDrugModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterDrugFormData={masterDrugFormData as IMasterDrugForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterDrugPage;
