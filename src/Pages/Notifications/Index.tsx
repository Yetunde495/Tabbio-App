import { useEffect, useState } from "react";
import { fetchUserNotifications } from "../../services/notificationServices";
import Table from "../../components/table";
import { IoCheckmarkDone, IoTimeOutline } from "react-icons/io5";
import TablePagination from "../../components/table/TablePagination";
import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { FaArrowLeft, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Delete from "../../components/modal/Delete";
import { paginate } from "../../lib/utils";
import { formatDateToString2 } from "../../lib/utils/formatters";
import {
  useDeleteNotification,
  useReadAllNotification,
  useReadNotification,
} from "../../services/api/notifications";
import DropdownSupport from "../../layout/DropdownSupport";
import DropdownNotification from "../../layout/DropdownNotification";
import DropdownUser from "../../layout/DropdownUser";
import { GoBell } from "react-icons/go";
import { mocknotifications } from "../../data/mockData";
import { BsTrash3 } from "react-icons/bs";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any>(mocknotifications);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedNotification, setSelectedNotification] = useState<
    string | undefined | null
  >(null);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const { data, isLoading } = useQuery(
    ["ALL_USER_NOTIFICATIONS", page, itemsPerPage],
    fetchUserNotifications,
    {
      keepPreviousData: true,
      onSuccess: (data: any) => {
        setNotifications(data?.data?.notifications?.data);
        // setNotifications(data?.items);
      },
    }
  );

  const pagination = paginate(data?.data?.notifications?.count, Number(page), Number(itemsPerPage));

  const handleToggleAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);

    if (!selectAll) {
      setSelectedItems(notifications.map((val: any) => ({ _id: val?._id })));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (val: any) => {
    setSelectedItems((prevSelectedItems: any) => {
      const itemIndex = prevSelectedItems.findIndex(
        (item: any) => item?._id === val?._id
      );

      if (itemIndex === -1) {
        return [...prevSelectedItems, { _id: val?._id }];
      } else {
        const newSelectedItems = [...prevSelectedItems];
        newSelectedItems.splice(itemIndex, 1);
        return newSelectedItems;
      }
    });

    setSelectedNotifications((prevSelectedItems: any) => {
      const itemIndex = prevSelectedItems.findIndex(
        (item: any) => item?._id === val?._id
      );

      if (itemIndex === -1) {
        return [...prevSelectedItems, val?._id];
      } else {
        const newSelectedItems = [...prevSelectedItems];
        newSelectedItems.splice(itemIndex, 1);
        return newSelectedItems;
      }
    });

    setSelectedNotification(val?._id);
  };

  const { mutate: ReadNotification, isLoading: requestLoading } =
    useReadNotification();
  
    const { mutate: ReadAllNotifications, isLoading: readAllLoading } =
    useReadAllNotification();

  const {
    mutate,
    isLoading: deleting,
    reset,
    isSuccess,
  } = useDeleteNotification();

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSelectedNotifications([]);
      setSelectedItems([]);
      setDeleteModal(false);
    }
  }, [isSuccess]);

  return (
    <section>
      <header className="sticky top-0 shadow z-9999 bg-[#F2F4F6] flex flex-col w-full bg-transparent dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow bg-[#F2F4F6] items-center gap-3 py-3 px-4 md:px-6 2xl:px-11">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex group items-center gap-2 font-semibold"
            >
              <FaArrowLeft className="group-hover:-translate-x-2 duration-150 ease-out" />{" "}
              Back
            </button>
          </div>

          <div className="flex ms-auto items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Dark Mode Toggler --> */}
              {/* <DarkModeSwitcher /> */}
              {/* <!-- Dark Mode Toggler --> */}

              {/* <!-- Support --> */}
              <DropdownSupport />
              {/* <!-- Support --> */}

              {/* <!-- Notification Menu Area --> */}
              <DropdownNotification />
              {/* <!-- Notification Menu Area --> */}
            </ul>

            {/* <!-- User Area --> */}
            <div className="">
              <DropdownUser />
            </div>

            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>
      <section className="py-3 md:px-6 lg:px-15 mt-6 px-1 max-md:px-4">
        <h1 className="text-xl font-bold dark:text-slate-200">
          All Notifications
        </h1>

        <div className="mt-6">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center min-h-[50vh] rounded-sm bg-white dark:bg-boxdark pb-10">
              <div className="py-3 px-3 flex justify-center items-center rounded-full bg-slate-200 animate-pulse">
                <GoBell size={32} />
              </div>

              <div className="text-center">
                <h2 className="font-medium text-black dark:text-white">
                  One Moment Please
                </h2>
                <p className="font-normal text-zinc-800 text-sm px-2">
                  Your notifications are on the way. Thanks for your patience
                </p>
              </div>
            </div>
          ) : notifications?.length > 0 ? (
            <>
              <div className="flex flex-col gap-1">
                <Table.HeaderView>
                  <Table.HeaderViewItem>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="selectAll"
                          onChange={handleToggleAll}
                        />
                        <label
                          className="font-medium text-black dark:text-white"
                          htmlFor="selectAll"
                        >
                          Select All
                        </label>
                      </div>

                      
                    </div>
                  </Table.HeaderViewItem>
                  <Table.HeaderViewItem>
                    <div className="flex items-center justify-end gap-2 w-full">
                    {selectedItems.length > 0 && (
                        <div className="flex gap-2">
                          <button
                            disabled={deleting}
                            className="flex items-center border border-danger rounded-md gap-[3px] px-2 font-medium text-danger hover:bg-meta-1 hover:text-white dark:text-white"
                            onClick={() => {
                              setDeleteModal(true);
                            }}
                          >
                            <BsTrash3 /> Delete
                            Notification(s)
                          </button>
                        </div>
                      )}

                      
                        <div className="flex gap-2">
                          <button
                            disabled={readAllLoading}
                            className="flex items-center gap-[3px] px-2 bg-white border border-stroke rounded-md font-medium text-zinc-800 hover:bg-slate-200 dark:text-white"
                            onClick={() => {
                              ReadAllNotifications({
                                payload: {
                                  read: true
                                },
                              });
                            }}
                          >
                            {readAllLoading ? <BiLoaderAlt className="animate-spin" /> : <IoCheckmarkDone />} {readAllLoading ? 'Loading...' : 'Mark all as Read'}
                            
                          </button>
                        </div>
                     
                    </div>
                  </Table.HeaderViewItem>
                </Table.HeaderView>
                {notifications.map((val: any) => (
                  <div
                    className="bg-white flex gap-2 rounded-sm border relative border-stroke min-h-[8rem] px-6.5  py-2 w-full shadow-md"
                    key={val?._id}
                  >
                    <div className="w-full">
                      <span className="flex gap-1 items-center text-sm  justify-end mb-2 text-zinc-500">
                        <IoTimeOutline size={18} />{" "}
                        {formatDateToString2(val.createdAt)}
                      </span>
                      <div className="flex gap-2 items-start">
                        <div>
                          <input
                            type="checkbox"
                            name="selectSingle"
                            checked={
                              selectAll ||
                              selectedItems.some(
                                (item: any) => item?._id === val?._id
                              )
                            }
                            onChange={() => handleCheckboxChange(val)}
                            className=""
                          />
                        </div>

                        <div>
                          <h6 className="mb-2 font-semibold text-primary">
                            {val?.title}
                          </h6>
                          <p className="mb-2 text-sm">{val.message}</p>
                        </div>
                      </div>

                      <div className=" border-t border-stroke py-1  dark:border-strokedark mt-6">
                        <button
                          onClick={() => {
                            setSelectedNotification(val?._id);
                            ReadNotification({
                              notificationId: val._id,
                              payload: {
                                read: !val?.read,
                              }
                            });
                          }}
                          disabled={requestLoading}
                          className={` text-black hover:text-black-2 dark:text-white dark:text-white/80 hover:opacity-90
                           mx-5 flex items-center gap-1 text-sm `}
                        >
                          {requestLoading &&
                          selectedNotification === val?._id ? (
                            <BiLoaderAlt size={18} className="animate-spin" />
                          ) : val?.read ? (
                            <button>
                              <FaEnvelopeOpen />
                            </button>
                          ) : (
                            <button>
                              <FaEnvelope />
                            </button>
                          )}
                          {val?.read ? "Mark as Unread" : "Mark as Read"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <TablePagination
                data={notifications}
                page={page}
                pagination={pagination}
                setPage={setPage}
                setPageLimit={setItemsPerPage}
                pageLimit={itemsPerPage}
              />
            </>
          ) : (
            <Table.NoData
              onAdd={() => {}}
              hideButton={true}
              show={
                data === undefined ||
                data === null ||
                notifications.length === 0
              }
            >
              No Notifications found.
            </Table.NoData>
          )}
        </div>
      </section>
      <Delete
        onHide={() => setDeleteModal(false)}
        onProceed={() => mutate(selectedNotifications)}
        okText="Delete Notification"
        cancelText=""
        isLoadingText="Deleting..."
        show={deleteModal}
        title={"Delete Notification?"}
        isLoading={deleting}
        desc="Are you sure you want to delete selected notification(s)? This action is irreversible"
      ></Delete>
    </section>
  );
};

export default NotificationsPage;
