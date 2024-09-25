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

import { useDeleteMasterGender, useGetMasterGenderList } from '@services/masterGender/grid';
import { IMasterGender, IMasterGenderForm, IMasterGenderSearchForm } from '@services/masterGender/grid/types';
import { MasterGenderModalForm } from '@components/index';
import { masterGenderSearchFormDefaultValue } from '@src/constants/masterGender/grid/masterGender-form';

const MasterGenderPage: NextPage = () => {
  // Declaration React State Life-Cycle Parameters
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchForm, setSearchForm] = useState<IMasterGenderSearchForm>(masterGenderSearchFormDefaultValue);
  const [masterGenderFormData, setMasterGenderFormData] = useState<IMasterGenderForm | null>(null);

  // React-Query Get MasterGender List API.
  const {
    data: masterGenderListData,
    isLoading: masterGenderListIsLoading,
    refetch: masterGenderListRefetch,
  } = useGetMasterGenderList(searchForm);

  // React-Query Delete MasterGender API.
  const { mutate: deleteMasterGender, isLoading: deleteMasterGenderIsLoading } =
    useDeleteMasterGender();

  // Function to Call Delete MasterGender Data.
  const onDeleteMasterGender = async (id: string) => {
    const result = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลใช่หรือไม่?',
      text: `กรุณาตรวจสอบให้แน่ใจข้อมูลจะไม่สามารถกู้คืนได้: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      deleteMasterGender(id);
    }
  };

  // Refetch Get MasterGender List API When Search Button is Toggled.
  const onSearchMasterGenderToggle = () => {
    masterGenderListRefetch();
  };

  // Function to Show or Hide MasterGender Modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMasterGenderFormData(null);
    }
  };

  // Function to Show Modal with MasterGender Data for Editing. (Get Data from Fetched Table)
  const onEditMasterGender = (data: IMasterGenderForm) => {
    setMasterGenderFormData({ ...data });
  };

  // Life-Cycle to Show Modal with MasterGender Data When onEditMasterGender() Function Has Been Call Back.
  useEffect(() => {
    if (masterGenderFormData) {
      setIsOpen(true);
    }
  }, [masterGenderFormData]);

  // MasterGender Datatables Headers and Mapping Data Column Cell. (The left side of the table is positioned as array 0.)
  const masterGenderTableColumn: TableColumn<IMasterGender>[] = [
    {
      name: 'เครื่องมือ',
      sortable: false,
      selector: (row: IMasterGender) => row.id,
      center: false,
      width: '115px',
      cell: (row: IMasterGender) => {
        return (
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                onEditMasterGender(row as unknown as IMasterGenderForm);
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
                onDeleteMasterGender(row.id ?? '');
              }}
            >
              <TrashIcon width={20} height={20} />
            </button>
          </div>
        );
      },
    },

    {
      name: 'เลขเพศ',
      sortable: true,
      selector: (row: IMasterGender) => row.code ?? '-',
      cell: (row: IMasterGender) => {
        return row.code;
      },
    },
    {
      name: 'เพศ',
      sortable: true,
      selector: (row: IMasterGender) => row.name ?? '-',
      cell: (row: IMasterGender) => {
        return row.name;
      },
    },
    {
      name: 'หมายเหตุ',
      sortable: true,
      selector: (row: IMasterGender) => row.remark ?? '-',
      cell: (row: IMasterGender) => {
        return row.remark;
      },
    },
  ];

  // Page Loading Behavior
  const isLoading = masterGenderListIsLoading || deleteMasterGenderIsLoading;

  return (
    <>
      <Head>
        <title>MasterGender</title>
      </Head>
      <main>
        <DashboardLayout>
          <div className="flex flex-col gap-3">
            <Card>
              <div>ค้นหา</div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="เลขเพศ"
                  className="input block w-full max-w-full md:max-w-xs"
                  defaultValue={searchForm.code}
                  onChange={(e) => {
                    searchForm.code = e.target.value;
                    setSearchForm(searchForm);                           
                  }}
                  disabled={isLoading}
                />                <input
                  type="text"
                  placeholder="เพศ"
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
                      onSearchMasterGenderToggle();
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
                <DataTableComponent<IMasterGender>
                  data={(masterGenderListData as IMasterGender[]) ?? []}
                  columns={masterGenderTableColumn}
                  isLoading={isLoading}
                />
              </div>
            </Card>
            <MasterGenderModalForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggleModal={toggleModal}
              masterGenderFormData={masterGenderFormData as IMasterGenderForm}
            />
          </div>
        </DashboardLayout>
      </main>
    </>
  );
};

export default MasterGenderPage;
