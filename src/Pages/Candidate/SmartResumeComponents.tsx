import { useState } from "react";
import { ReadMore } from "../../components/ReadMore";
import Modal from "../../components/modal";
import { LuPencil } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi";
import { Pill } from "../../components/Pills";
import { IoIosArrowDown, IoIosArrowUp, IoLogoLinkedin } from "react-icons/io";
import {
  BsEye,
  BsPatchCheck,
  BsPlus,
  BsPlusLg,
  BsTrash,
  BsXCircleFill,
} from "react-icons/bs";
import { FaCircle, FaImage, FaRegFile, FaStarOfLife } from "react-icons/fa6";
import { FormGroup } from "../../components/form";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { TbMenuOrder } from "react-icons/tb";
import Delete from "../../components/modal/Delete";
import PhoneInput from "react-phone-number-input";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FileUpload } from "../General/ResumeUpload";
import { Dropdown2 } from "../../components/Dropdown";
import { HiMiniLink } from "react-icons/hi2";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import TabbioIcon from "../../assets/svg/t-icon.svg";
import Alert from "../../components/Alert";
import ProfilePicture from "../PageComponents/ProfilePhoto";
import { formatMonthYear } from "../../lib/utils/formatters";
import {
  generateProfileSummary,
  updateProfile,
} from "../../services/profileServices";
import { toast } from "react-toastify";
import { RiLoader3Fill } from "react-icons/ri";
import { Switch } from "../../components/form/Switch";
import { useApp } from "../../context/AppContext";
import { generateUniqueId } from "../../lib/utils";

export const ItemList = ({ items }: any) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  // Determine how many items to display based on `showAll`
  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <div>
      <ul className="text-sm font-normal space-y-2">
        {displayedItems.map((item: any, index: string) => (
          <li
            className="flex items-center max-sm:items-start gap-1 text-zinc-500"
            key={index}
          >
            <FaCircle size={6} className="text-primary max-sm:mt-2" /> {item}
          </li>
        ))}
      </ul>
      {items.length > 3 && (
        <button
          onClick={toggleShowAll}
          className="text-primary flex gap-1.5 items-center py-3 text-sm"
        >
          {showAll ? "See Less" : "Show More"}
          <span>{!showAll ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
        </button>
      )}
    </div>
  );
};

