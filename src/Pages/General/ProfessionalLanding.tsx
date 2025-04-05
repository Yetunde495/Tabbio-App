import { RiSparkling2Line } from "react-icons/ri";
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
import { JobseekerTestimonials } from "../../data/testimonials";
import { UploadResume } from "./ResumeUpload";
import { MdOutlineShield } from "react-icons/md";
import { InfiniteMovingIcons } from "../../AnimatedUi/animatedCards";
import brandIcons from "../../data/icons";
import { SiSimpleanalytics } from "react-icons/si";
import { LuAward, LuFileSearch, LuUsers } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { FiBriefcase, FiTarget } from "react-icons/fi";
import { BiBrain } from "react-icons/bi";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { IoFlashOutline } from "react-icons/io5";
import { Ratings } from "../../components/Rating";
import { BsBrowserChrome } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import Modal from "../../components/modal";
import { Carousel } from "../../components/Carousel";
import img1 from "../../assets/images/hiw-1.png";
import img2 from "../../assets/images/hiw-2.png";
import img3 from "../../assets/images/hiw-3.png";

const ProfessionalLandingpage: React.FC = () => {
  const navigate = useNavigate();
  const { setParsedResume } = useApp();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const demoData = [
    {
      image: img1,
      text: "Simply drag and drop your existing CV",
      title: "Upload Your CV",
    },
    {
      image: img2,
      text: "Your CV is instantly transformed",
      title: "Get your smart CV",
    },
    {
      image: img3,
      text: "Apply Anywhere",
      title: "One click to apply everywhere",
    },
  ];

  // Inside your component
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  const [ref2, inView2] = useInView({
    threshold: 0.1,
  });

  return (
    <Layout>
      <motion.section className="p-8 max-sm:px-4 md:py-22 text grid grid-cols-1 gap-12 xl:max-w-7xl 2xl:max-w-full 2xl:px-[12rem] 4xl:px-[3rem] w-full mx-auto">
        <div className="text-center text-lg text-zinc-500">
          <p className="text-[#DC2626] bg-red-100/50 inline-flex rounded-full sm:items-center px-4 py-2 mb-6 max-sm:text-[12px] text-sm gap-2">
            <span>
              <MdOutlineShield className="max-sm:text-base" />
            </span>
            {t("landing1.cta")}
            {/* Want to know why you are not getting callbacks? */}
          </p>
          <h1 className="text-center lg:text-6xl sm:text-5xl font-bold text-4xl text-slate-900 tracking-tight">
            Create your <br />
            <span className="py-2 gradient-text text-transparent inline-block">
              Smart CV in seconds
            </span>
          </h1>
          <p className="mb-2 text-black">
            Get your custom tabbio.com/YourName URL today for free.
          </p>
          <p className="max-sm:text-sm">
            Smart, Dynamic, Recruiter tools equipped CV <br />
            Designed to help you stand out and land interviews faster
          </p>
        </div>

        <div className="mt-10">
          <UploadResume
            onChange={() => {}}
            maxWidth="max-w-[800px] 4xl:max-w-[94%]"
            onSuccess={(response) => {
              if (response?.data?.profile?.template) {
                setParsedResume(response?.data?.profile);
              } else {
                setParsedResume({
                  ...response?.data?.profile,
                  template: "professional",
                  style: {
                    fontFamily: "Times New Roman",
                    primaryColor: "#0077B5",
                    fontSize: "medium",
                  },
                });
              }
              navigate("/onboard-user/live-resume");
            }}
          />
        </div>

        <div className="flex max-sm:flex-col gap-y-4 w-full justify-center items-center gap-x-8">
          <Button
            size="lg"
            onClick={() => {
              navigate("/signin");
            }}
          >
            <RiSparkling2Line />
            <span>Get Started</span>
            <FaArrowRightLong className="group-hover:translate-x-1.5" />
          </Button>
          <button
            onClick={() => setShowModal(true)}
            className="hover:scale-105 bg-gradient-to-b from-[#3B82F60D] to-[#A855F70D] text-black py-3 px-8 rounded-md"
          >
            Watch Demo
          </button>
        </div>
      </motion.section>
      <div className="w-full  flex flex-col justify-center items-center  py-4 px-6">
        <h5 className="text-center text-[#6B7280] mb-1.5">
          TRUSTED BY TEAMS FROM WORLD'S LEADING COMPANIES
        </h5>
        <InfiniteMovingIcons
          items={brandIcons}
          direction="right"
          speed="slow"
        />
      </div>

      <section className="pb-20 pt-20 bg-white">
        <div className="">
          <section className="overflow-hidden flex flex-col justify-center items-center relative">
            <div className="h-[10vh] z-0 py-10">
              <motion.div
                ref={ref2}
                className="z-2 w-full h-full"
                initial={{
                  scaleY: 0,
                }}
                animate={{
                  // backgroundColor: inView ? "white" : "transparent",
                  width: inView2 ? "100%" : "0%",
                  scaleY: inView2 ? 1.5 : 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 1.2,
                  ease: "easeOut",
                }}
              ></motion.div>
            </div>
            <motion.div
              className={` ${
                inView2 ? "bg-white" : "bg-transparent"
              } z-20 relative flex flex-col justify-center items-center py-[10rem] px-8 max-sm:px-4 lg:px-[4rem] 4xl:px-[3rem] 2xl:px-[12rem]`}
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
              <div className="w-full">
                <div className="mb-8">
                  <h1 className="font-bold text-center lg:text-3xl text-2xl">
                    The Only CV You Need: Smart, Live, Dynamic.
                    <br />{" "}
                    <span className="gradient-text text-transparent inline-block">
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
                      Smart Resume Builder
                    </h1>
                    <p className="text-zinc-500">
                      Create your professional resume with our intuitive builder
                    </p>
                  </div>
                  <div className="text-center shadow rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <MdOutlineShield size={20} />{" "}
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Custom Resume URL
                    </h1>
                    <p className="text-zinc-500">
                      Get your own you.tabbio.com domain
                    </p>
                  </div>
                  <div className="text-center shadow rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <SiSimpleanalytics size={18} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Basic Analytics
                    </h1>
                    <p className="text-zinc-500">
                      Track basic views and engagement
                    </p>
                  </div>
                  <div className="text-center shadow rounded-xl hover:shadow-lg h-full w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[#EFF6FF] text-slate-900">
                      <LuUsers size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Unlimited Views
                    </h1>
                    <p className="text-zinc-500">
                      Share your resume with unlimited viewers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute h-full w-full z-0">
              <motion.div
                ref={ref}
                className="z-2 rounded-[30px] w-full h-full"
                initial={{
                  scaleY: 0,
                }}
                animate={{
                  backgroundColor: inView2 ? "transparent" : "#111827",
                  width: inView ? "100%" : "100%",
                  scaleY: inView ? 1.5 : 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </div>

            <motion.div
              className="pb-[64px] z-20 mt-[20px] max-sm:px-4 relative flex flex-col bg-[#111827] justify-center items-center rounded-[18px]  py-[5rem] px-8 lg:px-[4rem] 4xl:px-[3rem] 2xl:px-[12rem]"
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
              <div className="w-full">
                <div className="mb-8 md:mb-14">
                  <h1 className="font-bold text-center text-white lg:text-3xl text-2xl">
                    Premium Tools to Tailor, <br /> Optimize, and Supercharge,{" "}
                    <br />
                    <span className="gradient-text text-transparent  inline-block">
                      Your Job Search.
                    </span>
                  </h1>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 lg:gap-x-3">
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-4 py-8 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <BiBrain size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      Unlimited AI Tools
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Score and optimize your CV, gain detailed recommendations,
                      and unlock exclusive job application perks.
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-4 py-8 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <BsBrowserChrome size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      One-Click Application Kit
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Instantly tailor your CV, cover letter, company insights,
                      and interview tips for any job description
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-4 py-8 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <SiSimpleanalytics size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      Advanced Analytics
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Dive deep into your CV’s performance with recruiter
                      behavior insights, view tracking, and engagement analysis.
                    </p>
                  </div>
                  <div className="text-center bg-[#1e293b] hover:bg-[#2e405c] h-full  rounded-md  w-full px-4 py-8 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2 bg-[#3B82F61A] text-white">
                      <FaLock size={24} />
                    </span>
                    <h1 className="text-white font-semibold text-lg">
                      Browser Extension
                    </h1>
                    <p className="text-[#9CA3AF]">
                      Quickly tailor each application and apply directly to jobs
                      from any job board
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center my-12">
                  <button
                    className="text-white rounded-md bg-gradient-to-br hover:scale-105 from-[#3B82F61A] to-[#A855F71A] flex items-center gap-2 px-10 py-3.5"
                    onClick={() => {}}
                  >
                    Upgrade to Premium{" "}
                    <span>
                      <IoFlashOutline size={18} />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>

           
            <motion.div
              className={` pb-[64px] bg-white z-20 max-sm:px-4 relative flex justify-center items-center py-[10rem] px-8 lg:px-[4rem] 4xl:px-[3rem] 2xl:px-[12rem]`}

              initial={{ y: 100, width: "100%" }}
              whileInView={{
                y: 10,
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
                <div className="mb-8 md:mb-14 text-center">
                  <h1 className="font-bold text-center lg:text-3xl text-2xl mb-3">
                    Common Job Search Frustrations
                  </h1>
                  <p className="text-zinc-600 mb-3">
                    We understand the challenges of modern job searching
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <LuFileSearch size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Black Hole Applications
                    </h1>
                    <p className="text-zinc-500">
                      Never know if your resume was even seen
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: Real-time tracking & analytics
                      </span>
                    </div>
                  </div>
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <BiBrain size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      ATS Rejection
                    </h1>
                    <p className="text-zinc-500">
                      Getting filtered out by ATS systems
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: AI-powered optimization
                      </span>
                    </div>
                  </div>
                  <div className="shadow-lg hover:shadow-xl h-full rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center">
                    <span className="rounded-md p-2.5 w-10 bg-gradient-to-r from-[#5272EA]/10 to-[#394FC0]/10 text-slate-900">
                      <FaRegClock size={20} />
                    </span>
                    <h1 className="text-black dark:text-white font-semibold text-lg">
                      Time-Consuming
                    </h1>
                    <p className="text-zinc-500">
                      Hours spent tweaking resumes
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-[45px] rounded-full bg-gradient-to-r from-[#5272EA] to-[#394FC0]"></span>
                      <span className="text-[13px] text-primary">
                        Solution: One-click customization
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </section>

      <section className="py-[9%] px-8 max-sm:px-4 lg:px-[4rem] 2xl:px-[12rem] 4xl:px-[3rem] bg-gradient-to-b from-[#F9fafb] to-white">
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
                  <p className="text-zinc-600 mb-3">
                    Join thousands of professionals who've accelerated their
                    careers with Tabbio
                  </p>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FaArrowTrendUp size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={7}
                        delay={2}
                        end={87}
                        enableScrollSpy
                      />{" "}
                      %
                    </h1>
                    <p className="text-zinc-500">Interview Success Rate</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FaRegClock size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={0}
                        delay={2}
                        end={2.5}
                        enableScrollSpy
                      />{" "}
                      x
                    </h1>
                    <p className="text-zinc-500">Faster Job Search</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FiTarget size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={3}
                        delay={2}
                        end={93}
                        enableScrollSpy
                      />{" "}
                      %
                    </h1>
                    <p className="text-zinc-500">ATS Match Rate</p>
                  </div>
                  <div className="text-center shadow-sm  bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.05)_0%,_rgba(168,_85,_247,_0.05)_100%)] hover:shadow-lg h-full rounded-xl w-full px-3 py-4 space-y-3 flex-col flex justify-center items-center">
                    <span className="rounded-md p-2.5 bg-[linear-gradient(90deg,_rgba(59,_130,_246,_0.1)_0%,_rgba(168,_85,_247,_0.1)_100%)] text-slate-900">
                      <FiBriefcase size={20} />
                    </span>
                    <h1 className="bg-gradient-to-r from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-block font-semibold text-2xl">
                      <CountUp
                        className="text-inherit -mr-[5px]"
                        start={10}
                        delay={2}
                        end={150}
                        enableScrollSpy
                      />{" "}
                      k+
                    </h1>
                    <p className="text-zinc-500">Jobs Landed</p>
                  </div>
                </div>
              </div>
            </motion.div>

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
                  <h1 className="font-bold text-center lg:text-3xl text-2xl mb-3">
                    Success Stories
                  </h1>
                  <p className="text-zinc-600 mb-3">
                    Real results from real users
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
                  {JobseekerTestimonials.map((val, index) => (
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

                <div className="w-full flex flex-col justify-center items-center my-12">
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <section>
          <Carousel showControls={true} carouselContent={demoData} />
        </section>
      </Modal>
    </Layout>
  );
};

export default ProfessionalLandingpage;
