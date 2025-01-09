import { MdCheck, MdOutlineShield } from "react-icons/md";
import Breadcrumb from "../../components/BreadCrumb";
import Layout from "../../layout/LandingLayout";
import React, { useState } from "react";
import SlideTab, { Cursor } from "../../AnimatedUi/SlideTabs";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import Accordion from "../../components/Accordion";
import { faqData } from "../../data/mockData";
import { AvatarGroup } from "../../components/Avatar2";
import User01 from "../../assets/users/user-01.png";
import User02 from "../../assets/users/user-02.png";
import User03 from "../../assets/users/user-04.png";
import User04 from "../../assets/users/user-05.png";
import { Ratings } from "../../components/Rating";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const PricingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "professionals" | "companies" | string
  >("professionals");
  const [isMonthlyProfessional, setIsMonthlyProfessional] = useState(true);
  const [isMonthlyCompany, setIsMonthlyCompany] = useState(true);

  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hover, setHover] = useState(false);
  return (
    <Layout>
      <section className="bg-gradient-to-b from-transparent to-white">
        <div className="">
          <div className="2xl:px-[12rem] md:pt-8 pt-4 md:px-[4rem] px-4">
            <Breadcrumb homeRouteName="Home" homeRoute="/" pageName="Pricing" />
          </div>
          <section className="p-8  md:pt-6 md:pb-14 text grid grid-cols-1 gap-12 xl:max-w-7xl 2xl:max-w-full 2xl:px-[12rem] w-full mx-auto">
            <div className="text-center text-lg text-zinc-500">
              <p className="text-primary bg-primary/10 inline-flex rounded-full items-center px-4 py-2 mb-6 text-sm gap-2">
                <span>
                  <MdOutlineShield />
                </span>
                Join 100,000+ professionals
              </p>
              <h1 className="text-center lg:text-6xl sm:text-5xl font-bold text-4xl text-slate-900 tracking-tight mb-4">
                Simple, transparent pricing
              </h1>
              <p className="mb-2">
                Start free, upgrade when you need more features.
              </p>
            </div>
          </section>
        </div>

        <section className=" py-[5%] px-8 lg:px-[4rem] 2xl:px-[12rem]">
          <div>
            {/* Tab Switcher */}
            <div className="flex flex-col items-center justify-center w-full  mb-12">
              <ul
                onMouseLeave={() => {
                  setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                  }));
                  setHover(false);
                }}
                onMouseEnter={() => {
                  setHover(true);
                }}
                className="relative flex w-fit rounded-full shadow-inner border border-stroke shadow-zinc-400/80 bg-white"
              >
                <SlideTab
                  activeTab={activeTab}
                  tab="professionals"
                  onChange={(tab) => {
                    setActiveTab(tab);
                  }}
                  setPosition={setPosition}
                  noBg={hover}
                  landing={false}
                  activeColor="text-white"
                  props={{ rounded: "rounded-full" }}
                >
                  <span>For Professionals</span>
                </SlideTab>
                <SlideTab
                  activeTab={activeTab}
                  tab="companies"
                  onChange={(tab) => {
                    setActiveTab(tab);
                  }}
                  setPosition={setPosition}
                  noBg={hover}
                  landing={false}
                  activeColor="text-white"
                  props={{ rounded: "rounded-full" }}
                >
                  <span>For Companies</span>
                </SlideTab>

                <Cursor
                  position={position}
                  landing={false}
                  props={{ rounded: "rounded-full" }}
                />
              </ul>
            </div>

            {/* Pricing Cards */}
            <div className="w-full">
              {activeTab === "professionals" ? (
                <div className="flex max-md:flex-col gap-6 w-full justify-center items-center">
                  {/* Free Plan - Professionals */}
                  <div className="border-none md:min-w-[384px] max-sm:w-full max-md:w-[70%] hover:scale-105 delay-100 duration-200 p-6 rounded-lg bg-white shadow-xl">
                    <h3 className="text-xl font-semibold text-zinc-800 text-center mb-2">
                      Free Forever
                    </h3>

                    <h2 className="text-4xl font-extrabold mt-4 mb-2 text-center">
                      <span className="py-2 bg-gradient-to-r from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-block">
                        $0{" "}
                      </span>

                      <span className="text-base text-zinc-500 font-normal">
                        forever
                      </span>
                    </h2>
                    <p className="text-sm text-zinc-500 text-center">
                      Perfect for getting started
                    </p>
                    <ul className="mt-4 space-y-2.5 font-normal px-2 text-zinc-500 border-b border-stroke pb-2.5">
                      <li className="flex items-center gap-2">
                        <MdCheck /> Smart Resume Builder
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Custom Resume URL
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Unlimited Resume Reviews
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Basic Analytics Dashboard
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Community Support
                      </li>
                    </ul>
                    <p className="text-sm text-zinc-600 mt-5 mb-2.5 pl-2">
                      Limitations:
                    </p>
                    <ul className=" text-zinc-500 space-y-2.5 px-2 mb-5">
                      <li className="flex items-center gap-1">
                        <RiErrorWarningLine className="text-zinc-700" />{" "}
                        Standard Resume Templates Only
                      </li>
                      <li className="flex items-center gap-1">
                        <RiErrorWarningLine className="text-zinc-700" /> Basic
                        Analytics Only
                      </li>
                      <li className="flex items-center gap-1">
                        <RiErrorWarningLine className="text-zinc-700" /> Email
                        Support Only
                      </li>
                    </ul>
                    <button className="w-full mt-4 py-2.5 bg-black text-white rounded-md ">
                      Get Started Free
                    </button>
                  </div>

                  {/* Premium Plan - Professionals */}
                  <div className="border hover:scale-105 md:min-w-[384px] max-sm:w-full max-md:w-[70%] duration-200 p-6 rounded-lg bg-white shadow-xl border-primary">
                    <h3 className="text-xl font-semibold text-zinc-800 text-center mb-2">
                      Premium
                    </h3>
                    <div className="flex w-full justify-center items-center">
                      <div className="flex w-fit justify-center items-center space-x-0 rounded-full bg-white shadow-inner border border-stroke mt-4">
                        <button
                          className={`px-4 py-1 rounded-full ${
                            isMonthlyProfessional
                              ? "bg-primary text-white"
                              : "bg-transparent "
                          }`}
                          onClick={() => setIsMonthlyProfessional(true)}
                        >
                          Monthly
                        </button>
                        <button
                          className={`px-4 py-1 rounded-full ${
                            !isMonthlyProfessional
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                          }`}
                          onClick={() => setIsMonthlyProfessional(false)}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>

                    <h2 className="text-4xl font-extrabold mt-4 text-center mb-2">
                      <span className="py-2 bg-gradient-to-r from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-block">
                        {" "}
                        ${isMonthlyProfessional ? "12" : "8"}{" "}
                      </span>
                      <span className="text-base text-zinc-500 font-normal">
                        {isMonthlyProfessional ? "/month" : "/yearly"}
                      </span>
                    </h2>
                    <p className="text-sm text-zinc-500 font-normal text-center mb-2">
                      Get 3x more interviews
                    </p>

                    <ul className=" text-zinc-500 space-y-2.5 px-2 my-5">
                      <li className="flex items-center gap-2">
                        <MdCheck /> Everything in Free, plus:
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> AI Resume Optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Premium Templates Library
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Resume Performance Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Private Mode
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Priority Support
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Chrome Extension
                      </li>
                    </ul>
                    <button className="w-full mt-6 py-2.5 bg-gradient-to-br from-[#5272EA] to-[#394FC0] hover:from-[#394FC0] hover:to-[#5272EA] text-white rounded">
                      Get Premium - $12/month
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex max-md:flex-col gap-6 w-full h-full justify-center items-center">
                  {/* Free Plan - Companies */}
                  <div className="border-none flex flex-col h-full md:min-w-[317px] max-sm:w-full max-md:w-[70%] hover:scale-105 delay-100 duration-200 p-6 rounded-lg bg-white shadow-xl">
                    <h3 className="text-xl font-semibold text-zinc-800 text-center mb-2">
                      Free Forever
                    </h3>

                    <h2 className="text-4xl font-extrabold mt-4 mb-2 text-center">
                      <span className="py-2 bg-gradient-to-r from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-block">
                        $0{" "}
                      </span>

                      <span className="text-base text-zinc-500 font-normal">
                        forever
                      </span>
                    </h2>
                    <p className="text-sm text-zinc-500 text-center">
                      Perfect for small teams
                    </p>
                    <ul className="mt-4 space-y-2.5 font-normal px-2 text-zinc-500 border-b border-stroke pb-2.5">
                      <li className="flex items-center gap-2">
                        <MdCheck /> Talent Portal Setup
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Up to 5 Job Postings
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Basic Candidate Tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Email Support
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Standard Templates
                      </li>
                    </ul>
                    <p className="text-sm text-zinc-600 mt-5 mb-2.5 pl-2">
                      Limitations:
                    </p>
                    <ul className=" text-zinc-500 space-y-2.5 px-2 mb-5">
                      <li className="flex items-center gap-1">
                        {" "}
                        <RiErrorWarningLine className="text-zinc-700" /> Single
                        Team Member Only
                      </li>
                      <li className="flex items-center gap-1">
                        {" "}
                        <RiErrorWarningLine className="text-zinc-700" /> Basic
                        Features Only
                      </li>
                      <li className="flex items-center gap-1">
                        {" "}
                        <RiErrorWarningLine className="text-zinc-700" />{" "}
                        Community Support Only
                      </li>
                    </ul>
                    <button className="w-full mt-4 py-2.5 bg-black text-white rounded-md ">
                      Get Started Free
                    </button>
                  </div>
                  {/* Business Plan - Companies */}
                  <div className="border flex flex-col h-full hover:scale-105 md:min-w-[317px] max-sm:w-full max-md:w-[70%] duration-200 p-6 rounded-lg bg-white shadow-xl border-primary">
                    <h3 className="text-xl font-semibold text-zinc-800 text-center mb-2">
                      Business
                    </h3>
                    {/* Monthly/Yearly Toggle */}
                    <div className="flex w-full justify-center items-center">
                      <div className="flex w-fit justify-center items-center space-x-0 rounded-full bg-white shadow-inner border border-stroke mt-4">
                        <button
                          className={`px-4 py-1 rounded-full ${
                            isMonthlyCompany
                              ? "bg-primary text-white"
                              : "bg-transparent "
                          }`}
                          onClick={() => setIsMonthlyCompany(true)}
                        >
                          Monthly
                        </button>
                        <button
                          className={`px-4 py-1 rounded-full ${
                            !isMonthlyCompany
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                          }`}
                          onClick={() => setIsMonthlyCompany(false)}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>

                    <h2 className="text-4xl font-extrabold mt-4 text-center mb-2">
                      <span className="py-2 bg-gradient-to-r from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-block">
                        {" "}
                        ${isMonthlyCompany ? "49" : "39"}{" "}
                      </span>
                      <span className="text-base text-zinc-500 font-normal">
                        {isMonthlyProfessional ? "/month" : "/yearly"}
                      </span>
                    </h2>
                    <p className="text-sm text-zinc-500 font-normal text-center mb-2">
                      Perfect for large teams
                    </p>

                    <ul className=" text-zinc-500 space-y-2.5 px-2 my-5">
                      <li className="flex items-center gap-2">
                        <MdCheck /> Everything in Free, plus
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Unlimited Job Postings
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> AI Talent Matching
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Advanced Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Standard Templates
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Bulk Actions
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> API Access
                      </li>
                    </ul>
                    <button className="w-full mt-6 py-2.5 bg-gradient-to-br from-[#5272EA] to-[#394FC0] hover:from-[#394FC0] hover:to-[#5272EA] text-white rounded">
                      {isMonthlyCompany
                        ? "Get Business - $49/month"
                        : "Get Business - $39/month"}
                    </button>
                  </div>

                  {/* Enterprise Plan - Companies */}
                  <div
                    className="border-none
                    md:min-w-[317px] flex flex-col h-full max-sm:w-full max-md:w-[70%] hover:scale-105 delay-100 duration-200 p-6 rounded-lg bg-white shadow-xl"
                  >
                    <h3 className="text-xl font-semibold text-zinc-800 text-center mb-2">
                      Enterprise
                    </h3>

                    <p className="text-sm text-zinc-500 text-center">
                      Perfect for small teams
                    </p>
                    <ul className="mt-4 space-y-2.5 font-normal px-2 text-zinc-500 pb-2.5">
                      <li className="flex items-center gap-2">
                        <MdCheck /> Talent Portal Setup
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Up to 5 Job Postings
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Basic Candidate Tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Email Support
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Standard Templates
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Bulk Actions
                      </li>
                      <li className="flex items-center gap-2">
                        <MdCheck /> Priority Support
                      </li>
                    </ul>

                    <button className="w-full mt-4 py-2.5 bg-black text-white rounded-md ">
                      Get Started Free
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 justify-center items-center py-[5%] px-8 lg:px-[4rem] 2xl:px-[12rem]">
          <div className="flex gap-x-12 max-sm:flex-wrap gap-y-4 max-sm:justify-center justify-between text-zinc-500">
            <div className="flex items-center gap-4 text-zinc-500">
              <AvatarGroup images={[User01, User02, User03, User04]} />
              <p>Join 40,000+ users</p>
            </div>
            <div className="flex gap-2 items-center">
              <Ratings rating={4.9} />
              <p>4.9/5</p>
            </div>
          </div>

          <div className="flex max-md:flex-wrap max-sm:justify-center items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <MdOutlineShield /> 30-days money back{" "}
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <MdOutlineShield /> Secure Payments{" "}
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <LuUsers /> 24/7 Support{" "}
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <h1 className="2xl:text-3xl lg:text-2xl text-xl font-bold pt-16 pb-9 text-center">
              Frequently Asked Questions
            </h1>
            <Accordion items={faqData} />
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default PricingPage;