export const BasicDetails: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const { user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formView, setFormView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    email: profileData?.email,
    role: profileData?.role,
    phone: profileData?.phone,
    linkedIn: profileData?.linkedIn,
    name: profileData?.name,
  });
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Update Successful!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setFormView(false);
      setInfoModal(false);
      setShowModal(false);
    }
  };
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-x-6 items-center gap-y-2 mb-8">
        <div>
          <ProfilePicture
            name={profileData?.name}
            photo={profileData?.image}
            onSuccess={(url) => {
              handleUpdateProfile({
                image: url,
              });
            }}
          />
        </div>
        <div>
          <div className="my-2 max-sm:my-0">
            <h1
              className={`font-semibold max-sm:text-center max-sm:gap-2 max-sm:justify-center max-sm:w-full text-xl sm:text-2xl md:text-3xl mb-1 flex gap-4 items-center`}
            >
              {profileData?.name}{" "}
              <BsPatchCheck size={16} className="text-primary mt-0.5" />
            </h1>
            {profileData?.config?.role && (
              <h6 className={`text-base text-zinc-600 max-sm:text-center uppercase`}>
                {profileData?.role}
              </h6>
            )}
            <div className="flex gap-2 items-center mt-2">
              {profileData?.config?.location && (
                <span className={`text-sm text-zinc-600`}>
                  {profileData?.location}
                </span>
              )}
              <span
                onClick={() => setShowModal(true)}
                className="text-primary font-semibold cursor-pointer hover:scale-100"
              >
                Contact Details
              </span>
            </div>
          </div>
        </div>
        <span className="ml-auto max-md:order-first">
          {" "}
          <button
            onClick={() => {
              setInfoModal(true);
            }}
            className="hover:bg-slate-100/50 rounded-full max-md:py-0 p-2"
          >
            <LuPencil size={18} />
          </button>
        </span>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={profileData?.name}
        size="max-w-[500px] w-full"
      >
        {formView ? (
          <div>
            <div className="no-scrollbar max-h-[65vh] max-sm:max-h-[70vh] overflow-y-auto pr-2">
              <div className="mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  pattern="/^\S+@\S+$/i"
                  value={basicDetails?.email}
                  onChange={(e) =>
                    setBasicDetails((data: any) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter your email address"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-[0.4rem] flex items-center gap-1"
                >
                  Phone Number{" "}
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={basicDetails?.phone}
                  onChange={(val) => {
                    setBasicDetails((data: any) => ({
                      ...data,
                      phone: val,
                    }));
                  }}
                />
              </div>

              <div className="w-full mb-5">
                <label
                  className="mb-[0.7rem] block text-sm font-normal text-zinc-800"
                  htmlFor="description"
                >
                  Linkedin URL
                </label>
                <div className="relative rounded-lg border border-stroke">
                  <input
                    type="text"
                    className={`w-full py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg focus:border-primary/50 focus-visible:outline-none custom-scrollbar `}
                    name="linkedin-url"
                    value={basicDetails?.linkedIn}
                    onChange={(e) => {
                      setBasicDetails((data: any) => ({
                        ...data,
                        linkedIn: e.target.value,
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Backspace" || e.key === "Delete") &&
                        basicDetails.linkedIn === "https://linkedin.com/in/"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter your linkedin url"
                  />
                </div>
              </div>
            </div>
            <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
              <button
                onClick={() => {
                  setFormView(false);
                }}
                className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateProfile({
                    email: basicDetails?.name,
                    phone: basicDetails?.phone,
                    linkedIn: basicDetails?.linkedIn,
                  });
                }}
                disabled={loading}
                className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 -mt-4 w-full flex justify-between text-zinc-950 items-center gap-3">
              <p>Contact Details</p>
              <button
                onClick={() => {
                  setFormView(true);
                }}
                className="hover:bg-slate-100/50 rounded-full p-2"
              >
                <LuPencil size={18} />
              </button>
            </div>
            <div className="no-scrollbar max-h-[65vh] max-sm:max-h-[70vh] overflow-y-auto pr-2">
              <div className="mb-5 w-full flex gap-2.5 items-start">
                <span>
                  <MdOutlineMailOutline className="mt-1.5" />
                </span>
                <div>
                  <p>Email</p>
                  <span className="text-primary text-sm">
                    {profileData?.email}
                  </span>
                </div>
              </div>
              <div className="mb-5 w-full flex gap-2.5 items-start">
                <span>
                  <MdOutlinePhone className="mt-1.5" />
                </span>
                <div>
                  <p>Phone Number</p>
                  <span className="text-primary text-sm">
                    {profileData?.phone}
                  </span>
                </div>
              </div>
              <div className="mb-5 w-full flex justify-between gap-2.5 items-center">
                <div className="flex gap-2.5 items-start">
                  <span>
                    <img src={TabbioIcon} className="mt-1.5" />
                  </span>
                  <div>
                    <p>
                      Tabbio Link{" "}
                      <small>show Tabbio link on downloadable CV</small>
                    </p>
                    <span className="text-primary text-sm">
                      {user?.tabbioLink}
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  {loading ? (
                    <span>
                      <RiLoader3Fill className="animate-spin" />
                    </span>
                  ) : (
                    <Switch
                      value={profileData?.config?.showTabbioLink}
                      checked={true}
                      onChange={(value) => {
                        handleUpdateProfile({
                          config: {
                            ...profileData?.config,
                            showTabbioLink: value,
                          },
                        });
                      }}
                      size="sm"
                    />
                  )}
                </div>
              </div>

              <div className="mb-5 w-full flex gap-2.5 items-start">
                <span>
                  <IoLogoLinkedin className="mt-1.5" />
                </span>
                <div>
                  <p>Linkedin</p>
                  <span className="text-primary text-sm">
                    {profileData?.linkedIn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        show={infoModal}
        onHide={() => setInfoModal(false)}
        title={profileData?.name}
        size="max-w-[600px] w-full"
      >
        <div>
          <div className="no-scrollbar max-h-[65vh] max-sm:max-h-[70vh] overflow-y-auto px-2">
            <div className="mb-5">
              <Alert variant="info">
                <p>
                  Any changes to your name and role will automatically update on
                  your Downloadable CV
                </p>
              </Alert>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="role"
                value={basicDetails?.name}
                onChange={(e) =>
                  setBasicDetails((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter your name"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                value={basicDetails?.role}
                onChange={(e) =>
                  setBasicDetails((data: any) => ({
                    ...data,
                    role: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setFormView(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleUpdateProfile({
                  name: basicDetails?.name,
                  role: basicDetails?.role,
                });
              }}
              disabled={loading}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const ProfileSummary: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [bio, setBio] = useState(resumeData?.professionalSummary);
  const [aiLoading, setAiLoading] = useState(false);
  const [editBioMode, setEditBioMode] = useState(false);
  const [showCompetencies, setShowCompetencies] = useState(false);
  const [experience, setExperience] = useState(
    resumeData?.yearsOfExperience || 0
  );
  const [level, setLevel] = useState(resumeData?.level);
  const [majorSkill, setMajorSkill] = useState(resumeData?.majorSkill);
  const [skills, setSkills] = useState<string[]>(
    resumeData?.skills.find((skill: any) => skill?.name === "technical")
      ?.items || []
  );
  const [newSkill, setNewSkill] = useState("");

  const [loading, setLoading] = useState(false);

  const technicalSkill = resumeData?.skills.find(
    (skill: any) => skill?.name === "technical"
  );

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const resp = await updateProfile(resumeData?._id, {
        professionalSummary: bio,
        majorSkill,
        skills: [
          ...resumeData?.skills.filter(
            (skill: any) => skill.name !== "technical"
          ),
          { name: "technical", items: skills },
        ],
        level,
        yearsOfExperience: experience.toString(),
      });
      setResumeData(resp?.data?.profile);
      toast.success("Your Professional Summary was successfully updated");
      setEditBioMode(false);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const resp = await generateProfileSummary({
        currentSummary: resumeData?.professionalSummary,
        role: resumeData?.role,
      });
      setBio(resp?.data?.summary);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">Profile Summary</h6>
        <button
          onClick={() => {
            setEditBioMode(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <LuPencil size={18} />
        </button>
      </div>
      <div className="border border-stroke rounded-lg shadow-sm bg-white p-3">
        <ReadMore text={resumeData?.professionalSummary} />

        <div className="w-full flex gap-x-3 max-md:flex-wrap gap-y-2 items-center">
          <Pill>
            {resumeData?.yearsOfExperience || "Unspecified"} Years of Experience
          </Pill>
          <Pill variant="primary">
            {resumeData?.level || "Unspecified"} Level
          </Pill>
          <Pill variant="none">
            {resumeData?.majorSkill || "Unspecified Major Skill"}
          </Pill>
        </div>

        <div className="mt-3 ">
          <button
            onClick={() => setShowCompetencies(!showCompetencies)}
            className="flex gap-1.5 items-center mb-2.5 hover:bg-slate-200 bg-slate-100 rounded-full py-1.5 sm:px-3 sm:text-sm px-2 text-xs font-normal"
          >
            Core Competencies{" "}
            <span>
              {!showCompetencies ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
          </button>
          {showCompetencies && (
            <div className="py-2 border-t border-stroke w-full flex gap-2 items-center flex-wrap">
              {technicalSkill?.items?.map((val: string, index: number) => (
                <Pill key={index}>{val}</Pill>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        show={editBioMode}
        onHide={() => setEditBioMode(false)}
        title="Professional Summary"
        size="max-w-[700px] w-full"
      >
        <div className="">
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="w-full">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="professional_summary"
              >
                You can write about your years of experience, industry, or
                skills. People also talk about their achievements or previous
                job experiences
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`About`}
                  placeholder="Enter your professional summary"
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="px-4 pb-1 pt-3 border-t border-stroke">
                  {" "}
                  <button
                    disabled={aiLoading}
                    onClick={() => {
                      handleGenerateSummary();
                    }}
                    className="relative inline-flex items-center justify-center disabled:bg-opacity-40 text-sm p-[2px] mb-2 me-2 overflow-hidden font-medium rounded-full group bg-gradient-to-br from-[#2563EB] to-[#9333EA] group-hover:from-[#9333EA] group-hover:to-[#2563EB] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                      <p className="text-center text-xs gap-1 items-center bg-gradient-to-r group-hover:text-white from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-flex">
                        <HiOutlineSparkles className="text-primary group-hover:text-white" />{" "}
                        {aiLoading ? "LOADING..." : "WRITING ASSISTANT"}
                      </p>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="py-6">
              <FormGroup>
                <div className="mb-4">
                  <label
                    htmlFor="major_skill"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Major Skill
                  </label>
                  <input
                    type="text"
                    id="majorSkill"
                    value={majorSkill}
                    onChange={(e) => setMajorSkill(e.target.value)}
                    placeholder="Ex: Project Management"
                    className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={level}>
                      {level || "Select your Level of Expertise"}
                    </option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Enter years of experience"
                    className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
                  <label
                    htmlFor="competencies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                    <p className="text-sm font-normal">
                      Show your top skills - add up to 5 skills you want to be
                      known for. they will appear in your skill section
                    </p>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-4 border-b pb-1.5 border-neutral-200">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 mb-5 flex">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a new skill"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                    <p className="text-sm text-zinc-500 mb-2">
                      Suggested skills based on your title
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {resumeData?.suggestedSkills
                        ?.filter((skill: string) => !skills.includes(skill))
                        .map((skill: string) => (
                          <span
                            key={skill}
                            className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => {
                                setSkills([...skills, skill]);
                              }}
                              className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                            >
                              <BsPlus />
                            </button>
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditBioMode(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleUpdateProfile();
              }}
              disabled={loading}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const WorkExperience: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    description: "",
    keyAchievements: [],
    startDate: new Date(),
    endDate: new Date(),
    skills: [],
    active: false,
    _id: generateUniqueId(),
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const addAchievment = () => {
    if (newAchievment && !achievments.includes(newAchievment)) {
      setAchievments([...achievments, newAchievment]);
      setNewAchievment("");
    }
  };

  const removeAchievment = (achievment: string) => {
    setAchievments(achievments.filter((s) => s !== achievment));
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = skills.indexOf(draggingItem);
    const targetIndex = skills.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...skills];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setSkills(updatedItems);
    }
  };

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setAchievments([]);
      setSkills([]);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">Work Experience</h6>
        <button
          onClick={() => {
            setNewExperienceModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {profileData?.workExperience.map((item: any, index: number) => (
          <div
            key={index}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
              setSkills(item?.skills);
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.title}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate && formatMonthYear(item?.endDate)}
                </p>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <BsTrash size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                >
                  <LuPencil size={14} />
                </button>
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
        ))}
      </div>

      <Modal
        show={newExperienceModal}
        onHide={() => setNewExperienceModal(false)}
        title="Work Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={experienceData?.title}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={experienceData?.company}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={experienceData.startDate}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="M"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData.endDate}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="yyyy"
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={experienceData?.active}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={experienceData?.description}
                  onChange={(e) =>
                    setExperienceData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved while
                  working with this organisation
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you while working
                  with this organisation
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewExperienceModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  workExperience: [
                    ...profileData?.workExperience,
                    {
                      ...experienceData,
                      skills: skills,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setEditModal(false);
        }}
        title="Edit Work Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="position"
                value={selectedExperience?.title}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={selectedExperience?.company}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedExperience?.startDate}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.endDate}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="yyyy"
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={selectedExperience?.active}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={selectedExperience?.description}
                  onChange={(e) =>
                    setSelectedExperience((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved while
                  working with this organisation
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments?.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you while working
                  with this organisation
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills?.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setSkills([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedWorkExperience = profileData?.workExperience.map(
                  (exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          skills: skills,
                          keyAchievements: achievments,
                        }
                      : exp
                );
                handleUpdateProfile({
                  workExperience: updatedWorkExperience,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.title} ?`}
        desc={`Are you sure you want to delete this item from your work experiences? This action is irreversible`}
        onProceed={() => {
          const updatedWorkExperience = profileData?.workExperience.filter(
            (exp: any) => exp._id !== selectedExperience?._id
          );
          handleUpdateProfile({
            workExperience: updatedWorkExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const CareerHighlight: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [careerData, setCareerData] = useState({
    _id: generateUniqueId,
    title: "",
    description: "",
    thumbnail: "",
    link: "",
    skills: [],
    attachments: {
      type: "link",
      link: "",
    },
  });
  const [showUpload, setShowUpload] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setShowMediaForm(false);
      setShowLinkForm(false);
      setShowUpload(false);

      setDeleteModal(false);
      setSkills([]);
      setEditModal(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">Career Highlights</h6>
        <button
          onClick={() => {
            setNewExperienceModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="grid xl:grid-cols-2 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {profileData?.careerHighlights &&
          (showAll
            ? profileData.careerHighlights
            : profileData.careerHighlights.slice(0, 3)
          ).map((item: any, index: number) => (
            <div
              key={index}
              className="border border-stroke hover:shadow-md cursor-pointer rounded-lg shadow-sm bg-white p-3"
              onClick={() => {
                setSkills(item?.skills);
                setSelectedCareer(item);
                setShowPicker(item?.attachments?.link ? false : true);
              }}
            >
              <div>
                {!item?.thumbnail ? (
                  <div className="w-full text-primary bg-[#EFF6FFCC] h-40 flex justify-center items-center">
                    <FaImage size={40} />
                  </div>
                ) : (
                  <div className="w-full h-40">
                    <img
                      src={item?.thumbnail}
                      className="w-full h-full object-cover"
                      alt="career highlight thumbnail"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-3 pt-2">
                  <div>
                    <h6 className="text-base font-medium text-zinc-800 mb-0">
                      {item?.title}
                    </h6>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                      className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                    >
                      <BsTrash size={14} />
                    </button>
                    <button
                      onClick={() => {
                        // if (item?.attachments?.link) {
                        //   if (item?.attachments?.type === "link") {
                        //     setShowLinkForm(true);
                        //   } else {
                        //     setShowMediaForm(true);
                        //   }
                        // }
                        setEditModal(true);
                      }}
                      className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                    >
                      <LuPencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setDetailModal(true);
                      }}
                      className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                    >
                      <BsEye size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-normal text-sm text-zinc-500 pb-4">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="py-5 w-full flex justify-center items-center">
        {profileData?.careerHighlights.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary flex gap-1.5 items-center py-3 text-lg"
          >
            {showAll ? "See Less" : "Show More"}
            <span>{!showAll ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
          </button>
        )}
      </div>

      <Modal
        show={newExperienceModal}
        onHide={() => {
          setShowUpload(false);
          setNewExperienceModal(false);
        }}
        title="Career Highlight"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={careerData?.title}
                onChange={(e) =>
                  setCareerData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={careerData?.description}
                  onChange={(e) =>
                    setCareerData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <div className="mb-6">
                <label
                  htmlFor="competencies"
                  className="block text-sm font-medium text-gray-700"
                >
                  <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                  <p className="text-sm font-normal">
                    Show your top skills - add up to 5 skills
                  </p>
                </label>
                <div className="flex flex-wrap gap-2 mt-4 border-b pb-1.5 border-neutral-200">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-4 mb-5 flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
                <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                  <p className="text-sm text-zinc-500 mb-2">
                    Suggested skills based on your title
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {profileData?.suggestedSkills
                      ?.filter((skill: string) => !skills.includes(skill))
                      .map((skill: string) => (
                        <span
                          key={skill}
                          className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              setSkills([...skills, skill]);
                            }}
                            className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                          >
                            <BsPlus />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="relative mb-6 max-w-[280px]">
                <Dropdown2
                  buttonContent={
                    <span className="flex cursor-pointer max-w-[160px] text-[15px] text-primary border border-primary rounded-full w-auto py-1.5 px-4 items-center gap-2">
                      <BsPlus size={22} /> Add Media
                    </span>
                  }
                >
                  <div
                    onClick={() => {
                      setCareerData((data: any) => ({
                        ...data,
                        attachments: { type: "link", link: "" },
                      }));
                      setShowMediaForm(false);
                      setShowLinkForm(true);
                    }}
                    className="flex gap-1.5 items-start px-3 text-sm py-1.5 mt-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                  >
                    <span>
                      <HiMiniLink className="mt-1" />{" "}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Add a Link
                      </p>
                      <p className="text-xs font-normal text-zinc-500">
                        Attach a link to a video, website or articles.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setShowLinkForm(false);
                      setShowMediaForm(true);
                    }}
                    className="flex gap-1.5 items-start px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                  >
                    <span>
                      <BiImageAdd className="mt-1" />{" "}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Add Media
                      </p>
                      <p className="text-xs font-normal text-zinc-500">
                        Upload pictures, presentations, or documents
                      </p>
                    </div>
                  </div>
                </Dropdown2>
              </div>

              {showMediaForm && (
                <div className="md:px-2 relative flex gap-3 items-start mb-6">
                  {careerData?.attachments?.link ? (
                    <div>
                      {careerData?.attachments?.type === "image" && (
                        <div className="h-50 w-full max-w-[280px] pt-3">
                          <img
                            src={careerData?.attachments?.link}
                            alt="career highlight image"
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                      )}
                      {careerData?.attachments?.type === "video" && (
                        <div className="h-50 w-full max-w-[280px] pt-3">
                          <video
                            src={careerData?.attachments?.link}
                            className="object-cover w-full h-full rounded-md"
                            controls
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <FileUpload
                      acceptedFiles={[
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                        "video/mp4",
                        "video/mpeg",
                      ]}
                      onSuccess={(url, fileType) => {
                        if (fileType.startsWith("video/")) {
                          setCareerData((data: any) => ({
                            ...data,
                            attachments: { type: "video", link: url },
                          }));
                        } else {
                          setCareerData((data: any) => ({
                            ...data,
                            attachments: { type: "image", link: url },
                          }));
                        }
                      }}
                    >
                      <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                        Drag & drop your file here
                      </p>

                      <p className="text-neutral-500 text-center text-base">
                        or click to browse your files
                      </p>

                      <div className="flex gap-5 text-sm text-neutral-500 items-center justify-center w-full mt-3">
                        <p className="flex items-center gap-1">
                          <span>
                            <FaRegFile />
                          </span>
                          PNG, JPG, JPEG, MP4, MP3
                        </p>

                        <span>
                          <FaCircle size={4} className="rounded-full" />
                        </span>
                        <p className="flex items-center gap-1">
                          <span>
                            <FiUpload />
                          </span>
                          Max size 10MB
                        </p>
                      </div>
                    </FileUpload>
                  )}

                  <span
                    onClick={() => setShowMediaForm(false)}
                    className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                  >
                    <BsXCircleFill size={22} />
                  </span>
                </div>
              )}
              {showLinkForm && (
                <div className="md:px-2 relative w-full flex gap-3 items-start mb-6">
                  <div className="w-[80%]">
                    <div className="mb-6">
                      <label
                        htmlFor="link"
                        className="text-sm font-medium text-gray-700 flex items-center gap-1"
                      >
                        Link <span></span>
                      </label>
                      <input
                        type="text"
                        id="link"
                        value={careerData?.attachments?.link}
                        onChange={(e) =>
                          setCareerData((data: any) => ({
                            ...data,
                            attachments: {
                              ...data?.attachments,
                              link: e.target.value,
                            },
                          }))
                        }
                        placeholder="Paste your link here"
                        className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <span
                    onClick={() => setShowLinkForm(false)}
                    className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                  >
                    <BsXCircleFill size={22} />
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-black mb-2 px-2">Thumbnail</p>
                {!showUpload ? (
                  <div className="flex gap-3 items-start md:px-2">
                    {!careerData?.thumbnail ? (
                      <div className="w-[240px] border border-stroke rounded-xl text-primary bg-[#EFF6FFCC] h-40 flex justify-center items-center">
                        <FaImage size={40} />
                      </div>
                    ) : (
                      <div className="w-full max-w-[300px] h-40">
                        <img
                          src={careerData?.thumbnail}
                          className="w-full h-full object-cover"
                          alt="career highlight thumbnail"
                        />
                      </div>
                    )}
                    <span
                      onClick={() => setShowUpload(true)}
                      className="w-6 bg-white cursor-pointer h-6 flex justify-center items-center rounded-full text-lg text-black"
                    >
                      <LuPencil />
                    </span>
                  </div>
                ) : (
                  <div className="md:px-2 relative flex gap-3 items-start">
                    <FileUpload
                      acceptedFiles={["image/png", "image/jpeg", "image/jpg"]}
                      onSuccess={(url) => {
                        setCareerData((data: any) => ({
                          ...data,
                          thumbnail: url,
                        }));
                      }}
                    >
                      <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                        Drag & drop your image here
                      </p>

                      <p className="text-neutral-500 text-center text-base">
                        or click to browse your files
                      </p>

                      <div className="flex gap-5 text-sm text-neutral-500 items-center justify-center w-full mt-3">
                        <p className="flex items-center gap-1">
                          <span>
                            <FaRegFile />
                          </span>
                          PNG, JPG, JPEG
                        </p>

                        <span>
                          <FaCircle size={4} className="rounded-full" />
                        </span>
                        <p className="flex items-center gap-1">
                          <span>
                            <FiUpload />
                          </span>
                          Max size 5MB
                        </p>
                      </div>
                    </FileUpload>
                    <span
                      onClick={() => setShowUpload(false)}
                      className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                    >
                      <BsXCircleFill size={22} />
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
              <button
                onClick={() => {
                  setNewExperienceModal(false);
                }}
                className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleUpdateProfile({
                    careerHighlights: [
                      ...profileData?.careerHighlights,
                      { ...careerData, skills: skills },
                    ],
                  });
                  console.log(careerData);
                }}
                disabled={loading}
                className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Career Highlight"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={selectedCareer?.title}
                onChange={(e) =>
                  setSelectedCareer((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={selectedCareer?.description}
                  onChange={(e) =>
                    setSelectedCareer((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <div className="mb-6">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                  <p className="text-sm font-normal">
                    Show your top skills - add up to 5 skills
                  </p>
                </label>

                <div className="flex flex-wrap gap-2 mt-4 border-b pb-1.5 border-neutral-200">
                  {skills?.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-4 mb-5 flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
                <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                  <p className="text-sm text-zinc-500 mb-2">
                    Suggested skills based on your title
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {profileData?.suggestedSkills
                      ?.filter((skill: string) => !skills.includes(skill))
                      .map((skill: string) => (
                        <span
                          key={skill}
                          className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              setSkills([...skills, skill]);
                            }}
                            className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                          >
                            <BsPlus />
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              {!showPicker ? (
                <div>
                  <div className="flex w-full justify-end items-center"></div>
                  <div className="mt-2 mb-3">
                    <p className="text-base font-semibold text-zinc-600 mb-1">
                      Attachment
                    </p>
                    <div className="flex gap-3 items-start">
                      <div>
                        {selectedCareer?.attachments?.type === "link" && (
                          <div>
                            <a
                              href={selectedCareer?.attachments?.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Follow this link to view more details:{" "}
                              <span className="text-blue-500 hover:underline">
                                {selectedCareer?.attachments?.link}
                              </span>
                            </a>
                          </div>
                        )}
                        {selectedCareer?.attachments?.type === "image" && (
                          <div className="h-50 w-full max-w-[280px] pt-3">
                            <img
                              src={selectedCareer?.attachments?.link}
                              alt="career highlight image"
                              className="object-cover w-full h-full rounded-md"
                            />
                          </div>
                        )}
                        {selectedCareer?.attachments?.type === "video" && (
                          <div className="h-50 w-full max-w-[280px] pt-3">
                            <video
                              src={selectedCareer?.attachments?.link}
                              className="object-cover w-full h-full rounded-md"
                              controls
                            />
                          </div>
                        )}
                      </div>
                      <span
                        onClick={() => setShowPicker(true)}
                        className="w-8 bg-white cursor-pointer h-8 flex justify-center items-center rounded-full text-lg text-black"
                      >
                        <LuPencil />
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-6">
                  <div className="relative mb-6 max-w-[280px]">
                    <Dropdown2
                      buttonContent={
                        <span className="flex cursor-pointer max-w-[160px] text-[15px] text-primary border border-primary rounded-full w-auto py-1.5 px-4 items-center gap-2">
                          <BsPlus size={22} /> Add Media
                        </span>
                      }
                    >
                      <div
                        onClick={() => {
                          setShowMediaForm(false);
                          setShowLinkForm(true);
                        }}
                        className="flex gap-1.5 items-start px-3 text-sm py-1.5 mt-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <HiMiniLink className="mt-1" />{" "}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-black">
                            Add a Link
                          </p>
                          <p className="text-xs font-normal text-zinc-500">
                            Attach a link to a video, website or articles.
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setShowLinkForm(false);
                          setShowMediaForm(true);
                        }}
                        className="flex gap-1.5 items-start px-3 text-sm py-1.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                      >
                        <span>
                          <BiImageAdd className="mt-1" />{" "}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-black">
                            Add Media
                          </p>
                          <p className="text-xs font-normal text-zinc-500">
                            Upload pictures, presentations, or documents
                          </p>
                        </div>
                      </div>
                    </Dropdown2>
                  </div>
                  {selectedCareer?.attachments?.link && (
                    <button
                      onClick={() => setShowPicker(false)}
                      className="mb-3 rounded-full px-4 py-1 text-primary border border-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      Show Media
                    </button>
                  )}
                </div>
              )}

              {showMediaForm && (
                <div className="md:px-2 relative flex gap-3 items-start mb-6">
                  <FileUpload
                    acceptedFiles={[
                      "image/png",
                      "image/jpeg",
                      "image/jpg",
                      "video/mp4",
                      "video/mpeg",
                    ]}
                    onSuccess={(url, fileType) => {
                      if (fileType.startsWith("video/")) {
                        setSelectedCareer((data: any) => ({
                          ...data,
                          attachments: { type: "video", link: url },
                        }));
                      } else {
                        setSelectedCareer((data: any) => ({
                          ...data,
                          attachments: { type: "image", link: url },
                        }));
                      }
                    }}
                  >
                    <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                      Drag & drop your file here
                    </p>

                    <p className="text-neutral-500 text-center text-base">
                      or click to browse your files
                    </p>

                    <div className="flex gap-5 text-sm text-neutral-500 items-center justify-center w-full mt-3">
                      <p className="flex items-center gap-1">
                        <span>
                          <FaRegFile />
                        </span>
                        PNG, JPG, JPEG, MP4, MP3
                      </p>

                      <span>
                        <FaCircle size={4} className="rounded-full" />
                      </span>
                      <p className="flex items-center gap-1">
                        <span>
                          <FiUpload />
                        </span>
                        Max size 10MB
                      </p>
                    </div>
                  </FileUpload>
                  <span
                    onClick={() => setShowMediaForm(false)}
                    className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                  >
                    <BsXCircleFill size={22} />
                  </span>
                </div>
              )}
              {showLinkForm && (
                <div className="md:px-2 relative w-full flex gap-3 items-start mb-6">
                  <div className="w-[80%]">
                    <div className="mb-6">
                      <label
                        htmlFor="link"
                        className="text-sm font-medium text-gray-700 flex items-center gap-1"
                      >
                        Link <span></span>
                      </label>
                      <input
                        type="text"
                        id="link"
                        value={selectedCareer?.attachments?.link}
                        onChange={(e) =>
                          setSelectedCareer((data: any) => ({
                            ...data,
                            attachments: {
                              ...data?.attachments,
                              type: "link",
                              link: e.target.value,
                            },
                          }))
                        }
                        placeholder="Paste your link here"
                        className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <span
                    onClick={() => {
                      setShowLinkForm(false);
                      setShowPicker(false);
                    }}
                    className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                  >
                    <BsXCircleFill size={22} />
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-black mb-2 px-2">Thumbnail</p>
                {!showUpload ? (
                  <div className="flex gap-3 items-start md:px-2">
                    {!selectedCareer?.thumbnail ? (
                      <div className="w-[240px] border border-stroke rounded-xl text-primary bg-[#EFF6FFCC] h-40 flex justify-center items-center">
                        <FaImage size={40} />
                      </div>
                    ) : (
                      <div className="w-full max-w-[300px] h-40">
                        <img
                          src={selectedCareer?.thumbnail}
                          className="w-full h-full object-cover"
                          alt="career highlight thumbnail"
                        />
                      </div>
                    )}

                    <span
                      onClick={() => setShowUpload(true)}
                      className="w-6 bg-white cursor-pointer h-6 flex justify-center items-center rounded-full text-lg text-black"
                    >
                      <LuPencil />
                    </span>
                  </div>
                ) : (
                  <div className="md:px-2 relative flex gap-3 items-start">
                    <FileUpload
                      acceptedFiles={["image/png", "image/jpeg", "image/jpg"]}
                      onSuccess={(url) => {
                        setCareerData((data: any) => ({
                          ...data,
                          thumbnail: url,
                        }));
                      }}
                    >
                      <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                        Drag & drop your image here
                      </p>

                      <p className="text-neutral-500 text-center text-base">
                        or click to browse your files
                      </p>

                      <div className="flex gap-5 text-sm text-neutral-500 items-center justify-center w-full mt-3">
                        <p className="flex items-center gap-1">
                          <span>
                            <FaRegFile />
                          </span>
                          PNG, JPG, JPEG
                        </p>

                        <span>
                          <FaCircle size={4} className="rounded-full" />
                        </span>
                        <p className="flex items-center gap-1">
                          <span>
                            <FiUpload />
                          </span>
                          Max size 5MB
                        </p>
                      </div>
                    </FileUpload>
                    <span
                      onClick={() => setShowUpload(false)}
                      className="w-6 text-zinc-400 cursor-pointer h-6 flex justify-center items-center rounded-full text-lg"
                    >
                      <BsXCircleFill size={22} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setSkills([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedCareerHighlight =
                  profileData?.careerHighlights.map((exp: any) =>
                    exp._id === selectedCareer?._id
                      ? {
                          ...selectedCareer,
                          skills: skills,
                        }
                      : exp
                  );
                handleUpdateProfile({
                  careerHighlights: updatedCareerHighlight,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={detailModal}
        onHide={() => {
          setDetailModal(false);
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

          {selectedCareer?.attachments && (
            <div>
              <div className="mt-6">
                <p className="text-base font-semibold text-zinc-600 mb-1">
                  Attachment
                </p>
                {selectedCareer?.attachments?.type === "link" && (
                  <div>
                    <a
                      href={selectedCareer?.attachments?.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Follow this link to view more details:{" "}
                      <span className="text-blue-500 hover:underline">
                        {selectedCareer?.attachments?.link}
                      </span>
                    </a>
                  </div>
                )}
                {selectedCareer?.attachments?.type === "image" && (
                  <div className="h-50 w-full max-w-[280px] pt-3">
                    <img
                      src={selectedCareer?.attachments?.link}
                      alt="career highlight image"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
                {selectedCareer?.attachments?.type === "video" && (
                  <div className="h-50 w-full max-w-[280px] pt-3">
                    <video
                      src={selectedCareer?.attachments?.link}
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
      <Delete
        show={deleteModal}
        onHide={() => {
          setSkills([]);
          setDeleteModal(false);
        }}
        title={`Delete ${selectedCareer?.title} ?`}
        desc={`Are you sure you want to delete this item from your career highlights? This action is irreversible`}
        isLoading={loading}
        isLoadingText="Deleting"
        onProceed={() => {
          const updatedCareerHighlights = profileData?.careerHighlights.filter(
            (exp: any) => exp._id !== selectedCareer?._id
          );
          handleUpdateProfile({
            careerHighlights: updatedCareerHighlights,
          });
        }}
      ></Delete>
    </div>
  );
};

export const VolunteerExperience: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    description: "",
    keyAchievements: [],
    startDate: new Date(),
    endDate: new Date(),
    skills: [],
    active: false,
    _id: generateUniqueId(),
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const addAchievment = () => {
    if (newAchievment && !achievments.includes(newAchievment)) {
      setAchievments([...achievments, newAchievment]);
      setNewAchievment("");
    }
  };

  const removeAchievment = (achievment: string) => {
    setAchievments(achievments.filter((s) => s !== achievment));
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = skills.indexOf(draggingItem);
    const targetIndex = skills.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...skills];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setSkills(updatedItems);
    }
  };

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setSkills([]);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">
          Volunteer Experience
        </h6>
        <button
          onClick={() => {
            setNewExperienceModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {profileData?.volunteerExperience.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
              setSkills(item?.skills);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.title}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate && formatMonthYear(item?.endDate)}
                </p>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <BsTrash size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                >
                  <LuPencil size={14} />
                </button>
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
                {item?.skills?.map((val: string, idx: number) => (
                  <Pill key={idx}>{val}</Pill>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newExperienceModal}
        onHide={() => setNewExperienceModal(false)}
        title="Volunteer Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="position"
                value={experienceData?.title}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="major_skill"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={experienceData.company}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={experienceData?.startDate || new Date()}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="M"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData?.endDate || new Date()}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="M"
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={experienceData?.active}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={experienceData.description}
                  onChange={(e) =>
                    setExperienceData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved during
                  this volunteer program
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you during this
                  volunteer program
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewExperienceModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  volunteerExperience: [
                    ...profileData?.volunteerExperience,
                    {
                      ...experienceData,
                      skills: skills,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setEditModal(false);
        }}
        title="Edit Volunteer Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={selectedExperience?.title}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={selectedExperience?.company}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedExperience?.startDate || new Date()}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.endDate || new Date()}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={selectedExperience?.active}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={selectedExperience?.description}
                  onChange={(e) =>
                    setSelectedExperience((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved during
                  this volunteer program
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments?.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you used during this
                  volunteer program
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills?.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setSkills([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedVolunteerExperience =
                  profileData?.volunteerExperience.map((exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          skills: skills,
                          keyAchievements: achievments,
                        }
                      : exp
                  );
                handleUpdateProfile({
                  volunteerExperience: updatedVolunteerExperience,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.position} ?`}
        desc={`Are you sure you want to delete this item from your volunteer experiences? This action is irreversible`}
        onProceed={() => {
          const updatedVolunteerExperience =
            profileData?.volunteerExperience.filter(
              (exp: any) => exp._id !== selectedExperience?._id
            );
          handleUpdateProfile({
            volunteerExperience: updatedVolunteerExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Internships: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    description: "",
    keyAchievements: [],
    startDate: new Date(),
    endDate: new Date(),
    skills: [],
    active: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const addAchievment = () => {
    if (newAchievment && !achievments.includes(newAchievment)) {
      setAchievments([...achievments, newAchievment]);
      setNewAchievment("");
    }
  };

  const removeAchievment = (achievment: string) => {
    setAchievments(achievments.filter((s) => s !== achievment));
  };
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = skills.indexOf(draggingItem);
    const targetIndex = skills.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...skills];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setSkills(updatedItems);
    }
  };
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setSkills([]);
    }
  };
  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">Internships</h6>
        <button
          onClick={() => {
            setNewExperienceModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {profileData?.internships?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
              setSkills(item?.skills);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.title}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.startDate && formatMonthYear(item?.startDate)}-
                  {item?.active
                    ? "Present"
                    : item?.endDate && formatMonthYear(item?.endDate)}
                </p>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <BsTrash size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                >
                  <LuPencil size={14} />
                </button>
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
                {item?.skills?.map((val: string, idx: number) => (
                  <Pill key={idx}>{val}</Pill>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newExperienceModal}
        onHide={() => setNewExperienceModal(false)}
        title="Internship"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="position"
                value={experienceData?.title}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="major_skill"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={experienceData.company}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={experienceData?.startDate || new Date()}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="M"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData?.endDate || new Date()}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  // dateFormat="M"
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={experienceData?.active}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={experienceData.description}
                  onChange={(e) =>
                    setExperienceData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved during
                  this internship
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you during this
                  internship
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setSkills([]);
                setAchievments([]);
                setNewExperienceModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  internships: [
                    ...profileData?.internships,
                    {
                      ...experienceData,
                      skills: skills,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setEditModal(false);
        }}
        title="Edit Internship Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={selectedExperience?.title}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Project Manager"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="major_skill"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={selectedExperience?.company}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of Company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedExperience?.startDate}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.endDate}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>

            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={selectedExperience?.active}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently working in this role
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={selectedExperience?.description}
                  onChange={(e) =>
                    setSelectedExperience((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="achievements"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Key Achievements</p>{" "}
                <p className="text-sm font-normal">
                  Show your achievments - add up to 5 feats you achieved during
                  this internship
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments?.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeAchievment(achievement)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  placeholder="Ex: Improved application performance by 30% through code refactoring"
                  className="flex-1 rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addAchievment}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="competencies"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-lg font-semibold mb-1">Skills</p>{" "}
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you used during this
                  internship
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {skills?.map((skill) => (
                  <div
                    key={skill}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, skill)}
                    onDrop={(e) => handleDrop(e, skill)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                      >
                        &times;
                      </button>
                      <span>{skill}</span>
                    </div>
                    <button className="hover:cursor-grab text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <div className="bg-white rounded-lg py-4 px-3 border border-stroke">
                <p className="text-sm text-zinc-500 mb-2">
                  Suggested skills based on your title
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {profileData?.suggestedSkills
                    ?.filter((skill: string) => !skills.includes(skill))
                    .map((skill: string) => (
                      <span
                        key={skill}
                        className="flex items-center text-sm px-3 py-1 border border-stroke rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            setSkills([...skills, skill]);
                          }}
                          className="ml-2 text-lg px-1 py-[1px] rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                        >
                          <BsPlus />
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setSkills([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedInternshipExperience =
                  profileData?.internships.map((exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          skills: skills,
                          keyAchievements: achievments,
                        }
                      : exp
                  );
                handleUpdateProfile({
                  internships: updatedInternshipExperience,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading" : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setSkills([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.position} ?`}
        desc={`Are you sure you want to delete this item from your internship experiences? This action is irreversible`}
        onProceed={() => {
          const updatedInternshipExperience = profileData?.internships.filter(
            (exp: any) => exp._id !== selectedExperience?._id
          );
          handleUpdateProfile({
            internships: updatedInternshipExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Education: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [educationData, setEducationData] = useState({
    degree: "",
    institution: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    active: false,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setEditModal(false);
      setDeleteModal(false);
    }
  };
  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">Education</h6>
        <button
          onClick={() => {
            setNewItemModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {profileData?.education?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="text-base max-sm:text-[15px] font-medium text-zinc-800 mb-0">
                  {item?.degree}
                </h6>
                <p className=" text-primary max-md:text-sm">
                  {item?.institution}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.startDate && formatMonthYear(item?.startDate)}-
                  {item?.active
                    ? "Present"
                    : item?.endDate && formatMonthYear(item?.endDate)}
                </p>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <BsTrash size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                >
                  <LuPencil size={14} />
                </button>
              </div>
            </div>

            <div>
              <p className="font-normal text-sm text-zinc-500">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Education"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Degree Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="degree"
                value={educationData?.degree}
                onChange={(e) =>
                  setEducationData((data: any) => ({
                    ...data,
                    degree: e.target.value,
                  }))
                }
                placeholder="Ex: Bachelor of Science in Computer Science"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="institution"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Institution{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="institution"
                value={educationData?.institution}
                onChange={(e) =>
                  setEducationData((data: any) => ({
                    ...data,
                    institution: e.target.value,
                  }))
                }
                placeholder="Enter name of Institution"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={educationData?.startDate}
                  onChange={(date) =>
                    setEducationData((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={educationData?.endDate}
                  onChange={(date) =>
                    setEducationData((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={educationData?.active}
                onChange={(e) =>
                  setEducationData((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am still schooling
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Ex: Graduated with Honors, GPA: 3.8/4.0"
                  value={educationData?.description}
                  onChange={(e) =>
                    setEducationData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewItemModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  education: [...profileData?.education, educationData],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Education Data"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Degree Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="degree"
                value={selectedItem?.degree}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    degree: e.target.value,
                  }))
                }
                placeholder="Ex: Bachelor of Science in Computer Science"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="institution"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Institution{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="institution"
                value={selectedItem?.institution}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    institution: e.target.value,
                  }))
                }
                placeholder="Enter name of institution"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedItem?.startDate}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedItem?.endDate}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={selectedItem?.active}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am still schooling
              </label>
            </div>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`Description`}
                  placeholder="Enter a short description"
                  value={selectedItem?.description}
                  onChange={(e) =>
                    setSelectedItem((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedEducation = profileData?.education.map(
                  (exp: any) =>
                    exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateProfile({
                  education: updatedEducation,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedItem?.degree} ?`}
        desc={`Are you sure you want to delete this item from your academic data? This action is irreversible`}
        onProceed={() => {
          const updatedEducation = profileData?.education.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateProfile({
            education: updatedEducation,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Certifications: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [certData, setCertData] = useState({
    name: "",
    institution: "",
    date: new Date(),
    _id: generateUniqueId(),
  });
  const [loading, setLoading] = useState(false);
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setEditModal(false);
      setDeleteModal(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">
          Certifications and Trainings
        </h6>
        <button
          onClick={() => {
            setNewItemModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {profileData?.certifications?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="text-base max-sm:text-[15px] font-medium text-zinc-800 mb-0">
                  {item?.name}
                </h6>
                <p className=" text-primary max-md:text-sm">
                  {item?.institution}
                </p>
              </div>
              <div className="flex items-center">
                {item?.date && (
                  <p className="text-xs text-zinc-500 lg:mr-4">
                    {formatMonthYear(item?.date)}
                  </p>
                )}
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <BsTrash size={14} />
                </button>
                <button
                  onClick={() => {
                    setEditModal(true);
                  }}
                  className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                >
                  <LuPencil size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Education"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={certData?.name}
                onChange={(e) =>
                  setCertData((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Ex: AWS Certified Solutions Architecture"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="platform"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company/Platform{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="platform"
                value={certData?.institution}
                onChange={(e) =>
                  setCertData((data: any) => ({
                    ...data,
                    institution: e.target.value,
                  }))
                }
                placeholder="Enter name of company or platform"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={certData?.date}
                  onChange={(date) =>
                    setCertData((s: any) => ({
                      ...s,
                      date: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewItemModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  certifications: [...profileData?.certifications, certData],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Certification Data"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={selectedItem?.name}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Ex: Bachelor of Science in Computer Science"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="platform"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company/Platform{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="platform"
                value={selectedItem?.institution}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    institution: e.target.value,
                  }))
                }
                placeholder="Enter name of institution or platform"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedItem?.date}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      date: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedCert = profileData?.certifications.map(
                  (exp: any) =>
                    exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateProfile({
                  certifications: updatedCert,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedItem?.name} ?`}
        desc={`Are you sure you want to delete this item from your certifications & trainings data? This action is irreversible`}
        onProceed={() => {
          const updatedCert = profileData?.certifications.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateProfile({
            certifications: updatedCert,
          });
        }}
      ></Delete>
    </div>
  );
};

export const ProfessionalReference: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [referenceData, setReferenceData] = useState({
    _id: generateUniqueId(),
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
  });
  const [loading, setLoading] = useState(false);
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setEditModal(false);
      setDeleteModal(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">
          Professional Reference
        </h6>
        <button
          onClick={() => {
            setNewItemModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex 2xl:flex-row flex-col w-full gap-4">
        {profileData?.references?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            className="border border-stroke h-full rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex w-full items-start gap-4">
              <span className="text-zinc-500 text-lg mt-2">
                {" "}
                <FaRegUserCircle size={18} />
              </span>
              <div className="flex w-full justify-between items-start mb-3">
                <div>
                  <h6 className="text-base max-sm:text-[15px] font-medium text-zinc-800 mb-0">
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
                    {item?.email && <span>(E)- {item?.email}</span>}
                    {item?.phone && (
                      <span className="ml-2">(P)- {item?.phone}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                    className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                  >
                    <BsTrash size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setEditModal(true);
                    }}
                    className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                  >
                    <LuPencil size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Professional Reference"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={referenceData?.name}
                onChange={(e) =>
                  setReferenceData((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Ex: Sarah Wilson"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Role{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={referenceData?.title}
                onChange={(e) =>
                  setReferenceData((data: any) => ({
                    ...data,
                    role: e.target.value,
                  }))
                }
                placeholder="Ex: Software Developer"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={referenceData?.company}
                onChange={(e) =>
                  setReferenceData((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div className="mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  pattern="/^\S+@\S+$/i"
                  value={referenceData?.email}
                  onChange={(e) =>
                    setReferenceData((data: any) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter email address"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-[0.4rem] flex items-center gap-1"
                >
                  Phone Number{" "}
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={referenceData?.phone}
                  onChange={(val) => {
                    setReferenceData((data: any) => ({
                      ...data,
                      phone: val,
                    }));
                  }}
                />
              </div>
            </FormGroup>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="relationship"
              >
                Relationship
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`relationship`}
                  placeholder="Ex: Team Lead (2020-2023)"
                  value={referenceData?.relationship}
                  onChange={(e) =>
                    setReferenceData((data: any) => ({
                      ...data,
                      relationship: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewItemModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  references: [...profileData?.references, referenceData],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Professional Reference Data"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Name{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={selectedItem?.name}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Ex: Bachelor of Science in Computer Science"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Role{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={selectedItem?.title}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Technical Lead"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Company{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="company"
                value={selectedItem?.company}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    company: e.target.value,
                  }))
                }
                placeholder="Enter name of company"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div className="mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  pattern="/^\S+@\S+$/i"
                  value={selectedItem?.email}
                  onChange={(e) =>
                    setReferenceData((data: any) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter email address"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-[0.4rem] flex items-center gap-1"
                >
                  Phone Number{" "}
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={selectedItem?.phone}
                  onChange={(val) => {
                    setReferenceData((data: any) => ({
                      ...data,
                      phone: val,
                    }));
                  }}
                />
              </div>
            </FormGroup>
            <div className="w-full mb-5">
              <label
                className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
                htmlFor="description"
              >
                Relationship
              </label>
              <div className="relative rounded-lg border border-stroke">
                <textarea
                  className={`
                     w-full 
                     py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                     focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                     dark:border-strokedark dark:bg-meta-4
                     dark:text-white dark:focus:border-primary `}
                  name={`relationship`}
                  placeholder="Ex: Team Lead (2020-2023)"
                  value={selectedItem?.relationship}
                  onChange={(e) =>
                    setSelectedItem((data: any) => ({
                      ...data,
                      relationship: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedData = profileData?.references.map((exp: any) =>
                  exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateProfile({
                  references: updatedData,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        title={`Delete ${selectedItem?.name} ?`}
        isLoading={loading}
        isLoadingText="Deleting"
        desc={`Are you sure you want to delete this item from your professional references data? This action is irreversible`}
        onProceed={() => {
          const updatedCert = profileData?.references.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateProfile({
            references: updatedCert,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Memberships: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [membershipData, setMembershipData] = useState({
    title: "",
    role: "",
    startDate: new Date(),
    endDate: new Date(),
    active: false,
    _id: generateUniqueId(),
  });
  const [loading, setLoading] = useState(false);
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setEditModal(false);
      setDeleteModal(false);
    }
  };
  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-zinc-800">
          Membership & Affiliation
        </h6>
        <button
          onClick={() => {
            setNewItemModal(true);
          }}
          className="hover:bg-slate-100/50 rounded-full p-2"
        >
          <BsPlusLg size={18} />
        </button>
      </div>
      <div className="flex 2xl:flex-row flex-col w-full gap-4">
        {profileData?.membership?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            className="border border-stroke h-full rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex w-full items-start gap-4">
              <span className="text-zinc-500 text-lg mt-2">
                {" "}
                <FaRegUserCircle size={18} />
              </span>
              <div className="flex w-full justify-between items-start mb-3">
                <div>
                  <h6 className="text-base max-sm:text-[15px] break-words font-medium text-zinc-800 mb-0">
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
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                    className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                  >
                    <BsTrash size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setEditModal(true);
                    }}
                    className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                  >
                    <LuPencil size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Membership & Affiliations"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={membershipData?.title}
                onChange={(e) =>
                  setMembershipData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Web Development"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Role{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="role"
                value={membershipData?.role}
                onChange={(e) =>
                  setMembershipData((data: any) => ({
                    ...data,
                    role: e.target.value,
                  }))
                }
                placeholder="Role: (Ex: Senior Member)"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={membershipData?.startDate}
                  onChange={(date) =>
                    setMembershipData((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={membershipData?.endDate}
                  onChange={(date) =>
                    setMembershipData((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={membershipData?.active}
                onChange={(e) =>
                  setMembershipData((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently active in this field
              </label>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setNewItemModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  membership: [...profileData?.membership, membershipData],
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Membership & Affiliation"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] max-sm:h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Title{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="title"
                value={selectedItem?.title}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Ex: Web Development"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Role{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="role"
                value={selectedItem?.role}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    role: e.target.value,
                  }))
                }
                placeholder="Ex: Senior Member"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <FormGroup>
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Start date{" "}
                  <span>
                    <FaStarOfLife className="text-danger" size={8} />
                  </span>
                </p>
                <DatePicker
                  selected={selectedItem?.startDate}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      startDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedItem?.endDate}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      endDate: date,
                    }))
                  }
                  showMonthYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                />
              </div>
            </FormGroup>
            <div className="gap-2 flex items-center text-sm font-medium text-gray-700 mb-7.5 w-full pl-1">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={selectedItem?.active}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    active: e.target.checked,
                  }))
                }
                className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
              />
              <label htmlFor="active" className="dark:text-slate-100 text-sm">
                I am currently active in this field
              </label>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <button
              disabled={loading}
              onClick={() => {
                const updatedData = profileData?.membership?.map((exp: any) =>
                  exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateProfile({
                  membership: updatedData,
                });
              }}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedItem?.title} ?`}
        desc={`Are you sure you want to delete this item from your membership data? This action is irreversible`}
        onProceed={() => {
          const updatedCert = profileData?.membership.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateProfile({
            membership: updatedCert,
          });
        }}
      ></Delete>
    </div>
  );
};
