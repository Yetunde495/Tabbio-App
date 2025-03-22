import { Fragment, useEffect, useState } from "react";
import { LuBriefcase, LuBuilding2 } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineMail, MdOutlinePhone, MdShare } from "react-icons/md";
import Avatar from "../../components/Avatar2";
import getUserInitials from "../../lib/utils/getUserInitials";
import { FaImage, FaLinkedin, FaRegCalendar } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { TbMessage, TbWorld } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown2 } from "../../components/Dropdown";
import { IoIosArrowDown, IoIosArrowUp, IoLogoWhatsapp } from "react-icons/io";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { Accordion2 } from "../../components/Accordion";
import { ReadMore } from "../../components/ReadMore";
import { Pill } from "../../components/Pills";
import { ItemList } from "../Candidate/SmartResumeComponents";
import { FaRegUserCircle } from "react-icons/fa";
import Modal from "../../components/modal";
import {
  getProfileByTabbiolink,
  saveProfileActions,
} from "../../services/profileServices";
import { toast } from "react-toastify";
import { PageLoader } from "../../components/Loader";
import { useApp } from "../../context/AppContext";
import EmptyImg from "../../assets/svg/empty-animate.svg";
import { formatMonthYear } from "../../lib/utils/formatters";
import { ShareCandidateCV } from "../Candidate/ShareResume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfessionalPDF from "../../components/PDFTemplates/ProfessionalPDF";
import EntryPDF from "../../components/PDFTemplates/EntryPDF";
import { getResumeById } from "../../services/resumeServices";

