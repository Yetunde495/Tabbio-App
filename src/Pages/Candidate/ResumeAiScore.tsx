import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HiOutlineTemplate } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { analyzeResume } from "../../services/resumeServices";

type Props = {
  show?: boolean;
  onHide: () => void;
  resumeData: any
};
const sampleData = {
  status: "success",
  message: "Resume analysis completed successfully",
  data: {
    text: "Sodiq Farayola\nExperienced software developer proficient in React.js, Node.js, Express, MongoDB,\nand PostgreSQL.\nhttps://www.linkedin.com/in/sodiq-farayola\nfaraayo89@gmail.com\nEXPERIENCE\nBackend Developer, Finosell Global Ltd.\nJuly 2022 Sep 2023, Ibadan, Nigeria\n• Orchestrated seamless business account onboarding, integrating with a trusted third-party\nprovider to enable traditional banking-like transactions and enhance user experience with\nSMS and email notifications resulting in a 20% in customer satisfaction and 15% reduction\nin account setup time.\n• Led integration of virtual dollar cards, offering borderless financial convenience for global\npurchases, enhancing user experience leading to a 25% increase in international transactions\nand a 30% boost in user retention.\n• Enhanced platform functionality by integrating data and airtime bill payment services,\nresulting in streamlined processes reducing transaction time by 30% and improved user\nutility reflected in 25% increase in daily active users and 15% overall platform usage.\nSoftware Developer, Crust Africa\n-\nJan 2023 July 2023, Abuja, Nigeria\n• Enhanced Crust Application V2 by orchestrating seamless API integrations, enabling the\nmigration of over 50,000 farmer banking accounts within 4 months and achieving intuitive\nuser experiences through comprehensive enhancements.\n• Contributed significantly to Crust Infrastructure Development by playing a pivotal role in its\ncreation using ReactJS, Redux-toolkit, and Styled-components, leading to a remarkable 60%\nboost in productivity through improved accessibility to financial operations and admin\nfunctions.\n• Optimized the company's website by implementing enhancements to reduce load times and\nenhance user experience, thereby improving overall performance.\nHub Administrator, Esusu Africa/Fintech Innovation Hub\nMay 2021 - Dec. 2021, Lagos, Nigeria\n• Developed an advanced Enrollment Management System tailored specifically for NIN\nregistration centers under the Nigerian Identity Management (NIMC) initiative, showcasing\ninnovative problem-solving skills and technological expertise. Although not adopted\nsubsequently, the project highlighted proactive initiative, comprehensive understanding of\nsystem requirements, and dedication to leveraging technology for societal advancement.\nIntern, Information Technology and Media Services,\nUniversity of Ibadan.\nNov. 2018 May 2019, Ibadan, Nigeria\n• Collaborated within a team to spearhead the redesigning efforts of the University of Ibadan's\nStaff website, demonstrating adept teamwork and commitment to enhancing institutional\ndigital presence.\nEDUCATION\nB.Sc. Mathematics, University of Ibadan\nSept. 2007 Dec. 2011, Ibadan, Nigeria\nB.Sc. Computer Science, University of Ibadan\nFeb 2016 Feb. 2020, Ibadan, Nigeria\nSKILLS\nJavascript\nNode.js\nMongoDB\nVersion Control\nReact.js\nRESTful API\nDocumentation\nTOOLS\nVisual Studio Code\nGit\nMongoDB Compass\nGitHub\nPostman\nLANGAUGES\nEnglish (Native)\nSpanish (Elementary)\nYoruba (Mother Tongue)\nCERTIFICATIONS\nGoogle Africa Developer Scholarship\nIssued December 2017\nBuilding Interactive JavaScript Websites\nCodecademy\nIssued April 2020\nGoogle\n- IT Support Professional\nIssued January 2022\n",
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
      summaryFeedback: {
        content: [
          "The major achievement in each role is well illustrated with solid metrics. However, more technology-focused details should be added in the experience section.",
        ],
        format: [
          "Overall, the format is well-structured. However, consider capitalizing Languages and Certifications headers for consistent formatting.",
        ],
        optimization: [
          "Could add specific examples of projects or skills towards the top for better optimization.",
        ],
        atsCompatibility: [
          "Good usage of keywords according to role requirements. However, avoid using URLs like LinkedIn in text form. Preferred way is to keep it in the header or footer.",
        ],
      },
     
    },
  },
};
const ResumeAiScore: React.FC<Props> = ({ show, onHide, resumeData }) => {
  const [activeTab, setActiveTab] = useState<
    "content" | "format" | "optimization" | "bestPractices" | "applicationReady"
  >("content");

  const [contentData, _setContentData] = useState<any>(
    sampleData?.data.analysis
  );
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
        const resp = await analyzeResume({
          resumeId: resumeData?._id
        }, resumeData?._id);
        console.log(resp)
       
        // console.log(resp?.data?.profile);
      } catch (err: any) {
        toast.error(err?.message || "Request Failed");
      } finally {
        setLoading(false)
      }
    };

  const renderContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Content</h2>
            {contentData?.summaryFeedback.content.map(
              (feedback: string, index: number) => (
                <p key={index}>{feedback}</p>
              )
            )}
          </div>
        );
      case "format":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Format</h2>
            {contentData?.summaryFeedback.format.map(
              (feedback: string, index: number) => (
                <p key={index}>{feedback}</p>
              )
            )}
          </div>
        );
      case "optimization":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Optimization</h2>
            {contentData?.summaryFeedback.optimization.map(
              (feedback: string, index: number) => (
                <p key={index}>{feedback}</p>
              )
            )}
          </div>
        );
      case "bestPractices":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Best Practices</h2>
            <p>Best Practices: Follow common industry standards.</p>
          </div>
        );
      case "applicationReady":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Application Ready</h2>
            <p>Application Ready: Your CV is almost ready to apply!</p>
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
    handleAnalyzeResume()
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
                  className={`px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border-2 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "bg-gray-100 text-gray-800 border-stroke"
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <div className="flex flex-col gap-3 py-2 px-3 items-center">
                    <span className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
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
            <div className="p-4 border rounded bg-gray-50">
              {renderContent()}
            </div>

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
