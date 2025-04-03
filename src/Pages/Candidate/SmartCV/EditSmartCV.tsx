import DefaultLayout from "../../../layout/DefaultLayout";
import ErrorTimeoutImg from "../../../assets/svg/gateway-error.svg";
import { useApp } from "../../../context/AppContext";
import { useMemo, useState } from "react";
import { Switch } from "../../../components/form/Switch";
import { MdOutlineColorLens } from "react-icons/md";
import { mockEmptyResume } from "../../../data/mockData";
import { Menu, MenuItem } from "../../../AnimatedUi/AnimatedNav";
import { FiLayout } from "react-icons/fi";
import { Icons } from "../../../components/icons";
import { FaCheck, FaDownload, FaFileMedical } from "react-icons/fa6";
import { IoMdColorFilter } from "react-icons/io";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { Sketch } from "@uiw/react-color";
import { BsPencil } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import Modal from "../../../components/modal";
import useOutsideClick from "../../../hooks/useOutsideClick";
import TabbioScore from "../../../components/tabbioScore";
import resumeImg1 from "../../../assets/images/entry-resume-sample.png";
import resumeImg2 from "../../../assets/images/pro-resume-sample.png";
// import { generateUniqueId } from "../../../lib/utils";
import { toast } from "react-toastify";
import {
  generateResumeSkills,
  getProfileResume,
  updateResume,
} from "../../../services/resumeServices";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProfessionalPDF from "../../../components/PDFTemplates/ProfessionalPDF";
import typographyIcon from "../../../assets/svg/typography-icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageLoader } from "../../../components/Loader";
import ResumeAiScore from "../ResumeAiScore";
import ShareResume from "../ShareResume";
import EntryPDF from "../../../components/PDFTemplates/EntryPDF";
import {
  BasicDetails,
  CareerHighlights,
  Certifications,
  Education,
  Internships,
  KeySkills,
  Memberships,
  ProfessionalExperience,
  ProfessionalReference,
  ProfessionalSummary,
  Projects,
  VolunteerExperience,
} from "../ResumeComponents/CvBuilderComponents";
import { FaShareAlt } from "react-icons/fa";
import ResumeTemplateMenu from "../ResumeComponents/TemplateMenu";
import Button from "../../../components/Button";

const primaryColors = ["#0077B5", "#007CFF", "#FF7D00", "#00C196", "#000000"];

