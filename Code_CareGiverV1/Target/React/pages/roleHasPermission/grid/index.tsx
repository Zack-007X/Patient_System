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

import { useDeleteRoleHasPermission, useGetRoleHasPermissionList } from '@services/roleHasPermission/grid';
import { IRoleHasPermission, IRoleHasPermissionForm, IRoleHasPermissionSearchForm } from '@services/roleHasPermission/grid/types';
import { RoleHasPermissionModalForm } from '@components/index';
import { roleHasPermissionSearchFormDefaultValue } from '@src/constants/roleHasPermission/grid/roleHasPermission-form';

const RoleHasPermissionPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IRoleHasPermissionSearchForm>(roleHasPermissionSearchFormDefaultValue);
  const [roleHasPermissionFormData, setRoleHasPermissionFormData] = useState<IRoleHasPermissionForm | null>(null);

  // React-Query Get RoleHasPermission List API.
  const {
    data: roleHasPermissionListData,
    isLoading: roleHasPermissionListIsLoading,
    refetch: roleHasPermissionListRefetch,
  } = useGetRoleHasPermissionList(searchForm);

  // React-Query Delete RoleHasPermission API.
  const { mutate: deleteRoleHasPermission, isLoading: deleteRoleHasPermissionIsLoading } =
    useDeleteRoleHasPermission();

  // Function to Call Delete RoleHasPermission Data.
  const onDeleteRoleHasPermission = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteRoleHasPermission(id);
    }
  };

  // Refetch Get RoleHasPermission List API When Search Button is Toggled.
  const onSearchRoleHasPermissionToggle = () => {
    roleHasPermissionListRefetch();
  };

  // Function to Show or Hide RoleHasPermission Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setRoleHasPermissionFormData(null);
    }
  };

  // Function to Show Modal with RoleHasPermission Data for Editing. (Get Data from Fetched Table)
  const onEditRoleHasPermission = (data: IRoleHasPermissionForm) => {
    setRoleHasPermissionFormData({ ...data });
  };

  // Life-Cycle to Show Modal with RoleHasPermission Data When onEditRoleHasPermission() Function Has Been Call Back.
  useEffect(() => {
    if (roleHasPermissionFormData) {
      setIsOpen(true);
    }
  }, [roleHasPermissionFormData]);

  // RoleHasPermission Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const roleHasPermissionTableColumn: TableColumn<IRoleHasPermission>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IRoleHasPermission) => row.id,
      center: false,
      width: '115px',
      cell: (row: IRoleHasPermission) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditRoleHasPermission(row as unknown as IRoleHasPermissionForm);
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
                onDeleteRoleHasPermission(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'รหัสกลุ่มผู้ใช้',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.masterRoleId ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.masterRoleId;
      },
    },
    {
      name: 'รหัสสิทธิ์การใช้งาน',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.masterPermissionId ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.masterPermissionId;
      },
    },
    {
      name: 'สิทธิ์การเพิ่ม',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.create ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.create;
      },
    },
    {
      name: 'สิทธิ์การอ่าน',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.read ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.read;
      },
    },
    {
      name: 'สิทธิ์การแก้ไข',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.update ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.update;
      },
    },
    {
      name: 'สิทธิ์การลบ',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.delete ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.delete;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IRoleHasPermission) => row.remark ?? '-',
      cell: (row: IRoleHasPermission) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = roleHasPermissionListIsLoading || deleteRoleHasPermissionIsLoading;

  return (
    <>
      <Head>
        <title>RoleHasPermission</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="รหัสกลุ่มผู้ใช้"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.masterRoleId}
                  onChange={(e) => {
                    searchForm.masterRoleId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="รหัสสิทธิ์การใช้งาน"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.masterPermissionId}
                  onChange={(e) => {
                    searchForm.masterPermissionId = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchRoleHasPermissionToggle();
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
                <DataTableComponent<IRoleHasPermission>
                  data={(roleHasPermissionListData as IRoleHasPermission[]) ?? []}
                  columns={roleHasPermissionTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <RoleHasPermissionModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              roleHasPermissionFormData={roleHasPermissionFormData as IRoleHasPermissionForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default RoleHasPermissionPage;
