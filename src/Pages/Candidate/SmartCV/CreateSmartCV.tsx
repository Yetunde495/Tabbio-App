import React, { useMemo, useState } from "react";
import { CvStepper } from "../../../components/Stepper";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import BasicDetails from "../ResumeComponents/BasicdetailsForm";
import { IoShieldHalfOutline } from "react-icons/io5";
import { mockEmptyProfileData } from "../../../data/mockData";
import WorkExperience from "../ResumeComponents/WorkExperience";
import Alert from "../../../components/Alert";
import Education from "../ResumeComponents/Education";
import ProfileSuccess from "../ResumeComponents/Success";
import { generateResumeSkills } from "../../../services/resumeServices";

const CreateSmartCV: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cvData, setCvData] = useState<any>(mockEmptyProfileData);
  const [tabData, setTabData] = useState([
    {
      stepNumber: 1,
      label: "Profile",
      completed: false,
    },
    {
      stepNumber: 2,
      label: "Experience",
      completed: false,
    },
    {
      stepNumber: 3,
      label: "Education",
      completed: false,
    },
    {
      stepNumber: 3,
      label: "Done",
      completed: false,
    },
  ]);

  // Function to check if a specific step's completed field is true or false
  const checkStepCompletion = (stepNumber: number) => {
    const step = tabData.find((step) => step.stepNumber === stepNumber);
    if (step) {
      return step.completed;
    }
    return false; // If step is not found, return false
  };

  const handleSetCompleted = (stepNumber: number) => {
    const updatedTabData = tabData.map((step, index) => {
      if (index === stepNumber) {
        return { ...step, completed: true };
      }
      return step;
    });
    setTabData(updatedTabData);
  };

  const handleGenerateSkills = async () => {
    try {
      const resp = await generateResumeSkills({
        skillType: "",
        role: cvData?.role,
      });
      setCvData((data: any) => ({
        ...data,
        suggestedSkills: resp?.data?.skills,
      }));
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  useMemo(() => {
    handleGenerateSkills();
  }, [cvData?.role]);

  return (
    <section className="bg-[#F2F4F6] h-screen overflow-y-auto mx-auto 4xl:max-w-[1700px]">
      <header className="sticky top-0 z-9999 bg-[#F2F4F6] flex flex-col w-full">
        <div className="flex bg-[#F2F4F6] items-center gap-3 pt-8 pb-6 px-4 md:px-6 2xl:px-11">
          <button
            onClick={() => navigate(`/app/candidate/smart-cv`)}
            className="flex group items-center gap-2 font-semibold"
          >
            <FaArrowLeft className="group-hover:-translate-x-2 duration-150 ease-out" />{" "}
          </button>
          <h3 className="font-semibold 2xl:text-2xl md:text-xl text-base sm:text-lg text-[#242424]">
            Complete the few steps below to create your smart CV
          </h3>
        </div>
        <div className="flex justify-center  items-center gap-3">
          <div className="my-7 px-1 w-full max-w-3xl">
            <CvStepper
              steps={tabData}
              activeStep={activeStep}
              // setCompleted={handleSetCompleted}
              //   setActiveStep={(step) => setActiveStep(step)}
              // control={true}
            />
          </div>
        </div>
      </header>
      <div className="flex w-full justify-center items-center mb-6">
        <div
          className={` bg-white shadow-4 md:py-5 py-0.5   flex flex-col w-full max-w-3xl rounded-md justify-center md:mx-6 md:my-auto mx-0`}
        >
          <div className="flex flex-col justify-center relative">
            <div className="py-5  px-7 max-sm:px-2.5 overflow-y-auto custom-scrollbar">
              {activeStep === 0 ? (
                <div>
                  <div className="mb-6.5">
                    <h3 className="text-[#111827] text-2xl md:text-3xl font-semibold mb-0.5">
                      Let’s create your Professional profile
                    </h3>
                    <p className="text-[#4B5563] 2xl:text-lg font-medium">
                      Start with the basics - we’ll guide you through each step
                      to create a winning CV.
                    </p>
                  </div>
                  <BasicDetails
                    CvData={cvData}
                    setCvData={setCvData}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    completeStep={() => handleSetCompleted(activeStep)}
                    completed={checkStepCompletion(1)}
                  />
                </div>
              ) : activeStep === 1 ? (
                <div>
                  <div className="mb-6.5">
                    <h3 className="text-[#111827] text-2xl md:text-3xl font-semibold mb-0.5">
                      Let’s add your work experience
                    </h3>
                    <p className="text-[#4B5563] 2xl:text-lg font-medium mb-3.5">
                      Don’t worry, we’ll guide you through this step-by-step.
                      Its super easy!
                    </p>
                    <Alert variant="info">
                      Pro tip: Start with your most recent job - It’s what
                      employers look at first!
                    </Alert>
                  </div>
                  <WorkExperience
                    CvData={cvData}
                    setCvData={setCvData}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    completeStep={() => handleSetCompleted(activeStep)}
                    completed={checkStepCompletion(2)}
                  />
                </div>
              ) : activeStep === 2 ? (
                <div>
                  <div className="mb-4">
                    <h3 className="text-[#111827] text-2xl md:text-3xl font-semibold mb-0.5">
                      Let’s add your education details
                    </h3>
                    <p className="text-[#4B5563] 2xl:text-lg font-medium">
                      Please review your educational information carefully
                      before proceeding. Make sure everything is accurate and
                      conmplete!
                    </p>
                  </div>
                  <Education
                    CvData={cvData}
                    setCvData={setCvData}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    completeStep={() => handleSetCompleted(activeStep)}
                    completed={checkStepCompletion(2)}
                  />
                </div>
              ) : (
                <div>
                  <ProfileSuccess />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="z-9999 bg-[#F2F4F6] mb-4 flex flex-col justify-center items-center w-full bg-transparent">
        <div className="bg-white p-3 my-1 flex justify-center items-center shadow-4 h-[84px] w-full max-w-3xl">
          {activeStep > 0 ? (
            <p>{cvData?.role}</p>
          ) : (
            <p className="text-center flex gap-2 items-center">
              <IoShieldHalfOutline />
              Your information is secure and will be handled according to our
              privacy policy
            </p>
          )}
        </div>
      </footer>
    </section>
  );
};

export default CreateSmartCV;
