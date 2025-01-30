import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HiOutlineTemplate } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { analyzeResume } from "../../services/resumeServices";
import { RiErrorWarningLine } from "react-icons/ri";

type Props = {
  show?: boolean;
  onHide: () => void;
  resumeData: any;
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
          type: "content",
          severity: "warning",
          message: "Lack of specific technologies mentioned in job description",
          description:
            "While the CV showcases a strong background in software development, it lacks mention of specific technologies and methodologies highlighted in the job description, such as Java, Python, cloud-based computing platforms (AWS or Azure), and software development methodologies (agile and DevOps). Including these could strengthen the application.",
        },
        {
          type: "format",
          severity: "warning",
          message: "Inconsistent experience date format",
          description:
            "The experience section shows a mix of date formats (e.g., '''July 2022 Sep 2023''' vs. '''Jan 2023 July 2023'''). Consistency in date formatting throughout the CV would enhance its professional appearance.",
        },
        {
          type: "optimization",
          severity: "warning",
          message: "Insufficient keyword matching with job description",
          description:
            "The CV does not sufficiently match keywords from the job description, such as '''RESTful APIs''', '''microservices''', '''security measures''', and '''automated tests'''. Incorporating these keywords could improve ATS optimization and the likelihood of being shortlisted for the role.",
        },
        {
          type: "bestPractices",
          severity: "warning",
          message: "Education section could be optimized",
          description:
            "Given the professional experience, the education section could be placed at the end of the CV to highlight the practical experience over academic qualifications. This is a common practice for individuals with significant work experience.",
        },
        {
          type: "applicationReady",
          severity: "warning",
          message: "Missing specific examples of leadership and mentoring",
          description:
            "The job description seeks experience in leading technical initiatives and mentoring other engineers. The CV lacks specific examples or achievements related to these areas. Including such information could significantly improve the application'''s readiness for the senior position.",
        },
      ],
    },
  },
};
const ResumeAiScore: React.FC<Props> = ({ show, onHide, resumeData }) => {
  const [activeTab, setActiveTab] = useState<
    "content" | "format" | "optimization" | "bestPractices" | "applicationReady"
  >("content");

  const [contentData, setContentData] = useState<any>(null);
  const [tabs, setTabs] = useState([
    {
      id: "content",
      label: "Content",
      score: 82,
      icon: <IoDocumentTextOutline />,
    },
    { id: "format", label: "Format", score: 91, icon: <HiOutlineTemplate /> },
    {
      id: "optimization",
      label: "Optimization",
      score: 0,
      icon: <IoDocumentTextOutline />,
    },
    {
      id: "bestPractices",
      label: "Best Practices",
      score: 82,
      icon: <IoDocumentTextOutline />,
    },
    {
      id: "applicationReady",
      label: "Application Ready",
      score: 82,
      icon: <IoDocumentTextOutline />,
    },
  ]);

  const [_loading, setLoading] = useState(true);

  const handleAnalyzeResume = async () => {
    try {
      const resp = await analyzeResume(
        {
          resumeId: resumeData?._id,
        },
        resumeData?._id
      );
      setContentData(resp?.data?.analysis);
      console.log(resp);

      // console.log(resp?.data?.profile);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    const issues = contentData?.issues;

    const renderIssues = (type: string) => {
      return issues
        ?.filter((issue: any) => issue.type === type)
        ?.map((issue: any, index: number) => (
          <div
            key={index}
            className="flex gap-3 items-start w-full mt-8 shadow-card rounded-xl py-4 px-3 bg-white"
          >
            <div className={` mt-1.5 p-0.5 ${
                  issue?.severity === "warning"
                    ? "text-yellow-400 bg-yellow-400/15 rounded-lg"
                    : "text-red-500 bg-red-400/15 rounded-lg"
                }`}>
              <RiErrorWarningLine
                size={20}
                
              />
            </div>
            <div>
              <p className="text-lg font-semibold mb-1.5">{issue?.message}</p>
              <p className="text-zinc-500 text-sm font-medium">{issue?.description}</p>
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
            <h2 className="text-xl font-semibold mb-2">Format</h2>
            {renderIssues("format")}
          </div>
        );
      case "optimization":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Optimization</h2>
            {renderIssues("optimization")}
          </div>
        );
      case "bestPractices":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Best Practices</h2>
            {renderIssues("bestPractices")}
          </div>
        );
      case "applicationReady":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Application Ready</h2>
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

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-screen h-screen z-9999 bg-black bg-opacity-50 fixed top-0 flex md:items-center justify-center text-[#444444] overflow-x-auto">
      <div
        className={` bg-white py-5  flex flex-col lg:max-w-[60%]  md:rounded-2xl justify-center md:mx-6 md:my-auto mx-0`}
      >
        <div className="flex flex-col justify-center relative">
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

          <div className="py-6 px-5">
            <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 mb-4 px-4">
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
                    <span className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      {tab.icon}
                    </span>
                    <span className="text-lg font-semibold">{tab.label}</span>
                    <span
                      className={`text-xl font-bold ${
                        tab?.score < 50
                          ? "text-red-500"
                          : tab?.score < 80
                          ? "text-yellow-500"
                          : "text-green-500"
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
              <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,

    document.querySelector("#modal") as HTMLElement
  );
};

export default ResumeAiScore;
