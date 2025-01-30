import { useApp } from "../../context/AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import { useMemo, useState } from "react";
import { Switch } from "../../components/form/Switch";
import { MdOutlineColorLens } from "react-icons/md";
import { mockEmpty, mockResumeData } from "../../data/mockData";
import {
  CustomListSection,
  CustomTextSection,
} from "../PageComponents/ApplicantComponents";
import { Menu, MenuItem } from "../../AnimatedUi/AnimatedNav";
import { HiOutlineTemplate } from "react-icons/hi";
import { Icons } from "../../components/icons";
import {
  FaArrowRightLong,
  FaCheck,
  FaCircle,
  FaPlus,
  FaRegFile,
} from "react-icons/fa6";
import { IoMdColorFilter } from "react-icons/io";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { Select4 } from "../../components/form/Select";
import { Sketch } from "@uiw/react-color";
import { BsPencil } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
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
import { FileUpload } from "../General/ResumeUpload";
import { FiUpload } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import Modal from "../../components/modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import resumeImg1 from "../../assets/images/entry-resume-sample.png";
import resumeImg2 from "../../assets/images/pro-resume-sample.png";
import { ProgressBar2 } from "../../components/ProgressBar";
import ResumeAiScore from "./ResumeAiScore";
import { PageLoader } from "../../components/Loader";
import { getProfileResume, updateResume } from "../../services/resumeServices";
import { toast } from "react-toastify";
import { generateUniqueId } from "../../lib/utils";

const primaryColors = ["#0077B5", "#CC0074", "#FF7D00", "#00C196", "#000000"];

