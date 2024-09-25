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

import { useDeleteUserHasSpecial, useGetUserHasSpecialList } from '@services/userHasSpecial/grid';
import { IUserHasSpecial, IUserHasSpecialForm, IUserHasSpecialSearchForm } from '@services/userHasSpecial/grid/types';
import { UserHasSpecialModalForm } from '@components/index';
import { userHasSpecialSearchFormDefaultValue } from '@src/constants/userHasSpecial/grid/userHasSpecial-form';

const UserHasSpecialPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IUserHasSpecialSearchForm>(userHasSpecialSearchFormDefaultValue);
  const [userHasSpecialFormData, setUserHasSpecialFormData] = useState<IUserHasSpecialForm | null>(null);

  // React-Query Get UserHasSpecial List API.
  const {
    data: userHasSpecialListData,
    isLoading: userHasSpecialListIsLoading,
    refetch: userHasSpecialListRefetch,
  } = useGetUserHasSpecialList(searchForm);

  // React-Query Delete UserHasSpecial API.
  const { mutate: deleteUserHasSpecial, isLoading: deleteUserHasSpecialIsLoading } =
    useDeleteUserHasSpecial();

  // Function to Call Delete UserHasSpecial Data.
  const onDeleteUserHasSpecial = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteUserHasSpecial(id);
    }
  };

  // Refetch Get UserHasSpecial List API When Search Button is Toggled.
  const onSearchUserHasSpecialToggle = () => {
    userHasSpecialListRefetch();
  };

  // Function to Show or Hide UserHasSpecial Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUserHasSpecialFormData(null);
    }
  };

  // Function to Show Modal with UserHasSpecial Data for Editing. (Get Data from Fetched Table)
  const onEditUserHasSpecial = (data: IUserHasSpecialForm) => {
    setUserHasSpecialFormData({ ...data });
  };

  // Life-Cycle to Show Modal with UserHasSpecial Data When onEditUserHasSpecial() Function Has Been Call Back.
  useEffect(() => {
    if (userHasSpecialFormData) {
      setIsOpen(true);
    }
  }, [userHasSpecialFormData]);

  // UserHasSpecial Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const userHasSpecialTableColumn: TableColumn<IUserHasSpecial>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IUserHasSpecial) => row.id,
      center: false,
      width: '115px',
      cell: (row: IUserHasSpecial) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditUserHasSpecial(row as unknown as IUserHasSpecialForm);
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
                onDeleteUserHasSpecial(row.id ?? '');
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
      selector: (row: IUserHasSpecial) => row.masterRoleId ?? '-',
      cell: (row: IUserHasSpecial) => {
        return row.masterRoleId;
      },
    },
    {
      name: 'ความเชี่ยวชาญ',
      sortable: true,
      selector: (row: IUserHasSpecial) => row.specialSkill ?? '-',
      cell: (row: IUserHasSpecial) => {
        return row.specialSkill;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IUserHasSpecial) => row.remark ?? '-',
      cell: (row: IUserHasSpecial) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = userHasSpecialListIsLoading || deleteUserHasSpecialIsLoading;

  return (
    <>
      <Head>
        <title>UserHasSpecial</title>
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
                  placeholder="ความเชี่ยวชาญ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.specialSkill}
                  onChange={(e) => {
                    searchForm.specialSkill = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSearchUserHasSpecialToggle();
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
                <DataTableComponent<IUserHasSpecial>
                  data={(userHasSpecialListData as IUserHasSpecial[]) ?? []}
                  columns={userHasSpecialTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <UserHasSpecialModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              userHasSpecialFormData={userHasSpecialFormData as IUserHasSpecialForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default UserHasSpecialPage;
