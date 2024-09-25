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

import { useDeleteMasterRole, useGetMasterRoleList } from '@services/masterRole/grid';
import { IMasterRole, IMasterRoleForm, IMasterRoleSearchForm } from '@services/masterRole/grid/types';
import { MasterRoleModalForm } from '@components/index';
import { masterRoleSearchFormDefaultValue } from '@src/constants/masterRole/grid/masterRole-form';

const MasterRolePage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterRoleSearchForm>(masterRoleSearchFormDefaultValue);
  const [masterRoleFormData, setMasterRoleFormData] = useState<IMasterRoleForm | null>(null);

  // React-Query Get MasterRole List API.
  const {
    data: masterRoleListData,
    isLoading: masterRoleListIsLoading,
    refetch: masterRoleListRefetch,
  } = useGetMasterRoleList(searchForm);

  // React-Query Delete MasterRole API.
  const { mutate: deleteMasterRole, isLoading: deleteMasterRoleIsLoading } =
    useDeleteMasterRole();

  // Function to Call Delete MasterRole Data.
  const onDeleteMasterRole = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterRole(id);
    }
  };

  // Refetch Get MasterRole List API When Search Button is Toggled.
  const onSearchMasterRoleToggle = () => {
    masterRoleListRefetch();
  };

  // Function to Show or Hide MasterRole Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterRoleFormData(null);
    }
  };

  // Function to Show Modal with MasterRole Data for Editing. (Get Data from Fetched Table)
  const onEditMasterRole = (data: IMasterRoleForm) => {
    setMasterRoleFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterRole Data When onEditMasterRole() Function Has Been Call Back.
  useEffect(() => {
    if (masterRoleFormData) {
      setIsOpen(true);
    }
  }, [masterRoleFormData]);

  // MasterRole Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterRoleTableColumn: TableColumn<IMasterRole>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterRole) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterRole) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterRole(row as unknown as IMasterRoleForm);
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
                onDeleteMasterRole(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขกลุ่มผู้ใช้',
      sortable: true,
      selector: (row: IMasterRole) => row.code ?? '-',
      cell: (row: IMasterRole) => {
        return row.code;
      },
    },
    {
      name: 'ชื่อกลุ่มผู้ใช้',
      sortable: true,
      selector: (row: IMasterRole) => row.name ?? '-',
      cell: (row: IMasterRole) => {
        return row.name;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterRole) => row.remark ?? '-',
      cell: (row: IMasterRole) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterRoleListIsLoading || deleteMasterRoleIsLoading;

  return (
    <>
      <Head>
        <title>MasterRole</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="เลขกลุ่มผู้ใช้"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.code}
                  onChange={(e) => {
                    searchForm.code = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="ชื่อกลุ่มผู้ใช้"
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
                      onSearchMasterRoleToggle();
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
                <DataTableComponent<IMasterRole>
                  data={(masterRoleListData as IMasterRole[]) ?? []}
                  columns={masterRoleTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterRoleModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterRoleFormData={masterRoleFormData as IMasterRoleForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterRolePage;
