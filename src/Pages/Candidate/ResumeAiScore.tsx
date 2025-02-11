import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { HiOutlineCheckCircle, HiOutlineTemplate } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  analyzeResume,
  fixAllResumeIssues,
  fixSingleResumeIssue,
  updateResume,
} from "../../services/resumeServices";
import { RiErrorWarningLine, RiRobot2Line } from "react-icons/ri";
import { LuWand2 } from "react-icons/lu";
import { FaCircle, FaRegStar } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import ProgressBar from "../../components/ProgressBar";
import botImg from "../../assets/svg/tb-score-bot.svg";
import { motion } from "framer-motion";

type Props = {
  show?: boolean;
  onHide: () => void;
  resumeData: any;
  config: any;
  setConfig: React.Dispatch<React.SetStateAction<any | null>>;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
};
const sampleData = {
  status: "success",
  message: "Resume analysis completed successfully",
  data: {
    text: "",
    analysis: {
      scores: {
        content: 90,
        format: 85,
        optimization: 80,
        bestPractices: 75,
        applicationReady: 80,
        atsCompatibility: 85,
      },
      criticalMistakes: 0,
      issues: [
        {
          type: "optimization",
          issues: [
            {
              types: ["optimization", "content"],
              severity: "medium",
              title: "Keyword Matching with Job Description",
              details:
                "The CV lacks specific keywords mentioned in the job description, such as 'RESTful APIs', 'microservices', 'security measures', and 'automated tests'.",
              suggestion:
                "Incorporate relevant keywords and phrases from the job description into the CV, especially in the professional summary, work experience, and skills sections to improve ATS optimization and content relevance.",
            },
            {
              types: ["optimization", "bestPractices"],
              severity: "medium",
              title: "Skills Section Organization",
              details:
                "The skills section is divided into 'technical' and 'Soft Skill' but lacks prioritization in alignment with the job description's requirements.",
              suggestion:
                "Reorganize the skills section to prioritize key skills mentioned in the job description, such as programming languages (Node.js), database management (PostgreSQL, MongoDB), and cloud computing platforms (AWS or Azure).",
            },
          ],
        },
        {
          type: "content",
          issues: [
            {
              types: ["optimization", "content"],
              severity: "medium",
              title: "Keyword Matching with Job Description",
              details:
                "The CV lacks specific keywords mentioned in the job description, such as 'RESTful APIs', 'microservices', 'security measures', and 'automated tests'.",
              suggestion:
                "Incorporate relevant keywords and phrases from the job description into the CV, especially in the professional summary, work experience, and skills sections to improve ATS optimization and content relevance.",
            },
            {
              types: ["content", "bestPractices"],
              severity: "medium",
              title: "Quantifiable Achievements",
              details:
                "The work experience section lists responsibilities but lacks quantifiable achievements that could demonstrate impact and proficiency.",
              suggestion:
                "Enhance the work experience descriptions with specific, quantifiable achievements. For example, 'Enhanced user experience leading to a 20% increase in customer satisfaction' or 'Optimized application performance, resulting in a 30% reduction in load times'.",
            },
            {
              types: ["content", "bestPractices"],
              severity: "low",
              title: "Professional Summary Impact",
              details:
                "The professional summary is well-crafted but could further highlight the candidate's leadership experience and success in mentoring, as required by the job description.",
              suggestion:
                "Revise the professional summary to include specific examples of leadership roles, mentoring experiences, or contributions to team success, aligning with the job's emphasis on leading technical initiatives and coaching team members.",
            },
          ],
        },
        {
          type: "bestPractices",
          issues: [
            {
              types: ["content", "bestPractices"],
              severity: "medium",
              title: "Quantifiable Achievements",
              details:
                "The work experience section lists responsibilities but lacks quantifiable achievements that could demonstrate impact and proficiency.",
              suggestion:
                "Enhance the work experience descriptions with specific, quantifiable achievements. For example, 'Enhanced user experience leading to a 20% increase in customer satisfaction' or 'Optimized application performance, resulting in a 30% reduction in load times'.",
            },
            {
              types: ["content", "bestPractices"],
              severity: "low",
              title: "Professional Summary Impact",
              details:
                "The professional summary is well-crafted but could further highlight the candidate's leadership experience and success in mentoring, as required by the job description.",
              suggestion:
                "Revise the professional summary to include specific examples of leadership roles, mentoring experiences, or contributions to team success, aligning with the job's emphasis on leading technical initiatives and coaching team members.",
            },
            {
              types: ["format", "bestPractices"],
              severity: "low",
              title: "Inconsistent Date Formatting",
              details:
                "The date formats in the education and certifications sections are inconsistent, which could confuse readers or ATS systems.",
              suggestion:
                "Standardize the date format across the entire CV to improve readability and ensure ATS compatibility. For example, choose between 'MM/YYYY' or 'YYYY' and apply it consistently.",
            },
            {
              types: ["optimization", "bestPractices"],
              severity: "medium",
              title: "Skills Section Organization",
              details:
                "The skills section is divided into 'technical' and 'Soft Skill' but lacks prioritization in alignment with the job description's requirements.",
              suggestion:
                "Reorganize the skills section to prioritize key skills mentioned in the job description, such as programming languages (Node.js), database management (PostgreSQL, MongoDB), and cloud computing platforms (AWS or Azure).",
            },
          ],
        },
        {
          type: "format",
          issues: [
            {
              types: ["format", "bestPractices"],
              severity: "low",
              title: "Inconsistent Date Formatting",
              details:
                "The date formats in the education and certifications sections are inconsistent, which could confuse readers or ATS systems.",
              suggestion:
                "Standardize the date format across the entire CV to improve readability and ensure ATS compatibility. For example, choose between 'MM/YYYY' or 'YYYY' and apply it consistently.",
            },
          ],
        },
        {
          type: "applicationReady",
          issues: [
            {
              types: ["applicationReady"],
              severity: "medium",
              title: "Missing Contact Information",
              details:
                "The CV does not include a phone number, which could limit the employer's contact options.",
              suggestion:
                "Add a phone number to the contact information to ensure employers have multiple ways to reach out.",
            },
          ],
        },
      ],
    },
  },
};
const ResumeAiScore: React.FC<Props> = ({
  show,
  onHide,
  resumeData,
  setResumeData,
  config,
  setConfig,
}) => {
  const [activeTab, setActiveTab] = useState<
    "content" | "format" | "optimization" | "bestPractices" | "applicationReady"
  >("content");

  const [contentData, setContentData] = useState<any>(null);
  const [fixLoading, setFixLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tabs, setTabs] = useState([
    {
      id: "content",
      label: "Content",
      score: 82,
      icon: <IoDocumentTextOutline size={22} />,
    },
    {
      id: "format",
      label: "Format",
      score: 91,
      icon: <HiOutlineTemplate size={22} />,
    },
    {
      id: "optimization",
      label: "Optimization",
      score: 0,
      icon: <LuWand2 size={22} />,
    },
    {
      id: "bestPractices",
      label: "Best Practices",
      score: 82,
      icon: <HiOutlineCheckCircle size={22} />,
    },
    {
      id: "applicationReady",
      label: "Application Ready",
      score: 82,
      icon: <FaRegStar size={22} />,
    },
  ]);
  const [loadingStep, setLoadingStep] = useState(0);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const steps = [
    "Analyzing Content",
    "Identifying Issues",
    "Applying Fixes",
    "Validating Changes",
  ];
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateResume = async () => {
    try {
      const resp = await updateResume(resumeData?._id, {
        ...resumeData,
        config: config,
      });
      setResumeData(resp?.data?.resume);
      setConfig(resp?.data?.resume?.config);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    }
  };

  const handleAnalyzeResume = async () => {
    try {
      await handleUpdateResume();
      const resp = await analyzeResume(
        {
          resumeId: resumeData?._id,
        },
        resumeData?._id
      );
      setContentData(resp?.data?.analysis);
    } catch (err: any) {
      setError(true);
      setErrorMessage(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFixResumeIssue = async (data: any) => {
    setFixLoading(true);
    try {
      const resp = await fixSingleResumeIssue(data);
      console.log(resp?.data);

      // Update the score of the active tab
      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === activeTab ? { ...tab, score: resp?.data?.newScore } : tab
        )
      );

      // Update the issues in the contentData state
      setContentData((prevContentData: any) => ({
        ...prevContentData,
        issues: prevContentData.issues.map((issueGroup: any) =>
          issueGroup.type === activeTab
            ? { ...issueGroup, issues: resp?.data?.remainingIssues }
            : issueGroup
        ),
      }));

      setResumeData(resp?.data?.resume);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setFixLoading(false);
    }
  };

  const handleFixAllResumeIssue = async (data: any) => {
    setSelectedIssue(null);
    setFixLoading(true);
    setLoadingStep(0);
    try {
      const resp = await fixAllResumeIssues(data);
      // console.log(resp?.data);
      setResumeData(resp?.data?.resume);
      onHide()
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
      setErrorMessage(
        err?.message || "Request Failed! Please, try again later"
      );
      setError(true);
      setFixLoading(false)
      setLoadingStep(0);
    } finally {
      setFixLoading(false);
      setLoadingStep(0);
    }
  };

  const renderContent = () => {
    const issues = contentData?.issues;

    const renderIssues = (type: string) => {
      return issues
        ?.filter((issue: any) => issue.type === type)
        .flatMap((issueArray: any) => issueArray.issues)
        ?.map((issue: any, index: number) => (
          <div
            key={index}
            className="flex gap-3 items-start w-full mt-8 shadow-card rounded-xl py-4 px-3 bg-white"
            onClick={() => setSelectedIssue(issue?.title)}
          >
            <div
              className={` mt-1.5 p-0.5 ${
                issue?.severity === "low"
                  ? "text-yellow-400 bg-yellow-400/15 rounded-lg"
                  : "text-red-500 bg-red-400/15 rounded-lg"
              }`}
            >
              <RiErrorWarningLine size={20} />
            </div>
            <div>
              <p className="text-lg font-semibold mb-1.5">{issue?.title}</p>
              <p className="text-sm text-zinc-500 font-medium mb-1.5">
                {issue?.suggestion}
              </p>
            </div>
            <div className="ml-auto">
              <button
                disabled={fixLoading && selectedIssue === issue?.title}
                onClick={() => {
                  handleFixResumeIssue({
                    type: type,
                    resumeId: resumeData?._id,
                    issues: issues
                      ?.filter((issue: any) => issue.type === type)
                      .flatMap((issueArray: any) => issueArray.issues),
                    issueIndex: index,
                  });
                }}
                className="bg-primary/15 text-primary w-[120px] flex items-center gap-2 rounded-md hover:scale-105 py-1.5 px-4 font-medium"
              >
                <LuWand2
                  className={`${
                    fixLoading &&
                    selectedIssue === issue?.title &&
                    "animate-pulse"
                  }`}
                />{" "}
                {fixLoading && selectedIssue === issue?.title
                  ? "Fixing..."
                  : "Fix Issue"}{" "}
              </button>
            </div>
          </div>
        ));
    };

    switch (activeTab) {
      case "content":
        return (
          <div>
            <div className="flex gap-3 items-center w-full my-4 shadow-card rounded-xl py-4 px-3 bg-[#f3f4f6]">
              <div>
                <IoDocumentTextOutline
                  size={22}
                  className={`font-bold text-yellow-400`}
                />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold mb-0">Content</h6>
                <p className="text-zinc-700 text-sm font-medium">
                  Quality and relevance of your CV content
                </p>
              </div>
            </div>
            {renderIssues("content")}
          </div>
        );
      case "format":
        return (
          <div>
            <div className="flex gap-3 items-center w-full my-4 shadow-card rounded-xl py-4 px-3 bg-[#f3f4f6]">
              <div>
                <HiOutlineTemplate
                  size={22}
                  className={`font-bold text-yellow-400`}
                />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold mb-0">Format</h6>
                <p className="text-zinc-700 text-sm font-medium">
                  Visual structure and layout optimization
                </p>
              </div>
            </div>{" "}
            {renderIssues("format")}
          </div>
        );
      case "optimization":
        return (
          <div>
            <div className="flex gap-3 items-center w-full my-4 shadow-card rounded-xl py-4 px-3 bg-[#f3f4f6]">
              <div>
                <LuWand2 size={22} className={`font-bold text-yellow-400`} />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold mb-0">Optimization</h6>
                <p className="text-zinc-700 text-sm font-medium">
                  ATS optimization and keyword matching
                </p>
              </div>
            </div>{" "}
            {renderIssues("optimization")}
          </div>
        );
      case "bestPractices":
        return (
          <div>
            <div className="flex gap-3 items-center w-full my-4 shadow-card rounded-xl py-4 px-3 bg-[#f3f4f6]">
              <div>
                <HiOutlineCheckCircle
                  size={22}
                  className={`font-bold text-yellow-400`}
                />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold mb-0">Best Practices</h6>
                <p className="text-zinc-700 text-sm font-medium">
                  Industry standard CV practices
                </p>
              </div>
            </div>
            {renderIssues("bestPractices")}
          </div>
        );
      case "applicationReady":
        return (
          <div>
            <div className="flex gap-3 items-center w-full my-4 shadow-card rounded-xl py-4 px-3 bg-[#f3f4f6]">
              <div>
                <FaRegStar size={22} className={`font-bold text-yellow-400`} />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold mb-0">
                  Application Ready
                </h6>
                <p className="text-zinc-700 text-sm font-medium">
                  Overall readiness for job applictions
                </p>
              </div>
            </div>
            {renderIssues("applicationReady")}
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (sampleData?.data?.analysis?.scores) {
      const updatedTabs = tabs.map((tab) => ({
        ...tab,
        //@ts-ignore
        score: sampleData?.data?.analysis?.scores[tab.id] || tab.score,
      }));
      setTabs(updatedTabs);
    }
    handleAnalyzeResume();
  }, []);

  useEffect(() => {
    if (fixLoading && selectedIssue === null) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        setProgress((prev) => (prev < 97 ? prev + 10 : 97));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [fixLoading, selectedIssue]);

  useEffect(() => {
    if (stepRefs.current[loadingStep]) {
      stepRefs.current[loadingStep].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [loadingStep]);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-screen h-screen z-9999 bg-black bg-opacity-50 fixed top-0 flex md:items-center justify-center text-[#444444] overflow-x-auto">
      <div
        className={` bg-white py-5  flex flex-col lg:max-w-[60%]  md:rounded-2xl justify-center md:mx-6 md:my-auto mx-0`}
      >
        <div className="flex flex-col md:justify-center relative">
          <div className="flex items-center md:px-6 px-4">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white sm:text-2xl mb-0">
                Tabbio ATS Score
              </h3>
              <p className="text-zinc-500">
                Analyse and Improve your CV with Tabbio AI-powered tools
              </p>
            </div>

            <button
              onClick={onHide}
              className="absolute -top-[12px] text-zinc-900 right-2 bg-slate-200 hover:bg-slate-300 rounded-full p-[4px]"
            >
              <RxCross2 size={18} className="" />
            </button>
          </div>

          {loading ? (
            <div className="py-5">
              <div className="flex w-full items-center justify-center gap-2">
                <span className="bg-primary rounded-full text-white w-14 h-14 flex items-center justify-center">
                  <RiRobot2Line size={28} className="animate-pulse" />
                </span>
              </div>

              <div className="my-8 text-center">
                <h3 className="text-lg font-semibold text-zinc-800">
                  Analyzing your Resume
                </h3>
                <p>Please, wait while our AI analyzes your resume</p>
              </div>
            </div>
          ) : error ? (
            <div>
              <div className="py-5">
                <div className="flex items-center justify-center gap-2 px-3">
                  <span className="bg-red-600 rounded-full text-white w-14 h-14 flex items-center justify-center">
                    <MdOutlineErrorOutline
                      size={28}
                      className=""
                    />
                  </span>
                </div>

                <div className="my-8 text-center">
                  <h3 className="text-lg font-semibold text-zinc-800">
                    An Error occurred!
                  </h3>
                  <p>
                    {errorMessage} <br /> Please, try again in some minutes
                  </p>
                </div>
              </div>
            </div>
          ) : fixLoading && selectedIssue === null ? (
            <div className="max-h-[75vh] lg:max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="py-5 px-3">
                <div className="flex items-center w-full justify-center gap-2">
                  <img src={botImg} className="animate-pulse" />
                </div>

                <div className="my-4 text-center">
                  <h3 className="text-lg font-semibold text-zinc-800">
                    Fixing all CV issues
                  </h3>
                  <p className="text-center text-zinc-600">
                    Our AI is analyzing and fixing issues in your CV. This will <br />
                    only take a moment.
                  </p>
                </div>

                <div className="space-y-1 my-8">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      ref={(el) => (stepRefs.current[index] = el!)}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: index <= loadingStep ? 1 : 0.3 }}
                      transition={{ duration: 0.7 }}
                      className={`relative`}
                    >
                      <p
                        className={`${
                          index <= loadingStep && index !== loadingStep
                            ? "text-primary"
                            : "text-[#9CA3AF]"
                        } text-sm flex gap-1 items-center`}
                      >
                        {index <= loadingStep && index !== loadingStep ? (
                          <FaCircle
                            size={6}
                            className="rounded-full text-primary"
                          />
                        ) : (
                          <FaCircle
                            size={6}
                            className="rounded-full text-zinc-200"
                          />
                        )}{" "}
                        <span className="text-[15px]">{step}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Div */}
                <div className="py-4">
                  <div className="mb-1.5">
                    <ProgressBar percent={progress} />
                  </div>
                  <div className="flex w-full justify-between gap-6 text-sm text-zinc-500">
                    <p>Optimizing your CV</p>
                    <p className="text-primary">{progress}%</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 px-5 max-h-[75vh] lg:max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mb-4 px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-xl shadow-sm hover:shadow-md border ${
                      activeTab === tab.id
                        ? "border-primary/10 bg-primary/5 ring-2 ring-primary/10"
                        : "bg-white text-gray-800 border-stroke"
                    }`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <div className="flex flex-col gap-1.5 py-2 px-3 items-center">
                      <span
                        className={`${
                          activeTab === tab.id ? "text-primary" : ""
                        } w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center`}
                      >
                        {tab.icon}
                      </span>
                      <span className="text-base font-semibold">
                        {tab.label}
                      </span>
                      <span
                        className={`text-xl font-bold ${
                          tab?.score < 50
                            ? "text-red-400"
                            : tab?.score < 80
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {tab?.score}
                      </span>{" "}
                    </div>
                  </button>
                ))}
              </div>
              {contentData && (
                <div className="p-4 rounded bg-gray-50">{renderContent()}</div>
              )}

              <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
                <button
                  onClick={() => {
                    onHide();
                  }}
                  className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    handleFixAllResumeIssue({
                      issues: contentData?.issues,
                      resumeId: resumeData?._id,
                    })
                  }
                  className="bg-primary flex items-center gap-2 rounded-md text-white hover:scale-105 py-1.5 px-4 font-medium"
                >
                  <RiRobot2Line /> Fix all Issues
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,

    document.querySelector("#modal") as HTMLElement
  );
};

export default ResumeAiScore;
