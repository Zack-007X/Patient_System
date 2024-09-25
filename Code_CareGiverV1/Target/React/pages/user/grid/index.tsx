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

import { useDeleteUser, useGetUserList } from '@services/user/grid';
import { IUser, IUserForm, IUserSearchForm } from '@services/user/grid/types';
import { UserModalForm } from '@components/index';
import { userSearchFormDefaultValue } from '@src/constants/user/grid/user-form';

const UserPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IUserSearchForm>(userSearchFormDefaultValue);
  const [userFormData, setUserFormData] = useState<IUserForm | null>(null);

  // React-Query Get User List API.
  const {
    data: userListData,
    isLoading: userListIsLoading,
    refetch: userListRefetch,
  } = useGetUserList(searchForm);

  // React-Query Delete User API.
  const { mutate: deleteUser, isLoading: deleteUserIsLoading } =
    useDeleteUser();

  // Function to Call Delete User Data.
  const onDeleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteUser(id);
    }
  };

  // Refetch Get User List API When Search Button is Toggled.
  const onSearchUserToggle = () => {
    userListRefetch();
  };

  // Function to Show or Hide User Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUserFormData(null);
    }
  };

  // Function to Show Modal with User Data for Editing. (Get Data from Fetched Table)
  const onEditUser = (data: IUserForm) => {
    setUserFormData({ ...data });
  };

  // Life-Cycle to Show Modal with User Data When onEditUser() Function Has Been Call Back.
  useEffect(() => {
    if (userFormData) {
      setIsOpen(true);
    }
  }, [userFormData]);

  // User Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const userTableColumn: TableColumn<IUser>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IUser) => row.id,
      center: false,
      width: '115px',
      cell: (row: IUser) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditUser(row as unknown as IUserForm);
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
                onDeleteUser(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'ชื่อผู้ใช้',
      sortable: true,
      selector: (row: IUser) => row.username ?? '-',
      cell: (row: IUser) => {
        return row.username;
      },
    },
    {
      name: 'อีเมล',
      sortable: true,
      selector: (row: IUser) => row.email ?? '-',
      cell: (row: IUser) => {
        return row.email;
      },
    },
    {
      name: 'คำนำหน้า',
      sortable: true,
      selector: (row: IUser) => row.masterPrefixId ?? '-',
      cell: (row: IUser) => {
        return row.masterPrefixId;
      },
    },
    {
      name: 'ชื่อจริงผู้ใช้',
      sortable: true,
      selector: (row: IUser) => row.firstname ?? '-',
      cell: (row: IUser) => {
        return row.firstname;
      },
    },
    {
      name: 'นามสกุลผู้ใช้',
      sortable: true,
      selector: (row: IUser) => row.lastname ?? '-',
      cell: (row: IUser) => {
        return row.lastname;
      },
    },
    {
      name: 'เบอร์โทรศัพท์',
      sortable: true,
      selector: (row: IUser) => row.telephoneNumber ?? '-',
      cell: (row: IUser) => {
        return row.telephoneNumber;
      },
    },
    {
      name: 'กลุ่มผู้ใช้',
      sortable: true,
      selector: (row: IUser) => row.masterRoleId ?? '-',
      cell: (row: IUser) => {
        return row.masterRoleId;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IUser) => row.remark ?? '-',
      cell: (row: IUser) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = userListIsLoading || deleteUserIsLoading;

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.username}
                  onChange={(e) => {
                    searchForm.username = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
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
                      onSearchUserToggle();
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
                <DataTableComponent<IUser>
                  data={(userListData as IUser[]) ?? []}
                  columns={userTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <UserModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              userFormData={userFormData as IUserForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default UserPage;
