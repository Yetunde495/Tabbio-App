import { FormGroup } from "../../../components/form";
import { useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import Button from "../../../components/Button";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaRegCircle,
} from "react-icons/fa6";
import sparkleIcon from "../../../assets/svg/ai-sparkle.svg";
import Modal from "../../../components/modal";
import { RiRobot2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { generateWorkExperienceSummary } from "../../../services/profileServices";
import { generateUniqueId } from "../../../lib/utils";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { MdAddCircle } from "react-icons/md";
import { generateExperienceData } from "../../../services/resumeServices";
import FieldInput from "../../../components/form/Input";
import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
  CvData: any;
  setCvData: any;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  completeStep: () => void;
  completed: boolean;
};

const WorkExperience: React.FC<Props> = ({
  CvData,
  setCvData,
  activeStep,
  setActiveStep,
  completeStep,
  //   completed,
}) => {
  const {} = useApp();
  const [aiLoading, setAiLoading] = useState(false);
  const [items, setItems] = useState<any[]>(CvData?.workExperience);
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [role, setRole] = useState("");
  const [achievments, setAchievments] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newAchievment, setNewAchievment] = useState("");
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
  const [aiFormdata, setAiFormData] = useState({
    jobRole: "",
    experienceLevel: "",
  });
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>(
    []
  );

  const addAchievment = () => {
    if (newAchievment && !achievments.includes(newAchievment)) {
      setAchievments([...achievments, newAchievment]);
      setExperienceData((data: any) => ({
        ...data,
        keyAchievements: [...achievments, newAchievment],
      }));
      setNewAchievment("");
    }
  };

  const removeAchievment = (achievment: string) => {
    setAchievments(achievments.filter((s) => s !== achievment));
    setExperienceData((data: any) => ({
      ...data,
      keyAchievements: achievments.filter((s) => s !== achievment),
    }));
  };

  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setCvData((data: any) => ({
      ...data,
      workExperience: updatedItems,
    }));
  };

  const handleGenerateSummary = async () => {
    if (!experienceData?.title) {
      toast.error("Please enter a job role");
      return;
    }
    setAiLoading(true);
    try {
      const resp = await generateWorkExperienceSummary({
        jobRole: experienceData?.title,
      });
      setExperienceData((data: any) => ({
        ...data,
        description: resp?.data?.summary,
      }));
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateAchievements = async () => {
    setAiLoading(true);
    try {
      const resp = await generateExperienceData({
        ...aiFormdata,
        workSummary: experienceData?.description || "",
      });
      setAiDescriptions(resp?.data?.points?.bulletPoints);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Handler to add new experience
  const addExperience = () => {
    const itemIndex = items.findIndex((item) => item.id === currentItem.id);

    if (itemIndex !== -1) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === currentItem.id ? { ...item, ...experienceData } : item
      );
      setItems(updatedItems);
      setCvData((data: any) => ({
        ...data,
        workExperience: updatedItems,
      }));
    } else {
      // Add new item
      setItems([...items, experienceData]);
      setCvData((data: any) => ({
        ...data,
        workExperience: [...CvData?.workExperience, experienceData],
      }));
    }
    setCurrentItem(null);
    setAchievments([]);
  };

  const addNewExperience = () => {
    const id = generateUniqueId();
    const newItem = {
      title: "",
      company: "",
      description: "",
      keyAchievements: [],
      startDate: new Date(),
      endDate: new Date(),
      skills: [],
      active: false,
      id: id,
    };
    if (CvData?.workExperience?.length > 0) {
      setItems((item: any) => [...item, newItem]);
    } else {
      setItems([newItem]);
    }
    setCurrentItem(newItem);
    setExperienceData(newItem);
  };

  useEffect(() => {
    if (CvData?.workExperience?.length > 0) {
      setItems(CvData?.workExperience);
    } else {
      addNewExperience();
    }
  }, [CvData?.workExperience]);

  return (
    <div className="py-4">
      <div className="flex flex-col gap-5">
        {items.map((item, _index) => (
          <div key={item?.id}>
            {currentItem?.id !== item?.id && (
              <div className="flex shadow-card p-3 rounded justify-between w-full gap-4 items-start mb-3">
                <div>
                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                    {item?.title}
                  </h6>
                  <p className="max-md:text-sm italic text-zinc-600">
                    {item?.company}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      handleRemove(item?.id);
                    }}
                    className="hover:bg-danger/10 hover:text-danger text-zinc-500 rounded-full h-8 w-8 flex items-center justify-center"
                  >
                    <BsTrash size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setExperienceData(item);
                      setAchievments(item?.keyAchievements);
                      setCurrentItem(item);
                    }}
                    className="hover:bg-primary/10 hover:text-primary rounded-full text-zinc-500 h-8 w-8 flex items-center justify-center"
                  >
                    <LuPencil size={14} />
                  </button>
                </div>
              </div>
            )}
            {item?.id === currentItem?.id && (
              <div className="space-y-7.5">
                <div className="">
                  <label
                    htmlFor="company"
                    className="text-[#242424] text-base flex items-center gap-1"
                  >
                    Where did you work?{" "}
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
                <div className="">
                  <label
                    htmlFor="title"
                    className="text-[#242424] text-base flex items-center gap-1"
                  >
                    What was your role?{" "}
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
                <div className="w-full">
                  <FormGroup>
                    <div className="lg:w-1/2 w-full">
                      <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                        When did you start?{" "}
                      </label>
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
                    <div className="lg:w-1/2 w-full">
                      <label className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1">
                        When did you stop?
                      </label>
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
                  <div className="gap-2 -mt-2 flex items-center text-sm text-[#242424] font-medium w-full pl-1">
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
                    <label
                      htmlFor="active"
                      className="dark:text-slate-100 text-sm"
                    >
                      I am currently working in this role
                    </label>
                  </div>
                </div>

                <div className="w-full mb-5">
                  <label
                    className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1"
                    htmlFor="description"
                  >
                    Tell us what you did{" "}
                    <span className="ml-1 text-[#757575]  max-sm:hidden">
                      (Don't be shy, brag a little)
                    </span>{" "}
                    <span>
                      <button
                        onClick={() => {
                          handleGenerateSummary();
                        }}
                        disabled={aiLoading}
                        type="button"
                        className="ai-button px-4 ml-2 rounded-full py-0.5 text-center flex justify-center items-center gap-2"
                      >
                        <span>
                          <img src={sparkleIcon} />
                        </span>
                        Write with Ai
                      </button>
                    </span>
                  </label>
                  <div className="relative rounded-lg border border-stroke">
                    <textarea
                      className={`
                            w-full 
                            py-3 pl-4.5 pr-4.5 text-zinc-800 font-normal border-none rounded-lg
                            focus:border-primary/50 focus-visible:outline-none custom-scrollbar
                            dark:border-strokedark dark:bg-meta-4
                            dark:text-white dark:focus:border-primary `}
                      name={`description`}
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
                <div className="">
                  <label
                    htmlFor="achievements"
                    className="text-[#242424] mb-[0.4rem] text-base flex items-center gap-1"
                  >
                    Your Proudest Moments
                    <span className="ml-1 text-[#757575] max-sm:hidden">
                      (Add your key achievements)
                    </span>
                    <span>
                      <button
                        onClick={() => {
                          setAiFormData((prev: any) => ({
                            ...prev,
                            jobRole: experienceData?.title,
                          }));
                          setShowModal(true);
                        }}
                        type="button"
                        className="ai-button px-4 ml-2 rounded-full py-0.5 text-center flex justify-center items-center gap-2"
                      >
                        <span>
                          <img src={sparkleIcon} />
                        </span>
                        Write with Ai
                      </button>
                    </span>
                  </label>
                  {achievments.length > 0 && (
                    <div className="flex w-full flex-col gap-2 mt-2 pb-1.5 divide-y divide-zinc-300">
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
                  )}

                  <div className="mt-1 mb-5 flex relative">
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
                      className="flex-1 max-sm:w-[75%] pr-12 rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={addAchievment}
                      className="ml-2 px-4 py-[9px] max-sm:py-[11px] bottom-0 absolute right-0 bg-indigo-500/15 text-indigo-500 text-sm rounded-r-md hover:bg-indigo-600/15"
                    >
                      <BsPlusLg size={20} />
                    </button>
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    className="bg-primary w-full rounded-md text-white font-semibold flex items-center justify-center py-2 px-5 md:py-3 hover:bg-opacity-90"
                    onClick={() => {
                      addExperience();
                    }}
                  >
                    Save Experience
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div>
          {!currentItem && (
            <button
              onClick={() => {
                addNewExperience();
              }}
              className="w-full border-dashed py-2 rounded-md px-4 font-semibold border-2 border-stroke hover:border-solid flex gap-1.5 items-center justify-center"
            >
              <MdAddCircle size={18} className="text-black" /> Add another
              Experience
            </button>
          )}
        </div>

        <div className="flex justify-between items-center gap-x-5 mt-10 py-6 border-stroke border-t">
          <button
            className="flex items-center text-[#5A5A5A] h-12 group font-semibold justify-center gap-2 border rounded-md border-[#5A5A5A] sm:px-6 sm:py-2 px-4 py-2"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <FaArrowLeft
              fontWeight={600}
              className="group-hover:-translate-x-2 duration-150 ease-in-out"
            />{" "}
            Previous Step
          </button>
          <Button
            type="submit"
            onClick={() => {
              completeStep();
              console.log(CvData);
              setActiveStep(activeStep + 1);
            }}
            height="h-12"
          >
            Continue to Education{" "}
            <FaArrowRight
              fontWeight={600}
              className="group-hover:translate-x-2 duration-150 ease-in-out"
            />
          </Button>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiFormData({
            jobRole: "",
            experienceLevel: "",
          });
          setAiDescriptions([]);
          setSelectedDescriptions([]);
          setShowModal(false);
        }}
        title="AI Writing Assistant"
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-5 text-center">
          <p className="text-lg text-zinc-600">Key Achievements</p>
        </div>

        <div className="mb-7.5">
          <FormGroup>
            <div className="mb-4">
              <FieldInput
                label="Role"
                size="small"
                value={aiFormdata?.jobRole}
                placeholder="Enter your role for bullet point suggestions"
                onChange={(val) => {
                  setAiFormData((prev: any) => ({
                    ...prev,
                    jobRole: val,
                  }));
                }}
                id="role"
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
                value={aiFormdata?.experienceLevel}
                onChange={(e) => {
                  setAiFormData((prev: any) => ({
                    ...prev,
                    experienceLevel: e.target.value,
                  }));
                }}
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={aiFormdata?.experienceLevel}>
                  {aiFormdata?.experienceLevel ||
                    "Select your Level of Expertise"}
                </option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>
          </FormGroup>
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <div className="h-[30vh] overflow-y-auto custom-scrollbar pr-1">
              <ul className="border rounded-lg border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiDescriptions.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedDescriptions?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDescriptions(
                        selectedDescriptions.includes(val)
                          ? selectedDescriptions.filter(
                              (item: string) => item !== val
                            )
                          : [...selectedDescriptions, val]
                      );
                    }}
                  >
                    <div>
                      {selectedDescriptions.includes(val) ? (
                        <FaRegCheckCircle className="text-primary" />
                      ) : (
                        <FaRegCircle />
                      )}
                    </div>

                    {val}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              handleGenerateAchievements();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line />{" "}
            {aiLoading ? "Loading..." : "Generate Key Achievements"}
          </Button>
          {AiDescriptions?.length > 0 && (
            <button
              className="flex w-[80%] text-lg font-medium justify-center py-2 rounded-md px-6 items-center gap-2 text-primary bg-primary/15 hover:bg-primary/20 border-none"
              disabled={aiLoading}
              onClick={() => {
                setExperienceData((resumeData: any) => ({
                  ...resumeData,
                  keyAchievements: selectedDescriptions,
                }));
                setAchievments(selectedDescriptions);
                setAiFormData({
                  jobRole: "",
                  experienceLevel: "",
                });
                setAiDescriptions([]);
                setSelectedDescriptions([]);
                setShowModal(false);
              }}
            >
              <FaCheck />
              Apply Selected Achievements
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default WorkExperience;
