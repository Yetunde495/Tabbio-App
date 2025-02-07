import { useEffect, useRef, useState } from "react";
import Button, { GradientButton } from "../../components/Button";
import Modal from "../../components/modal";
import FieldInput from "../../components/form/Input";
// import { Select4 } from "../../components/form/Select";
import { FormGroup, TextArea } from "../../components/form";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaCheck, FaCircle, FaCircleMinus, FaRegCircle } from "react-icons/fa6";
import { RiExpandUpDownLine, RiRobot2Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { formatMonthYear } from "../../lib/utils/formatters";
import { generateUniqueId } from "../../lib/utils";
import { generateProfileSummary } from "../../services/profileServices";
import { toast } from "react-toastify";
import {
  generateAreasOfExpertise,
  generateExperienceData,
  generateResumeSkills,
} from "../../services/resumeServices";

type EditingState = {
  email: boolean;
  phone: boolean;
  location: boolean;
  linkedin: boolean;
  website: boolean;
};

// interface EducationProps {
//   id: number;
//   school: string;
//   degree: string;
//   duration: string;
//   year: string;
//   info: string;
// }

interface SkillProps {
  id: number | string;
  value: string;
}
const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
};
const fontSizeSmMap = {
  small: "13px",
  medium: "14px",
  large: "15px",
};

const mockExperiences = [
  "Developed user-friendly web interfaces using HTML, CSS, and JavaScript.",
  "Optimized website performance through code minification and image compression techniques.",
  "Collaborated with UX designers to implement responsive and visually appealing layouts.",
  "Optimized website performance through code minification and image compression techniques.",
  "Utilized version control systems such as Git to manage source code and collaborate with team members.",
  "Employed frameworks like React and Vue.js for building interactive web applications.",
];

