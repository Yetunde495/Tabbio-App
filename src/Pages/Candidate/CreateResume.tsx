import DefaultLayout from "../../layout/DefaultLayout";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { Switch } from "../../components/form/Switch";
import { MdOutlineColorLens, MdShare } from "react-icons/md";
import { mockEmptyResume } from "../../data/mockData";
import {
  CustomListSection,
  CustomTextSection,
} from "../PageComponents/ApplicantComponents";
import { Menu, MenuItem } from "../../AnimatedUi/AnimatedNav";
import { HiOutlineSparkles } from "react-icons/hi";
import { FiLayout } from "react-icons/fi";
import { Icons } from "../../components/icons";
import { RiRobot2Line } from "react-icons/ri";
import { FaArrowRightLong, FaCheck, FaPlus } from "react-icons/fa6";
import { IoMdColorFilter } from "react-icons/io";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { Select4 } from "../../components/form/Select";
import { Sketch } from "@uiw/react-color";
import { BsDownload, BsEye } from "react-icons/bs";
import { LuExternalLink, LuInfo } from "react-icons/lu";
import { TbLoader3, TbWorld } from "react-icons/tb";
import Modal from "../../components/modal";
import { VscWand } from "react-icons/vsc";
import { ResumeFileUpload } from "../General/ResumeUpload";
import { IoDocumentTextOutline } from "react-icons/io5";
import Drawer from "../../components/Drawer";
import Popover from "../../components/Popover";
import { TextArea } from "../../components/form";
import ApplicationResult from "./ApplicationkitResult";
import useOutsideClick from "../../hooks/useOutsideClick";
import TabbioScore from "../../components/tabbioScore";
import resumeImg1 from "../../assets/images/entry-resume-sample.png";
import resumeImg2 from "../../assets/images/pro-resume-sample.png";
import ResumeAiScore from "./ResumeAiScore";
import { generateUniqueId } from "../../lib/utils";
import {
  AreasOfExpertise,
  AtsCareerHighlight,
  AtsCertifications,
  AtsEducation,
  AtsExperience,
  AtsInternships,
  AtsProjects,
  AtsSkills,
  AtsTrainings,
  AtsVolunteerExperience,
  CareerSummary,
  ContactInfo,
  RelevantCourses,
} from "../PageComponents/ATSApplicantComponents";
import { toast } from "react-toastify";
import {
  createResume,
  getProfileResume,
  updateResume,
} from "../../services/resumeServices";
import { generateResumeTitle } from "../../lib/utils/getUserInitials";
import { AiOutlineSave } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import ShareResume from "./ShareResume";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EntryPDF from "../../components/PDFTemplates/EntryPDF";
import ProfessionalPDF from "../../components/PDFTemplates/ProfessionalPDF";
import typographyIcon from "../../assets/svg/typography-icon.svg"
import TailorResume from "./TailorResume";

const primaryColors = ["#0077B5", "#CC0074", "#FF7D00", "#00C196", "#000000"];