const EditSmartCV: React.FC = () => {
  const {} = useApp();
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const paletteRef = useOutsideClick(() => setShowPalette(false));
  const [config, setConfig] = useState<any>(mockEmptyResume?.config || null);
  const [shareModal, setShareModal] = useState(false);
  const [resumeData, setResumeData] = useState<any>(mockEmptyResume);
  const [showPalette, setShowPalette] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);

  const { isFetching, isError } = useQuery(
    ["EDIT_SMARTCV_DATA", profileId],
    () => getProfileResume(profileId),
    {
      enabled: !!profileId,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setResumeData(data?.data?.resume);
        setConfig(data?.data?.resume?.config);
      },
      onError: (err: any) => {
        toast.error(err.message || "Request Failed");
      },
    }
  );

  const handleUpdateResume = async () => {
    setUpdateLoading(true);
    const toastId = toast.loading("Updating your Resume...");
    try {
      const resp = await updateResume(resumeData?._id, {
        config: config,
        style: resumeData?.style
      });
      setResumeData(resp?.data?.resume);
      setConfig(resp?.data?.resume?.config);
      toast.update(toastId, {
        render: "Your resume has been successfully updated",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
    } catch (err: any) {
      setUpdateLoading(false);
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed! Please try again");
    }
  };
  const handleGenerateSkills = async () => {
    try {
      const resp = await generateResumeSkills({
        skillType: "",
        role: resumeData?.role,
      });
      setResumeData((data: any) => ({
        ...data,
        suggestedSkills: resp?.data?.skills,
      }));
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  useMemo(() => {
    handleGenerateSkills();
  }, [resumeData?.role]);
  return (
    <DefaultLayout>
      {isFetching && profileId ? (
        <PageLoader />
      ) : isError ? (
        <div className="h-screen flex w-full justify-center text-center items-center">
          <div className="flex flex-col w-full bg-white shadow-xl px-3 py-9 rounded-md xl:max-w-[75%] items-center">
            <img src={ErrorTimeoutImg} alt="" className="max-w-[300px]" />
            <h2 className="text-2xl font-outfit font-bold text-zinc-800 mb-3">
              An error occured!
            </h2>
            <p className="text-zinc-600 font-normal px-3 mb-4">
              This could be a network error. Check your internet connection, and
              refresh the page <br />
              Contact the website administrator if the issue persists
            </p>

            <button
              onClick={() => navigate(-1)}
              className="px-5 xl:w-[300px] py-2.5 font-medium rounded-md bg-primary text-white hover:scale-105 duration-200 mb-9"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <section className="w-full">
          <div className="bg-zinc-50/90 md:px-6 px-2 py-3 mb-6 mt-3 w-full">
            <div className="flex max-xl:flex-col gap-3 gap-y-1.5  relative w-full z-99">
              <Menu setActive={setActive}>
                <MenuItem
                  setActive={() => setTemplateModal(true)}
                  active={active}
                  position="max-sm:-translate-x-[25%]"
                  item={
                    <div className="flex space-x-[2px] max-sm:text-[12px] text-[15px] sm:space-x-2 items-center">
                      <FiLayout />
                      <span>Template</span>
                      <Icons.arrowDown />
                    </div>
                  }
                  id="template"
                >
                  <div></div>
                </MenuItem>

                <MenuItem
                  setActive={setActive}
                  active={active}
                  position="max-sm:-translate-x-[40%]"
                  item={
                    <div className="flex space-x-[2px] max-sm:text-[12px] text-[15px] sm:space-x-2 items-center">
                      <img className="w-4" src={typographyIcon} />
                      <span>Typography</span>
                      <Icons.arrowDown />
                    </div>
                  }
                  id="typography"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col space-y-4 text-sm w-[300px]"
                  >
                    <div>
                      <label
                        htmlFor="fontFamily"
                        className="font-semibold mb-[0.5rem] text-zinc-700"
                      >
                        Font
                      </label>
                      <select
                        className="border border-stroke rounded-md p-2 text-sm w-full focus:outline-none focus:border-primary"
                        onChange={(e) => {
                          setResumeData((resumeData: any) => ({
                            ...resumeData,
                            style: {
                              ...resumeData.style,
                              fontFamily: e.target.value,
                            },
                          }));
                        }}
                        name="fontFamily"
                      >
                        <option selected disabled value={``}>{resumeData?.style?.fontFamily}</option>
                        <option value={`Arial`}>Arial</option>
                        <option value={`Times New Roman`}>
                          Times New Roman
                        </option>
                        <option value={`Georgia`}>Georgia</option>
                        <option value={`Calibri`}>Calibri</option>
                        <option value={`Helvetica`}>Helvetica</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="fontSize"
                        className="font-semibold mb-[0.5rem] text-zinc-700"
                      >
                        Size
                      </label>
                      <select
                        className="border border-stroke rounded-md p-2 text-sm w-full focus:outline-none focus:border-primary"
                        onChange={(e) => {
                          setResumeData((resumeData: any) => ({
                            ...resumeData,
                            style: {
                              ...resumeData.style,
                              fontSize: e.target.value,
                            },
                          }));
                        }}
                        name="fontSize"
                      >
                        <option selected disabled value={``}>{resumeData?.style?.fontSize === '12px' ? 'Medium' : 'Small'}</option>
                        <option value={`medium`}>Medium</option>
                        <option value={`large`}>Large</option>
                        <option value={`small`}>Small</option>
                      </select>
                    </div>
                  </div>
                </MenuItem>

                <div className="relative">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    position="max-sm:-translate-x-[62%]"
                    item={
                      <div className="flex space-x-[2px] max-sm:text-[12px] text-[15px] sm:space-x-2 items-center">
                        <MdOutlineColorLens />
                        <span>Color</span>
                        <Icons.arrowDown />
                      </div>
                    }
                    id="colors"
                  >
                    <div className="flex flex-col space-y-4  text-sm w-[300px]">
                      <div>
                        <div className="flex gap-3 items-center justify-between">
                          {primaryColors?.map((val, index) => (
                            <span
                              onClick={() => {
                                setResumeData((d: any) => ({
                                  ...d,
                                  style: {
                                    ...d.style,
                                    primaryColor: val,
                                  },
                                }));
                              }}
                              key={index}
                              className={`h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                              style={{ backgroundColor: val }}
                            >
                              {resumeData?.style?.primaryColor === val && (
                                <FaCheck className="text-white" />
                              )}
                            </span>
                          ))}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPalette(!showPalette);
                            }}
                            className="h-10 w-10 bg-[#808080] text-white text-lg rounded-full flex justify-center items-center cursor-pointer"
                          >
                            <IoMdColorFilter />
                          </span>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                  {showPalette && (
                    <div
                      className={`absolute z-[9999] bg-white flex h-auto sm:left-[225px] max-sm:-right-[20%] max-sm:top-[120px] top-[80px] flex-col rounded-lg border border-stroke 
                    shadow-default dark:border-strokedark `}
                      ref={paletteRef}
                    >
                      <Sketch
                        color={resumeData?.style?.primaryColor}
                        onChange={(color) =>
                          setResumeData((d: any) => ({
                            ...d,
                            style: {
                              ...d.style,
                              primaryColor: color.hex,
                            },
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                <MenuItem
                  setActive={setActive}
                  active={active}
                  position="max-sm:-translate-x-[90.5%]"
                  item={
                    <div className="flex space-x-[2px] max-sm:text-[12px] text-[15px] sm:space-x-2 items-center">
                      <PiSlidersHorizontalBold />
                      <span>Sections</span>
                      <Icons.arrowDown />
                    </div>
                  }
                  id="sections"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="px-2 py-1 md:w-[500px] max-sm:w-[330px] w-full"
                  >
                    <div className="grid grid-cols-2 gap-8 max-sm:gap-3 justify-between text-sm max-sm:text-[10px] border-b-2 border-stroke pb-5">
                      <div>
                        <h6 className="mb-2">Basic Details</h6>
                        <ul className="space-y-2.5">
                          <li>
                            <Switch
                              checked={config.location}
                              value={config.location}
                              label="Location"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  location: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.phone}
                              value={config.phone}
                              label="Phone Number"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({ ...c, phone: val }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.email}
                              value={config.email}
                              label="Email"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({ ...c, email: val }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.website}
                              value={config.website}
                              label="Website"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({ ...c, website: val }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.linkedIn}
                              value={config.linkedIn}
                              label="Linkedin"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  linkedIn: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.skills}
                              value={config.skills}
                              label="Skills"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({ ...c, skills: val }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.role}
                              value={config.role}
                              label="Role"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({ ...c, role: val }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config}
                              value={config.professionalSummary}
                              label="Professional Summary"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  professionalSummary: val,
                                }));
                              }}
                            />
                          </li>
                        </ul>
                      </div>

                      <div>
                        <ul className="space-y-2.5">
                          <li>
                            <Switch
                              checked={config.workExperience}
                              value={config.workExperience}
                              label="Work Experience"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  workExperience: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.careerHighlights}
                              value={config.careerHighlights}
                              label="Career Highlights"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  careerHighlights: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.certifications}
                              value={config.certifications}
                              label="Certifications & Trainings"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  certifications: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.education}
                              value={config.education}
                              label="Education"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  education: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.internships}
                              value={config.internships}
                              label="Internships"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  internships: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.volunteerExperience}
                              value={config.volunteerExperience}
                              label="Volunteer Experience"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  volunteerExperience: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.projects}
                              value={config.projects}
                              label="Projects"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  projects: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config?.references}
                              value={config?.references}
                              label="References"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  references: val,
                                }));
                              }}
                            />
                          </li>
                          <li>
                            <Switch
                              checked={config.memberships}
                              value={config.memberships}
                              label="Membership & Affiliation"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  memberships: val,
                                }));
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </MenuItem>
                <div className="max-md:hidden block">
                  <TabbioScore
                    onClick={() => setScoreModal(true)}
                    score={resumeData?.tabbioScore || 0}
                  />
                </div>
              </Menu>

              <div className="xl:ml-auto flex items-center text-sm gap-2 max-sm:gap-2.5">
                <div className="hidden max-md:block">
                  <TabbioScore
                    onClick={() => {
                      setScoreModal(true);
                    }}
                    score={resumeData?.tabbioScore || 0}
                  />
                </div>
                {resumeData?._id && (
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
                    <button className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center text-[#333333] gap-1 hover:scale-x-105 ">
                      <FaDownload />{" "}
                      <span className="max-sm:hidden">Download</span>
                    </button>
                  </PDFDownloadLink>
                )}

                <button
                  onClick={() => setShareModal(true)}
                  className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center text-[#333333] gap-1 hover:scale-x-105 "
                >
                  <FaShareAlt /> <span className="max-sm:hidden">Share</span>
                </button>
                <button className="flex items-center py-1 px-1 gap-1 max-sm:text-[12px] hover:scale-105 duration-150 text-[#333333]">
                  <TbWorld /> <span className="max-sm:hidden">EN</span>
                </button>
                <button
                  onClick={() => navigate(`/app/candidate/cv-builder/create`)}
                  className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center gap-1 text-[#333333] hover:scale-x-105 "
                >
                  <span className="">Create New</span> <FaFileMedical />
                </button>

                <button
                  onClick={() => navigate(`/app/candidate/cv-builder/create`)}
                  className="hidden items-center gap-2 max-sm:text-xs p-1 hover:scale-105 duration-150 text-[#333333]"
                >
                  Create New <FaFileMedical />
                </button>
              </div>
            </div>
          </div>

          <div className="px-2 py-4 md:pl-8 md:pr-2 w-full">
            <div className="w-full flex xl:flex-row flex-col gap-5 justify-center">
              <div className="w-full ">
                <div className="w-full xl:hidden flex justify-between gap-6 mb-3 items-end">
                  <p className="md:text-lg text-zinc-600 font-medium">
                    Profile CV
                  </p>
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="flex items-center font-medium gap-3 md:text-lg"
                    >
                      Exit
                    </button>
                    <button
                      onClick={() => {
                        // console.log(resumeData);
                        handleUpdateResume();
                      }}
                      disabled={updateLoading}
                      className="px-4 py-2 md:px-5 flex rounded-md group md:text-lg disabled:hover:scale-100 max-sm:text-sm disabled:bg-opacity-60 items-center gap-3 bg-gradient-to-b hover:bg-gradient-to-t hover:scale-105 duration-300 ease-in-out from-[#5272EA] to-[#394FC0] justify-center text-white border-none"
                    >
                      {updateLoading ? "Loading..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                <section className="bg-white flex flex-col space-y-5 md:px-4 px-1.5 py-5 max-sm:py-3 w-full h-full">
                  <BasicDetails CvData={resumeData} setCvData={setResumeData} />
                  <ProfessionalSummary
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <KeySkills
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <ProfessionalExperience
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <Education
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <CareerHighlights
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <VolunteerExperience
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <Internships
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <Projects
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <Certifications
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <ProfessionalReference
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                  <Memberships
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </section>
              </div>
              <div className="max-xl:hidden ml-auto h-full">
                <div className="bg-white w-full min-w-[319px] 3xl:min-w-[380px]  h-full">
                  <div className="bg-zinc-50/90 flex font-semibold text-lg text-zinc-800 items-center gap-1.5 py-2 px-3">
                    <BsPencil size={18} /> Customize Profile CV
                  </div>
                  <div className="p-3 flex flex-col space-y-3">
                    <Button
                      onClick={() => {
                        // console.log(resumeData);
                        handleUpdateResume();
                      }}
                      disabled={updateLoading}
                      width="w-full"
                    >
                      {updateLoading ? "Loading..." : "Save Changes"}
                    </Button>
                    <button
                      onClick={() => {}}
                      className="w-full px-6 py-2.5 border hover:bg-zinc-100 border-stroke rounded-lg font-medium mb-3 text-lg"
                    >
                      Exit Edit Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {false && (
            <Modal
              show={false}
              onHide={() => {
                setTemplateModal(false);
              }}
              title="Select Resume Template"
            >
              <div className="w-full">
                <ul className="relative justify-center flex max-sm:flex-col max-sm:h-[80vh] custom-scrollbar max-sm:overflow-y-auto gap-5 text-sm list-none">
                  <li
                    onClick={() => {
                      setResumeData(() => ({
                        ...resumeData,
                        template: "entry",
                      }));
                      setTemplateModal(false);
                    }}
                    className={` cursor-pointer hover:scale-105 group duration-200 z-30  gap-1.5 px-2 py-2  text-center`}
                  >
                    <span className="mb-2.5 font-semibold text-lg font-serif">
                      Entry-Level Ats Template
                    </span>
                    <div
                      className={`p-1 rounded-2xl border-2 ${
                        resumeData?.template === "entry"
                          ? "border-primary"
                          : "border-stroke"
                      }`}
                    >
                      <div className={`h-[350px] w-[250px] `}>
                        <img
                          src={resumeImg1}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      setResumeData((d: any) => ({
                        ...d,
                        template: "professional",
                      }));
                      setTemplateModal(false);
                    }}
                    className={`cursor-pointer z-30 hover:scale-105 duration-200 gap-1.5 px-2 py-2  text-center`}
                  >
                    <span className="mb-2.5 font-semibold text-lg font-serif">
                      Professional Ats Template
                    </span>
                    <div
                      className={`p-1 rounded-2xl border-2 ${
                        resumeData?.template === "professional"
                          ? "border-primary"
                          : "border-stroke"
                      }`}
                    >
                      <div className={`h-[350px] w-[250px] `}>
                        <img
                          src={resumeImg2}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Modal>
          )}
          {scoreModal && (
            <ResumeAiScore
              show={scoreModal}
              onHide={() => setScoreModal(false)}
              resumeData={resumeData}
              setResumeData={setResumeData}
              config={config}
              setConfig={setConfig}
            />
          )}
          {shareModal && (
            <ShareResume
              show={shareModal}
              setShow={() => setShareModal(false)}
              resumeData={resumeData}
            />
          )}

          {templateModal && (
            <ResumeTemplateMenu
              show={templateModal}
              onHide={() => {
                setTemplateModal(false);
              }}
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
        </section>
      )}
    </DefaultLayout>
  );
};

export default EditSmartCV;
