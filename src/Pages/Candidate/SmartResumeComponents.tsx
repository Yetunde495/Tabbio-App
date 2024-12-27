import { useState } from "react";
import { ReadMore } from "../../components/ReadMore";
import Modal from "../../components/modal";
import { LuPencil } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi";
import { Pill } from "../../components/Pills";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsPlus, BsPlusLg, BsTrash } from "react-icons/bs";
import { FaCircle, FaStarOfLife } from "react-icons/fa6";
import { FormGroup } from "../../components/form";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { TbMenuOrder } from "react-icons/tb";
import Delete from "../../components/modal/Delete";
import PhoneInput from "react-phone-number-input";
import { FaRegUserCircle } from "react-icons/fa";

const ItemList = ({ items }: any) => {
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

export const ProfileSummary: React.FC<{ resumeData: any }> = ({
  resumeData,
}) => {
  const [bio, setBio] = useState(resumeData?.professional_summary);
  const [editBioMode, setEditBioMode] = useState(false);
  const [showCompetencies, setShowCompetencies] = useState(false);

  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [majorSkill, setMajorSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
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
        <ReadMore text={resumeData?.professional_summary} />

        <div className="w-full flex gap-x-3 max-md:flex-wrap gap-y-2 items-center">
          <Pill>{8}+ Years of Experience</Pill>
          <Pill variant="primary">{"Senior"} Level</Pill>
          <Pill variant="none">{"Full Stack Development"}</Pill>
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
              <Pill>System Architecture</Pill> <Pill>Cloud Infrastructure</Pill>{" "}
              <Pill>Agile/Scrum</Pill> <Pill>DevOps</Pill>{" "}
              <Pill>API Design</Pill> <Pill>Performance Optimization</Pill>
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
                  <button className="relative inline-flex items-center justify-center text-sm p-[2px] mb-2 me-2 overflow-hidden font-medium rounded-full group bg-gradient-to-br from-[#2563EB] to-[#9333EA] group-hover:from-[#9333EA] group-hover:to-[#2563EB] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                      <p className="text-center text-xs gap-1 items-center bg-gradient-to-r group-hover:text-white from-[#2563EB] text-transparent bg-clip-text to-[#9333EA] inline-flex">
                        <HiOutlineSparkles className="text-primary group-hover:text-white" />{" "}
                        WRITING ASSISTANT
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
                    <option value="beginner">Beginner</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
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
                      {resumeData?.suggested_skills
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const WorkExperience: React.FC<{ profileData: any }> = ({
  profileData,
}) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    position: "",
    company: "",
    description: "",
    key_achievments: [],
    start_year: new Date(),
    end_year: new Date(),
    skills: [],
    active: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

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

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
          Work Experience
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
        {profileData?.work_experience.map((item: any, index: number) => (
          <div
            key={index}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.key_achievments);
              setSkills(item?.skills);
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.position}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.start_year}-
                  {item?.end_year === new Date().getFullYear().toString()
                    ? "Present"
                    : item?.end_year}
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
              <ItemList items={item?.key_achievments} />
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
                id="position"
                value={experienceData.position}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={experienceData.start_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData.end_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
              onClick={() => console.log(experienceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
                value={selectedExperience?.position}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={selectedExperience?.start_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.end_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
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
        title={`Delete ${selectedExperience?.position} ?`}
        desc={`Are you sure you want to delete this item from your work experiences? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};

export const VolunteerExperience: React.FC<{ profileData: any }> = ({
  profileData,
}) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    position: "",
    company: "",
    description: "",
    key_achievments: [],
    start_year: new Date(),
    end_year: new Date(),
    skills: [],
    active: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

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

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
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
        {profileData?.volunteer_experience.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.key_achievments);
              setSkills(item?.skills);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.position}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.start_year}-
                  {item?.end_year === new Date().getFullYear().toString()
                    ? "Present"
                    : item?.end_year}
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
              <ItemList items={item?.key_achievments} />
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
                value={experienceData.position}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={experienceData.start_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData.end_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
              onClick={() => console.log(experienceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
                id="position"
                value={selectedExperience?.position}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={selectedExperience?.start_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.end_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
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
        title={`Delete ${selectedExperience?.position} ?`}
        desc={`Are you sure you want to delete this item from your volunteer experiences? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};

export const Internships: React.FC<{ profileData: any }> = ({
  profileData,
}) => {
  const [newExperienceModal, setNewExperienceModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [achievments, setAchievments] = useState<string[]>([]);
  const [experienceData, setExperienceData] = useState({
    position: "",
    company: "",
    description: "",
    key_achievments: [],
    start_year: new Date(),
    end_year: new Date(),
    skills: [],
    active: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newAchievment, setNewAchievment] = useState("");
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

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

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
          Internships
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
        {profileData?.internships?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setSelectedExperience(item);
              setAchievments(item?.key_achievments);
              setSkills(item?.skills);
            }}
            className="border border-stroke rounded-lg shadow-sm bg-white p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.position}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.start_year}-
                  {item?.end_year === new Date().getFullYear().toString()
                    ? "Present"
                    : item?.end_year}
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
              <ItemList items={item?.key_achievments} />
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
                value={experienceData.position}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={experienceData.start_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData.end_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
              onClick={() => console.log(experienceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
                id="position"
                value={selectedExperience?.position}
                onChange={(e) =>
                  setSelectedExperience((data: any) => ({
                    ...data,
                    position: e.target.value,
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
                  selected={selectedExperience?.start_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedExperience?.end_year}
                  onChange={(date) =>
                    setSelectedExperience((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
                  {profileData?.suggested_skills
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
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
        title={`Delete ${selectedExperience?.position} ?`}
        desc={`Are you sure you want to delete this item from your internship experiences? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};

export const Education: React.FC<{ profileData: any }> = ({ profileData }) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [experienceData, setExperienceData] = useState({
    degree: "",
    school: "",
    description: "",
    start_year: new Date(),
    end_year: new Date(),
    active: false,
  });

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
          Education
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
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.degree}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.school}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">
                  {item?.start_year}-{item?.active ? "Present" : item?.end_year}
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
                value={experienceData?.degree}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
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
                htmlFor="major_skill"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                School{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="school"
                value={experienceData?.school}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    school: e.target.value,
                  }))
                }
                placeholder="Enter name of School"
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
                  selected={experienceData.start_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={experienceData.end_year}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
              onClick={() => console.log(experienceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
                htmlFor="school"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                School{" "}
                <span>
                  <FaStarOfLife className="text-danger" size={8} />
                </span>
              </label>
              <input
                type="text"
                id="school"
                value={selectedItem?.school}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    school: e.target.value,
                  }))
                }
                placeholder="Enter name of school"
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
                  selected={selectedItem?.start_year}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <DatePicker
                  selected={selectedItem?.end_year}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      end_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        title={`Delete ${selectedItem?.degree} ?`}
        desc={`Are you sure you want to delete this item from your academic data? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};

export const Certifications: React.FC<{ profileData: any }> = ({
  profileData,
}) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [experienceData, setExperienceData] = useState({
    title: "",
    platform: "",
    date: new Date(),
  });

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
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
                <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                  {item?.title}
                </h6>
                <p className=" text-primary max-md:text-sm">{item?.platform}</p>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-zinc-500 lg:mr-4">{item?.date}</p>
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
                id="degree"
                value={experienceData?.title}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    degree: e.target.value,
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
                value={experienceData?.platform}
                onChange={(e) =>
                  setExperienceData((data: any) => ({
                    ...data,
                    school: e.target.value,
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
                  selected={experienceData?.date}
                  onChange={(date) =>
                    setExperienceData((s: any) => ({
                      ...s,
                      start_year: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
              onClick={() => console.log(experienceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
                placeholder="Ex: Bachelor of Science in Computer Science"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="school"
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
                value={selectedItem?.platform}
                onChange={(e) =>
                  setSelectedItem((data: any) => ({
                    ...data,
                    school: e.target.value,
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
                  selected={selectedItem?.date}
                  onChange={(date) =>
                    setSelectedItem((s: any) => ({
                      ...s,
                      date: date,
                    }))
                  }
                  showYearPicker
                  icon={<FcCalendar />}
                  showIcon
                  toggleCalendarOnIconClick
                  showPopperArrow={false}
                  dateFormat="yyyy"
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
            </button>
          </div>
        </div>
      </Modal>
      <Delete
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
        }}
        title={`Delete ${selectedItem?.title} ?`}
        desc={`Are you sure you want to delete this item from your certifications & trainings data? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};

export const ProfessionalReference: React.FC<{ profileData: any }> = ({
  profileData,
}) => {
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [referenceData, setReferenceData] = useState({
    id: "",
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
  });

  return (
    <div className="relative">
      <div className="flex w-full justify-between items-center mb-2">
        <h6 className="text-lg md:text-xl font-medium text-zinc-800">
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
        {profileData?.professional_reference?.map(
          (item: any, index: number) => (
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
                    <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                      {item?.name}
                    </h6>
                    <p className=" text-primary max-md:text-sm mb-2">
                      {item?.role}
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
          )
        )}
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
                value={referenceData?.role}
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
                id="role"
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
              onClick={() => console.log(referenceData)}
              className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium"
            >
              Save
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
            <button className="bg-primary rounded-full text-white hover:scale-105 py-1.5 px-4 font-medium">
              Update
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
        desc={`Are you sure you want to delete this item from your professional references data? This action is irreversible`}
        onProceed={() => {}}
      ></Delete>
    </div>
  );
};