const CreateLiveResume: React.FC = () => {
  const { user } = useApp();
  // const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const paletteRef = useOutsideClick(() => setShowPalette(false));
  const [config, setConfig] = useState<any>(mockEmptyResume?.config || null);
  const [shareModal, setShareModal] = useState(false);
  const [uploadOption, setUploadOption] = useState(true);
  const [resumeData, setResumeData] = useState<any>(mockEmptyResume);
  const [editingName, setEditingName] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [tailorResume, setTailorResume] = useState(false)
  const [_kit, _setKit] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [templateModal, setTemplateModal] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);
  const [sectionCount, setSectionCount] = useState(0); // To track the number of sections added
  const [customSections, setCustomSections] = useState<any[]>([]);
  const [sectionType, setSectionType] = useState("");

  const addCustomSection = (type: string) => {
    const newSection = {
      name: `customSection${sectionCount + 1}`,
      _id: generateUniqueId(),
      type: type, // Store the type
      content: type === "list" ? [""] : "", // Initialize based on type
    };

    // Add to customSections array
    setCustomSections((prevSections) => [...prevSections, newSection]);

    // Only add the section name as a key to resumeData
    setResumeData((prevData: any) => ({
      ...prevData,
      [`customSection${sectionCount + 1}`]: newSection.content, // Add key and initial value to resumeData
    }));
    setSectionCount((prevCount) => prevCount + 1);
  };

  const updateSectionName = (oldName: string, newName: string) => {
    // Update customSections array
    setCustomSections((prevSections) =>
      prevSections.map((section) =>
        section.name === oldName ? { ...section, name: newName } : section
      )
    );

    // Update resumeData by changing the key from oldName to newName
    setResumeData((prevData: any) => {
      const { [oldName]: sectionContent, ...rest } = prevData;

      // Check if oldName is a placeholder (e.g., "customSection1")
      const isPlaceholder = oldName.startsWith("customSection");

      // If the old name is a placeholder, remove it and add the new name
      if (isPlaceholder) {
        removeSection(oldName);
      }

      // If the old name is not a placeholder, just update the name
      return {
        ...rest, // Retain everything
        [newName]: sectionContent, // Update the name
      };
    });
  };

  // Function to update section content
  const updateSectionContent = (
    sectionName: string,
    newContent: string | string[]
  ) => {
    // Update the customSections array
    setCustomSections((prevSections) =>
      prevSections.map((section) =>
        section.name === sectionName
          ? { ...section, content: newContent }
          : section
      )
    );

    // Update the content in the resumeData object
    setResumeData((prevData: any) => ({
      ...prevData,
      [sectionName]: newContent, // Update the content of the section in resumeData
    }));
  };

  const removeSection = (sectionName: string) => {
    // Remove the section from the customSections array
    setCustomSections((prevSections) =>
      prevSections.filter((section) => section.name !== sectionName)
    );

    // Remove the section from the resumeData object
    setResumeData((prevData: any) => {
      const { [sectionName]: _, ...rest } = prevData;
      return rest; // Return the remaining sections in resumeData
    });
    setSectionCount(sectionCount - 1);
  };

  const fetchProfileResume = async () => {
    setProfileLoading(true);
    try {
      const resp = await getProfileResume(user?.profileId);
      // Destructure the fields to omit them
      const { _id, profileId, _v, ...filteredResume } = resp?.data?.resume;
      setResumeData(filteredResume);
      setConfig(resp?.data?.resume?.config);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setProfileLoading(false);
      setUploadOption(false);
    }
  };

  const handleCreateResume = async () => {
    const toastId = toast.loading("Saving your Resume...");

    try {
      const resp = await createResume({
        ...resumeData,
        config: config,
      });
      setResumeData(resp?.data?.resume);
      setConfig(resp?.data?.resume?.config);
      toast.update(toastId, {
        render: "Your resume has been successfully saved",
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

  const handleUpdateResume = async () => {
    const toastId = toast.loading("Updating your Resume...");

    try {
      const resp = await updateResume(resumeData?._id, {
        ...resumeData,
        config: config,
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
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed! Please try again");
    }
  };
  return (
    <DefaultLayout>
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
                      <option value={`Arial`}>Arial</option>
                      <option value={`Times New Roman`}>Times New Roman</option>
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
                  className="px-2 py-1 md:w-[530px] w-full"
                >
                  <div className="grid grid-cols-2 gap-8 justify-between text-sm border-b-2 border-stroke pb-5">
                    <div>
                      <h6 className="mb-2">Personal Details</h6>
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
                            checked={config.linkedin}
                            value={config.linkedin}
                            label="Linkedin"
                            size="sm"
                            onChange={(val) => {
                              setConfig((c: any) => ({
                                ...c,
                                linkedin: val,
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
                            label="Certifications"
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
                            checked={config.skills}
                            value={config.skills}
                            label="Skills"
                            size="sm"
                            onChange={(val) => {
                              setConfig((c: any) => ({ ...c, skills: val }));
                            }}
                          />
                        </li>
                        {resumeData?.template === "entry" && (
                          <li>
                            <Switch
                              checked={config.courses}
                              value={config.courses}
                              label="Relevant Courses"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  courses: val,
                                }));
                              }}
                            />
                          </li>
                        )}
                        {resumeData?.template === "entry" && (
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
                        )}
                        {resumeData?.template === "professional" && (
                          <li>
                            <Switch
                              checked={config.trainings}
                              value={config.trainings}
                              label="Trainings"
                              size="sm"
                              onChange={(val) => {
                                setConfig((c: any) => ({
                                  ...c,
                                  trainings: val,
                                }));
                              }}
                            />
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="py-2">
                    <p className="font-semibold text-sm mb-0">
                      Add a Custom Section
                    </p>
                    <div className="flex gap-2 items-center pb-12">
                      <Select4
                        value={sectionType}
                        onChange={(val: string) => setSectionType(val)}
                      >
                        <option value={""}>Select Type</option>
                        <option value={"text"}>Text Section</option>
                        <option value={"list"}>List Section</option>
                      </Select4>

                      <button
                        onClick={() => addCustomSection(sectionType)}
                        className="border w-[16%] h-[38px] bg-jobseeker/10 text-sm mt-2 flex justify-center items-center rounded-md border-jobseeker hover:bg-jobseeker hover:text-white"
                      >
                        <FaPlus />
                      </button>
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
              {resumeData?._id && <PDFDownloadLink
                document={
                  resumeData?.template === "professional" ? (
                    <ProfessionalPDF data={resumeData} />
                  ) : (
                    <EntryPDF data={resumeData} />
                  )
                }
                fileName={resumeData?.name || "Tabbio ATS Resume"}
              >
                <button className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center text-primary gap-1 hover:scale-x-105 ">
                  <BsDownload /> <span className="max-sm:hidden">Download</span>
                </button>
              </PDFDownloadLink>}

              <button
                onClick={() => setShareModal(true)}
                className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center text-zinc-700 gap-1 hover:scale-x-105 "
              >
                <MdShare /> <span className="max-sm:hidden">Share</span>
              </button>
              <button className="flex items-center py-1 px-1 gap-1 max-sm:text-[12px] hover:scale-105 duration-150 text-zinc-700">
                <TbWorld /> <span className="max-sm:hidden">EN</span>
              </button>
              <button
                onClick={() => setUploadOption(true)}
                className="py-1 px-1 md:ml-1 max-md:pl-0 max-sm:text-[12px] flex items-center gap-1 hover:scale-x-105 "
              >
                <span className="">Create New</span> <LuExternalLink />
              </button>

              <button
                onClick={() => setUploadOption(true)}
                className="hidden items-center gap-2 max-sm:text-xs p-1 hover:scale-105 duration-150 text-zinc-700"
              >
                Create New <LuExternalLink />
              </button>
            </div>
          </div>
        </div>

        <div className="px-2 py-4 md:pl-8 md:pr-2 w-full">
          <div className="w-full flex 2xl:flex-row flex-col gap-5 overflow-x-auto justify-center">
            <div className="w-full 3xl:max-w-[1200px] 2xl:max-w-[1100px] max-w-[900px] lg:w-[90%] min-w-[800px]">
              <div className="w-full flex justify-between gap-6 mb-3 items-end">
                {resumeData?.resumeName && (
                  <p className="font-medium text-zinc-600">
                    <span className="font-semibold font-sans">
                      ({resumeData?.resumeName})
                    </span>
                  </p>
                )}

                <div className="flex gap-3 items-center">
                  {resumeData?._id ? (
                    <button
                      onClick={() => {
                        handleUpdateResume();
                        // console.log(resumeData)
                      }}
                      className="text-center px-3 py-1.5 rounded-md duration-150 bg-primary/15 hover:scale-105 text-primary font-medium flex items-center gap-1"
                    >
                      <GrDocumentUpdate />
                      Update CV
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleCreateResume();
                      }}
                      className="px-3 py-1.5 bg-primary/15 hover:scale-105 text-primary flex gap-1 items-center hover:opacity-90 font-medium rounded-md"
                    >
                      <AiOutlineSave /> Save CV
                    </button>
                  )}
                  {resumeData?._id && (
                    <button
                      onClick={() => {
                        setResultModal(true);
                      }}
                      className="text-center hover:text-primary font-medium flex items-center gap-1 text-zinc-600"
                    >
                      <span>
                        <BsEye />
                      </span>{" "}
                      Preview{" "}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowDrawer(true);
                    }}
                    className="text-center group hover:scale-105 font-medium 2xl:hidden flex items-center gap-1 text-zinc-600"
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
              {resumeData?.template === "entry" && (
                <div
                  style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
                  className={`bg-white py-8 px-6 w-full overflow-x-auto custom-scrollbar`}
                >
                  <button
                    onClick={() => {
                      console.log(resumeData);
                      console.log(customSections);
                    }}
                    className="hidden"
                  >
                    Console
                  </button>
                  <div className="flex flex-col w-full justify-center items-center  mb-8 border-b pb-2 border-stroke">
                    <input
                      className={`border-none bg-white focus:bg-zinc-100 focus:outline-none text-center  px-3 font-medium text-[40px] dynamic-input`}
                      style={{ color: resumeData?.style?.primaryColor }}
                      placeholder="Your Name"
                      value={resumeData?.name}
                      onChange={(e) => {
                        setResumeData((r: any) => ({
                          ...r,
                          name: e.target.value,
                        }));
                        if (resumeData?.role && e.target.value !== "") {
                          const title = generateResumeTitle(
                            e.target.value,
                            resumeData?.role
                          );
                          setResumeData((r: any) => ({
                            ...r,
                            resumeName: title,
                          }));
                        }
                      }}
                    />
                    {config.role && (
                      <input
                        className={`border-none text-lg bg-white focus:outline-none text-center text-black placeholder:text-black focus:bg-zinc-100 px-4 font-semibold`}
                        placeholder="Professional Title"
                        value={resumeData?.role}
                        onChange={(e) => {
                          setResumeData((r: any) => ({
                            ...r,
                            role: e.target.value,
                          }));
                          if (resumeData?.name && e.target.value !== "") {
                            const title = generateResumeTitle(
                              resumeData?.name,
                              e.target.value
                            );
                            setResumeData((r: any) => ({
                              ...r,
                              resumeName: title,
                            }));
                          }
                        }}
                      />
                    )}
                    <ContactInfo
                      resumeData={resumeData}
                      setResumeData={setResumeData}
                      config={config}
                    />

                    <style>
                      {`
                                        .dynamic-input::placeholder {
                                         color: ${resumeData?.style?.primaryColor}
                                        }
                                      `}
                    </style>
                  </div>

                  {config?.professionalSummary && (
                    <div className="border-b pb-2 border-stroke mb-6">
                      <CareerSummary
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.skills && (
                    <div className=" border-b border-stroke pt-4 pb-6">
                      <AreasOfExpertise
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config.education && (
                    <div className="border-b border-stroke py-6">
                      <AtsEducation
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}

                  {config.courses && (
                    <div className="border-b border-stroke py-6">
                      <RelevantCourses
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.volunteerExperience && (
                    <div className="py-6">
                      <AtsVolunteerExperience
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config.projects && (
                    <div className="border-b border-stroke py-6">
                      <AtsProjects
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config.workExperience && (
                    <div className="border-b py-9 border-stroke mb-4">
                      <AtsExperience
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config.internships && (
                    <div className="border-b py-9 border-stroke mb-4">
                      <AtsInternships
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.certifications && (
                    <div className="border-b py-9 border-stroke mb-4">
                      <AtsCertifications
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  <div className="flex w-full flex-col gap-4">
                    {customSections
                      .filter((section) => section.placement === "top")
                      .map((section, index) => (
                        <div key={index}>
                          {section?.type === "list" ? (
                            <CustomListSection
                              props={{
                                key: section.name,
                                section: resumeData[section.name],
                                sectionContent: resumeData[section.name],
                                updateSectionName: updateSectionName,
                                updateSectionContent: updateSectionContent,
                              }}
                              handleRemove={() => removeSection(section.name)}
                            />
                          ) : (
                            <CustomTextSection
                              props={{
                                key: section.name,
                                section: resumeData[section.name],
                                updateSectionName: updateSectionName,
                                updateSectionContent: updateSectionContent,
                              }}
                              handleRemove={() => removeSection(section.name)}
                            />
                          )}
                        </div>
                      ))}
                  </div>

                  {/* Dynamically render custom sections */}
                  <div className="flex w-full flex-col gap-4">
                    {customSections.map((section, index) => (
                      <div key={index}>
                        {section?.type === "list" ? (
                          <CustomListSection
                            props={{
                              key: section.name,
                              section: resumeData[section.name],
                              sectionContent: resumeData[section.name],
                              updateSectionName: updateSectionName,
                              updateSectionContent: updateSectionContent,
                            }}
                            handleRemove={() => removeSection(section.name)}
                          />
                        ) : (
                          <CustomTextSection
                            props={{
                              key: section.name,
                              section: resumeData[section.name],
                              updateSectionName: updateSectionName,
                              updateSectionContent: updateSectionContent,
                            }}
                            handleRemove={() => removeSection(section.name)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resumeData?.template === "professional" && (
                <div
                  style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
                  className="bg-white py-8 px-6 w-full overflow-x-auto"
                >
                  <div className="w-full  mb-15">
                    <div
                      style={{
                        color: resumeData?.style?.primaryColor,
                        borderColor: resumeData?.style?.primaryColor,
                      }}
                      className="w-full flex divide-x-2 border-b-2 gap-3 items-center mt-15"
                    >
                      {editingName || !resumeData?.name ? (
                        <input
                          className={`border-none bg-white focus:bg-zinc-100 focus:outline-none px-3 font-medium text-[40px] dynamic-input`}
                          style={{ color: resumeData?.style?.primaryColor }}
                          placeholder="Your Name"
                          value={resumeData?.name}
                          autoFocus
                          onBlur={() => {
                            if (resumeData?.name) {
                              setEditingName(false);
                            }
                          }}
                          onChange={(e) => {
                            setResumeData((r: any) => ({
                              ...r,
                              name: e.target.value,
                            }));
                            if (resumeData?.role && e.target.value !== "") {
                              const title = generateResumeTitle(
                                e.target.value,
                                resumeData?.role
                              );
                              setResumeData((r: any) => ({
                                ...r,
                                resumeName: title,
                              }));
                            }
                          }}
                        />
                      ) : (
                        <span
                          onClick={() => setEditingName(true)}
                          className="text-[40px] cursor-text font-medium uppercase"
                        >
                          {resumeData?.name}
                        </span>
                      )}
                      {config.role && (
                        <>
                          {editingRole ? (
                            <input
                              className={`border-none text-lg bg-white focus:outline-none text-black mr-2 uppercase placeholder:text-black focus:bg-zinc-100 px-4 font-medium`}
                              placeholder="YOUR ROLE"
                              autoFocus
                              onBlur={() => {
                                if (resumeData?.role) {
                                  setEditingRole(false);
                                }
                              }}
                              value={resumeData?.role}
                              onChange={(e) => {
                                setResumeData((r: any) => ({
                                  ...r,
                                  role: e.target.value,
                                }));
                                if (resumeData?.name && e.target.value !== "") {
                                  const title = generateResumeTitle(
                                    resumeData?.name,
                                    e.target.value
                                  );
                                  setResumeData((r: any) => ({
                                    ...r,
                                    resumeName: title,
                                  }));
                                }
                              }}
                            />
                          ) : (
                            <span
                              onClick={() => setEditingRole(true)}
                              className="text-lg text-black px-2 uppercase cursor-text font-medium"
                            >
                              {resumeData?.role}
                            </span>
                          )}
                        </>
                      )}

                      <style>
                        {`
                                        .dynamic-input::placeholder {
                                         color: ${resumeData?.style?.primaryColor}
                                        }
                                      `}
                      </style>
                    </div>
                    <ContactInfo
                      resumeData={resumeData}
                      setResumeData={setResumeData}
                      config={config}
                    />
                  </div>
                  {config?.professionalSummary && (
                    <div className="mb-4">
                      <CareerSummary
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.skills && (
                    <div className="pb-4">
                      <AtsSkills
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.careerHighlights && (
                    <div className="pb-4">
                      <AtsCareerHighlight
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.workExperience && (
                    <div className="py-5  mb-4">
                      <AtsExperience
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.education && (
                    <div className="py-6">
                      <AtsEducation
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.volunteerExperience && (
                    <div className="py-6">
                      <AtsVolunteerExperience
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.certifications && (
                    <div className="py-6">
                      <AtsCertifications
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}
                  {config?.trainings && (
                    <div className="py-6">
                      <AtsTrainings
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    </div>
                  )}

                  {/* Dynamically render custom sections */}
                  <div className="flex w-full flex-col gap-4">
                    {customSections.map((section, index) => (
                      <div key={index}>
                        {section?.type === "list" ? (
                          <CustomListSection
                            props={{
                              key: section.name,
                              section: resumeData[section.name],
                              sectionContent: resumeData[section.name],
                              updateSectionName: updateSectionName,
                              updateSectionContent: updateSectionContent,
                            }}
                            handleRemove={() => removeSection(section.name)}
                          />
                        ) : (
                          <CustomTextSection
                            props={{
                              key: section.name,
                              section: resumeData[section.name],
                              updateSectionName: updateSectionName,
                              updateSectionContent: updateSectionContent,
                            }}
                            handleRemove={() => removeSection(section.name)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="max-2xl:hidden max-3xl:ml-auto h-full">
              <div className="bg-white w-full min-w-[319px] 3xl:min-w-[380px] h-full">
                <div className="bg-zinc-50/90 flex font-medium items-center gap-1.5 py-2 px-3">
                  Tailor Resume
                </div>
                <div className="p-3 flex flex-col space-y-3">
                  <div className="mb-4">
                    <label
                      htmlFor="major_skill"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter name of company"
                      className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
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

                  <button className="relative inline-flex items-center justify-center p-[2.5px] mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-b from-[#5272EA] to-[#394FC0] group-hover:from-[#394FC0] group-hover:to-[#5272EA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-8 w-full py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                      <p className="text-center gap-1 items-center bg-gradient-to-b group-hover:text-white from-[#5272EA] to-[#394FC0] text-transparent bg-clip-text inline-flex">
                        <HiOutlineSparkles className="text-primary group-hover:text-white" />{" "}
                        Generate
                      </p>
                    </span>
                  </button>

                  <div className="flex justify-between items-center text-zinc-600">
                    <span>Status:</span> <span>Not Tailored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {uploadOption && (
          <Modal
            show={uploadOption}
            onHide={() => {
              setUploadOption(false);
            }}
            title={
              <div className="flex items-center gap-2">
                <span className="bg-primary rounded-full text-white w-9 h-9 flex items-center justify-center">
                  <VscWand />
                </span>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-lg mb-0">
                    Build a Resume
                  </h3>
                  <p className="text-zinc-500">
                    Let our AI craft your perfect application
                  </p>
                </div>
              </div>
            }
          >
            <div className="py-5 h-[65vh] max-sm:h-[75vh] overflow-y-auto no-scrollbar">
              <div>
                {user?.profile && (
                  <div
                    onClick={() => {
                      fetchProfileResume();
                    }}
                    className="px-4 mb-6 py-5 bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] border border-[#DBEAFE] cursor-pointer rounded-xl"
                  >
                    <div className="flex items-center max-sm:items-start w-full gap-2">
                      <span className="bg-primary rounded-xl text-white max-sm:h-8 max-sm:w-8 max-sm:rounded-full w-12 h-12 flex items-center justify-center">
                        <RiRobot2Line
                          size={24}
                          className={`${profileLoading && "animate-pulse"}`}
                        />
                      </span>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white mb-0">
                          Continue with SmartResume™
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {profileLoading
                            ? "Use your existing optimized resume with AI enhancement"
                            : "Loading up your existing optimized resume data"}
                        </p>
                      </div>
                      <span className="text-primary ml-auto max-md:w-8">
                        {profileLoading ? (
                          <TbLoader3 className="animate-spin" />
                        ) : (
                          <FaArrowRightLong />
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  onClick={() => {
                    setConfig(mockEmptyResume?.config);
                    setResumeData(mockEmptyResume);
                    setUploadOption(false);
                  }}
                  className="px-4 py-5 bg-white border border-[#DBEAFE] cursor-pointer rounded-xl"
                >
                  <div className="flex items-center max-sm:items-start w-full gap-2">
                    <span className="bg-white border border-primary rounded-xl text-primary max-sm:h-8 max-sm:w-8 max-sm:rounded-full w-12 h-12 flex items-center justify-center">
                      <IoDocumentTextOutline size={24} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white mb-0">
                        Start from Scratch
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        Build your resume from scratch
                      </p>
                    </div>
                    <span className="text-primary ml-auto max-md:w-8">
                      <FaArrowRightLong />
                    </span>
                  </div>
                </div>

                <div className="my-12">
                  <ResumeFileUpload
                    onSuccess={(response: any) => {
                      setResumeData({
                        ...response?.data?.profile,
                        user: user?._id,
                      });
                      setConfig(response?.data?.profile?.config);
                      setUploadOption(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
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
                    Lorem ipsum dolor sit amet but waiting till the end of time
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

              <button className="relative inline-flex items-center justify-center p-[2.5px] mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-b from-[#5272EA] to-[#394FC0] group-hover:from-[#394FC0] group-hover:to-[#5272EA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-8 w-full py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  <p className="text-center gap-1 items-center bg-gradient-to-b group-hover:text-white text-transparent bg-clip-text from-[#5272EA] to-[#394FC0] inline-flex">
                    <HiOutlineSparkles className="text-primary group-hover:text-white" />{" "}
                    Generate
                  </p>
                </span>
              </button>

              <div className="flex justify-between items-center text-zinc-600">
                <span>Status:</span> <span>Not Tailored</span>
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
              _id:resumeData?.application
            }}
            onTailorResume={() => setTailorResume(true)}
          />
        )}
        {templateModal && (
          <Modal
            show={templateModal}
            onHide={() => {
              setTemplateModal(false);
            }}
            title="Select Resume Template"
          >
            <div className="w-full">
              <ul className="relative justify-center flex max-sm:flex-col max-sm:h-[80vh] custom-scrollbar max-sm:overflow-y-auto gap-5 text-sm list-none">
                <li
                  onClick={() => {
                    setResumeData(() => ({ ...resumeData, template: "entry" }));
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
         {tailorResume && (
          <TailorResume
          show={tailorResume}
          onHide={() => setTailorResume(false)}
          applicationData={{_id: resumeData?.application}}
        />
        )}
      </section>
    </DefaultLayout>
  );
};

export default CreateLiveResume;
