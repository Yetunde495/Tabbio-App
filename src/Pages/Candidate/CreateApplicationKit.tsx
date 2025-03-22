import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  FaArrowRightLong,
  FaCircle,
  FaCircleCheck,
  FaRegCircleCheck,
  FaRegStar,
} from "react-icons/fa6";
import { RiLoader4Fill, RiRobot2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { VscWand } from "react-icons/vsc";
import { TextArea } from "../../components/form";
import Stepper from "../../components/Stepper";
import { IoDocumentTextOutline, IoSparklesOutline } from "react-icons/io5";
import smartcvIcon from "../../assets/svg/smartCV-white.svg";
import { SelectFileBox } from "../General/ResumeUpload";
import { FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";
import { LuBuilding2, LuCrown } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import ProgressBar from "../../components/ProgressBar";
import ApplicationResult from "./ApplicationkitResult";
import { TbLoader3 } from "react-icons/tb";
import { getProfileResume } from "../../services/resumeServices";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import { generateApplication } from "../../services/applicationServices";

type Props = {
  show?: boolean;
  onHide: () => void;
  applicationData?: any;
  tailor?: boolean;
};

const CreateApplicationKit: React.FC<Props> = ({
  show,
  onHide,
  applicationData,
  tailor,
}) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const { user } = useApp();
  const [value, setValue] = React.useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [resultModal, setResultModal] = useState(applicationData?.isTailored);
  const [applicationKitData, setApplicationKitData] = useState<any>(
    applicationData || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [tabData] = useState([
    {
      stepNumber: 1,
      label: "Choose Resume",
      icon: <IoDocumentTextOutline />,
    },
    {
      stepNumber: 2,
      label: "Job Details",
      icon: <RiRobot2Line />,
    },
    {
      stepNumber: 3,
      label: "Generating",
      icon: <VscWand />,
    },
    {
      stepNumber: 3,
      label: "Complete",
      icon: <FaRegCircleCheck />,
    },
  ]);

  const steps = [
    {
      title: "AI Analysis",
      description: "Analyzing resume and job requirements",
      details: [
        "Extracting key qualifications",
        "Analyzing experience relevance",
        "Evaluating skill matches",
      ],
      bgColor: "custom-bg-gradient",
      icon: <RiRobot2Line />,
    },
    {
      title: "Smart Optimization",
      description: "Enhancing application materials",
      bgColor: "bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#C026D3]",
      icon: <VscWand />,
    },
    {
      title: "Company Intelligence",
      description: "Gathering strategic insights",
      bgColor: "bg-gradient-to-br from-[#C026D3] via-[#DB2777] to-[#E11D48]",
      icon: <LuBuilding2 />,
    },
    {
      title: "Final Assembly",
      description: "Creating your premium kit",
      bgColor: "bg-gradient-to-br from-[#E11D48] via-[#DC2626] to-[#EA580C]",
      icon: <LuCrown />,
    },
  ];

  const fetchProfileResume = async () => {
    setProfileLoading(true);
    try {
      const resp = await getProfileResume(user?.profileId);
      // Destructure the fields to omit them
      const { profileId, ...filteredResume } = resp?.data?.resume;
      setApplicationKitData((appData: any) => ({
        ...appData,
        resume: filteredResume,
      }));
      setActiveStep(activeStep + 1);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setProfileLoading(false);
    }
  };

  const GenerateApplication = async () => {
    setLoading(true);
    setActiveStep(activeStep + 1);
    const formData = new FormData();
    if (selectedFile) {
      formData.append("document", selectedFile);
    } else {
      formData.append("resumeId", applicationKitData?.resume?._id);
    }
    formData.append("jobDescription", value);

    const processSteps = async (stepIndex: number) => {
      if (stepIndex >= steps.length) return;

      setLoadingStep(stepIndex);
      setProgress((prev) => Math.min(prev + 98 / steps.length, 98)); // Cap at 95%

      if (stepIndex !== 0) {
        // Move normally for other steps
        setTimeout(() => processSteps(stepIndex + 1), stepIndex !== 0 ? 7000 : 12000);
      }
    };

    // Start processing steps
    processSteps(0);

    try {
      const resp = await generateApplication(formData);
      setApplicationKitData(resp?.data?.application);
      setActiveStep(activeStep + 1);
      setResultModal(true);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      onHide()
    }
  };

  useEffect(() => {
    if (stepRefs.current[loadingStep]) {
      stepRefs.current[loadingStep].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [loadingStep]);

  useEffect(() => {
    if (activeStep === 2 && loadingStep === 0) {
      const stepDetails = steps[loadingStep]?.details || [];
      let subStepIndex = 0;

      const subStepInterval = setInterval(() => {
        if (subStepIndex < stepDetails.length - 1) {
          setCurrentSubStep((prev) => prev + 1);
          subStepIndex++;
        } else {
          clearInterval(subStepInterval);
        }
      }, 4000); // Adjust duration per sub-step

      return () => clearInterval(subStepInterval);
    }
  }, [activeStep, loadingStep]);

  useEffect(() => {
    if (tailor) {
      setActiveStep(1);
      setResultModal(false);
    }
  }, []);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-screen h-screen z-9999 bg-black bg-opacity-50 fixed top-0 flex md:items-center justify-center text-[#444444] overflow-x-auto">
      <div
        className={` bg-white md:py-5 py-0.5   flex flex-col md:min-w-[55%] md:max-w-[55%] min-w-full   md:rounded-2xl justify-center md:mx-6 md:my-auto mx-0`}
        ref={modalRef}
      >
        <div className="flex flex-col justify-center relative">
          <div className="flex items-center md:px-6 px-4">
            <div className="flex items-center gap-2">
              <span className="custom-bg-gradient  rounded-lg text-white w-9 h-9 flex items-center justify-center">
                <RiRobot2Line />
              </span>
              <div>
                <h3 className="font-semibold text-black dark:text-white text-lg mb-0">
                  Create Application Kit™
                </h3>
                <p className="text-zinc-500">
                  Let our AI craft your perfect application
                </p>
              </div>
            </div>

            <button
              onClick={onHide}
              className="absolute -top-[12px] text-zinc-900 right-2 bg-slate-200 hover:bg-slate-300 rounded-full p-[4px]"
            >
              <RxCross2 size={18} className="" />
            </button>
          </div>

          <div className="mt-10 mb-8 px-1">
            <Stepper
              steps={tabData}
              activeStep={activeStep}
              // setCompleted={handleSetCompleted}
              // setActiveStep={(step) => setActiveStep(step)}
              // control={true}
            />
          </div>

          <div className="py-5 h-[55vh] px-7 max-sm:px-2.5 overflow-y-auto no-scrollbar">
            {activeStep === 0 ? (
              <div>
                <div
                  onClick={() => {
                    fetchProfileResume();
                  }}
                  className="px-4 py-5 bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] border border-[#DBEAFE] cursor-pointer rounded-xl"
                >
                  <div className=" flex justify-end items-start">
                    <span className="bg-[#C28F2C] text-white rounded-full font-medium text-[10px] py-0.5 px-1">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center max-sm:items-start w-full gap-2.5">
                    <div className="custom-bg-gradient rounded-full text-white max-sm:h-8 max-sm:w-8 w-10 h-10 flex items-center justify-center">
                      <img
                        src={smartcvIcon}
                        className={`${profileLoading && "animate-pulse w-2"}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-0">
                        Continue with SmartCV™
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        {profileLoading
                          ? "Loading up your existing optimized resume data"
                          : "Use your existing optimized resume with AI enhancement"}
                      </p>
                    </div>
                    <span className="text-primary ml-auto max-md:w-8">
                      {profileLoading ? (
                        <TbLoader3 className="animate-spin" />
                      ) : (
                        <FaArrowRightLong />
                      )}
                    </span>
                  </div>
                </div>

                <div className="my-12">
                  <SelectFileBox
                    onChange={(files: any) => {
                      setSelectedFile(files[0]);
                      setActiveStep(activeStep + 1);
                    }}
                  >
                    <p className="font-semibold text-black text-center text-base pt-4">
                      Drag & drop your resume here
                    </p>

                    <p className="text-neutral-500 text-center text-sm">
                      or click to browse your files
                    </p>

                    <div className="flex gap-5 text-xs text-neutral-500 items-center justify-center w-full mt-3">
                      <p className="flex items-center gap-1">
                        <span>
                          <IoDocumentTextOutline />
                        </span>
                        PDF, DOC, DOCX
                      </p>

                      <span>
                        <FaCircle size={4} className="rounded-full" />
                      </span>
                      <p className="flex items-center gap-1">
                        <span>
                          <FiUpload />
                        </span>
                        Up to 10MB
                      </p>
                    </div>
                  </SelectFileBox>
                </div>
              </div>
            ) : activeStep === 1 ? (
              <div>
                <div>
                  <TextArea
                    placeholder="Include the job title, company name, and full job description..."
                    label={
                      <span className="flex items-center gap-1">
                        <RiRobot2Line className="text-primary" />
                        Paste the job posting details below
                      </span>
                    }
                    value={value}
                    onChange={(val: string) => setValue(val)}
                    row={8}
                    props={{ roundedLg: true }}
                  />
                </div>

                <div className="bg-[#F9FAFB] border-stroke py-4 px-3 rounded-lg shadow mt-5">
                  <div className="flex gap-2 mb-2 items-start ">
                    <span>
                      <IoSparklesOutline
                        size={24}
                        className="text-[#4F46E5] font-bold"
                      />
                    </span>
                    <div className="text-[#4F46E5]">
                      <h6 className="text-slate-600 font-semibold mb-0.5">
                        AI-Powered Optimization
                      </h6>
                      <p className="text-[15px] text-slate-500">
                        Our AI will analyze the job details to create a
                        perfectly tailored application kit, including:
                      </p>
                      <ul className="text-sm font-semibold space-y-2 my-2">
                        <li className="flex items-center gap-1">
                          <span>
                            <FaRegStar className="text-yellow-400" />
                          </span>
                          <span>Optimized resume with relevant keywords</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <span>
                            <FaRegStar className="text-yellow-400" />
                          </span>
                          <span>Customized cover letter</span>
                        </li>

                        <li className="flex items-center gap-1">
                          <span>
                            <FaRegStar className="text-yellow-400" />
                          </span>
                          <span>Interview preparation materials</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-4 my-7 w-full flex items-center gap-6 justify-end">
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="text-zinc-700 hover:scale-105 duration-150"
                  >
                    Back
                  </button>
                  <button
                    disabled={value === "" || loading}
                    onClick={() => {
                      GenerateApplication();
                    }}
                    className="bg-primary disabled:bg-opacity-50 text-white justify-center font-semibold group rounded-md py-3 px-8 flex items-center gap-2"
                  >
                    {loading ? "Creating" : "Create"} Application Kit
                    <VscWand className="group-hover:ml-4 duration-200" />
                  </button>
                </div>
              </div>
            ) : activeStep === 2 ? (
              <div>
                <div className="flex w-full justify-center items-center">
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-inner">
                    {/* Spinning Shadow */}
                    <div className="absolute w-full h-full rounded-full animate-spin bs">
                      <div className="absolute inset-0 w-full h-full rounded-full"></div>
                    </div>

                    {/* Progress Display (Static) */}
                    <div className="relative z-10 flex items-center justify-center w-22 h-22 rounded-full bg-white">
                      <span className="text-lg font-bold">{progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 my-8">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      ref={(el) => (stepRefs.current[index] = el!)}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: index <= loadingStep ? 1 : 0.3 }}
                      transition={{ duration: 8 }}
                      className={`bg-[#F9FAFB] rounded-lg px-5 py-6 flex items-start relative gap-3 mb-5 ${
                        index === loadingStep ? "shadow-lg" : ""
                      }`}
                    >
                      <div className="flex max-sm:flex-col gap-2 mb-2 items-start">
                        <span
                          className={`${step.bgColor} rounded-xl text-white max-sm:w-6 max-sm:h-6 w-9 h-9 flex items-center justify-center`}
                        >
                          {step.icon}
                        </span>
                        <div className="text-primary max-sm:w-full">
                          <h6 className="text-[#111827] font-semibold mb-0.5">
                            {step.title}
                          </h6>
                          <p className="text-sm font-normal text-[#4B5563]">
                            {step.description}
                          </p>
                          {step.details && (
                            <motion.ul
                              initial="hidden"
                              animate={
                                index <= loadingStep ? "visible" : "hidden"
                              }
                              className="text-sm font-normal space-y-2 my-2"
                            >
                              {step?.details?.map((detail, i) => (
                                <motion.li
                                  key={i}
                                  custom={i}
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="mt-0.5">
                                    {loadingStep === 0 && i === currentSubStep ? (
                                      <RiLoader4Fill className="animate-spin text-black" />
                                    ) : i <= currentSubStep ? (
                                      <FaCircleCheck className="text-success" />
                                    ) : null}
                                  </span>{" "}
                                  <span>{detail}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </div>
                      </div>
                      <p
                        className={`${
                          index <= loadingStep && index !== loadingStep
                            ? "text-primary"
                            : "text-primary/80"
                        } ml-auto text-sm flex gap-1 items-center max-sm:absolute max-sm:top-5.5 max-sm:right-2`}
                      >
                        {index <= loadingStep && index !== loadingStep && (
                          <FaCheckCircle />
                        )}{" "}
                        {index === loadingStep
                          ? "Processing..."
                          : index <= loadingStep
                          ? "Complete"
                          : ""}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Div */}
                <div className="py-4 hidden">
                  <div className="mb-1.5">
                    <ProgressBar percent={progress} />
                  </div>
                  <div className="flex w-full justify-between gap-6 text-sm text-zinc-500">
                    <p>Processing your application</p>
                    <p className="text-primary">{progress}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      {resultModal && (
        <ApplicationResult
          show={resultModal}
          onHide={() => {
            onHide();
            setResultModal(false);
          }}
          onTailorResume={() => {}}
          selectedApplication={applicationKitData}
        />
      )}
    </div>,

    document.querySelector("#modal") as HTMLElement
  );
};

export default CreateApplicationKit;
