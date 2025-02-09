import Button from "../../components/Button";
import Layout from "../../layout/LandingLayout";
import {
  FaArrowRightLong,
  FaArrowTrendUp,
  FaLock,
  FaRegClock,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { RecruiterTestimonials } from "../../data/testimonials";
import { MdOutlineShield } from "react-icons/md";
import { InfiniteMovingIcons } from "../../AnimatedUi/animatedCards";
import brandIcons from "../../data/icons";
import { SiSimpleanalytics } from "react-icons/si";
import { LuAward, LuDatabase, LuUsers } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import useColorMode from "../../hooks/useColorMode";
import { FiTarget } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoFlashOutline } from "react-icons/io5";
import { Ratings } from "../../components/Rating";

const CompanyLandingpage: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!hasEntered) {
      if (typeof setColorMode === "function" && colorMode === "dark") {
        setColorMode("light");
      }
    }
  }, [hasEntered]);
  return (
    <Layout>
      <motion.section
        onViewportEnter={() => {
          if (typeof setColorMode === "function" && colorMode === "dark") {
            setHasEntered(false);
            setColorMode("light");
          }
        }}
        className="p-8 max-sm:px-4 md:py-22 text grid grid-cols-1 gap-12 xl:max-w-7xl 2xl:max-w-full 2xl:px-[12rem] w-full mx-auto"
      >
        <div className="text-center text-lg text-zinc-500">
          <p className="text-[#DC2626] bg-red-100/50 inline-flex rounded-full sm:items-center px-4 py-2 mb-6 max-sm:text-[12px] text-sm gap-2">
            <span>
              <MdOutlineShield className="max-sm:text-base" />
            </span>
            Drowning in email applications?
          </p>
          <h1 className="text-center lg:text-6xl sm:text-5xl font-bold text-4xl text-slate-900 tracking-tight">
            Replace your inbox with
            <br />
            <span className="py-2 gradient-text text-transparent inline-block">
              your Portal in seconds
            </span>
          </h1>
          <p className="mb-2">
            Get your company.tabbio.com URL today for free.
          </p>
          <p className="max-sm:text-sm">
            Turn messy email applications into a smart, searchable talent
            database. <br />
            Automatically sorted, role-specific, matched, shared, and ready for
            action.
          </p>
        </div>

        <div className="mt-3.5 flex flex-col gap-4 w-full justify-center items-center">
          <div className="relative max-w-[610px]">
            <span className="absolute left-0 top-1.5 py-2 pl-2">
              tabbio.link/
            </span>
            <input
              className="bg-transparent focus:outline-none py-3 max-sm:pl-22 pl-[5.8rem] pr-3 focus:ring-1 focus:border-primary border-2 
             border-stroke rounded-md w-full md:min-w-[500px] min-w-[350px]"
              placeholder="company name"
            />
            <button className="absolute right-0 top-0.5 max-sm:bottom-0.5 py-3 px-4 rounded-md rounded-l-none flex group disabled:hover:scale-100 disabled:opacity-50 items-center gap-3 bg-gradient-to-b hover:bg-gradient-to-t hover:scale-x-105 duration-300 ease-in-out from-[#5272EA] to-[#394FC0] justify-center text-white border-none hover:opacity-95">
              <span className="md:block hidden">Claim Your Link</span>
              <FaArrowRightLong className="group-hover:translate-x-1.5" />
            </button>
          </div>
          <p className="text-sm text-zinc-500 text-center">
            🔥 Popular domains are going fast! Claim yours now.
          </p>
        </div>

        <div className="flex w-full justify-center items-center gap-8">
          <button className="bg-slate-200 border-none text-zinc-950 rounded-md hover:scale-x-105 py-2.5 px-5">
            Watch Demo
          </button>
        </div>
      </motion.section>
      <div className="w-full  flex justify-center items-center  py-4 px-6">
        <InfiniteMovingIcons
          items={brandIcons}
          direction="right"
          speed="slow"
        />
      </div>

      <section className="pb-20 pt-10 bg-white dark:bg-[#111827]">
        <div className="">
          <section className="overflow-hidden flex flex-col justify-center items-center relative">
            <motion.div
              className="pb-[64px] max-sm:px-4 relative flex justify-center items-center py-[10rem] px-8 lg:px-[4rem] 2xl:px-[12rem]"
              initial={{ y: 100, width: "90%" }}
              whileInView={{
                y: -20,
                // scaleY: 1,
                width: "100%",
                transition: {
                  delay: 0.2,
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className=" hidden h-40 w-full"
                whileInView={{
                  className: " block",
                }}
              ></motion.div>
              <div className="w-full">
                <div className="mb-8">
                  <h1 className="font-bold text-center lg:text-3xl text-2xl">
                    Your Hiring Workspace,{" "}
                    <span className=" gradient-text text-transparent inline-block">
                      Free Forever
                    </span>
                  </h1>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  <div className="text-center shadow hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <CgFileDocument size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Unlimited Cloud Storage
                    </h1>
                    <p className="text-zinc-500">
                      Save, manage, sort, and share resumes effortlessly.
                    </p>
                  </div>
                  <div className="text-center shadow  rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <LuUsers size={20} />{" "}
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Custom Portal URL
                    </h1>
                    <p className="text-zinc-500">
                      Let candidates apply directly with real-time,
                      always-updated Smart CVs
                    </p>
                  </div>
                  <div className="text-center shadow  rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <SiSimpleanalytics size={18} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Workspace
                    </h1>
                    <p className="text-zinc-500">
                      Track and manage your shortlisted candidates in one place.
                    </p>
                  </div>
                  <div className="text-center shadow  rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <MdOutlineShield size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Secure Storage
                    </h1>
                    <p className="text-zinc-500">
                      Your Safe Candidates CV & Resumes database.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pb-[64px] max-sm:px-4 mt-[80px] relative flex flex-col justify-center items-center rounded-[18px] bg-[#111827] py-[5rem] px-8 lg:px-[4rem] 2xl:px-[12rem]"
              initial={{ y: 100, width: "80%" }}
              whileInView={{
                y: -30,
                width: "100%",
                transition: {
                  delay: 0.3,
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className="h-30 w-full"
                initial={{ className: "hidden" }}
                whileInView={{
                  className: " block",
                }}
              ></motion.div>
              <div className="w-full">
                <div className="mb-8 md:mb-14">
                  <h1 className="font-bold text-center text-white lg:text-3xl text-2xl">
                    Pro. For those who{" "}
                    <span className="gradient-text text-transparent inline-block">
                      want more
                    </span>
                  </h1>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 lg:gap-x-3">
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-4 py-8 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <BiBrain size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      AI-Powered Search
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Instantly find your perfect candidates for any role.
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <FiTarget size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      JD Matching
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Automatically match resumes to JDs for each role in your
                      Protal, saving hours of manual work.
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <LuUsers size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      Acess Hiring Pipeline
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Manage candidates seamlessly through every stage of
                      hiring, using your shortlisted pool in Workspace.
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <FaLock size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      Application Builder
                    </h1>
                    <p className="text-zinc-300">
                      Create branded, standardized templates and watermark
                      resumes with your company branding.
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center my-12">
                  <button
                    className="text-white rounded-md bg-gradient-to-br hover:scale-105 from-[#3B82F61A] to-[#A855F71A] flex items-center gap-2 px-10 py-3.5"
                    onClick={() => {}}
                  >
                    Upgrade to Pro{" "}
                    <span>
                      <IoFlashOutline size={18} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pb-[64px] max-sm:px-4 relative flex justify-center items-center py-[10rem] px-8 lg:px-[4rem] 2xl:px-[12rem]"
              initial={{ y: 100, width: "90%" }}
              whileInView={{
                y: -20,
                // scaleY: 1,
                width: "100%",
                transition: {
                  delay: 0.2,
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
              onViewportEnter={() => {
                if (
                  typeof setColorMode === "function" &&
                  colorMode === "dark"
                ) {
                  setHasEntered(false);
                  setColorMode("light");
                }
              }}
            >
              <motion.div
                className=" hidden h-40 w-full"
                whileInView={{
                  className: " block",
                }}
              ></motion.div>
              <div className="w-full">
                <div className="mb-8 md:mb-14 text-center">
                  <h1 className="font-bold text-center lg:text-3xl text-2xl mb-3">
                    Hiring Challenges We Solve
                  </h1>
                  <p className="text-zinc-600 mb-3">
                    Transform your hiring from chaos to clarity
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <LuDatabase size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Resume Overload
                    </h1>
                    <p className="text-zinc-500">
                      Drowning in unstructured resumes
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: Centralized talent database
                      </span>
                    </div>
                  </div>
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <FiTarget size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Poor Matching
                    </h1>
                    <p className="text-zinc-500">Missing great candidates</p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: AI-powered matching
                      </span>
                    </div>
                  </div>
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <LuUsers size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Team Misalignment
                    </h1>
                    <p className="text-zinc-500">
                      Scattered feedback & decisions
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: Collaborative workspace
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      <section className="py-[9%] px-8 max-sm:px-4 lg:px-[4rem] 2xl:px-[12rem] bg-gradient-to-b from-[#F9fafb] to-white">
        <div>
          <div className="overflow-hidden flex flex-col">
            <motion.div
              className="pb-[64px] py-[5rem] w-full relative flex justify-center items-center "
              initial={{ y: 100 }}
              whileInView={{
                y: -60,
                transition: {
                  delay: 0.2,
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="w-full">
                <div className="mb-8 md:mb-14 text-center">
                  <p className="text-primary bg-primary/10 inline-flex rounded-full items-center px-4 py-2 mb-3 text-sm gap-2">
                    <span>
                      <LuAward />
                    </span>
                    Industry-Leading Performance
                  </p>
                  <h1 className="font-bold text-center lg:text-3xl text-2xl mb-3">
                    Proven Results at Scale
                  </h1>
                  <p className="text-zinc-600 text-center mb-3">
                    Transform your hiring process with data-driven recruitment
                    tools
                  </p>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FaRegClock size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={0}
                        delay={2}
                        end={7}
                        enableScrollSpy
                      />{" "}
                      %
                    </h1>
                    <p className="text-zinc-500">Faster Time-to-Hire</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FiTarget size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={2}
                        delay={2}
                        end={92}
                        enableScrollSpy
                      />{" "}
                      %
                    </h1>
                    <p className="text-zinc-500">Better Candidate Fit</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FiTarget size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={0}
                        delay={2}
                        end={3.2}
                        enableScrollSpy
                      />{" "}
                      x
                    </h1>
                    <p className="text-zinc-500">ROI Improvement</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <LuUsers size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={5}
                        delay={2}
                        end={45}
                        enableScrollSpy
                      />{" "}
                      k+
                    </h1>
                    <p className="text-zinc-500">Teams using Tabbio</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="py-[5rem] w-full relative flex justify-center items-center "
              initial={{ y: 100 }}
              whileInView={{
                y: -60,
                transition: {
                  delay: 0.2,
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="w-full">
                <div className="mb-8 md:mb-14 text-center">
                  <h1 className="font-bold text-center lg:text-3xl text-2xl mb-3">
                    Success Stories
                  </h1>
                  <p className="text-zinc-600 mb-3">
                    Real results from real users
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  {RecruiterTestimonials.map((val, index) => (
                    <div
                      key={index}
                      className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8">
                          <img
                            src={val.img}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <p className="text-zinc-950">{val.name}</p>
                          <p className="text-zinc-500 text-sm font-normal">
                            {val.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 pt-1 pb-2">
                        <div>
                          <Ratings rating={val.rating} />
                        </div>
                        <p className="bg-primary/5 text-primary text-xs rounded-full py-1 px-2.5">
                          {val.subtitle}
                        </p>
                      </div>
                      <p className="font-normal text-sm text-zinc-500 italic pb-4">
                        {val.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col justify-center items-center mt-12">
                  <Button size="lg" onClick={() => {}}>
                    Get Started Free{" "}
                    <span>
                      <FaArrowTrendUp size={18} />
                    </span>
                  </Button>
                  <p className="text-zinc-600 text-center my-3">
                    No credit card required · Free forever plan available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyLandingpage;