//
export const CareerSummary: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const resp = await generateProfileSummary({
        currentSummary: resumeData?.professionalSummary,
        role: resumeData?.role,
      });
      setAiSummary(resp?.data?.summary);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.professionalSummary]);

  return (
    <div
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      className="hover:border border-zinc-300 rounded-md border-spacing-3 px-2"
    >
      {showButton && (
        <div className="flex w-full justify-end py-1.5">
          <GradientButton
            text="WRITING ASSISTANT"
            className="-mt-4.5"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      )}

      <h6
        className={`font-semibold mb-2 text-lg ${
          resumeData?.template === "professional"
            ? "border-b-2 py-1 ml-3"
            : "px-3"
        }`}
        style={{
          color: resumeData?.style?.primaryColor,
          borderColor: resumeData?.style?.primaryColor,
        }}
      >
        PROFESSIONAL SUMMARY
      </h6>
      <textarea
        className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black placeholder:text-black w-full`}
        placeholder="Enter your professional summary"
        value={
          resumeData?.professionalSummary ||
          `Write a concise and impactful paragraph (3–5 sentences) that highlights your top skills, achievements, and career goals. Focus on showcasing your experience, expertise, and value to potential employers. Use action words and quantify your accomplishments where possible. 
          
If you don’t have much work experience as a recent grad, a strong summary statement can help add valuable context to your application. Use this statement to communicate the career track you’re pursuing, any specialties from your education or personal projects, and how you will contribute.`
        }
        onChange={(e) =>
          setResumeData((resumeData: any) => ({
            ...resumeData,
            professionalSummary: e.target.value,
          }))
        }
        ref={textareaRef}
        rows={2}
        style={{
          overflow: "hidden",
          resize: "none",
          width: "100%",
          fontSize: fontSize,
        }}
      />
      <Modal
        show={showModal}
        onHide={() => {
          setRole("");
          setAiSummary("");
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Career Summary</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-7.5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="E.g UI/UX Designer"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {aiSummary && (
          <div className="mb-7.5">
            <TextArea
              value={aiSummary}
              onChange={(val) => setAiSummary(val)}
              label="Extra Information"
              name="extra-info"
              placeholder="Enter any specific details you want to include. E.g skills, industry"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              handleGenerateSummary();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line /> {aiLoading ? "Loading..." : "Generate Summary"}
          </Button>
          {aiSummary && (
            <button
              className="flex w-[80%] text-lg font-medium justify-center py-2 rounded-md px-6 items-center gap-2 text-primary bg-primary/15 hover:bg-primary/20 border-none"
              disabled={aiLoading}
              onClick={() => {
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  professionalSummary: aiSummary,
                }));
                setRole("");
                setAiSummary("");
                setShowModal(false);
              }}
            >
              <FaCheck />
              Apply AI Summary
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};
// add tabbioLink if tabbioLink is true (non-editable)
export const ContactInfo: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
  config: any;
}> = ({ resumeData, setResumeData, config }) => {
  const [isEditing, setIsEditing] = useState<EditingState>({
    email: false,
    phone: false,
    location: false,
    linkedin: false,
    website: false,
  });

  const handleBlur = (field: string) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false,
    }));
  };

  const handleEdit = (field: string) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: true,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData((resumeData: any) => ({
      ...resumeData,
      [name]: value,
    }));
  };

  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  return (
    <div className="w-full max-w-[90%] py-3">
      <div
        className={`${
          resumeData?.template === "professional" ? "" : "justify-center"
        } flex flex-wrap gap-x-2 divide-x gap-y-3 items-center`}
      >
        {["email", "phone", "location", "linkedin", "website"]
          .filter((field) => config[field as keyof typeof config])
          .map((field) => (
            <div
              key={field}
              style={{ fontSize }}
              className="flex gap-1 items-center px-2"
            >
              <span className="font-semibold">
                {resumeData?.template === "professional"
                  ? field.charAt(0).toUpperCase() + field.slice(1)
                  : field.charAt(0).toUpperCase()}
                :
              </span>
              {isEditing[field as keyof EditingState] ? (
                <input
                  className={`border-none max-w-[100px] bg-zinc-100 text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
                  placeholder={`Enter ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  name={field}
                  value={resumeData[field]}
                  autoFocus
                  onChange={handleInputChange}
                  onBlur={() => handleBlur(field)}
                  style={{ fontSize }}
                />
              ) : (
                <span
                  style={{ fontSize }}
                  className=""
                  onClick={() => handleEdit(field)}
                >
                  {resumeData[field] ||
                    `Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                </span>
              )}
            </div>
          ))}
      </div>

      <div className="w-full hidden justify-center gap-x-2 divide-x gap-y-4.5 items-center">
        {config.email && (
          <div className="flex gap-1 items-center">
            <span>Email</span>
            <input
              className={`border-none w-[80px] bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter Email"
              value={resumeData?.email}
              style={{ fontSize }}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  email: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.phone && (
          <div
            className="flex gap-1 items-center 
        "
          >
            <span>Phone</span>
            <input
              className={`border-none w-[80px] bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter Phone number"
              style={{ fontSize }}
              value={resumeData?.phone}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  phone: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.location && (
          <div className="flex gap-1 items-center w-[100px]">
            <span>Location</span>
            <input
              className={`border-none focus:ring-0 focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
              placeholder="Enter Location"
              value={resumeData?.location}
              style={{ fontSize }}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  location: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.website && (
          <div className="flex gap-1 items-center w-[100px]">
            <span>Website</span>
            <input
              className={`border-none bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter URL"
              style={{ fontSize }}
              value={resumeData?.website}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  website: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.linkedin && (
          <div className="flex gap-1 items-center w-[100px]">
            <span>Linkedin</span>
            <input
              className={`border-none bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter URL"
              value={resumeData?.linkedIn}
              style={{ fontSize }}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  linkedIn: e.target.value,
                }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
//
export const AtsExperience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.workExperience);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [aiFormdata, setAiFormData] = useState({
    jobRole: "",
    workSummary: "",
    experienceLevel: "",
  });
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>(
    []
  );
  const [editingPositionId, setEditingPositionId] = useState<number | null>(
    null
  );
  const [editingDurationId, setEditingDurationId] = useState<number | null>(
    null
  );
  const [editingDescId, setEditingDescId] = useState<number | null>(null);

  const [newAchievement, setNewAchievement] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.workExperience?.length > 0) {
      setItems(resumeData?.workExperience);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          title: "",
          company: "",
          description:
            "Write details of short overview of the job here. Use bullet point to summaries your key achievement",
          duration: "From-to",
          startDate: "",
          endDate: "",
          keyAchievements: [
            "Recruiters like to be able to get an idea of why you move from company to company. ",
            "Demonstrate your increasing impact and responsibility from job to job.",
            "You don’t need to include every job you’ve ever had on your resume. Stick to the jobs that are most relevant and demonstrate your career trajectory.",
          ],
        },
        {
          id: generateUniqueId(),
          company: "",
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          duration: "From-to",
          keyAchievements: [
            "Recruiters like to be able to get an idea of why you move from company to company. ",
            "This shows the recruiter that you’re capable of taking on more and more and gives them an idea of where your career is heading.",
          ],
        },
      ]);
    }
  }, [resumeData?.workExperience]);
  // Handler to update experience list after reordering

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        workExperience: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      workExperience: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: generateUniqueId(),
      title: "Position Title Here",
      company: "Company Name",
      description:
        "Write details of short overview of the job here. Use bullet point to summaries your key achievement",
      duration: "Date-Date",
      startDate: "",
      endDate: "",
      keyAchievements: [
        "Recruiters like to be able to get an idea of why you move from company to company. ",
        "Demonstrate your increasing impact and responsibility from job to job.",
        "You don’t need to include every job you’ve ever had on your resume. Stick to the jobs that are most relevant and demonstrate your career trajectory.",
      ],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      workExperience: [...resumeData?.workExperience, newExperience],
    }));
  };
  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const resp = await generateExperienceData(aiFormdata);
      setAiDescriptions(resp?.data?.points?.bulletPoints);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    const updatedItems = items.map((item) =>
      item?.id === currentItem?.id
        ? { ...item, ["keyAchievements"]: selectedDescriptions }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      workExperience: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedDescriptions([]);
    setAiFormData({
      jobRole: "",
      workSummary: "",
      experienceLevel: "",
    });
    setShowModal(false);
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      workExperience: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.workExperience?.[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        {resumeData?.template === "professional" ? (
          <h6
            className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
            style={{
              color: resumeData?.style?.primaryColor,
              borderColor: resumeData?.style?.primaryColor,
            }}
          >
            Professional Experience{" "}
          </h6>
        ) : (
          <h6
            className="font-semibold text-lg uppercase pl-4.5"
            style={{ color: resumeData?.style?.primaryColor }}
          >
            Professional Experience{" "}
          </h6>
        )}
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <GradientButton
                    text="WRITING ASSISTANT"
                    className=""
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="w-full">
                {resumeData?.template === "professional" ? (
                  <div className="w-full my-1.5">
                    <div className="flex w-full justify-between items-start">
                      <input
                        className={`border-none font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                        placeholder="Company Name"
                        value={item?.company}
                        style={{ fontSize }}
                        onChange={(e) =>
                          handleInputChange(item.id, "company", e.target.value)
                        }
                      />
                      <div className="flex items-center gap-2 ml-auto">
                        {hoveredItemId === item?.id &&
                        editingPositionId === item?.id ? (
                          <input
                            className={`border-none uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                            style={{ fontSize }}
                            placeholder="POSITION"
                            value={item?.title}
                            autoFocus
                            onBlur={() => setEditingPositionId(null)}
                            onChange={(e) =>
                              handleInputChange(
                                item?.id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span
                            onClick={() => setEditingPositionId(item.id)}
                            style={{ fontSize }}
                            className="cursor-text uppercase font-semibold text-zinc-700"
                          >
                            {item?.title}
                          </span>
                        )}

                        <span>|</span>
                        {hoveredItemId === item?.id &&
                        editingDurationId === item?.id ? (
                          <input
                            className={`border-none font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                            style={{ fontSize: fontSizeSm }}
                            placeholder="From - Until"
                            value={item?.duration}
                            autoFocus
                            onBlur={() => setEditingDurationId(null)}
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                "duration",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span
                            onClick={() => setEditingDurationId(item?.id)}
                            style={{ fontSize: fontSizeSm }}
                            className="cursor-text font-medium"
                          >
                            {item?.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex w-full justify-between items-start">
                      <input
                        className={`border-none font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                        placeholder="Company Name"
                        style={{ fontSize }}
                        value={item?.company}
                        onChange={(e) =>
                          handleInputChange(
                            item?.id,
                            "company",
                            e.target.value
                          )
                        }
                      />
                      <input
                        className={`border-none min-w-[200px] text-right font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                        placeholder="From - Until"
                        style={{ fontSize: fontSizeSm }}
                        value={item?.duration}
                        onChange={(e) =>
                          handleInputChange(
                            item?.id,
                            "duration",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center mb-2 ml-[3px">
                      <input
                        className={`border-none w-full focus:max-w-[400px] uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                        placeholder="POSITION"
                        style={{ fontSize }}
                        value={item?.title}
                        onChange={(e) =>
                          handleInputChange(item.id, "title", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {resumeData?.template === "professional" && (
                <div className="flex items-center ml-[3px] mb-4">
                  {editingDescId === item.id ? (
                    <textarea
                      className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black placeholder:text-black w-full`}
                      placeholder="Enter project summary"
                      value={
                        item?.description ||
                        "Provide a brief description of the project, its purpose, and key technologies used."
                      }
                      onChange={(e) =>
                        handleInputChange(
                          item?.id,
                          "description",
                          e.target.value
                        )
                      }
                      onBlur={() => setEditingDescId(null)}
                      autoFocus
                      ref={textareaRef}
                      rows={2}
                      style={{
                        overflow: "hidden",
                        resize: "none",
                        width: "100%",
                        fontSize: fontSize,
                      }}
                    />
                  ) : (
                    <p
                      className="px-1.5 cursor-text font-medium"
                      onClick={() => setEditingDescId(item.id)}
                      style={{ fontSize }}
                    >
                      {item?.description ||
                        "Write details of short overview of the job here. Use bullet point to summaries your key achievement."}
                    </p>
                  )}
                </div>
              )}

              <div>
                <ul
                  className=" w-full font-normal space-y-2 px-2.5"
                  style={{ fontSize: fontSizeSm }}
                >
                  {item?.keyAchievements.map(
                    (achievement: string, index: number) => (
                      <li
                        className="flex w-full items-center max-sm:items-start gap-1"
                        key={index}
                      >
                        <FaCircle
                          size={6}
                          className="rounded-full max-sm:mt-2"
                        />
                        {achievement}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItem = item?.keyAchievements.filter(
                              (item: string) => item !== achievement
                            );
                            const updatedItems = items.map((item) =>
                              item?.id === currentItem?.id
                                ? { ...item, ["keyAchievements"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              workExperience: updatedItems,
                            }));
                          }}
                          className={`${
                            hoveredItemId === item.id ? "block" : "hidden"
                          } ml-auto text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700`}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
                <div
                  className={` ${
                    hoveredItemId === item.id ? "block" : "hidden"
                  } pb-1 pt-3 border-t mt-3 border-stroke`}
                >
                  <h6 className="font-semibold text-zinc-700 text-sm mb-[0.4rem] ml-0.5">
                    Add Key Achievements / Responsibilities
                  </h6>
                  <div className="flex">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Ex: Improved application performance by 30% through code refactoring"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItem = newAchievement &&
                          !item?.keyAchievements.includes(newAchievement) && [
                            ...item.keyAchievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item?.id === currentItem?.id
                            ? { ...item, ["keyAchievements"]: newItem }
                            : item
                        );
                        setItems(updatedItems);
                        setResumeData((prev: any) => ({
                          ...prev,
                          workExperience: updatedItems,
                        }));
                        setNewAchievement("");
                      }}
                      className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiDescriptions([]);
          setSelectedDescriptions([]);
          setAiFormData({
            jobRole: "",
            workSummary: "",
            experienceLevel: "",
          });
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Work Experience</p>
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
                value={aiFormdata?.workSummary}
                onChange={(e) =>
                  setAiFormData((data: any) => ({
                    ...data,
                    workSummary: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
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
              handleGenerateSummary();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line />{" "}
            {aiLoading ? "Loading..." : "Generate Bullet Points"}
          </Button>
          {selectedDescriptions.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Descriptions
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const AtsInternships: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.internships);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [aiFormdata, setAiFormData] = useState({
    jobRole: "",
    workSummary: "",
    experienceLevel: "",
  });
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.internships?.length > 0) {
      setItems(resumeData?.internships);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          position: "POSITION TITLE",
          company: "NAME OF ORGANIZATION",
          description: "a short description",
          duration: "From-to",
          keyAchievements: [
            "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
            "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
          ],
        },
      ]);
    }
  }, [resumeData?.internships]);
  // Handler to update experience internships after reordering

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        internships: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      internships: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: generateUniqueId(),
      position: "POSITION TITLE",
      company: "NAME OF ORGANIZATION",
      description: "a short description",
      duration: "From-to",
      keyAchievements: [
        "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
        "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
      ],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      internships: [...resumeData?.internships, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const resp = await generateExperienceData(aiFormdata);
      setAiDescriptions(resp?.data?.points?.bulletPoints);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };
  const applyAiList = () => {
    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item?.id === currentItem?.id
        ? {
            ...item,
            ["keyAchievements"]: [...item?.keyAchievements, selectedItems],
          }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      internships: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedItems([]);
    setAiFormData({
      jobRole: "",
      workSummary: "",
      experienceLevel: "",
    });
    setShowModal(false);
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      internships: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.internships[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        <h6
          className="font-semibold text-lg uppercase pl-4.5"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Internships{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <GradientButton
                    text="WRITING ASSISTANT"
                    className=""
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex w-full justify-between items-start">
                <input
                  className={`border-none text-base w-full focus:w-auto font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                  placeholder="Company Name"
                  value={item?.company}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "company", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm w-auto text-right font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="From - Until"
                  value={item.duration}
                  style={{ fontSize: fontSizeSm }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center mb-2 ml-[3px">
                <input
                  className={`border-none text-base w-full focus:min-w-[300px] uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                  placeholder="POSITION"
                  value={item?.title}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "title", e.target.value)
                  }
                />
              </div>

              <div>
                <ul
                  style={{ fontSize: fontSizeSm }}
                  className="text-sm w-full font-normal space-y-2 px-2.5"
                >
                  {item?.keyAchievements.map(
                    (achievement: string, index: number) => (
                      <li
                        className="flex w-full items-center max-sm:items-start gap-1"
                        key={index}
                      >
                        <FaCircle
                          size={6}
                          className="rounded-full max-sm:mt-2"
                        />
                        {achievement}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItem = item.keyAchievements.filter(
                              (item: string) => item !== achievement
                            );
                            const updatedItems = items.map((item) =>
                              item?.id === currentItem?.id
                                ? { ...item, ["keyAchievements"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              internships: updatedItems,
                            }));
                          }}
                          className={`${
                            hoveredItemId === item?.id ? "block" : "hidden"
                          } ml-auto text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700`}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
                <div
                  className={` ${
                    hoveredItemId === item?.id ? "block" : "hidden"
                  } pb-1 pt-3 border-t mt-3 border-stroke`}
                >
                  <h6 className="font-semibold text-zinc-700 text-sm mb-[0.4rem] ml-0.5">
                    Add Key Achievements / Responsibilities
                  </h6>
                  <div className="flex">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Ex: Improved application performance by 30% through code refactoring"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItem = newAchievement &&
                          !item?.keyAchievements.includes(newAchievement) && [
                            ...item.keyAchievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item?.id === currentItem?.id
                            ? { ...item, ["keyAchievements"]: newItem }
                            : item
                        );
                        setItems(updatedItems);
                        setResumeData((prev: any) => ({
                          ...prev,
                          internships: updatedItems,
                        }));
                        setNewAchievement("");
                      }}
                      className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiDescriptions([]);
          setAiFormData({
            jobRole: "",
            workSummary: "",
            experienceLevel: "",
          });
          setSelectedItems([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Internship/Volunteer Achievements</p>
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
          <div className="w-full mb-5">
            <label
              className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
              htmlFor="description"
            >
              Description (optional)
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
                value={aiFormdata?.workSummary}
                onChange={(e) =>
                  setAiFormData((data: any) => ({
                    ...data,
                    workSummary: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-lg border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiDescriptions.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedItems?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedItems(
                        selectedItems.includes(val)
                          ? selectedItems.filter((item: string) => item !== val)
                          : [...selectedItems, val]
                      );
                    }}
                  >
                    <div>
                      {selectedItems.includes(val) ? (
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
              handleGenerateSummary();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line />{" "}
            {aiLoading ? "Loading..." : "Generate Bullet Points"}
          </Button>
          {selectedItems.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Items
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const AtsVolunteerExperience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.volunteerExperience);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [aiFormdata, setAiFormData] = useState({
    jobRole: "",
    workSummary: "",
    experienceLevel: "",
  });
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";
  const [newAchievement, setNewAchievement] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.volunteerExperience?.length > 0) {
      const formattedExperience = resumeData?.volunteerExperience?.map(
        (experience: any) => ({
          ...experience,
          duration: experience?.startDate
            ? formatMonthYear(experience?.startDate)
            : "",
        })
      );
      setItems(formattedExperience);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          title: "POSITION TITLE",
          company: "NAME OF ORGANIZATION",
          description: "Enter a short desc",
          startDate: "",
          endDate: "",
          duration: "From-to",
          keyAchievements: [
            "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
            "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
          ],
        },
      ]);
    }
  }, [resumeData?.volunteerExperience]);
  // Handler to update experience internships after reordering

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        volunteerExperience: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      volunteerExperience: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: generateUniqueId(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      duration: "From-To",
      keyAchievements: [],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      volunteerExperience: [...resumeData?.volunteerExperience, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item?.id === currentItem?.id
        ? {
            ...item,
            ["keyAchievements"]: [...item?.keyAchievements, selectedItems],
          }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      volunteerExperience: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedItems([]);
    setAiFormData({
      jobRole: "",
      workSummary: "",
      experienceLevel: "",
    });
    setShowModal(false);
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const resp = await generateExperienceData(aiFormdata);
      setAiDescriptions(resp?.data?.points?.bulletPoints);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      volunteerExperience: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.volunteerExperience[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        {resumeData?.template === "professional" ? (
          <h6
            className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
            style={{
              color: resumeData?.style?.primaryColor,
              borderColor: resumeData?.style?.primaryColor,
            }}
          >
            Volunteer Experience{" "}
          </h6>
        ) : (
          <h6
            className="font-semibold text-lg uppercase pl-4.5"
            style={{ color: resumeData?.style?.primaryColor }}
          >
            Volunteer Experience{" "}
          </h6>
        )}
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <GradientButton
                    text="WRITING ASSISTANT"
                    className=""
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex w-full justify-between items-start">
                <input
                  className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                  placeholder="Company Name"
                  value={item?.company}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "company", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="From - Until"
                  value={item?.duration}
                  style={{ fontSize: fontSizeSm }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center mb-2 ml-[3px">
                <input
                  className={`border-none text-base w-full focus:min-w-[300px] uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                  placeholder="POSITION"
                  value={item?.title}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "title", e.target.value)
                  }
                />
              </div>

              <div>
                <ul
                  style={{ fontSize: fontSizeSm }}
                  className="text-sm w-full font-normal space-y-2 px-2.5"
                >
                  {item?.keyAchievements.map(
                    (achievement: string, index: number) => (
                      <li
                        className="flex w-full items-center max-sm:items-start gap-1"
                        key={index}
                      >
                        <FaCircle
                          size={6}
                          className="rounded-full max-sm:mt-2"
                        />
                        {achievement}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItem = item.keyAchievements.filter(
                              (item: string) => item !== achievement
                            );
                            const updatedItems = items.map((item) =>
                              item?.id === currentItem?.id
                                ? { ...item, ["keyAchievements"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              experience: updatedItems,
                            }));
                          }}
                          className={`${
                            hoveredItemId === item?.id ? "block" : "hidden"
                          } ml-auto text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700`}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
                <div
                  className={` ${
                    hoveredItemId === item?.id ? "block" : "hidden"
                  } pb-1 pt-3 border-t mt-3 border-stroke`}
                >
                  <h6 className="font-semibold text-zinc-700 text-sm mb-[0.4rem] ml-0.5">
                    Add Key Achievements / Responsibilities
                  </h6>
                  <div className="flex">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Ex: Improved application performance by 30% through code refactoring"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItem = newAchievement &&
                          !item?.keyAchievements.includes(newAchievement) && [
                            ...item.keyAchievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item?.id === currentItem?.id
                            ? { ...item, ["keyAchievements"]: newItem }
                            : item
                        );
                        setItems(updatedItems);
                        setResumeData((prev: any) => ({
                          ...prev,
                          volunteerExperience: updatedItems,
                        }));
                        setNewAchievement("");
                      }}
                      className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiDescriptions([]);
          setAiFormData({
            jobRole: "",
            workSummary: "",
            experienceLevel: "",
          });
          setSelectedItems([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Internship/Volunteer Achievements</p>
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
          <div className="w-full mb-5">
            <label
              className="mb-[0.7rem] block text-sm font-normal text-zinc-800 dark:text-white"
              htmlFor="description"
            >
              Description (optional)
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
                value={aiFormdata?.workSummary}
                onChange={(e) =>
                  setAiFormData((data: any) => ({
                    ...data,
                    workSummary: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-lg border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiDescriptions.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedItems?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedItems(
                        selectedItems.includes(val)
                          ? selectedItems.filter((item: string) => item !== val)
                          : [...selectedItems, val]
                      );
                    }}
                  >
                    <div>
                      {selectedItems.includes(val) ? (
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
              handleGenerateSummary();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line />{" "}
            {aiLoading ? "Loading..." : "Generate Bullet Points"}
          </Button>
          {selectedItems.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Items
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const AtsProjects: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.projects);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.projects?.length > 0) {
      setItems(resumeData?.projects);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          name: "",
          technology: "",
          description: "",
          link: "",
        },
      ]);
    }
  }, [resumeData?.projects]);

  // Handler to update experience list after reordering
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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        projects: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      projects: updatedItems,
    }));
  };

  // Handler to add new experience
  const addProject = () => {
    const newProject = {
      id: generateUniqueId(),
      name: "",
      technology: "",
      description: "",
      link: "",
    };
    setItems([...items, newProject]);
    setResumeData(() => ({
      ...resumeData,
      projects: [...resumeData?.projects, newProject],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      projects: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.projects[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        <h6
          className="font-semibold text-lg uppercase pl-4.5"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Projects{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addProject}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex w-full justify-between items-start">
                <input
                  className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                  placeholder="Project Title"
                  value={item?.name}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "name", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter Technology/skill used for this project"
                  value={item?.technology}
                  style={{ fontSize: fontSizeSm }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center ml-[3px]">
                {editingItemId === item?.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(
                        item?.id,
                        "description",
                        e.target.value
                      )
                    }
                    onBlur={() => setEditingItemId(null)}
                    autoFocus
                    ref={textareaRef}
                    rows={2}
                    style={{
                      overflow: "hidden",
                      resize: "none",
                      width: "100%",
                      fontSize: fontSize,
                    }}
                  />
                ) : (
                  <p
                    className="px-1.5 text-[15px] cursor-pointer font-medium"
                    onClick={() => setEditingItemId(item?.id)}
                    style={{ fontSize }}
                  >
                    {item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."}
                  </p>
                )}
              </div>

              <div className={`pb-1 pt-3 border-stroke`}>
                <div className="flex">
                  {editingItemId === item?.id ? (
                    <input
                      type="text"
                      value={
                        item?.link ||
                        "Attach a github or website link to this project"
                      }
                      onChange={(e) =>
                        handleInputChange(item?.id, "link", e.target.value)
                      }
                      style={{ fontSize: fontSizeSm }}
                      placeholder="Enter link to this project"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <div>
                      {item?.link ? (
                        <a
                          className="px-1.5 text-[15px] cursor-pointer text-blue-600 font-medium"
                          onClick={() => setEditingItemId(item?.id)}
                          href={""}
                          // target="_blank"
                          style={{ fontSize: fontSize }}
                        >
                          {item?.link}
                        </a>
                      ) : (
                        <span
                          onClick={() => setEditingItemId(item?.id)}
                          style={{ fontSize: fontSize }}
                          className="px-1.5 text-[15px] cursor-text text-blue-600 font-medium"
                        >
                          Attach a github or website link to this project
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AtsCareerHighlight: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.careerHighlights);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.careerHighlights?.length > 0) {
      setItems(resumeData?.careerHighlights);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          title: "",
          skills: [],
          technology: "",
          description: "",
          link: "",
        },
        {
          id: generateUniqueId(),
          title: "",
          skills: [],
          technology: "",
          description: "",
          link: "",
        },
      ]);
    }
  }, [resumeData?.careerHighlights]);

  // Handler to update experience list after reordering
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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        careerHighlights: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      careerHighlights: updatedItems,
    }));
  };

  // Handler to add new experience
  const addHighlight = () => {
    const newCareer = {
      id: generateUniqueId(),
      name: "",
      technology: "",
      description: "",
      link: "",
      skills: [],
    };
    setItems([...items, newCareer]);
    setResumeData(() => ({
      ...resumeData,
      careerHighlights: [...resumeData?.careerHighlights, newCareer],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      careerHighlights: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.careerHighlights?.[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
          style={{
            color: resumeData?.style?.primaryColor,
            borderColor: resumeData?.style?.primaryColor,
          }}
        >
          Career Highlights{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-5">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addHighlight}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex w-full">
                <input
                  className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                  placeholder="Highlight Name"
                  value={item?.title}
                  style={{ fontSize }}
                  onChange={(e) =>
                    handleInputChange(item?.id, "title", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center ml-[3px]">
                {editingItemId === item?.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(
                        item?.id,
                        "description",
                        e.target.value
                      )
                    }
                    onBlur={() => setEditingItemId(null)}
                    autoFocus
                    ref={textareaRef}
                    rows={2}
                    style={{
                      overflow: "hidden",
                      resize: "none",
                      width: "100%",
                      fontSize: fontSize,
                    }}
                  />
                ) : (
                  <p
                    className="px-1.5 text-[15px] cursor-text font-medium"
                    onClick={() => setEditingItemId(item?.id)}
                    style={{ fontSize }}
                  >
                    {item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."}
                  </p>
                )}
              </div>

              <div className={`pb-1 pt-3 border-stroke`}>
                <div className="flex">
                  {editingItemId === item?.id ? (
                    <input
                      type="text"
                      value={
                        item?.link ||
                        "Attach a github or website link to this project"
                      }
                      onChange={(e) =>
                        handleInputChange(item?.id, "link", e.target.value)
                      }
                      style={{ fontSize: fontSizeSm }}
                      placeholder="Enter link to this project"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <a
                      className="px-1.5 text-[15px] cursor-text text-blue-600 font-medium"
                      onClick={() => setEditingItemId(item?.id)}
                      href={""}
                      style={{ fontSize: fontSizeSm }}
                    >
                      {item?.link ||
                        "Attach a github or website link to this highlight"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Ats: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.projects);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.projects?.length > 0) {
      setItems(resumeData?.projects);
    } else {
      setItems([
        {
          id: 1,
          name: "",
          technology: "",
          description: "",
          duration: "From-to",
          responsibilities: [
            "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
            "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
          ],
        },
        {
          id: 2,
          name: "",
          technology: "",
          description: "",
          duration: "From-to",
          responsibilities: [
            "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
            "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
          ],
        },
      ]);
    }
  }, [resumeData?.projects]);

  // Handler to update experience list after reordering
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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        projects: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      projects: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: resumeData?.projects.length + 1,
      name: "",
      technology: "",
      description: "",
      duration: "From-to",
      responsibilities: [
        "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
        "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
      ],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      projects: [...resumeData?.projects, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item?.id === currentItem?.id
        ? {
            ...item,
            ["responsibilities"]: [...item?.responsibilities, ...selectedItems],
          }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      projects: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedItems([]);
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      projects: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.projects[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        <h6
          className="font-semibold text-lg uppercase pl-4.5"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Projects{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-5">
                <div className="bg-white flex gap-1 items-center">
                  <GradientButton
                    text="WRITING ASSISTANT"
                    className=""
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex w-full justify-between items-start">
                <input
                  className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                  placeholder="Project Title"
                  value={item?.name}
                  onChange={(e) =>
                    handleInputChange(item?.id, "name", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Technology"
                  value={item?.technology}
                  onChange={(e) =>
                    handleInputChange(item?.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center mb-5 ml-[3px]">
                {editingItemId === item?.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(
                        item?.id,
                        "description",
                        e.target.value
                      )
                    }
                    onBlur={() => setEditingItemId(null)}
                    autoFocus
                    ref={textareaRef}
                    rows={2}
                    style={{
                      overflow: "hidden",
                      resize: "none",
                      width: "100%",
                    }}
                  />
                ) : (
                  <p
                    className="px-1.5 text-[15px] cursor-pointer font-medium"
                    onClick={() => setEditingItemId(item?.id)}
                  >
                    {item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."}
                  </p>
                )}
              </div>

              <div>
                <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                  {item?.responsibilities.map(
                    (responsibility: string, index: number) => (
                      <li
                        className="flex w-full items-center max-sm:items-start gap-1"
                        key={index}
                      >
                        <FaCircle
                          size={6}
                          className="rounded-full max-sm:mt-2"
                        />
                        {responsibility}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItem = item.responsibilities.filter(
                              (item: string) => item !== responsibility
                            );
                            const updatedItems = items.map((item) =>
                              item?.id === currentItem?.id
                                ? { ...item, ["responsibilities"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              projects: updatedItems,
                            }));
                          }}
                          className={`${
                            hoveredItemId === item?.id ? "block" : "hidden"
                          } ml-auto text-lg px-1.5 py-[1px] rounded-md hover:bg-red-600/10 text-zinc-600 hover:text-red-700`}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
                <div
                  className={` ${
                    hoveredItemId === item?.id ? "block" : "hidden"
                  } pb-1 pt-3 border-t mt-3 border-stroke`}
                >
                  <h6 className="font-semibold text-zinc-700 text-sm mb-[0.4rem] ml-0.5">
                    Add Key Achievements / Responsibilities
                  </h6>
                  <div className="flex">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Ex: Improved application performance by 30% through code refactoring"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItem = newAchievement &&
                          !item?.keyAchievements.includes(newAchievement) && [
                            ...item.keyAchievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item?.id === currentItem?.id
                            ? { ...item, ["keyAchievements"]: newItem }
                            : item
                        );
                        setItems(updatedItems);
                        setResumeData((prev: any) => ({
                          ...prev,
                          experience: updatedItems,
                        }));
                        setNewAchievement("");
                      }}
                      className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiDescriptions([]);
          setSelectedItems([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Project Details</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Project name"
            size="small"
            value={name}
            placeholder="Enter the name of your project to generate overview and roles"
            onChange={(val) => setName(val)}
            id="role"
          />
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the responsibilities you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiDescriptions.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white text-sm flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedItems?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedItems(
                        selectedItems.includes(val)
                          ? selectedItems.filter((item: string) => item !== val)
                          : [...selectedItems, val]
                      );
                    }}
                  >
                    <div>
                      {selectedItems.includes(val) ? (
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
          <GradientButton
            text="Generate Bullet Points"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setAiDescriptions(mockExperiences);
            }}
          />
          {selectedItems.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Items
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const AtsEducation: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);
  const [editingDegreeId, setEditingDegreeId] = useState<number | null>(null);
  const [editingInfoId, setEditingInfoId] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>(resumeData?.education);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  useEffect(() => {
    if (resumeData?.education?.length > 0) {
      setItems(resumeData?.education);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          institution: "Name of Univerity/Organization",
          degree: "DEGREE TYPE / MAJOR",
          startDate: "",
          endDate: "",
          duration: "From-to",
          year: "",
          description:
            "Consider listing course titles (not numbers), details of coursework and special projects, or academic accomplishments that show you’re ready to excel in your new industry.",
        },
      ]);
    }
  }, [resumeData?.education]);

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      //   const reorderedItems = updatedItems.map((item, index) => ({
      //     ...item,
      //     position: index + 1
      // }));

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        education: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      education: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newEducation = {
      id: generateUniqueId(),
      degree: "DEGREE TYPE / MAJOR",
      institution: "NAME OF INSTITUTION",
      duration: "",
      startDate: "",
      endDate: "",
      year: "Year",
      description:
        "Additional Information (CGPA Relevant Courses, Academic accomplishments, special projects, etc,.)",
    };
    setResumeData(() => ({
      ...resumeData,
      education: [...resumeData?.education, newEducation],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      education: updatedItems,
    }));
  };
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.education?.[currentItem?.id - 1]?.description]);
  return (
    <div>
      {resumeData?.template === "professional" ? (
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
          style={{
            color: resumeData?.style?.primaryColor,
            borderColor: resumeData?.style?.primaryColor,
          }}
        >
          Education{" "}
        </h6>
      ) : (
        <h6
          className="font-semibold text-lg uppercase pl-4.5 mb-3"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Education
        </h6>
      )}
      <div className="flex flex-col gap-4">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-6">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {resumeData?.education?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}
                  {resumeData?.education?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            {resumeData?.template === "professional" ? (
              <div className="w-full py-2 ml-3 pr-1">
                <div className="flex justify-between gap-6 items-center">
                  <div className="flex items-center gap-2 divide-x divide-zinc-600">
                    <div>
                      {hoveredItemId === item?.id &&
                      editingSchoolId === item?.id ? (
                        <input
                          className={`border-none w-full uppercase text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                          placeholder="Institution"
                          value={item?.institution}
                          style={{ fontSize }}
                          autoFocus
                          onBlur={() => setEditingSchoolId(null)}
                          onChange={(e) =>
                            handleInputChange(
                              item?.id,
                              "institution",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingSchoolId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
                          style={{ fontSize }}
                        >
                          {item?.institution}
                        </span>
                      )}
                    </div>

                    <span className="font-semibold uppercase hidden">|</span>
                    <div className="pl-2">
                      {hoveredItemId === item?.id &&
                      editingDegreeId === item?.id ? (
                        <input
                          className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                          placeholder="DEGREE"
                          value={item?.degree}
                          style={{ fontSize }}
                          autoFocus
                          onBlur={() => setEditingDegreeId(null)}
                          onChange={(e) =>
                            handleInputChange(
                              item?.id,
                              "degree",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingDegreeId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
                          style={{ fontSize }}
                        >
                          {item?.degree}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <input
                      className={`border-none text-sm text-right w-[50px] font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                      placeholder="Enter Year (yyyy)"
                      value={item?.year}
                      style={{ fontSize: fontSizeSm }}
                      onChange={(e) =>
                        handleInputChange(item?.id, "year", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="py-2">
                  {hoveredItemId === item?.id &&
                  editingInfoId === item?.id ? (
                    <div>
                      <textarea
                        className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                        placeholder="Enter project summary"
                        value={item?.description}
                        onChange={(e) =>
                          handleInputChange(
                            item?.id,
                            "description",
                            e.target.value
                          )
                        }
                        onBlur={() => setEditingInfoId(null)}
                        autoFocus
                        ref={textareaRef}
                        rows={2}
                        style={{
                          overflow: "hidden",
                          resize: "none",
                          width: "100%",
                          fontSize: fontSize,
                        }}
                      />
                    </div>
                  ) : (
                    <span
                      onClick={() => setEditingInfoId(item?.id)}
                      className="text-[15px]  cursor-text font-medium"
                      style={{ fontSize: fontSize }}
                    >
                      {item?.description}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-start py-2 ml-3 pr-1">
                <FaCircle size={6} className="rounded-full mt-2" />
                <div className="w-full">
                  <div className="flex gap-6 w-full items-start">
                    <input
                      className={`border-none w-full focus:max-w-[300px] text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                      placeholder="Institution"
                      value={item?.institution}
                      style={{ fontSize: fontSize }}
                      onChange={(e) =>
                        handleInputChange(
                          item?.id,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                    <div className="ml-auto">
                      <input
                        className={`border-none text-sm text-right w-[50px] font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                        placeholder="Enter Year (yyyy)"
                        value={item?.year}
                        style={{ fontSize: fontSizeSm }}
                        onChange={(e) =>
                          handleInputChange(item?.id, "year", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <input
                      className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                      placeholder="DEGREE"
                      value={item?.degree}
                      style={{ fontSize: fontSizeSm }}
                      onChange={(e) =>
                        handleInputChange(item?.id, "degree", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AtsCertifications: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);
  const [editingDegreeId, setEditingDegreeId] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>(resumeData?.certifications);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  useEffect(() => {
    if (resumeData?.certifications?.length > 0) {
      const formattedCertifications = resumeData?.certifications?.map(
        (certification: any) => ({
          ...certification,
          date: certification?.date,
        })
      );
      setItems(formattedCertifications);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          institution: "Name of Organization",
          name: "NAME OF CERTIFICATION",
          date: "Month Year",
        },
        {
          id: generateUniqueId(),
          institution: "Name of Organization",
          name: "NAME OF CERTIFICATION",
          date: "Month Year",
        },
      ]);
    }
  }, [resumeData?.certifications]);

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      //   const reorderedItems = updatedItems.map((item, index) => ({
      //     ...item,
      //     position: index + 1
      // }));

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        certifications: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      certifications: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newCertification = {
      id: generateUniqueId(),
      institution: "Name of Organization",
      name: "NAME OF CERTIFICATION",
      date: "Month Year",
    };
    setResumeData(() => ({
      ...resumeData,
      certifications: [...resumeData?.certifications, newCertification],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      certifications: updatedItems,
    }));
  };

  return (
    <div>
      {resumeData?.template === "professional" ? (
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
          style={{
            color: resumeData?.style?.primaryColor,
            borderColor: resumeData?.style?.primaryColor,
          }}
        >
          Certifications{" "}
        </h6>
      ) : (
        <h6
          className="font-semibold text-lg uppercase pl-4.5 mb-3"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Certifications
        </h6>
      )}
      <div className="flex flex-col gap-4">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            // onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-6">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {resumeData?.certifications?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}
                  {resumeData?.certifications?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            {resumeData?.template === "professional" ? (
              <div className="w-full py-2 ml-3 pr-1">
                <div className="flex justify-between gap-6 items-center">
                  <div className="flex items-center gap-2 divide-x divide-zinc-600">
                    <div>
                      {hoveredItemId === item?.id &&
                      editingSchoolId === item?.id ? (
                        <input
                          className={`border-none w-full uppercase text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                          placeholder="Institution"
                          value={item?.institution}
                          autoFocus
                          style={{ fontSize }}
                          onBlur={() => setEditingSchoolId(null)}
                          onChange={(e) =>
                            handleInputChange(
                              item?.id,
                              "institution",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingSchoolId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
                          style={{ fontSize }}
                        >
                          {item?.institution}
                        </span>
                      )}
                    </div>

                    <span className="font-semibold uppercase hidden">|</span>
                    <div className="pl-2">
                      {hoveredItemId === item?.id &&
                      editingDegreeId === item?.id ? (
                        <input
                          className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                          placeholder="NAME"
                          value={item?.name}
                          autoFocus
                          onBlur={() => setEditingDegreeId(null)}
                          style={{ fontSize }}
                          onChange={(e) =>
                            handleInputChange(item?.id, "name", e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingDegreeId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
                          style={{ fontSize }}
                        >
                          {item?.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <input
                      className={`border-none text-sm text-right w-full font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                      placeholder="Enter date (month-yyyy)"
                      value={item?.date || ""}
                      style={{ fontSize: fontSizeSm }}
                      onChange={(e) =>
                        handleInputChange(item?.id, "date", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex items-start py-2 ml-3 pr-1">
                <FaCircle size={6} className="rounded-full mt-2" />
                <div className="w-full">
                  <div className="flex gap-6 w-full items-start">
                    <input
                      className={`border-none w-full focus:max-w-[300px] text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                      placeholder="Institution"
                      value={item?.institution}
                      style={{ fontSize: fontSize }}
                      onChange={(e) =>
                        handleInputChange(
                          item?.id,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                    <div className="ml-auto">
                      <input
                        className={`border-none text-sm text-right w-full font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                        placeholder="Enter date (yyyy-mm)"
                        style={{ fontSize: fontSizeSm }}
                        value={item?.date}
                        onChange={(e) =>
                          handleInputChange(item?.id, "date", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <input
                      className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                      placeholder="NAME"
                      value={item?.name}
                      style={{ fontSize: fontSize }}
                      onChange={(e) =>
                        handleInputChange(item?.id, "name", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AtsTrainings: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);
  const [editingDegreeId, setEditingDegreeId] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>(resumeData?.trainings);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [_currentItem, setCurrentItem] = useState<any>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";

  useEffect(() => {
    if (resumeData?.trainings?.length > 0) {
      setItems(resumeData?.trainings);
    } else {
      setItems([
        {
          id: generateUniqueId(),
          degree: "TITLE",
          institution: "NAME OF INSTITUTION",
          description: "",
          startDate: "",
          endDate: "",
          year: "yyyy",
        },
        {
          id: generateUniqueId(),
          degree: "TITLE",
          institution: "NAME OF INSTITUTION",
          description: "",
          startDate: "",
          endDate: "",
          year: "yyyy",
        },
      ]);
    }
  }, [resumeData?.trainings]);

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

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      //   const reorderedItems = updatedItems.map((item, index) => ({
      //     ...item,
      //     position: index + 1
      // }));

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        trainings: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      trainings: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newTraining = {
      id: generateUniqueId(),
      degree: "TITLE",
      institution: "NAME OF INSTITUTION",
      description: "",
      startDate: "",
      endDate: "",
      year: "year",
    };
    setResumeData(() => ({
      ...resumeData,
      trainings: [...resumeData?.trainings, newTraining],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      trainings: updatedItems,
    }));
  };

  return (
    <div>
      <h6
        className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
        style={{
          color: resumeData?.style?.primaryColor,
          borderColor: resumeData?.style?.primaryColor,
        }}
      >
        TRAINING
      </h6>

      <div className="flex flex-col gap-2.5">
        {items.map((item, _index) => (
          <div
            key={item?.id}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item?.id && (
              <div className="flex w-full gap-1 justify-end -mt-6">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {resumeData?.trainings?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item?.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}
                  {resumeData?.trainings?.length > 1 && (
                    <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="w-full py-2 ml-3 pr-1">
              <div className="flex justify-between gap-6 items-center">
                <div className="flex items-center gap-2 divide-x divide-zinc-600">
                  <div>
                    {hoveredItemId === item?.id &&
                    editingSchoolId === item?.id ? (
                      <input
                        className={`border-none w-full text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                        placeholder="Cert/Training Name"
                        value={item?.degree}
                        autoFocus
                        style={{ fontSize }}
                        onBlur={() => setEditingSchoolId(null)}
                        onChange={(e) =>
                          handleInputChange(item?.id, "degree", e.target.value)
                        }
                      />
                    ) : (
                      <span
                        onClick={() => setEditingSchoolId(item?.id)}
                        className="text-base font-semibold text-zinc-800"
                        style={{ fontSize }}
                      >
                        {item?.degree}
                      </span>
                    )}
                  </div>

                  <span className="font-semibold hidden">|</span>
                  <div className="pl-2">
                    {hoveredItemId === item?.id &&
                    editingDegreeId === item?.id ? (
                      <input
                        className={`border-none w-full text-base bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                        placeholder="Platform / Institution"
                        value={item?.platform}
                        autoFocus
                        onBlur={() => setEditingDegreeId(null)}
                        style={{ fontSize }}
                        onChange={(e) =>
                          handleInputChange(
                            item?.id,
                            "institution",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <span
                        onClick={() => setEditingDegreeId(item?.id)}
                        className="text-base text-zinc-800"
                        style={{ fontSize }}
                      >
                        {item?.institution}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-auto">
                  <input
                    className={`border-none text-sm text-right w-[50px] font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                    placeholder="yyyy"
                    value={item?.year}
                    style={{ fontSize: fontSizeSm }}
                    onChange={(e) =>
                      handleInputChange(item?.id, "year", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AtsSkills: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null | string>(
    null
  );
  const [role, setRole] = useState("");
  const [skillType, setSkillType] = useState("");
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [AiSkills, setAiSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [editingSkill, setEditingSkill] = useState<{
    itemId: number | string;
    skillIndex: number;
  } | null>(null);
  const [editingName, setEditingName] = useState<{
    itemId: number | string;
    nameIndex: number;
  } | null>(null);
  const [items, setItems] = useState<
    { id: string | number; name: string; items: string[] }[]
  >(
    resumeData?.skills.map((val: any) => ({
      id: val?.id,
      name: val.name,
      items: val.items,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const [showModal, setShowModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const applyAiList = () => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: prev.skills.map((skill: any) =>
        skill.id === currentItem?.id
          ? { ...skill, items: selectedSkills }
          : skill
      ),
    }));
    setAiSkills([]);
    setSelectedSkills([]);
  };

  useEffect(() => {
    if (resumeData?.skills?.length > 0) {
      setItems(
        resumeData?.skills.map((val: any) => ({
          id: val?.id,
          name: val.name,
          items: val.items,
        }))
      );
    } else {
      setItems([
        {
          id: generateUniqueId(),
          name: "Name of Skill (Ex: Soft Skill)",
          items: [
            "Mention the skill then briefly add some context to it",
            "Ex: Multi-tasking:Utilized task-management apps to manage and prioritize tasks",
          ],
        },
        {
          id: generateUniqueId(),
          name: "Name of Skill (Ex: Hard Skills)",
          items: [
            "Mention the skill then briefly add some context to it",
            "Skill",
          ],
        },
        {
          id: generateUniqueId(),
          name: "Name of Skill (Ex: Technical Skills)",
          items: [
            "Mention the skill then briefly add some context to it",
            "Skill",
          ],
        },
      ]);
    }
  }, [resumeData?.skills]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        skills: updatedItems.map((item: any) => ({
          id: item?.id,
          name: item.name,
          items: item.items,
        })),
      }));
    }
  };
  const handleRemove = (id: number | string) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      skills: updatedItems.map((item: any) => ({
        id: item?.id,
        name: item.name,
        items: item.items,
      })),
    }));
  };

  // Handler to add new skill
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      skills: [
        ...resumeData?.skills,
        {
          id: generateUniqueId(),
          name: "Name of Skill (Ex: Soft Skill)",
          items: [
            "Mention the skill then briefly add some context to it",
            "skill name",
          ],
        },
      ],
    }));
  };

  const handleGenerateSkills = async () => {
    setAiLoading(true);
    try {
      const resp = await generateResumeSkills({
        skillType: skillType,
        role: role,
      });
      setAiSkills(resp?.data?.skills);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Handle input change for specific item
  const handleInputChange = (
    id: number | string,
    field: string,
    value: string
  ) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      skills: updatedItems.map((item: any) => ({
        id: item?.id,
        name: item.name,
        items: item.items,
      })),
    }));
  };

  const removeSkillItem = (itemId: string | number, skillIndex: number) => {
    const updatedItems = items.map((itm) =>
      itm?.id === itemId
        ? {
            ...itm,
            items: itm.items.filter((_, idx) => idx !== skillIndex),
          }
        : itm
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      skills: updatedItems,
    }));
  };
  return (
    <div className="hover:border border-dashed rounded-md border-spacing-1 px-2 py-3">
      <div className="w-full relative flex justify-between  mb-2.5">
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 w-full"
          style={{
            color: resumeData?.style?.primaryColor,
            borderColor: resumeData?.style?.primaryColor,
          }}
        >
          Key Skills
        </h6>
      </div>

      <ul className="gap-3 px-1.5">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            onClick={() => setCurrentItem(item)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 px-1.5 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md flex flex-col mb-1">
              {hoveredItemId === item?.id && (
                <div className="flex w-full gap-1 justify-end -mt-4 ">
                  <div className="flex gap-1 items-center bg-white z-0">
                    <GradientButton
                      text="WRITING ASSISTANT"
                      className=""
                      onClick={() => {
                        setShowModal(true);
                      }}
                    />
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.skills?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item?.id);
                        }}
                        className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                      >
                        <FaCircleMinus />
                      </button>
                    )}
                    {resumeData?.skills?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className="">
                {editingName?.itemId === item?.id &&
                editingName?.nameIndex === index ? (
                  <input
                    className={`border-none italic border-b text-base bg-white focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                    placeholder="Enter Skill Title"
                    value={item.name}
                    autoFocus
                    onBlur={() => setEditingName(null)}
                    style={{ fontSize }}
                    onChange={(e) =>
                      handleInputChange(item?.id, "name", e.target.value)
                    }
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditingName({ itemId: item?.id, nameIndex: index });
                      console.log(items);
                    }}
                    className="italic underline text-base text-zinc-500 underline-offset-2 cursor-text font-medium"
                    style={{ fontSize }}
                  >
                    {item.name}
                  </span>
                )}
              </div>

              <ul className="inline-flex items-center gap-2 flex-wrap">
                {item.items.map((skillItem: string, skillIndex: number) => (
                  <li key={skillIndex}>
                    {editingSkill?.itemId === item?.id &&
                    editingSkill?.skillIndex === skillIndex ? (
                      <input
                        className={`border-none text-base bg-white focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                        placeholder="Enter Skill Item"
                        value={skillItem}
                        autoFocus={true}
                        style={{ fontSize }}
                        onBlur={() => setEditingSkill(null)}
                        onChange={(e) => {
                          const updatedItems = items.map((itm) =>
                            itm?.id === item?.id
                              ? {
                                  ...itm,
                                  id: item?.id,
                                  items: itm.items.map((i, idx) =>
                                    idx === skillIndex ? e.target.value : i
                                  ),
                                }
                              : itm
                          );
                          setItems(updatedItems);
                          setResumeData((prev: any) => ({
                            ...prev,
                            skills: updatedItems,
                          }));
                        }}
                      />
                    ) : (
                      <span
                        onClick={() =>
                          setEditingSkill({ itemId: item?.id, skillIndex })
                        }
                        className="text-[15px] cursor-text font-medium"
                        style={{ fontSize }}
                      >
                        {" "}
                        <span className="group">
                          {" "}
                          {skillItem}{" "}
                          <button
                            onClick={() =>
                              removeSkillItem(item?.id, skillIndex)
                            }
                            className="mx-2 hidden group-hover:inline-flex text-zinc-500 hover:text-red-700"
                          >
                            x
                          </button>
                        </span>
                        {item?.items?.length > 1 &&
                          skillIndex + 1 !== item?.items?.length &&
                          "|"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div
                className={` ${
                  hoveredItemId === item?.id ? "block" : "hidden"
                } pb-1 pt-3 border-t mt-3 border-stroke`}
              >
                <h6 className="font-semibold text-zinc-700 text-sm mb-[0.4rem] ml-0.5">
                  Add Skill
                </h6>
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ex: Communication"
                    className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      //@ts-ignore
                      const newItem: string[] = newSkill
                        ? !item?.items.includes(newSkill) && [
                            ...item.items,
                            newSkill,
                          ]
                        : item.items;
                      const updatedItems = items.map((item) =>
                        item?.id === currentItem?.id
                          ? { ...item, id: item?.id, ["items"]: newItem }
                          : item
                      );
                      setItems(updatedItems);
                      setResumeData((prev: any) => ({
                        ...prev,
                        skills: updatedItems,
                      }));
                      setNewSkill("");
                    }}
                    className="ml-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        show={showModal}
        onHide={() => {
          setAiSkills([]);
          setSelectedSkills([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Skills</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Skill Type"
            size="small"
            value={skillType}
            placeholder="Enter type of skill (Ex:Soft skills)"
            onChange={(val) => setSkillType(val)}
            id="skillType"
          />
        </div>

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your role to generate a list of tailored skills"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiSkills?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the skills you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiSkills.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedSkills?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedSkills(
                        selectedSkills.some((skill) => skill === val)
                          ? selectedSkills.filter((skill) => skill !== val)
                          : [...selectedSkills, val]
                      );
                    }}
                  >
                    <div>
                      {selectedSkills.includes(val) ? (
                        <FaRegCheckCircle className="text-primary" />
                      ) : (
                        <FaRegCircle />
                      )}
                    </div>
                    <div>
                      <strong>{val}</strong>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              handleGenerateSkills();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line /> {aiLoading ? "Loading..." : "Generate Skills"}
          </Button>
          {selectedSkills.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Items
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const AreasOfExpertise: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | string | null>(
    null
  );
  const [role, setRole] = useState("");
  const [showButon, setShowButton] = useState(false);
  const [AiSkills, setAiSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null | string>(
    null
  );
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";

  const [items, setItems] = useState<SkillProps[]>(
    resumeData?.areaOfExpertise.map((val: string) => ({
      id: generateUniqueId(),
      value: val,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const applyAiList = () => {
    setResumeData((prev: any) => ({
      ...prev,
      areaOfExpertise: [
        ...new Set([...resumeData?.areaOfExpertise, ...selectedSkills]),
      ],
    }));
    setAiSkills([]);
    setSelectedSkills([]);
  };

  useEffect(() => {
    if (resumeData?.areaOfExpertise?.length > 0) {
      setItems(
        resumeData?.areaOfExpertise.map((val: string) => ({
          id: generateUniqueId(),
          value: val,
        }))
      );
    } else {
      setItems([
        {
          id: generateUniqueId(),
          value: "Add Area of Expertise",
        },
        {
          id: generateUniqueId(),
          value: "Add Area of Expertise",
        },
        {
          id: generateUniqueId(),
          value: "Add Area of Expertise",
        },
      ]);
    }
  }, [resumeData?.areaOfExpertise]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        areaOfExpertise: updatedItems.map((item: any) => item.value),
      }));
    }
  };
  const handleRemove = (id: number | string) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      areaOfExpertise: updatedItems.map((item: any) => item.value),
    }));
  };

  // Handler to add new education
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      areaOfExpertise: [...resumeData?.areaOfExpertise, ""],
    }));
  };

  const GenerateareaOfExpertise = async () => {
    setAiLoading(true);
    try {
      const resp = await generateAreasOfExpertise({
        role: role,
      });
      setAiSkills(resp?.data?.areaOfExpertise);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  // Handle input change for specific item
  const handleInputChange = (
    id: number | string,
    field: string,
    value: string
  ) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      areaOfExpertise: updatedItems.map((item: any) => item.value),
    }));
  };
  return (
    <div
      className="hover:border border-dashed rounded-md border-spacing-1 px-2 py-3"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="w-full flex justify-between">
        <h6
          className="font-semibold mb-2 px-3 text-lg uppercase"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          Areas of Expertise
        </h6>
        {showButon && (
          <div className="-mt-5">
            <GradientButton
              text="WRITING ASSISTANT"
              className=""
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div>
        )}
      </div>

      <ul className="inline-flex items-center gap-3 px-2.5 flex-wrap">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md">
              {hoveredItemId === item?.id && (
                <div className="flex w-full gap-1 justify-end -mt-4 ">
                  <div className="flex gap-1 items-center bg-white z-0">
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.areaOfExpertise?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item?.id);
                        }}
                        className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                      >
                        <FaCircleMinus />
                      </button>
                    )}
                    {resumeData?.areaOfExpertise?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {editingItemId === item?.id ? (
                <input
                  className={`border-none bg-white w-full focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter area of expertise"
                  style={{ fontSize }}
                  value={item.value}
                  onChange={(e) =>
                    handleInputChange(item?.id, "value", e.target.value)
                  }
                  onBlur={() => setEditingItemId(null)}
                  autoFocus
                />
              ) : (
                <span
                  className="text-[15px] cursor-pointer font-medium"
                  onClick={() => setEditingItemId(item?.id)}
                  style={{ fontSize }}
                >
                  {item.value || "Enter area of expertise"}{" "}
                  {items?.length > 1 && index + 1 !== items?.length && "|"}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Modal
        show={showModal}
        onHide={() => {
          setAiSkills([]);
          setSelectedSkills([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className="font-semibold text-zinc-600">Areas of Expertise</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your professional role to generate a list of tailored areas of expertise"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiSkills?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the skills you want to apply
            </h6>
            <div className="h-[36vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiSkills.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedSkills?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedSkills(
                        selectedSkills.includes(val)
                          ? selectedSkills.filter(
                              (item: string) => item !== val
                            )
                          : [...selectedSkills, val]
                      );
                    }}
                  >
                    <div>
                      {selectedSkills.includes(val) ? (
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
              GenerateareaOfExpertise();
            }}
            disabled={aiLoading}
            width="w-[80%]"
          >
            <RiRobot2Line />{" "}
            {aiLoading ? "Loading..." : "Generate Areas of Expertise"}
          </Button>
          {selectedSkills.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Items
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const RelevantCourses: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | string | null>(
    null
  );
  const [editingItemId, setEditingItemId] = useState<number | string | null>(
    null
  );
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const [items, setItems] = useState<SkillProps[]>(
    resumeData?.relevantCourses.map((val: string) => ({
      id: generateUniqueId(),
      value: val,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.relevantCourses?.length > 0) {
      setItems(
        resumeData?.relevantCourses.map((val: any, index: number) => ({
          id: index + 1,
          value: val,
        }))
      );
    } else {
      setItems([
        {
          id: generateUniqueId(),
          value: `List courses that are relevant to the job you're applying for`,
        },
        {
          id: generateUniqueId(),
          value: `Use Course titles rather than course numbers`,
        },
      ]);
    }
  }, [resumeData?.relevantCourses]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement | HTMLLIElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        relevantCourses: updatedItems.map((item: any) => item.value),
      }));
    }
  };
  const handleRemove = (id: number | string) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      relevantCourses: updatedItems.map((item: any) => item.value),
    }));
  };

  // Handler to add new education
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      relevantCourses: [...resumeData?.relevantCourses, ""],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (
    id: number | string,
    field: string,
    value: string
  ) => {
    const updatedItems = items.map((item) =>
      item?.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      relevantCourses: updatedItems.map((item: any) => item.value),
    }));
  };
  return (
    <div className="hover:border border-dashed rounded-md border-spacing-1 px-2 py-3">
      <div className="w-full flex justify-between">
        <h6
          className="font-semibold mb-2 px-3 text-lg uppercase"
          style={{ color: resumeData?.style?.primaryColor }}
        >
          RELEVANT COURSES
        </h6>
      </div>

      <ul className="grid grid-cols-3 items-center gap-3 px-2">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredItemId(item?.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item?.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md">
              {hoveredItemId === item?.id && (
                <div className="flex w-full gap-1 justify-end -mt-4 ">
                  <div className="flex gap-1 items-center bg-white z-0">
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.relevantCourses?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item?.id);
                        }}
                        className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                      >
                        <FaCircleMinus />
                      </button>
                    )}
                    {resumeData?.relevantCourses?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {editingItemId === item?.id ? (
                <input
                  className={`border-none bg-white w-full focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter relevant course"
                  value={item.value}
                  onChange={(e) =>
                    handleInputChange(item?.id, "value", e.target.value)
                  }
                  onBlur={() => setEditingItemId(null)}
                  autoFocus
                  style={{ fontSize }}
                />
              ) : (
                <span
                  className="px-1 text-base font-medium"
                  onClick={() => setEditingItemId(item?.id)}
                  style={{ fontSize }}
                >
                  {item.value || "Enter relevant course"}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
