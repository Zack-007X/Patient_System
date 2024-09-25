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

import { useDeleteMasterPermission, useGetMasterPermissionList } from '@services/masterPermission/grid';
import { IMasterPermission, IMasterPermissionForm, IMasterPermissionSearchForm } from '@services/masterPermission/grid/types';
import { MasterPermissionModalForm } from '@components/index';
import { masterPermissionSearchFormDefaultValue } from '@src/constants/masterPermission/grid/masterPermission-form';

const MasterPermissionPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterPermissionSearchForm>(masterPermissionSearchFormDefaultValue);
  const [masterPermissionFormData, setMasterPermissionFormData] = useState<IMasterPermissionForm | null>(null);

  // React-Query Get MasterPermission List API.
  const {
    data: masterPermissionListData,
    isLoading: masterPermissionListIsLoading,
    refetch: masterPermissionListRefetch,
  } = useGetMasterPermissionList(searchForm);

  // React-Query Delete MasterPermission API.
  const { mutate: deleteMasterPermission, isLoading: deleteMasterPermissionIsLoading } =
    useDeleteMasterPermission();

  // Function to Call Delete MasterPermission Data.
  const onDeleteMasterPermission = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterPermission(id);
    }
  };

  // Refetch Get MasterPermission List API When Search Button is Toggled.
  const onSearchMasterPermissionToggle = () => {
    masterPermissionListRefetch();
  };

  // Function to Show or Hide MasterPermission Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterPermissionFormData(null);
    }
  };

  // Function to Show Modal with MasterPermission Data for Editing. (Get Data from Fetched Table)
  const onEditMasterPermission = (data: IMasterPermissionForm) => {
    setMasterPermissionFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterPermission Data When onEditMasterPermission() Function Has Been Call Back.
  useEffect(() => {
    if (masterPermissionFormData) {
      setIsOpen(true);
    }
  }, [masterPermissionFormData]);

  // MasterPermission Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterPermissionTableColumn: TableColumn<IMasterPermission>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterPermission) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterPermission) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterPermission(row as unknown as IMasterPermissionForm);
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
                onDeleteMasterPermission(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขสิทธิ์การใช้งาน',
      sortable: true,
      selector: (row: IMasterPermission) => row.code ?? '-',
      cell: (row: IMasterPermission) => {
        return row.code;
      },
    },
    {
      name: 'ชื่อสิทธิ์การใช้งาน',
      sortable: true,
      selector: (row: IMasterPermission) => row.name ?? '-',
      cell: (row: IMasterPermission) => {
        return row.name;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterPermission) => row.remark ?? '-',
      cell: (row: IMasterPermission) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterPermissionListIsLoading || deleteMasterPermissionIsLoading;

  return (
    <>
      <Head>
        <title>MasterPermission</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="เลขสิทธิ์การใช้งาน"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.code}
                  onChange={(e) => {
                    searchForm.code = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="ชื่อสิทธิ์การใช้งาน"
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
                      onSearchMasterPermissionToggle();
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
                <DataTableComponent<IMasterPermission>
                  data={(masterPermissionListData as IMasterPermission[]) ?? []}
                  columns={masterPermissionTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterPermissionModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterPermissionFormData={masterPermissionFormData as IMasterPermissionForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterPermissionPage;
