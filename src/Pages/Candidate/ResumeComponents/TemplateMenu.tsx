import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { IoDocumentTextOutline } from "react-icons/io5";
import resumeImg1 from "../../../assets/images/entry-resume-sample.png";
import resumeImg2 from "../../../assets/images/pro-resume-sample.png";
import { ResumeDocument } from "../../PageComponents/Resume";

type SmartResumeTemplateMenu = {
  show: boolean;
  onHide: () => void;
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
};

type ResumeTemplateMenu = {
  show: boolean;
  onHide: () => void;
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
  handleUpdateResume: (template: string) => void;
};

export const SmartCVTemplateMenu: React.FC<SmartResumeTemplateMenu> = ({
  show,
  onHide,
  resumeData,
  setResumeData,
}) => {
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
        <section className="mx-auto 4xl:max-w-[1600px] w-full border border-stroke">
          <div className="relative h-screen">
            <div className="w-full bg-primary flex items-center md:px-6 py-5 px-4">
              <div className="flex items-center gap-2">
                <span className="bg-white/25 rounded-lg text-white w-9 h-9 flex items-center justify-center">
                  <IoDocumentTextOutline size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-white sm:text-lg mb-0">
                    Choose Your Resume Template
                  </h3>
                  <p className="text-zinc-200 max-sm:text-xs">
                    Select a template that best showcases your skills and
                    experience. You can change it anytime to find the perfect
                    fit for your professional style.
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

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 custom-scrollbar h-[87vh] overflow-y-auto">
              {/* <div className="w-fu">

              </div> */}
              <ul className="relative flex justify-evenly flex-wrap bg-light px-6 max-sm:px-3 max-sm:gap-x-2 py-9  gap-y-6 gap-x-8 text-sm list-none">
                <li
                  onClick={() => {
                    setResumeData(() => ({
                      ...resumeData,
                      template: "entry",
                    }));
                  }}
                  className={` cursor-pointer group max-h-[200px] max-sm:w-[150px] h-full duration-200 z-30  gap-1.5  text-center`}
                >
                  <div
                    className={`p-1 rounded-sm shadow-card bg-white group-hover:scale-[1.02]  ${
                      resumeData?.template === "entry"
                        ? "border-primary border"
                        : "border-stroke"
                    }`}
                  >
                    <div className={`w-[130px]`}>
                      <img
                        src={resumeImg1}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm font-medium">
                    Entry-Level Ats Template
                  </p>
                </li>
                <li
                  onClick={() => {
                    setResumeData((d: any) => ({
                      ...d,
                      template: "professional",
                    }));
                  }}
                  className={`cursor-pointer group max-h-[200px] max-sm:w-[150px] h-full  z-30 gap-1.5 text-center`}
                >
                  <div
                    className={`p-1 rounded-sm shadow-card bg-white border group-hover:scale-[1.02]  ${
                      resumeData?.template === "professional"
                        ? "border-primary/60"
                        : "border-stroke"
                    }`}
                  >
                    <div className={`w-[130px] min-h-[115px]`}>
                      <img
                        src={resumeImg2}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-2.5 font-medium text-sm">
                    Professional Ats Template
                  </p>
                </li>
              </ul>
              <div className="w-full flex justify-center py-9 items-center">
                <div className="w-full xl:max-w-[90%] max-sm:px-1.5">
                  <ResumeDocument resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>,
    document.querySelector("#fullModal") as HTMLElement
  );
};

const ResumeTemplateMenu: React.FC<ResumeTemplateMenu> = ({
  show,
  onHide,
  resumeData,
  setResumeData,
  handleUpdateResume,
}) => {
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
        <section className="mx-auto 4xl:max-w-[1600px] w-full border border-stroke">
          <div className="relative h-screen">
            <div className="w-full bg-primary flex items-center md:px-6 py-5 px-4">
              <div className="flex items-center gap-2">
                <span className="bg-white/25 rounded-lg text-white w-9 h-9 flex items-center justify-center">
                  <IoDocumentTextOutline size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-white sm:text-lg mb-0">
                    Choose Your Resume Template
                  </h3>
                  <p className="text-zinc-200 max-sm:text-xs">
                    Select a template that best showcases your skills and
                    experience. You can change it anytime to find the perfect
                    fit for your professional style.
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

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 custom-scrollbar h-[87vh] overflow-y-auto">
              <div className="w-full h-full bg-light relative">
                <ul className="relative flex justify-evenly flex-wrap bg-light px-6 max-sm:px-3 max-sm:gap-x-2 py-9  gap-y-6 gap-x-8 text-sm list-none">
                  <li
                    onClick={() => {
                      setResumeData(() => ({
                        ...resumeData,
                        template: "entry",
                      }));
                      handleUpdateResume("entry");
                    }}
                    className={` cursor-pointer group max-h-[200px] max-sm:w-[150px] h-full duration-200 z-30  gap-1.5  text-center`}
                  >
                    <div
                      className={`p-1 rounded-sm shadow-card bg-white group-hover:scale-[1.02]  ${
                        resumeData?.template === "entry"
                          ? "border-primary border"
                          : "border-stroke"
                      }`}
                    >
                      <div className={`w-[130px]`}>
                        <img
                          src={resumeImg1}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="mt-2.5 text-sm font-medium">
                      Entry-Level Ats Template
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      setResumeData((d: any) => ({
                        ...d,
                        template: "professional",
                      }));
                      handleUpdateResume("professional");
                    }}
                    className={`cursor-pointer group max-h-[200px] max-sm:w-[150px] h-full  z-30 gap-1.5 text-center`}
                  >
                    <div
                      className={`p-1 rounded-sm shadow-card bg-white border group-hover:scale-[1.02]  ${
                        resumeData?.template === "professional"
                          ? "border-primary/60"
                          : "border-stroke"
                      }`}
                    >
                      <div className={`w-[130px] min-h-[115px]`}>
                        <img
                          src={resumeImg2}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="mt-2.5 font-medium text-sm">
                      Professional Ats Template
                    </p>
                  </li>
                </ul>
              </div>

              <div className="w-full flex justify-center py-9 items-center">
                <div className="w-full xl:max-w-[90%] max-sm:px-1.5">
                  <ResumeDocument resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>,
    document.querySelector("#fullModal") as HTMLElement
  );
};

export default ResumeTemplateMenu;