const SmartResume: React.FC = () => {
  const { user } = useApp();
  const { tabbioLink } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any | null>(null);
  const [resumeData, setResumeData] = useState<any | null>(null);
  const [actionPerformed, setActionPerformed] = useState(false);
  const [showCompetencies, setShowCompetencies] = useState(false);
  const [showAllCareer, setShowAllCareer] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [careerModal, setCareerModal] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  const handleProfileActions = async (data: any) => {
    try {
      await saveProfileActions(data);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    }
  };

  const fetchResumeData = async (resumeId: any) => {
    try {
      const resp = await getResumeById(resumeId);
      setResumeData(resp?.data?.resume);
    } catch (err: any) {
      if (err?.message !== "Profile not found") {
        toast.error(err?.message || "Request Failed");
        setErrMessage(err?.message);
      }
    }
  };

  const fetchProfileData = async () => {
    if (tabbioLink) {
      try {
        setLoading(true);
        const resp = await getProfileByTabbiolink(`${tabbioLink}`);
        setProfileData(resp?.data?.profile);
        if (!actionPerformed) {
          // Check if action has already been performed
          handleProfileActions({
            userId: resp?.data?.profile?.user,
            company: user
              ? user?.companyName || user?.firstName +  " " + user?.lastName
              : "Anonymous",
            action: "view",
          });
          setActionPerformed(true);
        }
        await fetchResumeData(resp?.data?.profile?.resume);
      } catch (err: any) {
        if (err?.message !== "Profile not found") {
          toast.error(err?.message || "Request Failed");
          setErrMessage(err?.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <section className="h-screen bg-[#F9FAFB]">
      {loading ? (
        <PageLoader />
      ) : profileData ? (
        <Fragment>
          <header className="fixed top-0 left-0 right-0 z-99">
            <div className="w-full py-2 px-[4%] max-sm:px-0 bg-white shadow-md max-sm:py-4">
              <div className="w-full flex xl:flex-row flex-col justify-between items-center xl:space-x-6 space-y-4">
                <div className="flex items-center max-sm:flex-wrap max-sm:justify-between gap-3 text-sm max-sm:px-2">
                  <div>
                    <Avatar
                      src={profileData?.image || ""}
                      size="medium"
                      initials={getUserInitials(profileData?.name, "")}
                    />
                    <span className={``}></span>
                  </div>
                  <div className="">
                    <p
                      className={`font-semibold text-lg text-black flex gap-4 items-center`}
                    >
                      {profileData?.name} <span></span>
                    </p>
                    {profileData?.config?.role && (
                      <p
                        className={` text-zinc-700 flex gap-1 font-normal items-center text-sm`}
                      >
                        <LuBriefcase className="text-zinc-500" />{" "}
                        {profileData?.role}
                      </p>
                    )}
                    <div className="flex gap-3 gap-y-1 max-sm:flex-wrap text-zinc-600 text-[13px] items-center">
                      {profileData?.config?.location && (
                        <span
                          className={`mt-0.5  flex gap-1 font-normal items-center`}
                        >
                          <IoLocationOutline className="text-zinc-500" />{" "}
                          {profileData?.location}
                        </span>
                      )}
                      <span className="text-zinc-500">
                        (
                        {profileData?.relocation
                          ? "Open to relocate"
                          : "Not open to relocate"}
                        )
                      </span>
                      {profileData?.locationType?.length > 0 && (
                        <div className="flex gap-1 text-zinc-600 text-[13px] items-center">
                          <LuBuilding2 />{" "}
                          <ul className="flex gap-0.5">
                            {profileData?.locationType?.map(
                              (val: string, index: number) => (
                                <li key={val}>
                                  {val}{" "}
                                  {profileData?.locationType?.length > 1 &&
                                    index + 1 !==
                                      profileData?.locationType?.length &&
                                    "/"}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-3 xl:ml-auto max-sm:pl-2">
                  <div className="max-w-[280px] relative font-normal">
                    <Dropdown2
                      buttonContent={
                        <span className="flex cursor-pointer max-w-[160px] text-[15px] text-white bg-primary rounded-md w-auto py-1.5 px-4 items-center gap-2">
                          <MdOutlineMail /> Contact
                        </span>
                      }
                      props={{ styles: "min-w-[220px]" }}
                    >
                      <div
                        onClick={() => {}}
                        className="flex gap-2 mx-2 mt-1 font-normal text-zinc-700 rounded-md text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <FaRegCalendar className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Schedule Interview</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          copyToClipboard(profileData?.phone);
                        }}
                        className="flex gap-2 mx-2 mt-1 rounded-md font-normal text-zinc-700 text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <MdOutlinePhone className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Call</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {}}
                        className="flex gap-2 mx-2 mt-1 rounded-md font-normal text-zinc-700 text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <TbMessage className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Text</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          copyToClipboard(profileData?.email);
                          openNewTab(`mailto:${profileData?.email}`);
                        }}
                        className="flex gap-2 mx-2 mt-1 rounded-md font-normal text-zinc-700 text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <MdOutlineMail className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Email</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          copyToClipboard(profileData?.phone);
                          openNewTab(`https://wa.me/${profileData?.phone}`);
                        }}
                        className="flex gap-2 mx-2 mt-1 rounded-md font-normal text-zinc-700 text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <IoLogoWhatsapp className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Whatsapp</p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          copyToClipboard(profileData?.linkedIn);
                          openNewTab(
                            `https://www.linkedin.com/in/${profileData?.linkedin}`
                          );
                        }}
                        className="flex gap-2 mx-2 mt-1 rounded-md font-normal text-zinc-700 text-center items-center justify-center px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <FaLinkedin className="" />{" "}
                        </span>
                        <div>
                          <p className="font-medium">Linkedin DM</p>
                        </div>
                      </div>
                    </Dropdown2>
                  </div>

                  {user && (
                    <button className="flex items-center justify-center gap-2 text-primary bg-primary/10 rounded-md py-2 text-sm px-4">
                      <span className="max-sm:hidden">
                        <BsBookmarkPlus />
                      </span>
                      <span> Save to ShareList</span>
                    </button>
                  )}
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
                    <button onClick={() => {
                      handleProfileActions({
                        userId: profileData?.user,
                        company: user
                          ? user?.companyName ||
                            user?.firstName + " " + user?.lastName
                          : "Anonymous",
                        action: "download",
                      });
                    }} className="flex items-center justify-center hover:bg-zinc-200 gap-2 text-zinc-800 bg-[#F3F4F6] rounded-md py-2 text-sm px-4">
                      <span className="max-sm:hidden">
                        <LiaFileDownloadSolid />
                      </span>
                      <span>Download CV</span>
                    </button>
                  </PDFDownloadLink>

                  <div className="flex items-center gap-3 text-zinc-600">
                    <button
                      onClick={() => {
                        setShareModal(true);
                        handleProfileActions({
                          userId: profileData?.user,
                          company: user
                            ? user?.companyName ||
                              user?.firstName + " " + user?.lastName
                            : "Anonymous",
                          action: "share",
                        });
                      }}
                      className=""
                    >
                      <MdShare size={18} />
                    </button>

                    <Dropdown2
                      buttonContent={
                        <span className="flex cursor-pointer max-w-[160px] text-[15px] text-zinc-600 w-auto hover:scale-105 items-center gap-1">
                          <TbWorld size={18} /> EN
                        </span>
                      }
                      props={{ styles: "min-w-[220px]" }}
                    ></Dropdown2>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="w-full flex flex-col xl:py-[9%] py-[10rem] max-sm:pt-[16rem] justify-center items-center">
            <div className="bg-white shadow-lg px-6 max-sm:px-3 py-5 w-full h-full lg:max-w-[70%] xl:max-w-[65%]">
              <div className="flex flex-col gap-y-6">
                <Accordion2
                  title={
                    <h6 className="text-lg font-medium text-zinc-800">
                      Profile Summary
                    </h6>
                  }
                  defaultOpen
                >
                  <div className="">
                    <ReadMore text={profileData?.professionalSummary} />

                    <div className="w-full flex gap-x-3 max-md:flex-wrap gap-y-2 items-center">
                      {profileData?.yearsOfExperience && (
                        <Pill>
                          {profileData?.yearsOfExperience} Years of Experience
                        </Pill>
                      )}
                      {profileData?.level && (
                        <Pill variant="primary">
                          {" "}
                          {profileData?.level} Level
                        </Pill>
                      )}
                      {profileData?.level && (
                        <Pill variant="none"> {profileData?.majorSkill}</Pill>
                      )}
                    </div>

                    <div className="mt-3 ">
                      <button
                        onClick={() => setShowCompetencies(!showCompetencies)}
                        className="flex gap-1.5 items-center mb-2.5 hover:bg-slate-200 bg-slate-100 rounded-full py-1.5 sm:px-3 sm:text-sm px-2 text-xs font-normal"
                      >
                        Core Competencies{" "}
                        <span>
                          {!showCompetencies ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowUp />
                          )}
                        </span>
                      </button>
                      {showCompetencies && (
                        <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
                          {profileData?.skills?.map(
                            (val: string, index: number) => (
                              <Pill key={index}>{val}</Pill>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Accordion2>
                {profileData?.config?.careerHighlights && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Career Highlights
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        {profileData?.careerHighlights &&
                          (showAllCareer
                            ? profileData.careerHighlights
                            : profileData.careerHighlights.slice(0, 3)
                          ).map((item: any, index: number) => (
                            <div
                              key={index}
                              onClick={() => setSelectedCareer(item)}
                              className="border border-stroke hover:shadow-md cursor-pointer rounded-lg shadow-sm bg-white p-3"
                            >
                              {!item?.thumbnail && (
                                <div className="w-full text-primary bg-[#EFF6FFCC] h-40 flex justify-center items-center">
                                  <FaImage size={40} />
                                </div>
                              )}
                              <div className="flex justify-between items-start mb-3 pt-2">
                                <div>
                                  <h6 className="text-base font-medium text-zinc-800 mb-0">
                                    {item?.title}
                                  </h6>
                                </div>
                              </div>

                              <div>
                                <p className="font-normal text-sm text-zinc-500 pb-4">
                                  {item?.description}
                                </p>
                              </div>

                              <div className="w-full flex item-center justify-center border-t border-stroke pt-4">
                                <button
                                  onClick={() => setCareerModal(true)}
                                  className=" text-blue-600 hover:scale-95 delay-100"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="py-5 w-full flex justify-center items-center">
                        {profileData?.careerHighlights.length > 3 && (
                          <button
                            onClick={() => setShowAllCareer(!showAllCareer)}
                            className="text-primary flex gap-1.5 items-center py-3 text-lg"
                          >
                            {showAllCareer ? "See Less" : "Show More"}
                            <span>
                              {!showAllCareer ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowUp />
                              )}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.workExperience && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Work Experience
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {profileData?.workExperience.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                                    {item?.title}
                                  </h6>
                                  <p className=" text-primary max-md:text-sm">
                                    {item?.company}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p className="text-xs text-zinc-500 lg:mr-4">
                                    {item?.startDate &&
                                      formatMonthYear(item?.startDate)}
                                    -
                                    {item?.active
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="font-normal text-sm text-zinc-500">
                                  {item?.description}
                                </p>
                              </div>

                              <div className="my-4">
                                <p className="text-zinc-800 max-md:text-sm text-base font-medium mb-1">
                                  Key Achievements:
                                </p>
                                <ItemList items={item?.keyAchievements} />
                              </div>

                              <div className="mb-4">
                                <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
                                  {item?.skills?.map((val: string) => (
                                    <Pill key={val}>{val}</Pill>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.volunteerExperience && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Volunteer Experience
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {profileData?.volunteerExperience.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                                    {item?.title}
                                  </h6>
                                  <p className=" text-primary max-md:text-sm">
                                    {item?.company}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p className="text-xs text-zinc-500 lg:mr-4">
                                    {item?.startDate &&
                                      formatMonthYear(item?.startDate)}{" "}
                                    -{" "}
                                    {item?.endDate &&
                                      formatMonthYear(item?.endDate)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="font-normal text-sm text-zinc-500">
                                  {item?.description}
                                </p>
                              </div>

                              <div className="my-4">
                                <p className="text-zinc-800 max-md:text-sm text-base font-medium mb-1">
                                  Key Achievements:
                                </p>
                                <ItemList items={item?.keyAchievements} />
                              </div>

                              <div className="mb-4">
                                <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
                                  {item?.skills?.map(
                                    (val: string, idx: number) => (
                                      <Pill key={idx}>{val}</Pill>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.internships && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Internships
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {profileData?.internships?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                                    {item?.title}
                                  </h6>
                                  <p className=" text-primary max-md:text-sm">
                                    {item?.company}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p className="text-xs text-zinc-500 lg:mr-4">
                                    {item?.startDate &&
                                      formatMonthYear(item?.startDate)}
                                    -
                                    {item?.active
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="font-normal text-sm text-zinc-500">
                                  {item?.description}
                                </p>
                              </div>

                              <div className="my-4">
                                <p className="text-zinc-800 max-md:text-sm text-base font-medium mb-1">
                                  Key Achievements:
                                </p>
                                <ItemList items={item?.keyAchievements} />
                              </div>

                              <div className="mb-4">
                                <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
                                  {item?.skills?.map(
                                    (val: string, idx: number) => (
                                      <Pill key={idx}>{val}</Pill>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.education && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Education
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {profileData?.education?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                                    {item?.degree}
                                  </h6>
                                  <p className=" text-primary max-md:text-sm">
                                    {item?.institution}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p className="text-xs text-zinc-500 lg:mr-4">
                                    {item?.startDate &&
                                      formatMonthYear(item?.startDate)}
                                    -
                                    {item?.active
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="font-normal text-sm text-zinc-500">
                                  {item?.description}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.certifications && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Certifications and Trainings
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex flex-col gap-3">
                        {profileData?.certifications?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h6 className="text-base font-medium text-zinc-800 mb-0">
                                    {item?.name}
                                  </h6>
                                  <p className=" text-primary max-md:text-sm">
                                    {item?.institution}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <p className="text-xs text-zinc-500 lg:mr-4">
                                    {formatMonthYear(item?.date)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.references && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Professional Reference
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex 2xl:flex-row flex-col w-full gap-4">
                        {profileData?.references?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke h-full rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex w-full items-start gap-4">
                                <span className="text-zinc-500 text-lg mt-2">
                                  {" "}
                                  <FaRegUserCircle size={18} />
                                </span>
                                <div className="flex w-full justify-between items-start mb-3">
                                  <div>
                                    <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                                      {item?.name}
                                    </h6>
                                    <p className=" text-primary max-md:text-sm mb-2">
                                      {item?.title}
                                    </p>
                                    <p className=" text-zinc-500 max-md:text-sm mb-1">
                                      {item?.company}
                                    </p>
                                    <p className=" text-zinc-500 max-md:text-sm">
                                      Relationship: {item?.relationship}
                                    </p>
                                    <p className="text-zinc-500 max-md:text-sm mt-2.5">
                                      Contact Information:{" "}
                                      {item?.email && (
                                        <span>(E)- {item?.email}</span>
                                      )}
                                      {item?.phone && (
                                        <span className="ml-2">
                                          (P)- {item?.phone}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
                {profileData?.config?.memberships && (
                  <Accordion2
                    title={
                      <h6 className="text-lg font-medium text-zinc-800">
                        Membership & Affiliation
                      </h6>
                    }
                    defaultOpen
                    border={false}
                  >
                    <div className="">
                      <div className="flex 2xl:flex-row flex-col w-full gap-4">
                        {profileData?.memberships?.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-stroke h-full rounded-lg shadow-sm bg-white p-3"
                            >
                              <div className="flex w-full items-start gap-4">
                                <span className="text-zinc-500 text-lg mt-2">
                                  {" "}
                                  <FaRegUserCircle size={18} />
                                </span>
                                <div className="flex w-full justify-between items-start mb-3">
                                  <div>
                                    <h6 className="text-base break-words font-medium text-zinc-800 mb-0">
                                      {item?.title}
                                    </h6>
                                    <p className=" text-primary max-md:text-sm mb-2">
                                      {item?.role}
                                    </p>
                                  </div>
                                  <div className="flex items-center">
                                    <p className="text-xs text-zinc-500 lg:mr-4">
                                      {formatMonthYear(item?.date)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Accordion2>
                )}
              </div>
            </div>
          </section>

          <div className="fixed left-0 right-0 w-full bottom-0">
            <div className="w-full flex justify-between max-sm:text-xs text-sm items-center text-zinc-500 py-3.5 px-5 bg-[#FBFCFC] border border-[#F3F4F6]">
              <p>Powered by Tabbio</p>
              <Link
                to={`/signup`}
                className="flex items-center gap-1 text-primary"
              >
                Create your SmartResume <FiExternalLink />
              </Link>
            </div>
          </div>
          <Modal
            show={careerModal}
            onHide={() => {
              setCareerModal(false);
            }}
            title="Career Highlight"
            size="max-w-[600px] w-full"
          >
            <div>
              <div className="mb-4 w-full flex justify-between text-zinc-950 items-center gap-3">
                <p className="font-semibold">{selectedCareer?.title}</p>
              </div>
              <div className="py-2 px-3 rounded-lg border border-stroke">
                <p className="font-normal text-sm text-zinc-500 py-3">
                  {selectedCareer?.description}
                </p>
                {selectedCareer?.skills?.length > 0 && (
                  <div className="mt-5">
                    <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
                      {selectedCareer?.skills?.map((val: string) => (
                        <Pill key={val}>{val}</Pill>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedCareer?.attachments?.link && (
                <div>
                  <div className="mt-6">
                    <p className="text-base font-semibold text-zinc-600 mb-1">
                      Attachment
                    </p>
                    {selectedCareer?.attachment?.type === "link" && (
                      <div>
                        <a
                          href={selectedCareer?.attachment?.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Follow this link to view more details:{" "}
                          <span className="text-blue-500 hover:underline">
                            {selectedCareer?.attachment?.url}
                          </span>
                        </a>
                      </div>
                    )}
                    {selectedCareer?.attachment?.type === "image" && (
                      <div className="h-50 w-full max-w-[280px] pt-3">
                        <img
                          src={selectedCareer?.attachment?.url}
                          alt="career highlight image"
                          className="object-cover w-full h-full rounded-md"
                        />
                      </div>
                    )}
                    {selectedCareer?.attachment?.type === "video" && (
                      <div className="h-50 w-full max-w-[280px] pt-3">
                        <video
                          src={selectedCareer?.attachment?.url}
                          className="object-cover w-full h-full rounded-md"
                          controls
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </Fragment>
      ) : (
        <div className="h-screen flex w-full justify-center text-center items-center">
          <div className="flex flex-col w-full bg-white shadow-xl px-3 py-9 rounded-md xl:max-w-[75%] items-center">
            <img src={EmptyImg} alt="" className="max-w-[300px]" />
            <h2 className="text-2xl font-outfit font-bold text-zinc-800 mb-3">
              Resume Data Unavailable!
            </h2>
            {errMessage ? (
              <p className="text-zinc-600 font-normal px-3 mb-4">
                {errMessage}
              </p>
            ) : (
              <p className="text-zinc-600 font-normal px-3 mb-4">
                This could be a network error <br /> Please, try again in some
                minutes
              </p>
            )}

            <button
              onClick={() => navigate(-1)}
              className="px-5 xl:w-[300px] py-2.5 font-medium rounded-md bg-primary text-white hover:scale-105 duration-200 mb-9"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
      {shareModal && (
        <ShareCandidateCV
          show={shareModal}
          setShow={() => setShareModal(false)}
          resumeData={profileData}
        />
      )}
    </section>
  );
};

export default SmartResume;
