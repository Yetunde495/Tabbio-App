import { Fragment, useMemo, useState } from "react";
import { PageLoader } from "../../components/Loader";
import EmptyImg from "../../assets/svg/empty-animate.svg";
import { useParams } from "react-router-dom";
import { ResumePreview } from "../PageComponents/Resume";
import { getResumeDataByName } from "../../services/resumeServices";
import { toast } from "react-toastify";

const LiveResume: React.FC = () => {
  const { resumeName } = useParams();
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any | null>(null);

  useMemo(async () => {
    if (resumeName) {
      try {
        setLoading(true);
        const resp = await getResumeDataByName(`${resumeName}`);
        setResumeData(resp?.data?.resume);
      } catch (err: any) {
        if (err?.message !== "Profile not found") {
          toast.error(err?.message || "Request Failed");
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
            <div className="max-w-4xl w-full">
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
    </section>
  );
};

export default LiveResume;