const EditSmartResume: React.FC = () => {
  const {} = useApp();
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [newCvModal, setNewCvModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useOutsideClick(() => setShowPalette(false));
  const [editingName, setEditingName] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [scoreModal, setScoreModal] = useState(false);
  const [config, setConfig] = useState<any>(mockResumeData?.config || null);
  const [sectionCount, setSectionCount] = useState(0); // To track the number of sections added
  const [customSections, setCustomSections] = useState<any[]>([]);
  const [sectionType, setSectionType] = useState("");

  const [updateLoading, setUpdateLoading] = useState(false)
  // Function to add a new section to resumeData
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

  const handleUpdateResume = async () => {
    const toastId = toast.loading("Saving your changes...");
    setUpdateLoading(true)
    try {
      const resp = await updateResume(resumeData?._id, {
        ...resumeData,
        config: config,
      });
      setResumeData(resp?.data?.resume);
      setConfig(resp?.data?.resume?.config);
      console.log(resp?.data?.resume);
      toast.update(toastId, {
        render: "Your changes have been successfully saved",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed");
    } finally {
      setUpdateLoading(false)
    }
  };
  useMemo(async () => {
    setLoading(true);
    try {
      const resp = await getProfileResume(profileId);
      console.log(resp);
      setResumeData(resp?.data?.resume);
      setConfig(resp?.data?.resume?.config);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return (
    <DefaultLayout>
      {loading ? (
        <PageLoader />
      ) : (
        <section className="w-full">
          <div className="bg-zinc-50/90 lg:px-9 md:px-6 px-2 py-3 mb-6 mt-3 w-full">
            <div className="flex max-sm:flex-col gap-3 gap-y-1.5 sm:items-center relative w-full z-99">
              <Menu setActive={setActive}>
                <MenuItem
                  setActive={() => setTemplateModal(true)}
                  active={active}
                  position="max-sm:-translate-x-[25%]"
                  item={
                    <div className="flex space-x-[2px] max-sm:text-[11px] sm:space-x-2 items-center">
                      <HiOutlineTemplate />
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
                    <div className="flex space-x-[2px] max-sm:text-[11px] sm:space-x-2 items-center">
                      <HiOutlineTemplate />
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
                  </div>
                </MenuItem>

                <div className="relative">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    position="max-sm:-translate-x-[62%]"
                    item={
                      <div className="flex space-x-[2px] max-sm:text-[11px] sm:space-x-2 items-center">
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
                    <div className="flex space-x-[2px] max-sm:text-[11px] sm:space-x-2 items-center">
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

                <div
                  onClick={() => setScoreModal(true)}
                  className="flex gap-1 cursor-pointer max-sm:hidden text-sm max-sm:text-[10px] items-center"
                >
                  <span>
                    <ProgressBar2 percent={50} />
                  </span>
                  <span>View my Tabbio Score</span>
                </div>

                {/* Color Picker */}
              </Menu>

              <div className="sm:ml-auto flex items-center gap-2">
                <div
                  onClick={() => setScoreModal(true)}
                  className="flex gap-1 cursor-pointer sm:hidden text-sm max-sm:text-[10px] items-center"
                >
                  <span>
                    <ProgressBar2 percent={50} />
                  </span>
                  <span>View my Tabbio Score</span>
                </div>
                <button className="flex items-center gap-2 hover:scale-105 duration-150 text-zinc-700">
                  <TbWorld />
                </button>
                <button
                  onClick={() => setNewCvModal(true)}
                  className="hidden items-center gap-2 max-sm:text-xs p-1 hover:scale-105 duration-150 text-zinc-700"
                >
                  Create New <LuExternalLink />
                </button>
              </div>
            </div>
          </div>

          <div className="px-2 py-4 md:pl-8 md:pr-2">
            <div className="2xl:hidden lg:w-[90%] w-full flex justify-between gap-6 items-center">
              <p className="text-lg text-zinc-700 font-medium">Profile CV</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="flex items-center font-medium mb-3 gap-3 text-lg"
                >
                  Exit
                </button>
                <button
                  onClick={() => {
                    // console.log(resumeData);
                    // console.log(customSections);
                    handleUpdateResume()
                  }}
                  disabled={updateLoading}
                  className="px-4 py-2 md:px-5 flex bg-primary disabled:bg-opacity-50 text-white items-center font-medium rounded-lg mb-3 gap-3"
                >
                   {updateLoading ? 'Loading...' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div className="w-full flex 2xl:flex-row flex-col gap-5 overflow-x-auto">
              <div className="w-full 2xl:max-w-[75%]  lg:w-[90%] min-w-[800px]">
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
                        onChange={(e) =>
                          setResumeData((r: any) => ({
                            ...r,
                            name: e.target.value,
                          }))
                        }
                      />
                      {config.role && (
                        <input
                          className={`border-none text-lg bg-white focus:outline-none text-center text-black placeholder:text-black focus:bg-zinc-100 px-4 font-semibold`}
                          placeholder="Professional Title"
                          value={resumeData?.role}
                          onChange={(e) =>
                            setResumeData((r: any) => ({
                              ...r,
                              role: e.target.value,
                            }))
                          }
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
                        {editingName ? (
                          <input
                            className={`border-none bg-white focus:bg-zinc-100 focus:outline-none px-3 font-medium text-[40px] dynamic-input`}
                            style={{ color: resumeData?.style?.primaryColor }}
                            placeholder="Your Name"
                            value={resumeData?.name}
                            autoFocus
                            onBlur={() => setEditingName(false)}
                            onChange={(e) =>
                              setResumeData((r: any) => ({
                                ...r,
                                name: e.target.value,
                              }))
                            }
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
                                onBlur={() => setEditingRole(false)}
                                value={resumeData?.role}
                                onChange={(e) =>
                                  setResumeData((r: any) => ({
                                    ...r,
                                    role: e.target.value,
                                  }))
                                }
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
              <div className="max-2xl:hidden ml-auto">
                <div className="bg-white w-full min-w-[319px] h-full">
                  <div className="bg-zinc-50/90 flex font-medium items-center gap-1.5 py-2 px-3">
                    <BsPencil size={18} /> Customize Profile CV
                  </div>
                  <div className="p-3 flex flex-col space-y-3">
                    <button
                     
                      onClick={() => {
                        // console.log(resumeData);
                        // console.log(customSections);
                        handleUpdateResume()
                      }}
                      disabled={updateLoading}
                      className="px-6 py-2.5 bg-primary hover:opacity-90 text-white w-full font-medium text-lg rounded-lg"
                    >
                       {updateLoading ? 'Loading...' : 'Save Changes'}
                    
                    </button>
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
          {newCvModal && (
            <Modal
              show={newCvModal}
              onHide={() => {
                setNewCvModal(false);
              }}
              title={
                <div className="flex items-center gap-2">
                  <span className="bg-primary rounded-full text-white w-9 h-9 flex items-center justify-center">
                    <IoDocumentTextOutline />
                  </span>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white text-lg mb-0">
                      Build your Profile CV from Scratch
                    </h3>
                  </div>
                </div>
              }
            >
              <div className="py-5 h-[65vh] max-sm:h-[75vh] overflow-y-auto no-scrollbar">
                <div>
                  <div
                    onClick={() => {
                      setResumeData(mockEmpty);
                      setNewCvModal(false);
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
                    <FileUpload onSuccess={(_url) => {}}>
                      <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                        Drag & drop your resume here
                      </p>

                      <p className="text-neutral-500 text-center text-base">
                        or click to browse your files
                      </p>

                      <div className="flex gap-5 text-sm text-neutral-500 items-center justify-center w-full mt-3">
                        <p className="flex items-center gap-1">
                          <span>
                            <FaRegFile />
                          </span>
                          PDF, DOC, DOCX
                        </p>

                        <span>
                          <FaCircle size={4} className="rounded-full" />
                        </span>
                        <p className="flex items-center gap-1">
                          <span>
                            <FiUpload />
                          </span>
                          Up to 10MB
                        </p>
                      </div>
                    </FileUpload>
                  </div>
                </div>
              </div>
            </Modal>
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
                      setResumeData((d: any) => ({ ...d, template: "entry" }));
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
            />
          )}
        </section>
      )}
    </DefaultLayout>
  );
};

export default EditSmartResume;
