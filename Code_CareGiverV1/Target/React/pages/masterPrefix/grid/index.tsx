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

import { useDeleteMasterPrefix, useGetMasterPrefixList } from '@services/masterPrefix/grid';
import { IMasterPrefix, IMasterPrefixForm, IMasterPrefixSearchForm } from '@services/masterPrefix/grid/types';
import { MasterPrefixModalForm } from '@components/index';
import { masterPrefixSearchFormDefaultValue } from '@src/constants/masterPrefix/grid/masterPrefix-form';

const MasterPrefixPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterPrefixSearchForm>(masterPrefixSearchFormDefaultValue);
  const [masterPrefixFormData, setMasterPrefixFormData] = useState<IMasterPrefixForm | null>(null);

  // React-Query Get MasterPrefix List API.
  const {
    data: masterPrefixListData,
    isLoading: masterPrefixListIsLoading,
    refetch: masterPrefixListRefetch,
  } = useGetMasterPrefixList(searchForm);

  // React-Query Delete MasterPrefix API.
  const { mutate: deleteMasterPrefix, isLoading: deleteMasterPrefixIsLoading } =
    useDeleteMasterPrefix();

  // Function to Call Delete MasterPrefix Data.
  const onDeleteMasterPrefix = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterPrefix(id);
    }
  };

  // Refetch Get MasterPrefix List API When Search Button is Toggled.
  const onSearchMasterPrefixToggle = () => {
    masterPrefixListRefetch();
  };

  // Function to Show or Hide MasterPrefix Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterPrefixFormData(null);
    }
  };

  // Function to Show Modal with MasterPrefix Data for Editing. (Get Data from Fetched Table)
  const onEditMasterPrefix = (data: IMasterPrefixForm) => {
    setMasterPrefixFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterPrefix Data When onEditMasterPrefix() Function Has Been Call Back.
  useEffect(() => {
    if (masterPrefixFormData) {
      setIsOpen(true);
    }
  }, [masterPrefixFormData]);

  // MasterPrefix Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterPrefixTableColumn: TableColumn<IMasterPrefix>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterPrefix) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterPrefix) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterPrefix(row as unknown as IMasterPrefixForm);
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
                onDeleteMasterPrefix(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขคำนำหน้า',
      sortable: true,
      selector: (row: IMasterPrefix) => row.code ?? '-',
      cell: (row: IMasterPrefix) => {
        return row.code;
      },
    },
    {
      name: 'คำนำหน้า',
      sortable: true,
      selector: (row: IMasterPrefix) => row.name ?? '-',
      cell: (row: IMasterPrefix) => {
        return row.name;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterPrefix) => row.remark ?? '-',
      cell: (row: IMasterPrefix) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterPrefixListIsLoading || deleteMasterPrefixIsLoading;

  return (
    <>
      <Head>
        <title>MasterPrefix</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="คำนำหน้า"
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
                      onSearchMasterPrefixToggle();
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
                <DataTableComponent<IMasterPrefix>
                  data={(masterPrefixListData as IMasterPrefix[]) ?? []}
                  columns={masterPrefixTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterPrefixModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterPrefixFormData={masterPrefixFormData as IMasterPrefixForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterPrefixPage;
