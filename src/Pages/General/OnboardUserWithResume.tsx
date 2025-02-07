import React, { useEffect, useState } from "react";
import { ResumePreview } from "../PageComponents/Resume";
import { FiLink } from "react-icons/fi";
import Navbar from "../../layout/HomeNav";
import Button from "../../components/Button";
import OnboardCandidate from "../Authentication/OnboardCandidate";
import { useApp } from "../../context/AppContext";
import EmptyImg from "../../assets/svg/empty-animate.svg";
import { useNavigate } from "react-router-dom";
// import { mockResData } from "../../data/mockData";

const OnboardUserWithResume: React.FC = () => {
  const { parsedResume } = useApp();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [onboardModal, setOnboardModal] = useState(false);
  const [showMobileLink, setShow] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null)

  useEffect(() => {
    if (parsedResume) {
      setResumeData(parsedResume)
      setInputValue(parsedResume?.name);
    }
    // } else {
    //   setResumeData(mockResData)
    //   setInputValue(resumeData?.name);
    // }
  }, [parsedResume]);
  return (
    <section>
      <Navbar />
      {resumeData ? (
        <div className="w-full grid xl:grid-cols-4 grid-cols-1 lg:px-12 md:px-4 px-3 gap-5 py-12">
          <div className="col-span-3">
            <div className="flex gap-3 items-center justify-between my-3 w-full">
              <div className="flex items-center gap-1">
                <h1 className="text-xl font-semibold text-zinc-700">
                  Live Resume
                </h1>
                <button
                  className="gap-1 bg-primary hidden rounded-md font-medium text-white px-5 py-2 items-center hover:scale-x-105"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      template: resumeData?.template === "professional" ? "entry" : "professional"
                    })
                  }}
                >
                  Switch Template
                </button>
              </div>
              <div className="flex items-center gap-3 pr-3">
                <button
                  className="flex gap-1 bg-primary rounded-md font-medium text-white px-5 py-2 xl:hidden items-center hover:scale-x-105"
                  onClick={() => {
                    setShow(!showMobileLink);
                  }}
                >
                  <FiLink size={22} /> {!showMobileLink ? "Show" : "Hide"} Smart
                  Link
                </button>
              </div>
            </div>
            {showMobileLink && (
              <div className="mt-13 xl-hidden mb-5">
                {/* Resume Link */}
                <div className="bg-white shadow-lg rounded-sm py-3 px-3">
                  <div className="flex items-center gap-3 justify-between">
                    <p className="2xl:text-xl text-lg font-outfit font-medium mb-2 text-zinc-700">
                      Public Resume & URL
                    </p>
                  </div>

                  <div className="">
                    <div className="flex mb-2.5">
                      <span className="inline-flex items-center pl-3 pr-1 text-sm text-zinc-500 border rounded-e-0 border-slate-300 border-e-0 rounded-s-lg">
                        Tabbio.link/
                      </span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setInputValue(e.target.value);
                        }}
                        placeholder="your-name"
                        className="rounded-none rounded-e-lg border border-l-0 border-stroke focus:outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 "
                      />
                    </div>

                    <Button
                      width="full"
                      size="lg"
                      onClick={() => {
                        setOnboardModal(true);
                      }}
                    >
                      Claim my Link
                    </Button>
                    <p className="text-zinc-500 py-2.5 text-center text-sm">
                      It's free and takes less than a minute
                    </p>
                  </div>
                </div>
              </div>
            )}
            <ResumePreview resumeData={resumeData} />
          </div>
          <div className="mt-13 xl:block hidden">
            {/* Resume Link */}
            <div className="bg-white shadow-lg rounded-sm py-3 px-3">
              <div className="flex items-center gap-3 justify-between">
                <p className="2xl:text-xl text-lg font-outfit font-medium mb-2 text-zinc-700">
                  Public Resume & URL
                </p>
              </div>

              <div>
                <div className="flex mb-2.5">
                  <span className="inline-flex items-center pl-3 pr-1 text-sm text-zinc-500 border rounded-e-0 border-slate-300 border-e-0 rounded-s-lg">
                    Tabbio.link/
                  </span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setInputValue(e.target.value);
                    }}
                    placeholder="your-name"
                    className="rounded-none rounded-e-lg border border-l-0 border-stroke focus:outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 "
                  />
                </div>

                <Button
                  width="w-full"
                  rounded
                  size="lg"
                  onClick={() => {
                    setOnboardModal(true);
                  }}
                >
                  Claim my Link
                </Button>
                <p className="text-zinc-500 py-2.5 text-center text-sm">
                  It's free and takes less than a minute
                </p>
              </div>
            </div>
          </div>
        </div>
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

            <button
              onClick={() => navigate(-1)}
              className="px-5 xl:w-[300px] py-2.5 font-medium rounded-md bg-primary text-white hover:scale-105 duration-200 mb-9"
            >
              Go Back
            </button>
          </div>
        </div>
      )} 

      {onboardModal && (
        <OnboardCandidate
          show={onboardModal}
          onHide={() => setOnboardModal(false)}
          profileData={resumeData}
        />
      )}
    </section>
  );
};

export default OnboardUserWithResume;
