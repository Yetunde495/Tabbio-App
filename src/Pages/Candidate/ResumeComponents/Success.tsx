import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { BsCopy, BsEyeFill } from "react-icons/bs";
import { FaChartLine, FaCheck, FaDownload, FaGlobe } from "react-icons/fa6";
import { FaShareAlt, FaTools } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/modal";
import { ShareCV } from "../../../layout/Header";

const ProfileSuccess: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Copy");
  const url = `http://tabbio-app.vercel.app/profile/${user?.tabbioLink}`;
  const [shareModal, setShareModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  };
  return (
    <div className="py-4">
      <div className="mb-7">
        <h3 className="text-center mb-2 font-semibold md:text-2xl text-xl lg:text-3xl">
          Congratulations! Your Smart CV is Ready!
        </h3>
        <p className="md:text-lg text-center text-[#4B5563]">
          You’ve created more than just a CV -you’ve built your permanent
          digital presence that stays active and engaged with recruiters!
        </p>
      </div>

      <div className="bg-[#F9FAFB] px-3 py-5 rounded-lg flex xl:flex-row flex-col items-end gap-2.5 mb-6">
        <div className="w-full">
          <label className="text-[#242424] font-normal">
            Your Interactive Smart CV URL:{" "}
          </label>
          <div className="flex w-full items-center border bg-white font-medium border-stroke rounded-lg">
            <input
              type="text"
              readOnly
              className="flex-1 max-sm:w-[75%] bg-white rounded-l-lg focus:outline-none focus-within:ring-0 border-none focus:border-none"
              value={user?.tabbioLink}
            />
            <button
              className={`  ${
                buttonText === "Copy"
                  ? "text-zinc-700 py-1.5"
                  : "text-success bg-success/15 py-3"
              } rounded-r-lg hover:scale-105 px-4  font-medium ml-2`}
              onClick={handleCopy}
            >
              {buttonText === "Copy" ? <BsCopy /> : <FaCheck />}
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/app/candidate/preview-smart-cv");
            }}
            className="bg-primary hover:scale-105 flex items-center gap-1.5 justify-center text-white font-medium rounded-md px-4 py-2.5"
          >
            <BsEyeFill /> Preview
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center gap-4 mb-6">
        <div className="bg-[#F0FDF4] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FaGlobe size={24} className="text-[#16A34A]" />
          </span>
          <p className="font-semibold">Never Gets Lost</p>
          <p className="font-normal text-sm pb-1.5">
            Unlike PDFs that get buried in emails, your Smart CV stays active
            and accessible forever.
          </p>
        </div>
        <div className="bg-[#EFF6FF] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FaChartLine size={24} className="text-[#2563EB]" />
          </span>
          <p className="font-semibold">Built-in Analytics</p>
          <p className="font-normal text-sm pb-1.5">
            Get notified when recruiters view your CV and track your engagement
            metrics.
          </p>
        </div>
        <div className="bg-[#FAF5FF] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FiRefreshCcw
              size={22}
              className=" text-[#9333EA]"
              fontWeight={700}
            />
          </span>
          <p className="font-semibold">Auto-Synced Updates</p>
          <p className="font-normal text-sm pb-1.5">
            Update once, changes reflect everywhere - no more outdated versions
            floating around.
          </p>
        </div>
        <div className="bg-[#FEFCE8] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FaTools size={24} className="text-[#CA8A04]" />
          </span>
          <p className="font-semibold">Recruiter-Friendly</p>
          <p className="font-normal text-sm pb-1.5">
            Designed with built-in tools to help recruiters find, track,
            shortlist, and save your Smart CV effortlessly.
          </p>
        </div>
      </div>

      <div className="py-4 flex justify-center items-center">
        <div className="xl:max-w-[90%] w-full grid md:grid-cols-3 justify-center items-end grid-cols-2 gap-y-3 gap-x-4">
          <div className="max-md:col-span-2 w-full flex items-center justify-center">
            <div className="relative max-md:w-full">
              <button
                onClick={() => setShareModal(true)}
                className="bg-[#090909] w-full max-sm:px-4  active:ring-black/20 text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3"
              >
                <span>
                  <FaShareAlt />
                </span>{" "}
                Share Smart CV
              </button>
              <span className="absolute text-[10px] text-center -top-[12.5px] right-4 w-[88px] rounded-full text-white p-[3px] bg-[#C28F2C]">
                Recommended
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="hover:bg-[#090909] max-md:w-full max-sm:px-3  text-[#090909] border border-[#090909] active:ring-black/20 hover:text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3">
              <span>
                <FaDownload />
              </span>{" "}
              Download PDF
            </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => navigate(`/app/candidate/smart-cv`)}
              className="hover:bg-[#090909] max-md:w-full max-sm:px-3  text-[#090909] border border-[#090909] active:ring-black/20 hover:text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3"
            >
              Open in Editor{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
        </div>
      </div>
      {shareModal && (
        <Modal
          title="Share your CV"
          show={shareModal}
          onHide={() => setShareModal(false)}
        >
          <ShareCV />
        </Modal>
      )}
    </div>
  );
};

export const ResumeSuccess: React.FC<{ CvData: any }> = ({ CvData }) => {
  const {} = useApp();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Copy");
  const url = `http://tabbio-app.vercel.app/live-resume/${CvData?.resumeName}`;
  const [shareModal, setShareModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  };
  return (
    <div className="py-4">
      <div className="mb-7">
        <h3 className="text-center mb-2 font-semibold md:text-2xl text-xl lg:text-3xl">
          Congratulations! Your CV is Ready!
        </h3>
        <p className="md:text-lg text-center text-[#4B5563]">
          You’ve created more than just a CV -you’ve built your permanent
          digital presence that stays active and engaged with recruiters!
        </p>
      </div>

      <div className="bg-[#F9FAFB] px-3 py-5 rounded-lg flex xl:flex-row flex-col items-end gap-2.5 mb-6">
        <div className="w-full">
          <label className="text-[#242424] font-normal">
            Your Shareable CV URL: :{" "}
          </label>
          <div className="flex w-full items-center border bg-white font-medium border-stroke rounded-lg">
            <input
              type="text"
              readOnly
              className="flex-1 max-sm:w-[75%] bg-white rounded-l-lg focus:outline-none focus-within:ring-0 border-none focus:border-none"
              value={`tabbio/${CvData?.resumeName}`}
            />
            <button
              className={`  ${
                buttonText === "Copy"
                  ? "text-zinc-700 py-1.5"
                  : "text-success bg-success/15 py-3"
              } rounded-r-lg hover:scale-105 px-4  font-medium ml-2`}
              onClick={handleCopy}
            >
              {buttonText === "Copy" ? <BsCopy /> : <FaCheck />}
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              navigate(`/live-resume/${CvData?.resumeName}`);
            }}
            className="bg-primary hover:scale-105 flex items-center gap-1.5 justify-center text-white font-medium rounded-md px-4 py-2.5"
          >
            <BsEyeFill /> Preview
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4 mb-6">
        <div className="bg-[#F0FDF4] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FaGlobe size={24} className="text-[#16A34A]" />
          </span>
          <p className="font-semibold">Never Gets Lost</p>
          <p className="font-normal text-sm pb-1.5">
            Unlike PDFs that get buried in emails, your Smart CV stays active
            and accessible forever.
          </p>
        </div>
        <div className="bg-[#FAF5FF] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FiRefreshCcw
              size={22}
              className=" text-[#9333EA]"
              fontWeight={700}
            />
          </span>
          <p className="font-semibold">Auto-Synced Updates</p>
          <p className="font-normal text-sm pb-1.5">
            Update once, changes reflect everywhere - no more outdated versions
            floating around.
          </p>
        </div>
        <div className="bg-[#FEFCE8] text-[#242424] p-4 space-y-1.5 w-full h-full rounded-lg">
          <span className="mb-1">
            <FaTools size={24} className="text-[#CA8A04]" />
          </span>
          <p className="font-semibold">Recruiter-Friendly</p>
          <p className="font-normal text-sm pb-1.5">
            Designed with built-in tools to help recruiters find, track,
            shortlist, and save your Smart CV effortlessly.
          </p>
        </div>
      </div>

      <div className="py-4 flex justify-center items-center">
        <div className="xl:max-w-[90%] w-full grid md:grid-cols-3 justify-center items-end grid-cols-2 gap-y-3 gap-x-4">
          <div className="max-md:col-span-2 w-full flex items-center justify-center">
            <div className="relative max-md:w-full">
              <button
                onClick={() => setShareModal(true)}
                className="bg-[#090909] w-full max-sm:px-4  active:ring-black/20 text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3"
              >
                <span>
                  <FaShareAlt />
                </span>{" "}
                Share CV
              </button>
              <span className="absolute text-[10px] text-center -top-[12.5px] right-4 w-[88px] rounded-full text-white p-[3px] bg-[#C28F2C]">
                Recommended
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button className="hover:bg-[#090909] max-md:w-full max-sm:px-3  text-[#090909] border border-[#090909] active:ring-black/20 hover:text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3">
              <span>
                <FaDownload />
              </span>{" "}
              Download PDF
            </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() =>
                navigate(`/app/candidate/cv-builder/edit-application/${CvData?.application}`)
              }
              className="hover:bg-[#090909] max-md:w-full max-sm:px-3  text-[#090909] border border-[#090909] active:ring-black/20 hover:text-white flex justify-center items-center gap-1.5 font-medium rounded-lg px-5  py-3"
            >
              Open in Builder{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
        </div>
      </div>
      {shareModal && (
        <Modal
          title="Share your CV"
          show={shareModal}
          onHide={() => setShareModal(false)}
        >
          <ShareCV />
        </Modal>
      )}
    </div>
  );
};

export default ProfileSuccess;
