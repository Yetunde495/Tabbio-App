import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactDOM from "react-dom";
import { LuBuilding2, LuCrown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { ContentAccordion } from "../../components/Accordion";
import sparkleIcon from "../../assets/svg/ai-sparkle.svg";
import { FaArrowRightLong, FaRegStar } from "react-icons/fa6";
import {
  IoCopyOutline,
  IoDocumentTextOutline,
  IoReturnUpBack,
} from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { VscWand } from "react-icons/vsc";
import { BsDownload, BsEye } from "react-icons/bs";
import { ResumePreview } from "../PageComponents/Resume";
import { mockResumeData } from "../../data/mockData";
import {
  MdEdit,
  MdEmail,
  MdOutlineErrorOutline,
  MdShare,
} from "react-icons/md";
import { usePDF } from "react-to-pdf";
import LiveResumeDoc from "../PageComponents/ResumeDocument";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MDEditor from "@uiw/react-md-editor";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { IoIosArrowForward, IoIosArrowUp, IoIosLink } from "react-icons/io";
import CreateApplicationKit from "./CreateApplicationKit";
import {
  generateCompanyIntelligence,
  generateCoverLetter,
  generateInterviewTips,
  getSingleApplication,
  saveCompanyIntelligence,
  saveCoverLetter,
  saveInterviewTips,
} from "../../services/applicationServices";
import Alert from "../../components/Alert";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../../lib/utils";
import ProfessionalPDF from "../../components/PDFTemplates/ProfessionalPDF";
import EntryPDF from "../../components/PDFTemplates/EntryPDF";
import ShareResume from "./ShareResume";
import { useNavigate } from "react-router-dom";

type ApplicationResultProps = {
  show: boolean;
  onHide: () => void;
  selectedApplication: any;
  onTailorResume: () => void;
};

type ResumeResultProps = {
  show: boolean;
  onHide: () => void;
  onClick: () => void;
  resumeData: any;
};

const ApplicationResult: React.FC<ApplicationResultProps> = ({
  show,
  onHide,
  selectedApplication,
  onTailorResume,
}) => {
  const [mainView, setMainview] = useState(false);
  const [resumeView, setResumeView] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState(false);
  const [intelligence, setIntelligence] = useState(false);
  const [successKit, setSuccessKit] = useState(false);
  const [buttonText, setButtonText] = useState("Copy");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [interviewTips, setInterviewTips] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [coverLetterData, setCoverLetterData] = useState<string>(``);
  const { targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const { isFetching, isError } = useQuery(
    ["APPLICATION_DATA", selectedApplication?._id],
    () => getSingleApplication(selectedApplication?._id),
    {
      keepPreviousData: true,
      enabled: !!selectedApplication?._id,
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setApplicationData(data?.data?.application);

        if (data?.data?.application?.isTailored) {
          setCoverLetterData(data?.data?.application?.coverLetter?.coverLetter);
          setCompanyInfo(data?.data?.application?.company);
          setInterviewTips(
            JSON.parse(data?.data?.application?.interviewTips?.content)
          );
        }
        setMainview(true);
      },
      onError: (err: any) => {
        setErrorText(err.message || "An error occurred");
      },
    }
  );

  const GenerateInterviewTips = async () => {
    setLoading(true);
    try {
      const resp = await generateInterviewTips({
        jobDescription: applicationData?.jobDescription,
      });
      setInterviewTips(resp?.data?.tips);
      console.log(resp);
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCoverletter = async () => {
    setUpdateLoading(true);
    try {
      await saveCoverLetter({
        coverLetter: coverLetterData,
        applicationId: applicationData?._id,
      });
      setSuccessText("Your Cover Letter was successfully updated");
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setUpdateLoading(false);
      setTimeout(() => {
        setSuccessText("");
      }, 4000);
    }
  };
  const handleSaveCompanyInfo = async () => {
    setUpdateLoading(true);
    try {
      await saveCompanyIntelligence({
        intelligence: companyInfo,
        applicationId: applicationData?._id,
      });
      setSuccessText("Your Company Data was successfully updated");
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setUpdateLoading(false);
      setTimeout(() => {
        setSuccessText("");
      }, 4000);
    }
  };

  const handleSaveInterviewTip = async () => {
    setLoading(true);
    try {
      await saveInterviewTips({
        interviewTips: interviewTips,
        applicationId: applicationData?._id,
      });
      setSuccessText("Interview tips was successfully updated");
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessText("");
      }, 5000);
    }
  };

  const GenerateCoverLetter = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("resumeId", applicationData?.resume?._id);
    formData.append("jobDescription", applicationData?.jobDescription);
    try {
      const resp = await generateCoverLetter(formData);
      setCoverLetterData(resp?.data?.coverLetter);
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const GenerateCompanyInfo = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("resumeId", applicationData?.resume?._id);
    formData.append("jobDescription", applicationData?.jobDescription);
    try {
      const resp = await generateCompanyIntelligence(formData);
      setCompanyInfo(resp?.data?.description);
    } catch (err: any) {
      setErrorText(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
    }
  };

  const copyCompanyDetails = async () => {
    navigator.clipboard
      .writeText(JSON.stringify(companyInfo, null, 2))
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 3000);
      });
  };
  const copyInterviewTips = async () => {
    navigator.clipboard
      .writeText(JSON.stringify(interviewTips, null, 2))
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 3000);
      });
  };
  const copyCoverLetter = async () => {
    navigator.clipboard
      .writeText(JSON.stringify(coverLetterData, null, 2))
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 3000);
      });
  };

  const renderTips = (tips: any, small?: boolean) => {
    return Object.keys(tips)?.map((categoryKey, categoryIndex) => {
      const category = tips[categoryKey];
      return (
        <div key={categoryIndex}>
          <button
            onClick={() => toggleItem(categoryIndex)}
            className="w-full py-2 flex justify-between items-center"
          >
            <div className="">
              <span className={`${small && "text-[13px]"} text-left`}>
                {categoryIndex + 1}.{" "}
                {capitalizeFirstLetter(
                  categoryKey.replace(/([A-Z])/g, " $1").trim()
                )}
              </span>
            </div>
            <div className="ml-auto">
              {openIndex === categoryIndex ? (
                <IoIosArrowUp className="dark:text-primary" />
              ) : (
                <IoIosArrowForward className="dark:text-primary" />
              )}
            </div>
          </button>
          {openIndex === categoryIndex && (
            <div>
              {Object.keys(category).map((tipKey, tipIndex) => {
                const item = category[tipKey];
                const index = categoryIndex * 100 + tipIndex; // Unique index for each item
                return (
                  <div key={index} className="mb-4">
                    <p className="text-blue-600 text-sm underline">
                      {item?.title}:
                    </p>
                    <div
                      className={`${
                        small ? "text-xs" : "text-sm"
                      } py-3 px-4 flex flex-col gap-3 dark:text-slate-50`}
                    >
                      {item.tips.map((tip: string, idx: number) => (
                        <div className="" key={idx}>
                          <ul className="space-y-2 text-zinc-700">
                            <li className="flex items-start gap-1">
                              <span>
                                <TbArrowBigRightLinesFilled className="text-primary mt-1" />
                              </span>{" "}
                              <span>{tip}</span>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full fixed inset-0 z-[999999] bg-[#F2F4F6] backdrop-blur-2xl"
      >
        {isFetching ? (
          <div className="relative h-screen">
            <div className="w-full bg-primary flex items-center md:px-6 py-6 px-4 mb-8">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="bg-white/25 rounded-lg text-yellow-200 w-9 h-9 flex items-center justify-center">
                  <LuCrown />
                </span>
                <div>
                  <h3 className="font-semibold text-white max-sm:text-base text-lg mb-0">
                    Your Application Kit is Loading!
                  </h3>
                  <p className="text-zinc-200 max-sm:text-sm">
                    Every component is being loaded up for{" "}
                    {selectedApplication?.name}{" "}
                  </p>
                </div>
              </div>

              <button
                onClick={onHide}
                className="absolute top-[12px] max-sm:mb-1 md:top-[20px] text-white right-2 bg-white/25 hover:bg-white/30 rounded-full p-[4px]"
              >
                <RxCross2 size={18} className="" />
              </button>
            </div>
            <div className="h-full overflow-y-auto custom-scrollbar pt-6 pb-28 max-sm:pb-[12rem] px-6 max-sm:px-2">
              <div className="w-full flex justify-center items-center">
                <div className="py-8 px-4 flex flex-col items-center gap-6 justify-center w-full md:w-[60%]">
                  <div className="rounded-full text-primary bg-primary/10 flex items-center justify-center w-20 h-20">
                    <RiRobot2Line size={40} className="animate-pulse " />
                  </div>
                  <div className="text-center mb-3">
                    <h4 className="text-zinc-950 text-xl font-bold mb-1">
                      Loading up your Application
                    </h4>
                    <p className="text-zinc-500">
                      Please wait while we fetch your application data{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          isError && (
            <div className="relative h-screen">
              <div className="w-full bg-primary flex items-center md:px-6 py-6 px-4 mb-8">
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="bg-white/25 rounded-lg text-yellow-200 w-9 h-9 flex items-center justify-center">
                    <LuCrown />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white max-sm:text-base text-lg mb-0">
                      Your Application Kit failed to Load!
                    </h3>
                    <p className="text-zinc-200 max-sm:text-sm">
                      We could not load up any component for{" "}
                      {selectedApplication?.name}{" "}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onHide}
                  className="absolute top-[12px] max-sm:mb-1 md:top-[20px] text-white right-2 bg-white/25 hover:bg-white/30 rounded-full p-[4px]"
                >
                  <RxCross2 size={18} className="" />
                </button>
              </div>
              <div className="h-full overflow-y-auto custom-scrollbar pt-6 pb-28 max-sm:pb-[12rem] px-6 max-sm:px-2">
                <div className="w-full flex justify-center items-center">
                  <div className="py-8 px-4 flex flex-col items-center gap-3 justify-center w-full md:w-[60%]">
                    <div className="flex items-center justify-center gap-2 px-3">
                      <span className="bg-red-600 rounded-full text-white w-20 h-20 flex items-center justify-center">
                        <MdOutlineErrorOutline size={40} className="" />
                      </span>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-zinc-800">
                        An Error occurred!
                      </h3>
                      <p className="text-center text-zinc-600">
                        {errorText} <br /> Please, try again in some minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {mainView && (
          <section>
            {applicationData?.isTailored ? (
              <div className="relative h-screen">
                <div className="w-full bg-primary flex items-center md:px-6 py-6 px-4 mb-8">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="bg-white/25 rounded-lg text-yellow-200 w-9 h-9 flex items-center justify-center">
                      <LuCrown />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white max-sm:text-base text-lg mb-0">
                        Your Application Kit is Ready!
                      </h3>
                      <p className="text-zinc-200 max-sm:text-sm">
                        Every component has been optimized for{" "}
                        {applicationData?.name}{" "}
                        {applicationData?.companyName &&
                          "at " + applicationData?.companyName}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onHide}
                    className="absolute top-[12px] max-sm:mb-1 md:top-[20px] text-white right-2 bg-white/25 hover:bg-white/30 rounded-full p-[4px]"
                  >
                    <RxCross2 size={18} className="" />
                  </button>
                </div>
                <div className="h-[80%] overflow-y-auto custom-scrollbar pt-6 pb-28 max-sm:pb-[12rem] px-6 max-sm:px-2">
                  <div className="grid lg:grid-cols-2 grid-cols-1 border border-stroke shadow-md rounded-2xl divide-x gap-3 divide-stroke px-1.5 pb-4">
                    <div className="px-3">
                      <h2 className="flex items-center gap-2 py-3">
                        <IoDocumentTextOutline className="text-primary" /> Core
                        Documents
                      </h2>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <ContentAccordion
                          title={
                            <div className="flex gap-3 justify-between items-center">
                              <div className="flex gap-1 items-center">
                                <span>
                                  <RiRobot2Line
                                    size={18}
                                    className="text-primary"
                                  />
                                </span>
                                <p className="font-medium text-sm text-zinc-900">
                                  AI-Optimized CV
                                </p>
                              </div>

                              <div className="flex gap-2.5 items-center">
                                <button
                                  onClick={() => {
                                    setMainview(false);
                                    setResumeView(true);
                                  }}
                                  className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500"
                                >
                                  <BsEye />
                                </button>
                                <PDFDownloadLink
                                  document={
                                    applicationData?.resume?.template ===
                                    "entry" ? (
                                      <EntryPDF
                                        data={applicationData?.resume}
                                      />
                                    ) : (
                                      <ProfessionalPDF
                                        data={applicationData?.resume}
                                      />
                                    )
                                  }
                                  fileName={
                                    applicationData?.resume?.resumeName ||
                                    "Tabbio ATS Resume"
                                  }
                                >
                                  <button className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500">
                                    <BsDownload />
                                  </button>
                                </PDFDownloadLink>
                                <button
                                  onClick={() => {
                                    navigate(
                                      `/app/candidate/cv-builder/edit-application/${applicationData?._id}`
                                    );
                                    onHide();
                                  }}
                                  className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500"
                                >
                                  <FiEdit3 />
                                </button>
                              </div>
                            </div>
                          }
                        >
                          <div>
                            <div>
                              <ul className="text-sm font-normal text-zinc-700 space-y-2 mb-6">
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>
                                    Skills aligned with job requirements
                                  </span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>ATS-optimized formatting</span>
                                </li>

                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>Highlighted relevant achievements</span>
                                </li>
                              </ul>

                              <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center h-full">
                                <p className="text-center text-sm font-semibold text-zinc-800">
                                  Preview
                                </p>
                                <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] overflow-hidden 4xl:max-h-[550px] h-full bg-white">
                                  {/* <ResumePreview
                                    resumeData={applicationData?.resume}
                                  /> */}
                                  <div className="">
                                    <PDFViewer
                                      style={{
                                        minHeight: "350px",
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: "550px",
                                        backgroundColor: "#ffffff",
                                      }}
                                      showToolbar={false}
                                      className="pdf-preview"
                                    >
                                      {applicationData?.resume?.level ===
                                      "entry" ? (
                                        <EntryPDF
                                          data={applicationData?.resume}
                                        />
                                      ) : (
                                        <ProfessionalPDF
                                          data={applicationData?.resume}
                                        />
                                      )}
                                    </PDFViewer>
                                  </div>
                                </div>
                                <p className="text-center text-sm text-zinc-600 bg-[#DBEAFE80] w-full">
                                  Click on the eye icon to view full preview
                                </p>
                              </div>
                            </div>
                          </div>
                        </ContentAccordion>

                        <ContentAccordion
                          title={
                            <div className="flex gap-3 justify-between items-center">
                              <div className="flex gap-1 items-center">
                                <span>
                                  <VscWand
                                    size={18}
                                    className="text-[#9333EA]"
                                  />
                                </span>
                                <p className="font-medium text-sm text-zinc-900">
                                  Smart Cover Letter
                                </p>
                              </div>

                              <div className="flex gap-2.5 items-center">
                                <button
                                  onClick={() => {
                                    setMainview(false);
                                    setCoverLetter(true);
                                  }}
                                  className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500"
                                >
                                  <BsEye />
                                </button>
                                <PDFDownloadLink
                                  document={
                                    applicationData?.resume?.template ===
                                    "entry" ? (
                                      <EntryPDF
                                        data={applicationData?.resume}
                                      />
                                    ) : (
                                      <ProfessionalPDF
                                        data={applicationData?.resume}
                                      />
                                    )
                                  }
                                  fileName={
                                    applicationData?.resume?.resumeName ||
                                    "Tabbio ATS Resume"
                                  }
                                >
                                  <button className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500">
                                    <BsDownload />
                                  </button>
                                </PDFDownloadLink>
                              </div>
                            </div>
                          }
                        >
                          <div>
                            <div>
                              <ul className="text-sm font-normal text-zinc-700 space-y-2 mb-6">
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>Personalized to company culture</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>Highlights key qualifications</span>
                                </li>

                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>Compelling value proposition</span>
                                </li>
                              </ul>

                              <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center">
                                <p className="text-center text-sm font-semibold text-zinc-800">
                                  Preview
                                </p>
                                <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] 4xl:max-h-[550px] overflow-auto custom-scrollbar h-full">
                                  <p className="text-[12px] px-2 py-2">
                                    {coverLetterData}
                                  </p>
                                </div>
                                <p className="text-center text-sm text-zinc-600">
                                  Click on the eye icon to view full preview
                                </p>
                              </div>
                            </div>
                          </div>
                        </ContentAccordion>
                      </div>
                    </div>
                    <div className="px-3">
                      <h2 className="flex items-center gap-2 py-3">
                        <LuCrown className="text-yellow-400" /> Premium
                        Resources
                      </h2>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {companyInfo && (
                          <ContentAccordion
                            title={
                              <div className="flex gap-3 justify-between items-center">
                                <div className="flex gap-1 items-center">
                                  <span>
                                    <LuBuilding2
                                      size={18}
                                      className="text-[#D97706]"
                                    />
                                  </span>
                                  <p className="font-medium text-sm text-zinc-900">
                                    Company Intelligence
                                  </p>
                                </div>

                                <div className="flex gap-2.5 items-center">
                                  <button
                                    onClick={() => {
                                      setMainview(false);
                                      setIntelligence(true);
                                    }}
                                    className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500"
                                  >
                                    <BsEye />
                                  </button>
                                </div>
                              </div>
                            }
                          >
                            <div>
                              <div>
                                <ul className="text-sm font-normal text-zinc-700 space-y-2 mb-6">
                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>Culture and values analysis</span>
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>Recent company news</span>
                                  </li>

                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>Industry position insights</span>
                                  </li>
                                </ul>

                                <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center">
                                  <p className="text-center text-sm font-semibold text-zinc-800">
                                    Preview
                                  </p>
                                  <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] 4xl:max-h-[550px] overflow-auto custom-scrollbar h-full">
                                    <div className="text-[12px] space-y-4 px-2 py-2">
                                      {companyInfo?.description && (
                                        <p>{companyInfo?.description}</p>
                                      )}

                                      {companyInfo?.mission && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Mission
                                          </h6>
                                          <p>{companyInfo?.mission}</p>
                                        </div>
                                      )}
                                      {companyInfo?.achievements && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Achievements
                                          </h6>
                                          <p>{companyInfo?.achievements}</p>
                                        </div>
                                      )}

                                      {companyInfo?.culture && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Culture
                                          </h6>
                                          <p>{companyInfo?.culture}</p>
                                        </div>
                                      )}

                                      {companyInfo?.values && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Values
                                          </h6>
                                          <p>{companyInfo?.values}</p>
                                        </div>
                                      )}

                                      {companyInfo?.contact && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Contact
                                          </h6>
                                          <p>{companyInfo?.contact}</p>
                                        </div>
                                      )}

                                      {companyInfo?.careerPage && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Career Page Link:
                                          </h6>
                                          <div className="gap-1 flex items-center">
                                            <span>
                                              <IoIosLink />
                                            </span>
                                            <a
                                              href={
                                                companyInfo?.careerPage || ""
                                              }
                                              target="_blank"
                                              className="text-underline hover:text-primary"
                                            >
                                              {companyInfo?.careerPage}
                                            </a>
                                          </div>
                                        </div>
                                      )}
                                      {companyInfo?.email && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Company Email:
                                          </h6>
                                          <div className="gap-1 flex items-center">
                                            <span>
                                              <MdEmail />
                                            </span>
                                            <p>{companyInfo?.email}</p>
                                          </div>
                                        </div>
                                      )}
                                      {companyInfo?.linkedIn && (
                                        <div>
                                          <h6 className="text-black font-semibold">
                                            Company Linkedin Url:
                                          </h6>
                                          <div className="gap-1 flex items-center">
                                            <span>
                                              <IoIosLink />
                                            </span>
                                            <a
                                              href={companyInfo?.linkedIn || ""}
                                              target="_blank"
                                              className="text-underline hover:text-primary"
                                            >
                                              {companyInfo?.linkedIn}
                                            </a>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-center text-sm text-zinc-600">
                                    Click on the eye icon to view full preview
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ContentAccordion>
                        )}

                        {interviewTips && (
                          <ContentAccordion
                            title={
                              <div className="flex gap-3 justify-between items-center">
                                <div className="flex gap-1 items-center">
                                  <span>
                                    <RiRobot2Line
                                      size={18}
                                      className="text-success"
                                    />
                                  </span>
                                  <p className="font-medium text-sm text-zinc-900">
                                    Interview Success Kit
                                  </p>
                                </div>

                                <div className="flex gap-2.5 items-center">
                                  <button
                                    onClick={() => {
                                      setMainview(false);
                                      setSuccessKit(true);
                                    }}
                                    className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-500"
                                  >
                                    <BsEye />
                                  </button>
                                </div>
                              </div>
                            }
                          >
                            <div>
                              <div>
                                <ul className="text-sm font-medium text-zinc-500 space-y-2 mb-6">
                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>Custom interview questions</span>
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>STAR response templates</span>
                                  </li>

                                  <li className="flex items-center gap-1">
                                    <span>
                                      <FaRegStar className="text-yellow-400" />
                                    </span>
                                    <span>Salary negotiation tips</span>
                                  </li>
                                </ul>

                                <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center">
                                  <p className="text-center text-sm font-semibold text-zinc-800">
                                    Preview
                                  </p>
                                  <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] 4xl:max-h-[550px] overflow-auto custom-scrollbar h-full">
                                    <div className="w-full px-3 py-4">
                                      {interviewTips &&
                                        renderTips(interviewTips, true)}
                                    </div>
                                  </div>
                                  <p className="text-center text-sm text-zinc-600">
                                    Click on the eye icon to view full preview
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ContentAccordion>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 px-8 py-2.5 bg-[#F2F4F6] flex max-sm:flex-col w-full items-center justify-between max-sm:gap-1.5 gap-3">
                  <p className="text-zinc-500 max-sm:text-center">
                    Your application kit has been crafted with precision. Good
                    luck! 🌟
                  </p>
                  <button className="bg-primary text-white justify-center font-semibold group rounded-md py-2.5 px-8 flex items-center gap-2">
                    Apply Now{" "}
                    <FaArrowRightLong className="group-hover:ml-4 duration-200" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative h-screen">
                <div className="w-full bg-primary flex items-center md:px-6 py-5 px-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/25 rounded-lg text-white w-9 h-9 flex items-center justify-center">
                      <IoDocumentTextOutline size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-0">
                        Your Resume is Ready!
                      </h3>
                      <p className="text-zinc-200">
                        To optimize Every component for a specific job in a
                        company click on create Application Kit below
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onHide}
                    className="absolute top-[12px] md:top-[28px] text-white right-2 md:right-4 bg-white/25 hover:bg-white/30 rounded-full p-[4px]"
                  >
                    <RxCross2 size={18} className="" />
                  </button>
                </div>
                <div className="min-h-[80%] overflow-y-auto custom-scrollbar pt-6 pb-28 max-sm:pb-[12rem] px-6">
                  <div className="flex w-full justify-center items-center px-1.5 pb-4">
                    <div className="px-3 md:max-w-[500px]">
                      <div>
                        <ContentAccordion
                          title={
                            <div className="flex gap-2 items-center">
                              <span>
                                <RiRobot2Line
                                  size={18}
                                  className="text-primary"
                                />
                              </span>
                              <p className="font-medium text-zinc-800">
                                AI Optimized Resume
                              </p>
                            </div>
                          }
                        >
                          <div>
                            <div>
                              <ul className="text-sm font-medium text-zinc-500 space-y-2 mb-6">
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>
                                    Skills aligned with job requirements
                                  </span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>ATS-optimized formatting</span>
                                </li>

                                <li className="flex items-center gap-1">
                                  <span>
                                    <FaRegStar className="text-yellow-400" />
                                  </span>
                                  <span>Highlighted relevant achievements</span>
                                </li>
                              </ul>

                              <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center">
                                <button
                                  onClick={() => {
                                    setMainview(false);
                                    setResumeView(true);
                                  }}
                                  className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-600"
                                >
                                  <span>
                                    <BsEye />
                                  </span>{" "}
                                  Preview
                                </button>
                                <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] 4xl:max-h-[550px] overflow-auto custom-scrollbar h-full bg-white">
                                  <ResumePreview
                                    resumeData={applicationData?.resume}
                                  />
                                </div>
                                <p className="text-center text-sm text-zinc-600">
                                  Click on the eye icon to view full preview
                                </p>
                              </div>
                            </div>
                          </div>
                        </ContentAccordion>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 px-8 py-2.5 bg-[#F2F4F6] flex max-sm:flex-col w-full items-center justify-between max-sm:gap-1.5 gap-3">
                  <p className="text-zinc-500 max-sm:text-center">
                    To craft your resume into a complete optimized kit with
                    precision, convert to application kit! 🌟
                  </p>
                  <button
                    onClick={onTailorResume}
                    className="bg-primary text-white justify-center font-semibold group rounded-md py-2.5 px-8 flex items-center gap-2"
                  >
                    Create Application Kit{" "}
                    <FaArrowRightLong className="group-hover:ml-4 duration-200" />
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {resumeView && (
          <div className="relative h-screen overflow-y-auto custom-scrollbar w-full">
            <button
              onClick={() => {
                setResumeView(false);
                setMainview(true);
              }}
              className="flex items-center text-lg text-zinc-800 gap-2 my-3 mx-3"
            >
              <span>
                <IoReturnUpBack />
              </span>
              <span>Back</span>
            </button>
            <div className="flex w-full justify-center items-center pb-6">
              <div ref={targetRef} className="max-w-[800px] w-full">
                <ResumePreview resumeData={applicationData?.resume} />
                {/* <PDFViewer
                  showToolbar={false}
                  style={{ minHeight: "210px", width: "100%" }}
                  height={"800px"}
                >
                  {applicationData?.resume?.template === "entry" ? (
                    <EntryPDF data={applicationData?.resume} />
                  ) : (
                    <ProfessionalPDF data={applicationData?.resume} />
                  )}
                </PDFViewer> */}
              </div>
            </div>
            <div className="fixed right-4 bottom-4">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg  divide-x divide divide-stroke bg-primary text-white">
                <PDFDownloadLink
                  document={
                    applicationData?.resume?.template === "entry" ? (
                      <EntryPDF data={applicationData?.resume} />
                    ) : (
                      <ProfessionalPDF data={applicationData?.resume} />
                    )
                  }
                  fileName={
                    applicationData?.resume?.resumeName || "Tabbio ATS Resume"
                  }
                >
                  <button className="sm:px-4 flex items-center gap-2 px-2 max-sm:text-xs bg-primary hover:scale-105 text-white rounded-l-lg">
                    <BsDownload /> Download PDF
                  </button>
                </PDFDownloadLink>
                <button
                  onClick={() => {
                    setShareModal(true);
                    setResumeView(false);
                  }}
                  className="sm:px-4 hidden items-center gap-2 py-1.5 px-2 max-sm:text-xs sm:py-2 bg-primary hover:scale-105 text-white "
                >
                  <MdShare /> Share
                </button>
                <button className="flex items-center gap-1 hover:opacity-90 px-2">
                  <MdEdit /> Edit
                </button>
              </div>
            </div>
          </div>
        )}

        {coverLetter && (
          <div className="w-full h-full flex justify-center md:items-center bg-black bg-opacity-50">
            <div
              className={`w-full md:max-w-[70%] lg:max-w-[60%] absolute bg-white md:rounded-2xl shadow-lg p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Cover Letter</h2>
                <button
                  onClick={() => {
                    setErrorText("");
                    setCoverLetter(false);
                    setMainview(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-8 max-sm:px-2">
                <div className="flex flex-wrap gap-3.5 justify-between items-center">
                  <div className="flex items-center rounded-lg">
                    <button className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] hover:bg-zinc-200 rounded-l-lg">
                      <FiDownload /> Download PDF
                    </button>
                    <button
                      onClick={() => {
                        copyCoverLetter();
                      }}
                      className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] rounded-r-lg hover:bg-zinc-200"
                    >
                      <IoCopyOutline /> {buttonText}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        GenerateCoverLetter();
                      }}
                      disabled={loading}
                      type="button"
                      className="ai-button px-6 me-2 rounded-lg py-3 text-center mb-2 flex justify-center items-center gap-2"
                    >
                      <span>
                        <img src={sparkleIcon} />
                      </span>
                      {loading ? "Generating..." : "Regenerate"}
                    </button>
                  </div>
                </div>

                {errorText && (
                  <div className="py-3">
                    <Alert variant="error">{errorText}</Alert>
                  </div>
                )}

                {successText && (
                  <div className="py-3">
                    <Alert variant="success">{successText}</Alert>
                  </div>
                )}

                <div className="wmde-markdown-var overflow-y-auto custom-scrollbar max-sm:h-[58vh] bg-white mt-6 mb-9">
                  <MDEditor
                    value={coverLetterData ?? ""}
                    preview="preview"
                    height={370}
                    className="bg-white border border-stroke rounded-2xl"
                    hideToolbar
                  />
                </div>

                <div className="flex justify-end items-center gap-3">
                  <button
                    className="px-4 flex items-center gap-2 py-2 font-medium text-zinc-600"
                    onClick={() => {
                      setErrorText("");
                      setCoverLetter(false);
                      setMainview(true);
                    }}
                  >
                    Close
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        handleSaveCoverletter();
                      }}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-primary disabled:bg-opacity-55 rounded-md text-white hover:bg-primary/95"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {intelligence && (
          <div className="w-full h-full flex justify-center md:items-center bg-black bg-opacity-50">
            <div
              className={`w-full md:max-w-[70%] lg:max-w-[60%] absolute bg-white md:rounded-2xl shadow-lg p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Company Intelligence</h2>
                <button
                  onClick={() => {
                    setIntelligence(false);
                    setMainview(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-8 max-sm:px-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center rounded-lg">
                    <button
                      onClick={() => {
                        copyCompanyDetails();
                      }}
                      className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] rounded-r-lg hover:bg-zinc-200"
                    >
                      <IoCopyOutline /> {buttonText}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        GenerateCompanyInfo();
                      }}
                      disabled={loading}
                      type="button"
                      className="ai-button px-6 me-2 rounded-lg py-3 text-center mb-2 flex justify-center items-center gap-2"
                    >
                      <span>
                        <img src={sparkleIcon} />
                      </span>
                      {loading ? "Generating..." : "Regenerate"}
                    </button>
                  </div>
                </div>

                {errorText && (
                  <div className="py-3">
                    <Alert variant="error">{errorText}</Alert>
                  </div>
                )}
                {successText && (
                  <div className="py-3">
                    <Alert variant="success">{successText}</Alert>
                  </div>
                )}

                <div className=" bg-white h-[60vh] space-y-4 text-sm text-zinc-600 px-3 py-4 overflow-y-auto custom-scrollbar border border-stroke rounded-xl  mt-6 mb-9">
                  {companyInfo?.description && (
                    <p>{companyInfo?.description}</p>
                  )}

                  {companyInfo?.mission && (
                    <div>
                      <h6 className="text-black font-semibold">Mission</h6>
                      <p>{companyInfo?.mission}</p>
                    </div>
                  )}
                  {companyInfo?.achievements && (
                    <div>
                      <h6 className="text-black font-semibold">Achievements</h6>
                      <p>{companyInfo?.achievements}</p>
                    </div>
                  )}

                  {companyInfo?.culture && (
                    <div>
                      <h6 className="text-black font-semibold">Culture</h6>
                      <p>{companyInfo?.culture}</p>
                    </div>
                  )}

                  {companyInfo?.values && (
                    <div>
                      <h6 className="text-black font-semibold">Values</h6>
                      <p>{companyInfo?.values}</p>
                    </div>
                  )}

                  {companyInfo?.contact && (
                    <div>
                      <h6 className="text-black font-semibold">Contact</h6>
                      <p>{companyInfo?.contact}</p>
                    </div>
                  )}

                  {companyInfo?.careerPage && (
                    <div>
                      <h6 className="text-black font-semibold">
                        Career Page Link:
                      </h6>
                      <div className="gap-1 flex items-center">
                        <span>
                          <IoIosLink />
                        </span>
                        <a
                          href={companyInfo?.careerPage || ""}
                          target="_blank"
                          className="text-underline hover:text-primary"
                        >
                          {companyInfo?.careerPage}
                        </a>
                      </div>
                    </div>
                  )}
                  {companyInfo?.email && (
                    <div>
                      <h6 className="text-black font-semibold">
                        Company Email:
                      </h6>
                      <div className="gap-1 flex items-center">
                        <span>
                          <MdEmail />
                        </span>
                        <p>{companyInfo?.email}</p>
                      </div>
                    </div>
                  )}
                  {companyInfo?.linkedIn && (
                    <div>
                      <h6 className="text-black font-semibold">
                        Company Linkedin Url:
                      </h6>
                      <div className="gap-1 flex items-center">
                        <span>
                          <IoIosLink />
                        </span>
                        <a
                          href={companyInfo?.linkedIn || ""}
                          target="_blank"
                          className="text-underline hover:text-primary"
                        >
                          {companyInfo?.linkedIn}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end items-center gap-3">
                  <button
                    className="px-4 flex items-center gap-2 py-2 font-medium text-zinc-600"
                    onClick={() => {
                      setErrorText("");
                      setCoverLetter(false);
                      setMainview(true);
                    }}
                  >
                    Close
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        handleSaveCompanyInfo();
                      }}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-primary disabled:bg-opacity-55 rounded-md text-white hover:bg-primary/95"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {successKit && (
          <div className="w-full h-full flex justify-center md:items-center bg-black bg-opacity-50">
            <div
              className={`w-full md:max-w-[70%] lg:max-w-[60%] absolute bg-white md:rounded-2xl shadow-lg p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Interview Success Kit</h2>
                <button
                  onClick={() => {
                    setErrorText("");
                    setSuccessKit(false);
                    setMainview(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-8 max-sm:px-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center rounded-lg">
                    <button
                      onClick={() => {
                        copyInterviewTips();
                      }}
                      className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] rounded-r-lg hover:bg-zinc-200"
                    >
                      <IoCopyOutline /> {buttonText}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        GenerateInterviewTips();
                      }}
                      disabled={loading}
                      type="button"
                      className="ai-button px-6 me-2 rounded-lg py-3 text-center mb-2 flex justify-center items-center gap-2"
                    >
                      <span>
                        <img src={sparkleIcon} />
                      </span>
                      {loading ? "Generating..." : "Regenerate"}
                    </button>
                  </div>
                </div>

                {errorText && (
                  <div className="py-3">
                    <Alert variant="error">{errorText}</Alert>
                  </div>
                )}

                {successText && (
                  <div className="py-3">
                    <Alert variant="success">{successText}</Alert>
                  </div>
                )}

                <div className="mt-6 mb-9">
                  <div className="w-full custom-scrollbar overflow-y-auto sm:h-[50vh] h-[65vh]  border border-stroke rounded-xl px-3 py-4">
                    <div className="w-full px-3 py-4">
                      {interviewTips && renderTips(interviewTips)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3">
                  <button
                    className="px-4 flex items-center gap-2 py-2 font-medium text-zinc-600"
                    onClick={() => {
                      setErrorText("");
                      setSuccessKit(false);
                      setMainview(true);
                    }}
                  >
                    Close
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        handleSaveInterviewTip();
                      }}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-primary disabled:bg-opacity-55 rounded-md text-white hover:bg-primary/95"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {shareModal && (
          <ShareResume
            show={shareModal}
            setShow={() => setShareModal(false)}
            resumeData={applicationData?.resume}
          />
        )}
      </motion.div>
    </AnimatePresence>,
    document.querySelector("#fullModal") as HTMLElement
  );
};

export const ResumeResult: React.FC<ResumeResultProps> = ({
  show,
  onHide,
  resumeData,
  onClick,
}) => {
  const [mainView, setMainview] = useState(true);
  const [resumeView, setResumeView] = useState(false);
  const { targetRef } = usePDF({ filename: "page.pdf" });
  const [tailorResume, setTailorResume] = useState(false);

  const handleDownload = async (component: any) => {
    // Generate a blob of the PDF
    console.log(component);
    const blob = await pdf(component).toBlob();

    // Create a blob URL
    const url = URL.createObjectURL(blob);

    // Create a link and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf"; // Set the file name
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full fixed inset-0 z-[999999] bg-[#F2F4F6] backdrop-blur-2xl"
      >
        {mainView && (
          <div className="relative h-screen">
            <div className="w-full bg-primary flex items-center md:px-6 py-5 px-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="bg-white/25 rounded-lg text-white w-9 h-9 flex items-center justify-center">
                  <IoDocumentTextOutline size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-0">
                    Your Resume is Ready!
                  </h3>
                  <p className="text-zinc-200">
                    To optimize Every component for a specific job in a company
                    click on create Application Kit below
                  </p>
                </div>
              </div>

              <button
                onClick={onHide}
                className="absolute top-[12px] md:top-[28px] text-white right-2 md:right-4 bg-white/25 hover:bg-white/30 rounded-full p-[4px]"
              >
                <RxCross2 size={18} className="" />
              </button>
            </div>
            <div className="min-h-[80%] overflow-y-auto custom-scrollbar pt-6 pb-28 max-sm:pb-[12rem] px-6">
              <div className="flex w-full justify-center items-center px-1.5 pb-4">
                <div className="px-3 md:max-w-[500px]">
                  <div>
                    <ContentAccordion
                      title={
                        <h2 className="flex items-center gap-2 py-3">
                          <IoDocumentTextOutline className="text-primary" /> CV
                        </h2>
                      }
                    >
                      <div className="bg-[#DBEAFE80] rounded-lg mb-3 p-3 flex flex-col gap-2 items-center justify-center">
                        <button
                          onClick={() => {
                            setMainview(false);
                            setResumeView(true);
                          }}
                          className="text-center hover:scale-105 duration-150 text-sm flex items-center gap-1 text-zinc-600"
                        >
                          <span>
                            <BsEye />
                          </span>{" "}
                          Preview
                        </button>
                        <div className="w-full min-h-[220px] max-h-[250px] 2xl:max-h-[300px] 3xl:max-h-[350px] 4xl:max-h-[550px] overflow-auto custom-scrollbar h-full bg-white">
                          <ResumePreview resumeData={resumeData} />
                        </div>
                        <p className="text-center text-sm text-zinc-600">
                          Click on the eye icon to view full preview
                        </p>
                      </div>
                    </ContentAccordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 px-8 py-2.5 bg-[#F2F4F6] flex max-sm:flex-col w-full items-center justify-between max-sm:gap-1.5 gap-3">
              <p className="text-zinc-500 max-sm:text-center">
                To craft your resume into a complete optimized kit with
                precision, convert to application kit! 🌟
              </p>
              <button
                onClick={onClick}
                className="bg-primary text-white justify-center font-semibold group rounded-md py-2.5 px-8 flex items-center gap-2"
              >
                Create Application Kit{" "}
                <FaArrowRightLong className="group-hover:ml-4 duration-200" />
              </button>
            </div>
          </div>
        )}

        {resumeView && (
          <div className="relative h-screen overflow-y-auto custom-scrollbar w-full">
            <button
              onClick={() => {
                setResumeView(false);
                setMainview(true);
              }}
              className="flex items-center text-lg text-zinc-800 gap-2 my-3 mx-3"
            >
              <span>
                <IoReturnUpBack />
              </span>
              <span>Back</span>
            </button>
            <div className="flex w-full justify-center items-center pb-6">
              <div
                ref={targetRef}
                className="xl:max-w-[70%] lg:max-w-[90%] w-full"
              >
                {/* <LiveResume  /> */}
                {/* <PDFViewer>
                <ResumePDF resumeData={mockResumeData} />

  </PDFViewer> */}
                <ResumePreview resumeData={resumeData} />
              </div>
            </div>
            <div className="fixed right-4 bottom-4">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg  divide-x divide divide-stroke bg-primary text-white">
                <button
                  onClick={() => {
                    handleDownload(
                      <LiveResumeDoc resumeData={mockResumeData} />
                    );
                  }}
                  className="flex items-center gap-1 hover:opacity-90"
                >
                  <BsDownload /> Download
                </button>
                {/* <PDFDownloadLink
      document={<ResumePDF resumeData={mockResumeData} />}
      fileName="resume.pdf"
    >
   
    <span>{ "Download PDF"}</span>
 
    </PDFDownloadLink> */}
                <button className="flex items-center gap-1 hover:opacity-90 px-2">
                  <MdEdit /> Edit
                </button>
              </div>
            </div>
          </div>
        )}
        {tailorResume && (
          <CreateApplicationKit
            show={tailorResume}
            onHide={() => setTailorResume(false)}
            applicationData={resumeData}
            tailor
          />
        )}
      </motion.div>
    </AnimatePresence>,
    document.querySelector("#fullModal") as HTMLElement
  );
};

export default ApplicationResult;
