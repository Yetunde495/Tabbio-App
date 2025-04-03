import { useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { LuPencil } from "react-icons/lu";
import Modal from "../../../components/modal";
import PhoneInput from "react-phone-number-input";
import { updateResume } from "../../../services/resumeServices";
import { toast } from "react-toastify";
import { FaCircle, FaLinkedin, FaPhone, FaStarOfLife } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp, IoMdLink } from "react-icons/io";
import { ReadMore } from "../../../components/ReadMore";
import { generateProfileSummary } from "../../../services/profileServices";
import sparkleIcon from "../../../assets/svg/ai-sparkle-2.svg";
import { Pill } from "../../../components/Pills";
import { BsPlus, BsPlusLg, BsTrash } from "react-icons/bs";
import { TbMenuOrder } from "react-icons/tb";
import { generateUniqueId } from "../../../lib/utils";
import { formatMonthYear } from "../../../lib/utils/formatters";
import { FormGroup } from "../../../components/form";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import Delete from "../../../components/modal/Delete";
import Button from "../../../components/Button";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";


export const ItemList = ({ items }: any) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  // Determine how many items to display based on `showAll`
  const displayedItems = showAll ? items : items.slice(0, 2);

  return (
    <div>
      <ul className="text-sm md:text-base font-normal space-y-2.5 font-segoe">
        {displayedItems.map((item: any, index: string) => (
          <li className="flex items-start gap-1 text-[#374151]" key={index}>
            <span>
              <FaCircle size={6} className="text-[#333333] mt-2 rounded-full" />
            </span>{" "}
            {item}
          </li>
        ))}
      </ul>
      {items.length > 2 && (
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
  CvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ CvData, setCvData }) => {
  const {} = useApp();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    email: CvData?.email,
    role: CvData?.role,
    phone: CvData?.phone,
    linkedIn: CvData?.linkedIn,
    name: CvData?.name
  });
  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(CvData?._id, data);
      setCvData(resp?.data?.resume);
      // console.log(resp?.data?.profile)
      toast.success("Update Successful!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  return (
    <div className="border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex md:flex-row flex-col gap-x-2 md:gap-x-6 gap-y-2 mb-8">
        <div>
          <div className="my-2 max-sm:my-0">
            <h1
              className={`font-semibold  text-[#111827] max-sm:gap-2 max-sm:w-full text-xl sm:text-2xl md:text-3xl lg:text-[32px] mb-1 flex gap-4 items-center`}
            >
              {CvData?.name}{" "}
              <span className="ml-auto">
                {" "}
                <button
                  onClick={() => {
                    setBasicDetails({
                      email: CvData?.email,
                      role: CvData?.role,
                      phone: CvData?.phone,
                      linkedIn: CvData?.linkedIn,
                      name: CvData?.name, 
                    })
                    setShowModal(true);
                  }}
                  className="hover:bg-slate-100/50 rounded-full max-md:py-0 p-2"
                >
                  <LuPencil size={18} />
                </button>
              </span>
            </h1>
            {CvData?.config?.role && (
              <h6
                className={`text-base text-zinc-600 uppercase`}
              >
                {CvData?.role}
              </h6>
            )}
            <div className="flex flex-wrap gap-x-3.5 max-sm:gap-x-2 sm:text-sm text-xs gap-y-1.5 text-[#5B5B5B] items-center mt-2">
              {CvData?.config?.phone && (
                <span className={`flex items-center gap-1`}>
                  <FaPhone /> {CvData?.phone}
                </span>
              )}

              {CvData?.config?.email && (
                <span className={`flex items-center gap-1`}>
                  <MdEmail /> {CvData?.email}
                </span>
              )}
              {CvData?.config?.location && (
                <span className={`flex items-center gap-1`}>
                  <IoLocationSharp /> {CvData?.location}
                </span>
              )}
              {CvData?.config?.linkedIn && (
                <span className={`flex items-center gap-1`}>
                  <FaLinkedin /> {CvData?.linkedIn}
                </span>
              )}
              {CvData?.config?.website && (
                <span className={`flex items-center gap-1`}>
                  <IoMdLink /> {CvData?.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={`Edit Profile`}
        size="max-w-[600px] w-full"
      >
        <div>
          <div className="no-scrollbar max-h-[65vh] max-sm:max-h-[70vh] overflow-y-auto px-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
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
                setShowModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleUpdateProfile(basicDetails);
              }}
              disabled={loading}
              className="bg-primary disabled:bg-opacity-50 rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const ProfessionalSummary: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [bio, setBio] = useState(resumeData?.professionalSummary);
  const [aiLoading, setAiLoading] = useState(false);
  const [editBioMode, setEditBioMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, {
        professionalSummary: bio,
      });
      setResumeData(resp?.data?.resume);
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
      setEditBioMode(true);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-2">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Profile Summary
        </h6>
        <div className="">
          <button
            disabled={aiLoading}
            onClick={() => {
              handleGenerateSummary();
            }}
            className="ai-secondary-button rounded-full py-1 px-3 flex text-sm font-semibold items-center gap-1.5"
          >
            <img src={sparkleIcon} alt="ai sparkle button" className="" />{" "}
            {aiLoading ? "Loading" : "Write with AI"}
          </button>
        </div>
      </div>
      <div className="text-sm md:text-base font-normal text-[#374151]">
        {resumeData?.professionalSummary && (
          <ReadMore text={resumeData?.professionalSummary} />
        )}
      </div>
      <button
        onClick={() => {
          setBio(resumeData?.professionalSummary);
          setEditBioMode(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Edit Summary
      </button>

      <Modal
        show={editBioMode}
        onHide={() => setEditBioMode(false)}
        title="Professional Summary"
        size="max-w-[700px] w-full"
      >
        <div className="">
          <div className="no-scrollbar overflow-y-auto pr-2">
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
              </div>
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

export const KeySkills: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [skills, setSkills] = useState<string[]>(resumeData?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
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

  const handleUpdateResume = async () => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, {
        skills: skills,
      });
      setResumeData(resp?.data?.resume);
      toast.success("Your Skills was successfully updated");
      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSkills(resumeData?.skills || [])
  },[])

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-2">
        <h6 className="md:text-[19px] text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Key Skills
        </h6>
      </div>
      <div className="py-2 w-full flex gap-2 mb-4 items-center flex-wrap">
        {resumeData?.skills?.length > 0 ?
          resumeData?.skills?.map((val: string, index: number) => (
            <Pill key={index}>{val}</Pill>
          )) : (
            <p className="text-center">Add your core professional skills</p>
          )}
      </div>
      <button
        onClick={() => {
          setSkills(resumeData?.skills || [])
          setEditMode(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add/Edit Skills
      </button>

      <Modal
        show={editMode}
        onHide={() => setEditMode(false)}
        title="Add/Edit Skills"
        size="max-w-[700px] w-full"
      >
        <div className="">
          <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-2">
            <div className="mb-4 bg-[#EFF6FF80] px-3 py-4 rounded-lg">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="text-sm font-normal">
                  Show your top skills - add up to 5 skills you want to be known
                  for. they will appear in your skill section
                </p>
              </label>
              <div className="flex flex-wrap gap-2 mt-4 border-b pb-1.5 border-neutral-200">
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
              <div className="mt-4 mb-5 flex relative">
                <input
                  type="text"
                  value={newSkill}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addSkill();
                    }
                  }}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-[9px] max-sm:py-[11px] bottom-0 absolute right-0 bg-indigo-500/15 text-indigo-500 text-sm rounded-r-md hover:bg-indigo-600/15"
                >
                  <BsPlusLg size={20} />
                </button>
                <button
                  type="button"
                  onClick={addSkill}
                  className="ml-2 px-4 py-2 hidden bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
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
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setEditMode(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              onClick={() => {
                handleUpdateResume();
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const ProfessionalExperience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
    id: generateUniqueId(),
  });
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

    const currentIndex = achievments.indexOf(draggingItem);
    const targetIndex = achievments.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...achievments];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setAchievments(updatedItems);
    }
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setAchievments([]);
    }
  };

  const handleExperienceDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.workExperience.indexOf(draggingItem);
    const targetIndex = resumeData?.workExperience.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.workExperience];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        workExperience: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        workExperience: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Work Experience
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.workExperience.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
            }}
            draggable={resumeData?.workExperience?.length > 1}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleExperienceDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } border-b border-stroke pb-2`}
          >
            <div className="flex justify-between w-full items-start max-sm:mb-0.5 mb-3">
              <div>
                <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.title}
                </h6>
                <p className=" text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide">
                  {item?.company}
                </p>
              </div>
              <div className="flex flex-wrap items-center ml-auto">
                <p className="text-sm text-zinc-[#6B7280] lg:mr-3 max-sm:hidden">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate
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
                {resumeData?.workExperience?.length > 1 && (
                  <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                    <RiExpandUpDownLine />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-zinc-[#6B7280] ml-auto max-sm:block hidden max-sm:mb-2.5">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.active
                    ? "Present"
                    : item?.endDate && formatMonthYear(item?.endDate)}
                </p>

            <div>
              <p className="text-sm md:text-base font-normal text-[#374151]">
                {item?.description}
              </p>
            </div>

            <div className="my-4">
              <ItemList items={item?.keyAchievements} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewExperienceModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Experience
      </button>

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
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, achievement)}
                    onDrop={(e) => handleDrop(e, achievement)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
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

                    <button className="hover:cursor-grab ml-auto text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  workExperience: [
                    ...resumeData?.workExperience,
                    {
                      ...experienceData,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              disabled={loading}
              onClick={() => {
                const updatedWorkExperience = resumeData?.workExperience.map(
                  (exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          keyAchievements: achievments,
                        }
                      : exp
                );
                handleUpdateResume({
                  workExperience: updatedWorkExperience,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.title} ?`}
        desc={`Are you sure you want to delete this item from your work experiences? This action is irreversible`}
        onProceed={() => {
          const updatedWorkExperience = resumeData?.workExperience.filter(
            (exp: any) => exp._id !== selectedExperience?._id
          );
          handleUpdateResume({
            workExperience: updatedWorkExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const VolunteerExperience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
    id: generateUniqueId(),
  });
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

    const currentIndex = achievments.indexOf(draggingItem);
    const targetIndex = achievments.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...achievments];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setAchievments(updatedItems);
    }
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setAchievments([]);
    }
  };

  const handleItemDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.volunteerExperience.indexOf(draggingItem);
    const targetIndex = resumeData?.volunteerExperience.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.volunteerExperience];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        volunteerExperience: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        volunteerExperience: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Volunteer Experience
        </h6>
      </div>

      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.volunteerExperience?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
            }}
            draggable={resumeData?.volunteerExperience?.length > 0}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleItemDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } border-b border-stroke pb-2`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.title}
                </h6>
                <p className=" md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.company}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-zinc-[#6B7280] lg:mr-3">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate
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
                {resumeData?.volunteerExperience?.length > 1 && (
                  <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                    <RiExpandUpDownLine />
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm md:text-base font-normal text-[#374151]">
                {item?.description}
              </p>
            </div>

            <div className="my-4">
              <p className="text-zinc-800 max-md:text-sm text-base font-medium mb-1">
                Key Achievements:
              </p>
              <ItemList items={item?.keyAchievements} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewExperienceModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Volunteer Experience
      </button>

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
                I am currently active in this volunteer role
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
                  Show your achievments - add up to 5 feats you achieved while
                  working with this organisation
                </p>
              </label>
              <div className="flex w-full flex-col gap-2 mt-4 border-b pb-1.5 divide-y divide-zinc-300 border-neutral-200">
                {achievments.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex w-full justify-between items-center text-sm px-3 py-1"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, achievement)}
                    onDrop={(e) => handleDrop(e, achievement)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
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

                    <button className="hover:cursor-grab ml-auto text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  volunteerExperience: [
                    ...resumeData?.volunteerExperience,
                    {
                      ...experienceData,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              disabled={loading}
              onClick={() => {
                const updatedVolunteerExperience =
                  resumeData?.volunteerExperience.map((exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          keyAchievements: achievments,
                        }
                      : exp
                  );
                handleUpdateResume({
                  volunteerExperience: updatedVolunteerExperience,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.title} ?`}
        desc={`Are you sure you want to delete this item from your volunteer experiences? This action is irreversible`}
        onProceed={() => {
          const updatedVolunteerExperience =
            resumeData?.volunteerExperience.filter(
              (exp: any) => exp._id !== selectedExperience?._id
            );
          handleUpdateResume({
            volunteerExperience: updatedVolunteerExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Education: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newEducationModal, setNewEducationModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState("");
  const [educationData, setEducationData] = useState({
    degree: "",
    institution: "",
    description: "",
    fieldOfStudy: "",
    location: "",
    gpa: "",
    minors: "",
    startDate: new Date(),
    endDate: new Date(),
    relevantCourseWork: [],
    active: false,
    hideEndDate: false,
    id: generateUniqueId(),
  });
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const addCourse = () => {
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      setEducationData((data: any) => ({
        ...data,
        relevantCourseWork: [...courses, newCourse],
      }));
      setNewCourse("");
    }
  };

  const updateCourse = () => {
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      console.log([...courses, newCourse]);
      setSelectedEducation((data: any) => ({
        ...data,
        relevantCourseWork: [...courses, newCourse],
      }));
      setNewCourse("");
    }
  };

  const removeSavedCourse = (minor: string) => {
    setCourses(courses.filter((s) => s !== minor));
    setSelectedEducation((data: any) => ({
      ...data,
      relevantCourseWork: courses.filter((s) => s !== minor),
    }));
  };

  const removeCourse = (minor: string) => {
    setCourses(courses.filter((s) => s !== minor));
    setEducationData((data: any) => ({
      ...data,
      relevantCourseWork: courses.filter((s) => s !== minor),
    }));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    if (resumeData?.education?.length > 1) {
      setDraggingItem(item);
      e.dataTransfer.setData("text/plain", "");
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewEducationModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setCourses([]);
    }
  };

  const handleExperienceDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.education.indexOf(draggingItem);
    const targetIndex = resumeData?.education.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.education];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        education: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        education: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Education
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.education.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedEducation(item);
              setCourses(item?.relevantCourseWork);
            }}
            draggable={resumeData?.education?.length > 1}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleExperienceDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`item ${item.id === draggingItem?.id ? "shadow-3" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.degree}
                </h6>
                <p className=" text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide lg:max-w-[90%]">
                  {item?.institution}{" "}
                  {item?.location && (
                    <span className="italic text-[13px]">
                      {" "}
                      | {item?.location}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center ml-auto">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.startDate && formatMonthYear(item?.startDate)}
                  {item?.hideEndDate && (
                    <span>
                      -{" "}
                      {item?.endDate
                        ? "Present"
                        : item?.endDate && formatMonthYear(item?.endDate)}
                    </span>
                  )}
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
                {resumeData?.education?.length > 1 && (
                  <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                    <RiExpandUpDownLine />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-3 space-y-2">
              {item?.gpa && (
                <p className="font-normal md:text-base text-sm text-[#374151]">
                  GPA: {item?.gpa}
                </p>
              )}

              {item?.minors && (
                <p className="text-sm md:text-base font-normal text-[#374151]">
                  Minors: {item?.minors}
                </p>
              )}
            </div>

           {item?.relevantCourseWork?.length > 0 && <div className="py-2 w-full flex gap-2 mb-4 items-center flex-wrap">
              <p className="font-normal text-sm md:text-base text-[#374151]">
                Relevant Courses:
              </p>
              {
                item?.relevantCourseWork?.map((val: string, index: number) => (
                  <Pill key={index}>{val}</Pill>
                ))}
            </div>}

          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewEducationModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Education
      </button>

      <Modal
        show={newEducationModal}
        onHide={() => setNewEducationModal(false)}
        title="Work Experience"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] space-y-7.5 max-sm:h-[70vh] overflow-y-auto pr-2">
            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="institution"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  School/University{" "}
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
                  placeholder="Ex: Stanford University"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="degree"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Degree{" "}
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
                  placeholder="Ex: Master of Arts"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="location"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Location{" "}
                </label>
                <input
                  type="text"
                  id="location"
                  value={educationData?.location}
                  onChange={(e) =>
                    setEducationData((data: any) => ({
                      ...data,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Enter School's state and country"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="field"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Field of Study{" "}
                </label>
                <input
                  type="text"
                  id="field"
                  value={educationData?.fieldOfStudy}
                  onChange={(e) =>
                    setEducationData((data: any) => ({
                      ...data,
                      fieldOfStudy: e.target.value,
                    }))
                  }
                  placeholder="Ex: Computer Science"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="location"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Minors{" "}
                </label>
                <input
                  type="text"
                  id="minors"
                  value={educationData?.minors}
                  onChange={(e) =>
                    setEducationData((data: any) => ({
                      ...data,
                      minors: e.target.value,
                    }))
                  }
                  placeholder="Ex: Product Design, Data Science"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="gpa"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  GPA <span className="text-zinc-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="gpa"
                  value={educationData?.gpa}
                  onChange={(e) =>
                    setEducationData((data: any) => ({
                      ...data,
                      gpa: e.target.value,
                    }))
                  }
                  placeholder="Ex: 3.8/4.0"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <div className="w-full">
              <FormGroup>
                <div className="lg:w-1/2 w-full">
                  <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                    Start Date{" "}
                  </label>
                  <DatePicker
                    selected={educationData.startDate}
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
                    // dateFormat="M"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                    End Date (or Expected)
                  </label>
                  <DatePicker
                    selected={educationData.endDate}
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
                    // dateFormat="yyyy"
                  />
                </div>
              </FormGroup>
              <div className="flex w-full text-[12px] items-start pb-2.5 -mt-2">
                <FaInfoCircle className="mr-1 mt-1 text-[#6B7280]" />
                <p className="text-sm m-0 font-normal text-[#111827]">
                  Consider hiding the end date to avoid potential age bias in
                  your application
                </p>
              </div>
              <div className="grid xl:grid-cols-2 grid-cols-1 w-full gap-3.5">
                <div className="gap-2  flex items-center text-sm text-[#111827] font-medium w-full pl-1">
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
                  <label htmlFor="active" className="text-sm">
                    I am currently schooling here
                  </label>
                </div>
                <div className="gap-2  flex items-center text-sm text-[#111827] font-medium w-full pl-1 xl:pl-5">
                  <input
                    type="checkbox"
                    id="hideEndDate"
                    name="hideEndDate"
                    checked={educationData?.hideEndDate}
                    onChange={(e) =>
                      setEducationData((data: any) => ({
                        ...data,
                        hideEndDate: e.target.checked,
                      }))
                    }
                    className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
                  />
                  <label htmlFor="hideEndDate" className="text-sm">
                    Hide End date
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="relevantCourseWork"
                className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1"
              >
                Relevant Coursework
              </label>
              {courses?.length > 0 && (
                <div className="flex w-full flex-col gap-2 mt-2 pb-1.5 divide-y divide-zinc-300">
                  {courses.map((course) => (
                    <div
                      key={course}
                      className="flex w-full justify-between items-center text-sm px-3 py-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => removeCourse(course)}
                          className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                        >
                          &times;
                        </button>
                        <span>{course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-1 mb-5 flex relative">
                <input
                  type="text"
                  id="relevantCourseWork"
                  value={newCourse}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addCourse();
                    }
                  }}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Ex: Data Management"
                  className="flex-1 max-sm:w-[75%] pr-12 rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addCourse}
                  className="ml-2 px-4 py-[9px] max-sm:py-[11px] bottom-0 absolute right-0 bg-indigo-500/15 text-indigo-500 text-sm rounded-r-md hover:bg-indigo-600/15"
                >
                  <BsPlusLg size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setCourses([]);
                setNewEducationModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  education: [...resumeData?.education, educationData],
                });
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setCourses([]);
          setEditModal(false);
        }}
        title="Edit Education"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar h-[65vh] space-y-7.5 max-sm:h-[70vh] overflow-y-auto pr-2">
            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="institution"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  School/University{" "}
                </label>
                <input
                  type="text"
                  id="institution"
                  value={selectedEducation?.institution}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      institution: e.target.value,
                    }))
                  }
                  placeholder="Ex: Stanford University"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="degree"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Degree{" "}
                </label>
                <input
                  type="text"
                  id="degree"
                  value={selectedEducation?.degree}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      degree: e.target.value,
                    }))
                  }
                  placeholder="Ex: Master of Arts"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="location"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Location{" "}
                </label>
                <input
                  type="text"
                  id="location"
                  value={selectedEducation?.location}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Enter School's state and country"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="field"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Field of Study{" "}
                </label>
                <input
                  type="text"
                  id="field"
                  value={selectedEducation?.fieldOfStudy}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      fieldOfStudy: e.target.value,
                    }))
                  }
                  placeholder="Ex: Computer Science"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="xl:w-1/2">
                <label
                  htmlFor="location"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  Minors{" "}
                </label>
                <input
                  type="text"
                  id="minors"
                  value={selectedEducation?.minors}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      minors: e.target.value,
                    }))
                  }
                  placeholder="Ex: Product Design, Data Science"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="xl:w-1/2">
                <label
                  htmlFor="gpa"
                  className="text-[#242424] text-base flex items-center gap-1"
                >
                  GPA <span className="text-zinc-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="gpa"
                  value={selectedEducation?.gpa}
                  onChange={(e) =>
                    setSelectedEducation((data: any) => ({
                      ...data,
                      gpa: e.target.value,
                    }))
                  }
                  placeholder="Ex: 3.8/4.0"
                  className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </FormGroup>

            <div className="w-full">
              <FormGroup>
                <div className="lg:w-1/2 w-full">
                  <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                    Start Date{" "}
                  </label>
                  <DatePicker
                    selected={selectedEducation?.startDate}
                    onChange={(date) =>
                      setSelectedEducation((s: any) => ({
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
                <div className="lg:w-1/2 w-full">
                  <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                    End Date (or Expected)
                  </label>
                  <DatePicker
                    selected={selectedEducation?.endDate}
                    onChange={(date) =>
                      setSelectedEducation((s: any) => ({
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
              <div className="flex w-full text-[12px] items-start pb-2.5 -mt-2">
                <FaInfoCircle className="mr-1 mt-1 text-[#6B7280]" />
                <p className="text-sm m-0 font-normal text-[#111827]">
                  Consider hiding the end date to avoid potential age bias in
                  your application
                </p>
              </div>
              <div className="grid xl:grid-cols-2 grid-cols-1 w-full gap-3.5">
                <div className="gap-2  flex items-center text-sm text-[#111827] font-medium w-full pl-1">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={selectedEducation?.active}
                    onChange={(e) =>
                      setSelectedEducation((data: any) => ({
                        ...data,
                        active: e.target.checked,
                      }))
                    }
                    className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
                  />
                  <label htmlFor="active" className="text-sm">
                    I am currently schooling here
                  </label>
                </div>
                <div className="gap-2  flex items-center text-sm text-[#111827] font-medium w-full pl-1 xl:pl-5">
                  <input
                    type="checkbox"
                    id="hideEndDate"
                    name="hideEndDate"
                    checked={selectedEducation?.hideEndDate}
                    onChange={(e) =>
                      setSelectedEducation((data: any) => ({
                        ...data,
                        hideEndDate: e.target.checked,
                      }))
                    }
                    className="text-sm rounded-sm border-stroke focus:border-stroke focus:ring-primary/40"
                  />
                  <label htmlFor="hideEndDate" className="text-sm">
                    Hide End date
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="relevantCourseWork"
                className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1"
              >
                Relevant Coursework
              </label>
              {courses?.length > 0 && (
                <div className="flex w-full flex-col gap-2 mt-2 pb-1.5 divide-y divide-zinc-300">
                  {courses?.map((course) => (
                    <div
                      key={course}
                      className="flex w-full justify-between items-center text-sm px-3 py-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => removeSavedCourse(course)}
                          className="ml-2 text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700"
                        >
                          &times;
                        </button>
                        <span>{course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-1 mb-5 flex relative">
                <input
                  type="text"
                  id="relevantCourseWork"
                  value={newCourse}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateCourse();
                    }
                  }}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Ex: Data Management"
                  className="flex-1 max-sm:w-[75%] pr-12 rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={updateCourse}
                  className="ml-2 px-4 py-[9px] max-sm:py-[11px] bottom-0 absolute right-0 bg-indigo-500/15 text-indigo-500 text-sm rounded-r-md hover:bg-indigo-600/15"
                >
                  <BsPlusLg size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setCourses([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              disabled={loading}
              onClick={() => {
                const updatedEducation = resumeData?.education.map((exp: any) =>
                  exp._id === selectedEducation?._id ? selectedEducation : exp
                );
                handleUpdateResume({
                  education: updatedEducation,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setCourses([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedEducation?.degree} ?`}
        desc={`Are you sure you want to delete this item from your education history? This action is irreversible`}
        onProceed={() => {
          const updatedEducation = resumeData?.education.filter(
            (exp: any) => exp._id !== selectedEducation?._id
          );
          handleUpdateResume({
            education: updatedEducation,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Certifications: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [certData, setCertData] = useState({
    name: "",
    institution: "",
    date: new Date(),
    id: generateUniqueId(),
  });
  const [loading, setLoading] = useState(false);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    if (resumeData?.education?.length > 1) {
      setDraggingItem(item);
      e.dataTransfer.setData("text/plain", "");
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
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

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.certifications.indexOf(draggingItem);
    const targetIndex = resumeData?.certifications.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.certifications];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        certifications: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        certifications: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Certifications and Trainings
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.certifications?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            draggable={resumeData?.certifications?.length > 1}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`item ${item.id === draggingItem?.id ? "shadow-3" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.name}
                </h6>
                <p className="text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide">
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
                {resumeData?.certifications?.length > 1 && (
                  <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                    <RiExpandUpDownLine />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewItemModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Certification/Training
      </button>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Add New Certification/Training"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
                Institution/Platform{" "}
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  certifications: [...resumeData?.certifications, certData],
                });
              }}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Certification/Training"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
            <Button
              disabled={loading}
              onClick={() => {
                const updatedCert = resumeData?.certifications.map((exp: any) =>
                  exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateResume({
                  resumeData: updatedCert,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
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
          const updatedCert = resumeData?.certifications.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateResume({
            certifications: updatedCert,
          });
        }}
      ></Delete>
    </div>
  );
};

export const CareerHighlights: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [careerData, setCareerData] = useState({
    id: generateUniqueId,
    title: "",
    description: "",
    thumbnail: "",
    skills: [],
    technology: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    if (resumeData?.careerHighlights?.length > 1) {
      setDraggingItem(item);
      e.dataTransfer.setData("text/plain", "");
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setDeleteModal(false);
      setEditModal(false);
    }
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.careerHighlights.indexOf(draggingItem);
    const targetIndex = resumeData?.careerHighlights.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.careerHighlights];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        careerHighlights: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        careerHighlights: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Career Highlights
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.careerHighlights &&
          resumeData.careerHighlights.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCareer(item);
              }}
              draggable={resumeData?.careerHighlights?.length > 1}
              onDragStart={(e) => handleDragStart(e, item)}
              onDrop={(e) => handleDrop(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              className={`item ${
                item?._id === draggingItem?._id ? "shadow-3" : ""
              }`}
            >
              <div>
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0 break-words">
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
                        setEditModal(true);
                      }}
                      className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                    >
                      <LuPencil size={14} />
                    </button>
                    {resumeData?.careerHighlights?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm md:text-base font-normal text-[#374151] pb-4">
                    {item?.description}
                  </p>

                  <p className="font-normal text-sm md:text-base text-blue-600  pb-4">
                    {item?.link}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => {
          setNewItemModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Career Highlight
      </button>

      <Modal
        show={newItemModal}
        onHide={() => {
          setNewItemModal(false);
        }}
        title="Career Highlight"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
            <div className="mb-6">
              <label
                htmlFor="link"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Link{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="link"
                value={careerData?.link}
                onChange={(e) =>
                  setCareerData((data: any) => ({
                    ...data,
                    link: e.target.value,
                  }))
                }
                placeholder="Attach a github or website link to this project"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
              <Button
                onClick={() => {
                  handleUpdateResume({
                    careerHighlights: [
                      ...resumeData?.careerHighlights,
                      careerData,
                    ],
                  });
                  console.log(careerData);
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </Button>
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
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
            <div className="mb-6">
              <label
                htmlFor="link"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Link{" "}
              </label>
              <input
                type="text"
                id="link"
                value={selectedCareer?.link}
                onChange={(e) =>
                  setSelectedCareer((data: any) => ({
                    ...data,
                    link: e.target.value,
                  }))
                }
                placeholder="Attach a github or website link to this project"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
            <Button
              disabled={loading}
              onClick={() => {
                const updatedCareerHighlight = resumeData?.careerHighlights.map(
                  (exp: any) =>
                    exp._id === selectedCareer?._id ? selectedCareer : exp
                );
                handleUpdateResume({
                  careerHighlights: updatedCareerHighlight,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>

      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        title={`Delete ${selectedCareer?.title} ?`}
        desc={`Are you sure you want to delete this item from your career highlights? This action is irreversible`}
        isLoading={loading}
        isLoadingText="Deleting"
        onProceed={() => {
          const updatedCareerHighlights = resumeData?.careerHighlights.filter(
            (exp: any) => exp._id !== selectedCareer?._id
          );
          handleUpdateResume({
            careerHighlights: updatedCareerHighlights,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Memberships: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
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
    id: generateUniqueId(),
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
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
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Membership & Affiliation
        </h6>
      </div>

      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.membership?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            <div className="flex w-full items-start gap-4">
              <div className="flex w-full justify-between items-start mb-3">
                <div>
                  <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0 break-words">
                    {item?.title}
                  </h6>
                  <p className=" text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide mb-2">
                    {item?.role}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-zinc-500 lg:mr-4">
                    {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate
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
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewItemModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Membership
      </button>

      <Modal
        show={newItemModal}
        onHide={() => setNewItemModal(false)}
        title="Membership & Affiliations"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  membership: [
                    ...(resumeData?.membership || []),
                    membershipData,
                  ],
                });
              }}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
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
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
            <Button
              disabled={loading}
              onClick={() => {
                const updatedData = resumeData?.membership?.map((exp: any) =>
                  exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateResume({
                  membership: updatedData,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
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
          const updatedCert = resumeData?.membership.filter(
            (exp: any) => exp._id !== selectedItem?._id
          );
          handleUpdateResume({
            membership: updatedCert,
          });
        }}
      ></Delete>
    </div>
  );
};

export const ProfessionalReference: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [referenceData, setReferenceData] = useState({
    id: generateUniqueId(),
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
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
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
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Professional Reference
        </h6>
      </div>
      <div className="flex 2xl:flex-row flex-col w-full gap-4">
        {resumeData?.references?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(item);
            }}
            className="flex flex-col gap-3 font-segoe"
          >
            <div className="flex w-full items-start gap-4">
              <div className="flex w-full justify-between items-start mb-3">
                <div>
                  <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0 break-words">
                    {item?.name}
                  </h6>
                  <p className="text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide mb-2">
                    {item?.title}
                  </p>
                  <p className=" text-[#374151] max-md:text-sm mb-1">
                    {item?.company}
                  </p>
                  <p className=" text-[#374151] max-md:text-sm">
                    Relationship: {item?.relationship}
                  </p>
                  <p className="text-[#374151] max-md:text-sm mt-2.5">
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

      <button
        onClick={() => {
          setNewItemModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Reference
      </button>

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
                    title: e.target.value,
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateProfile({
                  references: [...resumeData?.references, referenceData],
                });
              }}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
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
            <Button
              disabled={loading}
              onClick={() => {
                const updatedData = resumeData?.references.map((exp: any) =>
                  exp._id === selectedItem?._id ? selectedItem : exp
                );
                handleUpdateProfile({
                  references: updatedData,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
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
          const updatedCert = resumeData?.references.filter(
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

export const Internships: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
    id: generateUniqueId(),
  });
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

    const currentIndex = achievments.indexOf(draggingItem);
    const targetIndex = achievments.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...achievments];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setAchievments(updatedItems);
    }
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewExperienceModal(false);
      setEditModal(false);
      setDeleteModal(false);
      setAchievments([]);
    }
  };

  const handleExperienceDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.internships.indexOf(draggingItem);
    const targetIndex = resumeData?.internships.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.internships];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        internships: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        internships: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Internships
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.internships.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.keyAchievements);
            }}
            draggable={resumeData?.internships?.length > 1}
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleExperienceDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } border-b border-stroke pb-2`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0">
                  {item?.title}
                </h6>
                <p className=" text-[#374151] md:text-base text-sm font-semibold leading-6 tracking-wide">
                  {item?.company}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-zinc-[#6B7280] lg:mr-3">
                  {item?.startDate && formatMonthYear(item?.startDate)} -{" "}
                  {item?.endDate
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
                {resumeData?.internships?.length > 1 && (
                  <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                    <RiExpandUpDownLine />
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm md:text-base font-normal text-[#374151]">
                {item?.description}
              </p>
            </div>

            <div className="my-4">
              <ItemList items={item?.keyAchievements} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setNewExperienceModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Internship
      </button>

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
                I am currently interning in this role
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
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, achievement)}
                    onDrop={(e) => handleDrop(e, achievement)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
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

                    <button className="hover:cursor-grab ml-auto text-zinc-600 text-lg px-1.5 py-[1px]">
                      <TbMenuOrder />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-5 flex">
                <input
                  type="text"
                  value={newAchievment}
                  onChange={(e) => setNewAchievment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
            <Button
              disabled={loading}
              onClick={() => {
                handleUpdateResume({
                  internships: [
                    ...resumeData?.internships,
                    {
                      ...experienceData,
                      keyAchievements: achievments,
                    },
                  ],
                });
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => {
          setAchievments([]);
          setEditModal(false);
        }}
        title="Edit Internship"
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
                I am currently interning in this role
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addAchievment();
                    }
                  }}
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
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setAchievments([]);
                setEditModal(false);
              }}
              className="text-zinc-600 hover:scale-105 font-medium py-1.5 px-4"
            >
              Close
            </button>
            <Button
              disabled={loading}
              onClick={() => {
                const updatedWorkExperience = resumeData?.internships.map(
                  (exp: any) =>
                    exp._id === selectedExperience?._id
                      ? {
                          ...selectedExperience,
                          keyAchievements: achievments,
                        }
                      : exp
                );
                handleUpdateResume({
                  internships: updatedWorkExperience,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setAchievments([]);
          setDeleteModal(false);
        }}
        isLoading={loading}
        isLoadingText="Deleting"
        title={`Delete ${selectedExperience?.title} ?`}
        desc={`Are you sure you want to delete this item from your internships? This action is irreversible`}
        onProceed={() => {
          const updatedWorkExperience = resumeData?.workExperience.filter(
            (exp: any) => exp._id !== selectedExperience?._id
          );
          handleUpdateResume({
            internships: updatedWorkExperience,
          });
        }}
      ></Delete>
    </div>
  );
};

export const Projects: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectData, setProjectData] = useState({
    id: generateUniqueId,
    name: "",
    description: "",
    tools: "",
    link: "",
    year: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    if (resumeData?.projects?.length > 1) {
      setDraggingItem(item);
      e.dataTransfer.setData("text/plain", "");
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleUpdateResume = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateResume(resumeData?._id, data);
      setResumeData(resp?.data?.resume);
      toast.success("Successfull!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setNewItemModal(false);
      setDeleteModal(false);
      setEditModal(false);
    }
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = resumeData?.projects.indexOf(draggingItem);
    const targetIndex = resumeData?.projects.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...resumeData?.projects];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);
      handleUpdateResume({
        projects: updatedItems,
      });
      setResumeData((data: any) => ({
        ...data,
        projects: updatedItems,
      }));
    }
  };

  return (
    <div className="relative border border-stroke rounded-xl bg-gradient-3 py-4 max-sm:px-2 px-4">
      <div className="flex w-full border-b border-stroke pb-1 justify-between items-center mb-3">
        <h6 className="text-lg leading-6 tracking-wide font-semibold uppercase text-[#111827] font-segoe">
          Projects
        </h6>
      </div>
      <div className="flex flex-col gap-3 font-segoe">
        {resumeData?.projects &&
          resumeData.projects.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setSelectedProject(item);
              }}
              draggable={resumeData?.projects?.length > 1}
              onDragStart={(e) => handleDragStart(e, item)}
              onDrop={(e) => handleDrop(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              className={`item ${
                item?._id === draggingItem?._id ? "shadow-3" : ""
              }`}
            >
              <div>
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <h6 className="md:text-lg text-base font-semibold text-[#111827] mb-0 break-words">
                      {item?.name}
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
                        setEditModal(true);
                      }}
                      className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                    >
                      <LuPencil size={14} />
                    </button>
                    {resumeData?.projects?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm md:text-base font-normal text-[#374151] pb-4">
                    {item?.description}
                  </p>

                  <p className="font-normal text-sm md:text-base text-blue-600  pb-4">
                    {item?.link}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => {
          setNewItemModal(true);
        }}
        className="hover:bg-slate-100/50 w-full flex justify-center font-medium text-[#242424] rounded-md border border-[#B1B1B1] border-dashed p-2"
      >
        Add New Project
      </button>

      <Modal
        show={newItemModal}
        onHide={() => {
          setNewItemModal(false);
        }}
        title="Add New Project"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
                value={projectData?.name}
                onChange={(e) =>
                  setProjectData((data: any) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter the name of your Project"
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
                  value={projectData?.description}
                  onChange={(e) =>
                    setProjectData((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="link"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Link{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="link"
                value={projectData?.link}
                onChange={(e) =>
                  setProjectData((data: any) => ({
                    ...data,
                    link: e.target.value,
                  }))
                }
                placeholder="Attach a github or website link to this project"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
              <Button
                onClick={() => {
                  handleUpdateResume({
                    projects: [...resumeData?.projects, projectData],
                  });
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
        title="Edit Project"
        size="max-w-[700px] w-full"
      >
        <div>
          <div className="no-scrollbar max-sm:h-[70vh] overflow-y-auto pr-2">
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
                value={selectedProject?.name}
                onChange={(e) =>
                  setSelectedProject((data: any) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter name of project"
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
                  value={selectedProject?.description}
                  onChange={(e) =>
                    setSelectedProject((data: any) => ({
                      ...data,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="link"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                Link{" "}
              </label>
              <input
                type="link"
                id="link"
                value={selectedProject?.link}
                onChange={(e) =>
                  setSelectedProject((data: any) => ({
                    ...data,
                    link: e.target.value,
                  }))
                }
                placeholder="Attach a github or website link to this project"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
            <Button
              disabled={loading}
              onClick={() => {
                const updatedProject = resumeData?.projects.map((exp: any) =>
                  exp._id === selectedProject?._id ? selectedProject : exp
                );
                handleUpdateResume({
                  projects: updatedProject,
                });
              }}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Modal>

      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        title={`Delete ${selectedProject?.title} ?`}
        desc={`Are you sure you want to delete this item from your projects? This action is irreversible`}
        isLoading={loading}
        isLoadingText="Deleting"
        onProceed={() => {
          const updatedProjects = resumeData?.projects.filter(
            (exp: any) => exp._id !== selectedProject?._id
          );
          handleUpdateResume({
            projects: updatedProjects,
          });
        }}
      ></Delete>
    </div>
  );
};
