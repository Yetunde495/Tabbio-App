import { FaCircleCheck, FaPlus, FaRegClock, FaRegStar } from "react-icons/fa6";
import { useApp } from "../../context/AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import { useState } from "react";
import ResumeAnalytics from "./ResumeAnalytics";
import { LuBriefcase, LuBuilding2, LuPuzzle } from "react-icons/lu";
import { MdCancel, MdOutlineErrorOutline } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import { RiAwardLine, RiRobot2Line } from "react-icons/ri";
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import { formatDateString } from "../../lib/utils/formatters";
import { paginate } from "../../lib/utils";
import TablePagination from "../../components/table/TablePagination";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import classNames from "classnames";
import { IoIosArrowForward } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";
import ExtensionModal from "../PageComponents/ExtensionModal";
import CreateApplicationKit from "./CreateApplicationKit";
import Tabs, { Tab } from "../../components/tabs";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../../services/applicationServices";
import ApplicationResult, { ResumeResult } from "./ApplicationkitResult";
import { useNavigate } from "react-router-dom";

const Applications: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [allApplications, setAllApplications] = useState<any[]>([]);
  const [tab2, setTab2] = useState("All");
  const [status, setStatus] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [extension, setExtension] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [tailorResume, setTailorResume] = useState(false)
  const [selectedApplication, setApplication] = useState<any>(null);
  const [previewModal, setPreviewModal] = useState(false);

  const { isLoading, isError, data } = useQuery(
    ["APPLICATIONS", search, page, itemsPerPage, status],
    getUserApplications,
    {
      keepPreviousData: true,
      enabled: !!user?._id,
      onSuccess: (data: any) => {
        console.log(data?.data?.applications);
        setAllApplications(data?.data?.applications?.data);
      },
      onError: (err: any) => {
        toast(
          <Notification variant="error" title="Request Failed!">
            {err.message}
          </Notification>,
          {
            type: "error",
            hideProgressBar: true,
            toastId: Date.now() + "@USER_FILTER_ERROR",
          }
        );
        setErrorMessage(err.message || "An error occurred");
      },
    }
  );

  const pagination = paginate(
    Number(data?.data?.applications?.count),
    Number(data?.data?.applications?.totalPages),
    Number(itemsPerPage)
  );
  return (
    <DefaultLayout>
      <section>
        <div className="md:px-8 px-3 py-4">
          <div className="mb-5">
            <h3 className="text-zinc-950 font-bold text-lg md:text-xl">
              Application™
            </h3>
            <p className="text-zinc-500">
              Track and manage your job applications
            </p>
          </div>

          <div className="w-full flex  justify-between gap-4 xl:flex-row flex-col">
            <div className="">
              <div className="relative w-full bg-white flex items-center rounded-xl border border-stroke justify-between max-xl:w-full px-2 py-2 sm:w-[450px]">
                <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                  <TbSearch />
                </button>

                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=" border-none w-full  bg-white focus:ring-0 text-sm pr-3 pl-8 focus:outline-none "
                />
              </div>
            </div>
            <div className="flex gap-4 max-md:gap-2 items-center max-lg:w-full">
              <button
                onClick={() => setExtension(true)}
                className="flex gap-2 max-md:flex-col max-md:gap-1 max-md:px-4.5 max-sm:w-[200px]   items-center  justify-center px-6 py-2 rounded-md hover:scale-95 duration-150 text-white bg-gradient-to-br from-[#374151] to-[#1F2937]"
              >
                <span className="md:bg-white/10 md:p-1 text-sm md:rounded-md max-sm:hidden">
                  <LuPuzzle />
                </span>
                <span className="max-sm:hidden">Get</span> Chrome Extension
              </button>
              <button
                onClick={() => setCreateModal(true)}
                className="flex max-md:flex-col max-md:gap-1 max-md:py-2 max-md:px-4.5 gap-2  max-sm:px-2 max-sm:w-[150px] items-center justify-center px-6 py-2.5 rounded-md hover:scale-95 duration-150 text-white bg-primary"
              >
                <FaPlus className="max-md:text-sm max-sm:hidden" /> New
                Application
              </button>
            </div>
          </div>

          <div className="mt-3">
            <Tabs>
              <Tab
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("");
                }}
              >
                All
              </Tab>
              <Tab
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("applied");
                }}
              >
                Applied
              </Tab>
              <Tab
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("interviewing");
                }}
              >
                Interviewing
              </Tab>
              <Tab
                // tab=""
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("offered");
                }}
              >
                Offered
              </Tab>
              <Tab
                // tab=""
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("accepted");
                }}
              >
                Accepted
              </Tab>
              <Tab
                // tab=""
                activeTab={tab2}
                onChange={(tab) => {
                  setTab2(tab);
                  setStatus("rejected");
                }}
              >
                Rejected
              </Tab>
            </Tabs>
          </div>

          <div className="mt-20 w-full">
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <div className="bg-white shadow-3 rounded-lg py-8 px-4 flex flex-col items-center gap-6 justify-center w-full md:w-[60%]">
                  <div className="rounded-full text-primary bg-primary/5 flex items-center animate-pulse justify-center w-12 h-12">
                    <LuBriefcase size={32} />
                  </div>
                  <div className="text-center mb-3">
                    <h4 className="text-zinc-950 text-xl font-bold mb-2.5">
                      Loading up your Application kits
                    </h4>
                    <p className="text-zinc-500">
                      Please wait while we fetch your data{" "}
                    </p>
                  </div>
                </div>
              </div>
            ) : isError ? (
              <div className="w-full flex justify-center items-center">
                <div className="bg-white shadow-3 rounded-lg py-8 px-4 flex flex-col items-center gap-6 justify-center w-full md:w-[60%]">
                  <div className="flex items-center justify-center gap-2 px-3">
                    <span className="bg-red-600 rounded-full text-white w-14 h-14 flex items-center justify-center">
                      <MdOutlineErrorOutline size={28} className="" />
                    </span>
                  </div>

                  <div className="my-8 text-center">
                    <h3 className="text-lg font-semibold text-zinc-800">
                      An Error occurred!
                    </h3>
                    <p className="text-center text-zinc-600">
                      {errorMessage} <br /> Please, try again in some minutes
                    </p>
                  </div>
                </div>
              </div>
            ) : allApplications?.length > 0 ? (
              <div className="w-full">
                <ul className="space-y-5 w-full">
                  {allApplications?.map((val: any, index: number) => (
                    <li
                      key={index}
                      className="bg-white w-full shadow-3 rounded-lg p-3"
                      onClick={() => setApplication(val)}
                    >
                      <div className="flex items-center justify-between md:hidden w-full mb-2">
                        <div>
                          <p className="text-zinc-950 text-lg  max-md:text-base font-bold flex items-center gap-1.5">
                            {val?.name}
                            <span>
                              {val?.aiAssistance && (
                                <LuPuzzle className="text-slate-500" />
                              )}
                            </span>
                          </p>
                        </div>

                        <div>
                          <StaggeredDropDown>
                            <AnimatedOption
                              text="Preview Application"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Edit Application Name"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Edit Resume"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="View Cover Letter"
                              onClick={() => {}}
                            />
                          </StaggeredDropDown>
                        </div>
                      </div>
                      <div className="flex items-center max-md:flex-wrap text-sm gap-2">
                        <p className="text-zinc-950 text-lg max-md:text-base font-bold max-md:hidden">
                          {val?.job_role}
                        </p>
                        {val?.aiAssistance && (
                          <LuPuzzle className="text-slate-500 max-md:hidden" />
                        )}
                        <div>
                          <StaggeredDropDown
                            styles={classNames(
                              "rounded-full px-3 py-1.5 flex items-center gap-2",
                              {
                                "bg-[#2563EB]/10 text-[#2563EB]":
                                  val?.status === "applied",
                                "bg-danger/10 text-danger":
                                  val?.status === "rejected",
                                "bg-[#D97706]/10 text-[#D97706]":
                                  val?.status === "offered",
                                "bg-[#9333EA]/10 text-[#9333EA]":
                                  val?.status === "interviewing",
                                "bg-success/10 text-success":
                                  val?.status === "accepted",
                              }
                            )}
                            buttonText={
                              false ? (
                                <span className={`flex items-center gap-1.5`}>
                                  <BiLoaderAlt className="animate-spin text-zinc-700" />{" "}
                                  Loading
                                </span>
                              ) : (
                                <span className={`flex items-center gap-1.5`}>
                                  {val?.status === "interviewing" ? (
                                    <RiRobot2Line />
                                  ) : val?.status === "accepted" ? (
                                    <FaCircleCheck />
                                  ) : val?.status === "rejected" ? (
                                    <MdCancel className="text-danger" />
                                  ) : val?.status === "offered" ? (
                                    <RiAwardLine />
                                  ) : (
                                    <FaRegClock />
                                  )}
                                  {val?.status}
                                </span>
                              )
                            }
                            buttonIcon={
                              <IoIosArrowForward className="text-zinc-800" />
                            }
                          >
                            <AnimatedOption
                              text="Applied"
                              Icon={<FaRegClock className="text-primary" />}
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Interviewing"
                              Icon={<RiRobot2Line className="text-[#9333EA]" />}
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Offered"
                              Icon={<RiAwardLine className="text-warning" />}
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Accepted"
                              Icon={<FaCircleCheck className="text-success" />}
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Rejected"
                              Icon={<MdCancel className="text-danger" />}
                              onClick={() => {}}
                            />
                          </StaggeredDropDown>
                        </div>

                        {val?.matchScore && (
                          <span className="bg-[#F3E8FF] text-[#9333EA] text-sm flex items-center gap-2 rounded-full px-4 py-1">
                            <FaRegStar className="text-[#FBBF24]" />{" "}
                            {val?.match_score + "% Match"}
                          </span>
                        )}

                        <div className="ml-auto md:block hidden">
                          <StaggeredDropDown>
                          <AnimatedOption
                              text="Preview Application"
                              onClick={() => {setPreviewModal(true)}}
                            />
                            <AnimatedOption
                              text="Edit Application Name"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Edit Resume"
                              onClick={() => {navigate(`/app/candidate/edit-resume/${val?.resume?._id}`)}}
                            />
                            <AnimatedOption
                              text="Delete"
                              onClick={() => {}}
                            />
                          </StaggeredDropDown>
                        </div>
                      </div>

                      <div className="my-3 text-zinc-500">
                        <ul className="list-disc gap-x-4 gap-y-1 flex-wrap flex items-center">
                          <li className="flex gap-1 items-center">
                            <LuBuilding2 />
                            {val?.company?.name || "Unknown"}
                          </li>
                          <li className="flex gap-1 items-center">
                            <IoLocationOutline />
                            {val?.company?.location}
                          </li>
                          <li className="flex gap-1 items-center">
                            <FaRegClock />
                            {val?.createdAt
                              ? formatDateString(val?.createdAt)
                              : "Unspecified"}
                          </li>
                        </ul>
                      </div>

                      <div className="text-zinc-500 mb-1.5 flex gap-1 items-center">
                        <span className="text-primary">
                          <IoDocumentTextOutline />
                        </span>
                        <span>{val?.resume?.resumeName}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="my-8 flex w-full justify-end">
                  <TablePagination
                    data={allApplications}
                    page={page}
                    pagination={pagination}
                    setPage={setPage}
                    setPageLimit={setItemsPerPage}
                    pageLimit={itemsPerPage}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <div className="bg-white shadow-3 rounded-lg py-8 px-4 flex flex-col items-center gap-6 justify-center w-full md:w-[60%]">
                  <div className="rounded-full text-primary bg-primary/5 flex items-center justify-center w-12 h-12">
                    <LuBriefcase size={32} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-zinc-950 text-xl font-bold mb-2.5">
                      {search || status
                        ? "No Data Found"
                        : "Create Your First Application kit"}
                    </h4>
                    <p className="text-zinc-500">
                      {search || status
                        ? "We could not find any data that matched what you're looking for"
                        : " Start Building your kit to track and manage your job applications"}{" "}
                    </p>
                  </div>

                  <button
                    onClick={() => setCreateModal(true)}
                    className="flex gap-2 items-center justify-center px-6 py-2.5 mb-3 rounded-md hover:scale-95 duration-150 text-white bg-primary"
                  >
                    <FaPlus /> New Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showAnalytics && (
          <ResumeAnalytics
            show={showAnalytics}
            onHide={() => setShowAnalytics(false)}
          />
        )}
        {extension && (
          <ExtensionModal show={extension} onHide={() => setExtension(false)} />
        )}
        {createModal && (
          <CreateApplicationKit
            show={createModal}
            onHide={() => setCreateModal(false)}
          />
        )}
        {previewModal && (
          <div>
            {selectedApplication?.isTailored ? (
              <ApplicationResult
                show={previewModal}
                onHide={() => setPreviewModal(false)}
                applicationData={selectedApplication}
              />
             ) : (
              <ResumeResult
                show={previewModal}
                onHide={() => setPreviewModal(false)}
                resumeData={selectedApplication?.resume}
                onClick={() => {
                  setTailorResume(true)
                  setPreviewModal(false)
                }}
              />
            )} 
          </div>
        )}
        {tailorResume && (
          <CreateApplicationKit
          show={tailorResume}
          onHide={() => setTailorResume(false)}
          applicationData={selectedApplication}
          tailor
         />
        )}
      </section>
    </DefaultLayout>
  );
};

export default Applications;
