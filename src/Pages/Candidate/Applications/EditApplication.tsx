import DefaultLayout from "../../../layout/DefaultLayout";
import ErrorTimeoutImg from "../../../assets/svg/gateway-error.svg";
import sparkleIcon from "../../../assets/svg/ai-sparkle.svg";
import { useApp } from "../../../context/AppContext";
import { useMemo, useState } from "react";
import { Switch } from "../../../components/form/Switch";
import { MdOutlineColorLens } from "react-icons/md";
import { mockEmptyResume } from "../../../data/mockData";
import { Menu, MenuItem } from "../../../AnimatedUi/AnimatedNav";
import { FiLayout } from "react-icons/fi";
import { Icons } from "../../../components/icons";
import { RiRobot2Line } from "react-icons/ri";
import { FaCheck, FaDownload, FaEye, FaFileMedical } from "react-icons/fa6";
import { IoMdColorFilter } from "react-icons/io";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { Sketch } from "@uiw/react-color";
import { LuInfo } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import Drawer from "../../../components/Drawer";
import Popover from "../../../components/Popover";
import { TextArea } from "../../../components/form";
import useOutsideClick from "../../../hooks/useOutsideClick";
import TabbioScore from "../../../components/tabbioScore";
import { toast } from "react-toastify";
import {
  generateResumeSkills,
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
import ApplicationResult from "../ApplicationkitResult";
import EntryPDF from "../../../components/PDFTemplates/EntryPDF";
import TailorResume from "../TailorResume";
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
import {
  generateApplication,
  getSingleApplication,
} from "../../../services/applicationServices";

const primaryColors = ["#0077B5", "#007CFF", "#FF7D00", "#00C196", "#000000"];

const EditApplication: React.FC = () => {
  const {} = useApp();
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const paletteRef = useOutsideClick(() => setShowPalette(false));
  const [config, setConfig] = useState<any>(mockEmptyResume?.config || null);
  const [shareModal, setShareModal] = useState(false);
  const [resumeData, setResumeData] = useState<any>(mockEmptyResume);
  const [showPalette, setShowPalette] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [tailorResume, setTailorResume] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);
  const [applicationKitData, setApplicationKitData] = useState<any>(null);
  const [applicationLoading, setApplicationLoading] = useState(false);

  const { isFetching, isError } = useQuery(
    ["EDIT_APPLICATION_DATA", applicationId],
    () => getSingleApplication(applicationId),
    {
      enabled: !!applicationId,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setApplicationKitData(data?.data?.application);
        setValue(data?.data?.application?.jobDescription);
        setResumeData(data?.data?.application?.resume);
        setConfig(data?.data?.application?.resume?.config);
      },
      onError: (err: any) => {
        toast.error(err.message || "Request Failed");
      },
    }
  );

  const handleUpdateResume = async (data: any) => {
    const toastId = toast.loading("Updating your Resume...");

    try {
      const resp = await updateResume(resumeData?._id, data);
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
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed! Please try again");
    }
  };

  const GenerateApplication = async () => {
    setApplicationLoading(true);
    const formData = new FormData();
    formData.append("resumeId", applicationKitData?.resume?._id);
    formData.append("jobDescription", value);
    const toastId = toast.loading(
      "Generating your application kit. Please wait, this might take a short while"
    );
    try {
      const resp = await generateApplication(formData);
      toast.update(toastId, {
        render: "Your application kit has been successfully generated",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      setApplicationKitData(resp?.data?.application);
      setResultModal(true);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setApplicationLoading(false);
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
      {isFetching && applicationId ? (
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
          <div className="bg-zinc-50/90 md:px-6 px-1 py-3 mb-6 mt-3 w-full">
            <div className="flex max-xl:flex-col gap-3 gap-y-1.5  relative w-full z-99">
              <Menu setActive={setActive}>
                <MenuItem
                  setActive={() => setTemplateModal(true)}
                  active={active}
                  position="max-sm:-translate-x-[25%]"
                  item={
                    <div className="flex space-x-[2px] max-sm:text-[11px] text-[15px] sm:space-x-2 items-center">
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
                    <div className="flex space-x-[2px] max-sm:text-[11px] text-[15px] sm:space-x-2 items-center">
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
                        <option value={`medium`}>Medium</option>
                        <option value={`large`}>Large</option>
                        <option value={`small`}>Small</option>
                      </select>
                    </div>

                    <div className="flex w-full justify-between gap-3 py-2">
                      <button
                        onClick={() => setActive(null)}
                        className="text-zinc-600"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateResume({
                            style: resumeData?.style,
                          });
                          setActive(null);
                        }}
                        className="bg-primary focus:outline-none text-white rounded-md px-3 py-1.5 text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </MenuItem>

                <div className="relative">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    position="max-sm:-translate-x-[62%]"
                    item={
                      <div className="flex space-x-[2px] max-sm:text-[11px] text-[15px] sm:space-x-2 items-center">
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
                                handleUpdateResume({
                                  style: {
                                    ...resumeData?.style,
                                    primaryColor: val,
                                  },
                                });
                                setActive(null)
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
                    <div className="flex space-x-[2px] max-sm:text-[11px] text-[15px] sm:space-x-2 items-center">
                      <PiSlidersHorizontalBold />
                      <span>Sections</span>
                      <Icons.arrowDown />
                    </div>
                  }
                  id="sections"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="px-2 md:w-[500px] w-full max-sm:w-[330px] mx-2"
                  >
                    <p className="text-xs text-zinc-600 font-segoe mb-2">
                      Toggle the switches to control which sections appear on
                      your CV
                    </p>
                    <div className="grid grid-cols-2 gap-8 max-sm:gap-3 justify-between text-sm border-b-2 border-stroke pb-3.5">
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
                    <div className="flex w-full justify-between gap-3 py-2">
                      <button
                        onClick={() => setActive(null)}
                        className="text-zinc-600"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateResume({
                            config: config,
                          });
                          setActive(null);
                        }}
                        className="bg-primary focus:outline-none text-white rounded-md px-3 py-1.5 text-sm"
                      >
                        Save
                      </button>
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
                  className="py-1 px-0.5 max-sm:text-[12px] flex items-center text-[#333333] gap-1 hover:scale-x-105 "
                >
                  <FaShareAlt /> <span className="max-sm:hidden">Share</span>
                </button>
                <button onClick={() => setResultModal(true)} className="font-medium py-1 px-0.5 hover:scale-105 hidden items-center gap-1 text-[#333333]">
                  <FaEye /><span className="hidden">View</span>
                </button>
                <button className="flex items-center py-1 px-1 gap-1 max-sm:text-[12px] hover:scale-105 duration-150 text-[#333333]">
                  <TbWorld /> <span className="">EN</span>
                </button>
                <button
                  onClick={() => navigate(`/app/candidate/cv-builder`)}
                  className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center gap-1 text-[#333333] hover:scale-x-105 "
                >
                  <span className="">Create New</span> <FaFileMedical />
                </button>

                <button
                  onClick={() => navigate(`/app/candidate/cv-builder`)}
                  className="hidden items-center gap-2 max-sm:text-xs p-1 hover:scale-105 duration-150 text-[#333333]"
                >
                  Create New <FaFileMedical />
                </button>
              </div>
            </div>
          </div>

          <div className="px-2 py-4 md:pl-8 md:pr-2 w-full">
            <div className="w-full flex xl:flex-row flex-col gap-5 justify-center">
              <div className="w-full">
                <div className="w-full flex justify-between gap-6 mb-3 items-end">
                  

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => {
                        setShowDrawer(true);
                      }}
                      className="text-center group ml-auto hover:scale-105 font-medium xl:hidden flex items-center gap-1 text-zinc-600"
                    >
                      Tailor Resume{" "}
                      <span className="mt-1">
                        <Popover
                          icon={<LuInfo size={18} className="" />}
                          title="Job Hub"
                          position="bottom"
                          onClick={() => {}}
                        >
                          Lorem ipsum dolor sit amet but waiting till the end of
                          time
                        </Popover>
                      </span>
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
                <div className="bg-white w-full min-w-[319px] 3xl:min-w-[380px] h-full">
                  <div className="bg-zinc-50/90 flex font-medium items-center gap-1.5 py-2 px-3">
                    Tailor Resume
                  </div>
                  <div className="p-3 flex flex-col space-y-3">
                    <div>
                      <TextArea
                        placeholder="Include the job title, and full job description..."
                        label={
                          <span className="flex items-center gap-1">
                            <RiRobot2Line className="text-primary" />
                            Paste the job posting details below
                          </span>
                        }
                        value={value}
                        onChange={(val: string) => setValue(val)}
                        row={12}
                        props={{ roundedLg: true }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        GenerateApplication();
                      }}
                      disabled={applicationLoading || !value}
                      type="button"
                      className="ai-button px-6 me-2 rounded-lg py-3 text-center mb-2 flex justify-center items-center gap-2"
                    >
                      <span>
                        <img src={sparkleIcon} />
                      </span>
                      {applicationLoading ? "Generating..." : "Generate"}
                    </button>

                    <div className="flex justify-between items-center text-zinc-600">
                      <span>Status:</span>{" "}
                      <span>
                        {applicationKitData?.isTailored
                          ? "Tailored"
                          : "Not Tailored"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showDrawer && (
            <Drawer
              title={
                <div
                  onClick={() => {
                    setShowDrawer(true);
                  }}
                  className="text-center group font-medium 2xl:hidden flex items-center gap-1 text-zinc-600"
                >
                  <span className=""> Tailor Resume</span>

                  <span className="mt-1">
                    <Popover
                      icon={<LuInfo size={18} className="" />}
                      title="Job Hub"
                      position="bottom"
                      onClick={() => {}}
                    >
                      Lorem ipsum dolor sit amet but waiting till the end of
                      time
                    </Popover>
                  </span>
                </div>
              }
              isOpen={showDrawer}
              onClose={() => setShowDrawer(false)}
              width="350px"
            >
              <div className="flex flex-col space-y-3">
                <div>
                  <TextArea
                    placeholder="Include the job title, company name, and full job description..."
                    label={
                      <span className="flex items-center gap-1">
                        <RiRobot2Line className="text-primary" />
                        Paste the job posting details below
                      </span>
                    }
                    value={value}
                    onChange={(val: string) => setValue(val)}
                    row={12}
                    props={{ roundedLg: true }}
                  />
                </div>

                <button
                  onClick={() => {
                    GenerateApplication();
                  }}
                  disabled={applicationLoading || !value}
                  type="button"
                  className="ai-button px-6 me-2 rounded-lg py-3 text-center mb-2 flex justify-center items-center gap-2"
                >
                  <span>
                    <img src={sparkleIcon} />
                  </span>
                  {applicationLoading ? "Generating..." : "Generate"}
                </button>

                <div className="flex justify-between items-center text-zinc-600">
                  <span>Status:</span>{" "}
                  <span>
                    {applicationKitData?.isTailored
                      ? "Tailored"
                      : "Not Tailored"}
                  </span>
                </div>
              </div>
            </Drawer>
          )}

          {resultModal && (
            <ApplicationResult
              show={resultModal}
              onHide={() => setResultModal(false)}
              selectedApplication={{
                ...resumeData,
                _id: resumeData?.application,
              }}
              onTailorResume={() => setTailorResume(true)}
            />
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
          {tailorResume && (
            <TailorResume
              show={tailorResume}
              onHide={() => setTailorResume(false)}
              applicationData={{ _id: resumeData?.application }}
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

export default EditApplication;
