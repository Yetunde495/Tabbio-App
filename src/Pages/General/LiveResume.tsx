import { Fragment, useMemo, useState } from "react";
import { PageLoader } from "../../components/Loader";
import EmptyImg from "../../assets/svg/empty-animate.svg";
import { useNavigate, useParams } from "react-router-dom";
import { ResumePreview } from "../PageComponents/Resume";
import { getResumeDataByName } from "../../services/resumeServices";
import { toast } from "react-toastify";
import { mockResData } from "../../data/mockData";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { MdShare } from "react-icons/md";
import ShareResume from "../Candidate/ShareResume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfessionalPDF from "../../components/PDFTemplates/ProfessionalPDF";
import EntryPDF from "../../components/PDFTemplates/EntryPDF";

const LiveResume: React.FC = () => {
  const { resumeName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any | null>(null);
  const [shareModal, setShareModal] = useState(false);

  useMemo(async () => {
    if (resumeName) {
      try {
        setLoading(true);
        const resp = await getResumeDataByName(`${resumeName}`);
        setResumeData(resp?.data?.resume);
      } catch (err: any) {
        if (err?.message !== "Profile not found") {
          toast.error(err?.message || "Request Failed");
          setResumeData(mockResData);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [resumeName]);

  return (
    <section className="h-screen bg-[#F9FAFB]">
      {loading ? (
        <PageLoader />
      ) : resumeData ? (
        <Fragment>
          <section className="w-full flex py-[3%] justify-center items-center">
          <button
                  className="hidden gap-1 bg-primary rounded-md font-medium text-white px-5 py-2 items-center hover:scale-x-105"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      template:
                        resumeData?.template === "professional"
                          ? "entry"
                          : "professional",
                    });
                  }}
                >
                  Switch Template
                </button>
            <div className="max-w-4xl w-full">
            {/* <PDFViewer width="100%" height="800px">
              {resumeData?.template === "professional" ? (
                <ProfessionalPDF data={resumeData} />
              ) : (
                <EntryPDF data={resumeData} />
              )}
            </PDFViewer> */}
              <ResumePreview resumeData={resumeData} />
            </div>
          </section>
        </Fragment>
      ) : (
        <div className="h-screen flex w-full justify-center text-center items-center">
          <div className="flex flex-col w-full bg-white shadow-xl px-3 py-9 rounded-md xl:max-w-[75%] items-center">
            <img src={EmptyImg} alt="" className="max-w-[300px]" />
            <h2 className="text-2xl font-outfit font-bold text-zinc-800 mb-3">
              Resume Data Unavailable!
            </h2>
            <p className="text-zinc-600 font-normal px-3 mb-4">
              This could be a network error <br /> Please, try again in some
              minutes
            </p>
          </div>
        </div>
      )}
      {resumeData && (
        <div className="fixed left-0 right-0 w-full bottom-0">
          <div className="w-full flex justify-between max-sm:flex-col max-sm:text-xs text-sm items-center text-zinc-500 py-2 sm:py-3.5 px-1.5 max-sm:gap-1 sm:px-5 bg-[#FBFCFC] border border-[#F3F4F6]">
            <p>Powered by Tabbio</p>
            <div className="flex items-center divide-x divide-white bg-primary rounded-lg">
            <PDFDownloadLink
                document={
                  resumeData?.template === "professional" ? (
                    <ProfessionalPDF data={resumeData} />
                  ) : (
                    <EntryPDF data={resumeData} />
                  )
                }
                fileName={resumeData?.name || "Tabbio ATS Resume"}
              >
               <button className="sm:px-4 flex items-center gap-2 py-1.5 px-2 max-sm:text-xs sm:py-2 bg-primary hover:scale-105 text-white rounded-l-lg">
                <FiDownload /> Download PDF
              </button>
              </PDFDownloadLink>
              
              <button
                onClick={() => setShareModal(true)}
                className="sm:px-4 flex items-center gap-2 py-1.5 px-2 max-sm:text-xs sm:py-2 bg-primary hover:scale-105 text-white "
              >
                <MdShare /> Share
              </button>
              <button
                onClick={() => {
                  navigate(`/signup`);
                }}
                className="sm:px-4 flex items-center gap-2 py-1.5 px-2 max-sm:text-xs sm:py-2 bg-primary hover:scale-105 text-white rounded-r-lg "
              >
                <span><FiExternalLink /></span> Create your SmartResume
              </button>
            </div>
          </div>
        </div>
      )}
      {shareModal && (
        <ShareResume
          show={shareModal}
          setShow={() => setShareModal(false)}
          resumeData={resumeData}
        />
      )}
    </section>
  );
};

export default LiveResume;
