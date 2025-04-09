import { useEffect, useRef, useState } from "react";
import { GoBell } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../context/AppContext";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa6";
import { Tooltip2 } from "../components/Tooltip";
import ComponentLoader from "../components/componentLoader";
import { formatDateToString2 } from "../lib/utils/formatters";
import { useReadNotification } from "../services/api/notifications";
import { fetchUserNotifications } from "../services/notificationServices";
import SlideTab, { Cursor } from "../AnimatedUi/SlideTabs";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const DropdownNotification = () => {
  const { user } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any>([]);
  const [status, setStatus] = useState<any>(null);
  const [tab, setTab] = useState("All");
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hover, setHover] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    string | undefined | null
  >(null);
  const trigger = useRef<HTMLDivElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useQuery(
    ["USER_NOTIFICATIONS", 1, 10, status],
    fetchUserNotifications,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!user,
      onSuccess: (data: any) => {
        setNotifications(data?.data?.notifications?.data || []);
      },
    }
  );

  const { mutate: ReadNotification, isLoading: requestLoading } =
    useReadNotification();

  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (trigger.current && trigger.current.contains(target)) {
        // Handle trigger click
        return;
      }
      if (dropdown.current.contains(target)) return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);

    return () => {
      if (trigger.current) {
        document.removeEventListener("click", clickHandler);
      }
    };
  }, [setDropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex  text-slate-500 hover:scale-105 cursor-pointer  dark:text-white"
      >
        {notifications.some((item: any) => item.read === false) && (
          <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}

        <GoBell size={20} />
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute max-sm:-right-32.5 mt-2.5 flex h-100 w-80 max-sm:w-full max-sm:min-w-80 flex-col rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-90 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2 dark:text-white">
            Recent Notifications
          </h5>
        </div>

        <div className="mb-2 px-2">
          <ul
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }));
              setHover(false);
            }}
            onMouseEnter={() => {
              setHover(true);
            }}
            className="relative flex w-full py-0.5 rounded-md shadow-zinc-300/80 bg-[#F5F6FD]"
          >
            <SlideTab
              activeTab={tab}
              tab="All"
              onChange={(tab) => {
                setTab(tab);
                setStatus(null);
              }}
              setPosition={setPosition}
              noBg={hover}
              landing={false}
              activeColor="text-zinc-600"
            >
              <div className="flex gap-1.5 text-sm items-center">
                <span className="font-normal gap-1.5">View All</span>
              </div>
            </SlideTab>
            <SlideTab
              activeTab={tab}
              onChange={(tab) => {
                setTab(tab);
                setStatus(false);
              }}
              tab="Unread"
              setPosition={setPosition}
              noBg={hover}
              landing={false}
              activeColor="text-zinc-600"
            >
              <div className=" text-sm">
                <span className="items-center font-normal">Unread</span>
              </div>
            </SlideTab>
            <SlideTab
              activeTab={tab}
              onChange={(tab) => {
                setTab(tab);
                setStatus(true);
              }}
              tab="read"
              setPosition={setPosition}
              noBg={hover}
              landing={false}
              activeColor="text-zinc-600"
            >
              <div className=" text-sm">
                <span className="gap-1.5 font-normal items-center">Read</span>
              </div>
            </SlideTab>

            <Cursor position={position} landing={false} />
          </ul>
        </div>

        {isFetching ? (
          <div className="flex h-full w-full items-center justify-center">
            <ComponentLoader
              show={isFetching}
              size={"w-[2.5em] h-[2.5em] border-[4px]"}
            />
          </div>
        ) : data === undefined ||
          data === null ||
          notifications?.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-sm bg-white dark:bg-boxdark pb-10">
            <div className="py-3">
              <GoBell size={24} />
            </div>

            <div className="text-center">
              <h2 className="font-medium text-black dark:text-white">
                You're all caught up
              </h2>
              <p className="font-normal text-zinc-800 text-sm px-2">
                Nothing new at the moment. Check back later for updates on your
                activity.
              </p>
            </div>
          </div>
        ) : (
          <ul className="flex h-auto flex-col overflow-y-auto custom-scrollbar mb-8">
            {notifications?.map((val: any, index: number) => (
              <li key={index}>
                <div
                  className="flex gap-3 border-t  relative text-slate-700 dark:text-slate-100 border-stroke px-4.5 py-3  dark:border-strokedark"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="mt-1">
                    <button
                      onClick={() => {
                        setSelectedNotification(val?._id);
                        ReadNotification({
                          notificationId: val._id,
                          payload: {
                            read: !val?.read,
                          },
                        });
                      }}
                      disabled={requestLoading}
                    >
                      {requestLoading && selectedNotification === val?._id ? (
                        <BiLoaderAlt size={18} className="animate-spin" />
                      ) : val?.read ? (
                        <Tooltip2 text="Mark as Unread">
                          <FaEnvelopeOpen />
                        </Tooltip2>
                      ) : (
                        <Tooltip2 text="Mark as Read">
                          <FaEnvelope />
                        </Tooltip2>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-sm mb-2 text-slate-700 font-normal">
                      {val.message}
                    </p>

                    <p className="text-xs font-medium text-black dark:text-white/90 ">
                      {formatDateToString2(val.createdAt)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between px-2 py-1.5 absolute bottom-2 w-full border-t border-stroke bg-white">
          <button
            onClick={() => navigate(`/app/all-notifications`)}
            className="focus:outline-none bg-white flex items-center gap-1  p-1  hover:text-primary text-slate-700 text-xs"
          >
            <IoCheckmarkDone /> Mark all as read
          </button>{" "}
          <button
            onClick={() => navigate(`/app/all-notifications`)}
            className="border-none  py-1 px-2 bg-primary text-white rounded-md hover:bg-primary/90 text-xs"
          >
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
