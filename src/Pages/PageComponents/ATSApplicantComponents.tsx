import { useEffect, useRef, useState } from "react";
import Button, { GradientButton } from "../../components/Button";
import Modal from "../../components/modal";
import FieldInput from "../../components/form/Input";
import { Select4 } from "../../components/form/Select";
import { TextArea } from "../../components/form";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaCircle, FaCircleMinus, FaRegCircle } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";

type EditingState = {
  email: boolean;
  phone: boolean;
  location: boolean;
  linkedin: boolean;
  website: boolean;
};

interface EducationProps {
  id: number;
  school: string;
  degree: string;
  duration: string;
  year: string;
  info: string;
}

interface SkillProps {
  id: number;
  value: string;
}

const mockExperiences = [
  "Developed user-friendly web interfaces using HTML, CSS, and JavaScript.",
  "Optimized website performance through code minification and image compression techniques.",
  "Collaborated with UX designers to implement responsive and visually appealing layouts.",
  "Optimized website performance through code minification and image compression techniques.",
  "Utilized version control systems such as Git to manage source code and collaborate with team members.",
  "Employed frameworks like React and Vue.js for building interactive web applications.",
];

const exampleSkills = [
  {
    name: "technical skills",
    items: ["Development"],
  },
  {
    name: "hard skills",
    items: ["Patience", "Communiation"],
  },
];

const mockArray = ["Git", "Javascript", "Bootstrap", "FIGMA", "HTML", "CSS"];

export const CareerSummary: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  }, [resumeData?.professional_summary]);

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
          color: resumeData?.style?.primary_color,
          borderColor: resumeData?.style?.primary_color,
        }}
      >
        PROFESSIONAL SUMMARY
      </h6>
      <textarea
        className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
        placeholder="Enter your professional summary"
        value={
          resumeData?.professional_summary ||
          `Write a concise and impactful paragraph (3–5 sentences) that highlights your top skills, achievements, and career goals. Focus on showcasing your experience, expertise, and value to potential employers. Use action words and quantify your accomplishments where possible. 
          
If you don’t have much work experience as a recent grad, a strong summary statement can help add valuable context to your application. Use this statement to communicate the career track you’re pursuing, any specialties from your education or personal projects, and how you will contribute.`
        }
        onChange={(e) =>
          setResumeData((resumeData: any) => ({
            ...resumeData,
            professional_summary: e.target.value,
          }))
        }
        ref={textareaRef}
        rows={2}
        style={{
          overflow: "hidden",
          resize: "none",
          width: "100%",
        }}
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Career Summary</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <FieldInput
            label="Role"
            size="small"
            placeholder="E.g UI/UX Designer"
            onChange={(val) => console.log(val)}
            id="role"
          />
          <Select4 label="Level of Experience">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </Select4>
        </div>

        <div className="mb-7.5">
          <TextArea
            value=""
            onChange={(val) => console.log(val)}
            label="Extra Information"
            name="extra-info"
            placeholder="Enter any specific details you want to include. E.g skills, industry"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <GradientButton
            text="Generate Career Summary"
            className=""
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {}}
          />
        </div>
      </Modal>
    </div>
  );
};

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
  return (
    <div className="w-full max-w-[90%] py-3">
      <div className={`${resumeData?.template === "professional" ? "" : "justify-center" } flex flex-wrap gap-x-2 divide-x gap-y-3 items-center`}
      >
        {["email", "phone", "address", "linkedin", "website"]
          .filter((field) => config[field as keyof typeof config])
          .map((field) => (
            <div key={field} className="flex gap-1 items-center text-sm px-2">
              <span className="font-semibold">
                {resumeData?.template === "professional" ? field.charAt(0).toUpperCase() + field.slice(1) : field.charAt(0).toUpperCase()}:
              </span>
              {isEditing[field as keyof EditingState] ? (
                <input
                  className={`border-none max-w-[100px] text-sm bg-zinc-100 text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
                  placeholder={`Enter ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  name={field}
                  value={resumeData[field]}
                  autoFocus
                  onChange={handleInputChange}
                  onBlur={() => handleBlur(field)}
                />
              ) : (
                <span className="text-sm" onClick={() => handleEdit(field)}>
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
              className={`border-none w-[80px] text-sm bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter Email"
              value={resumeData?.email}
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
              className={`border-none w-[80px] text-sm bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter Phone number"
              value={resumeData?.phone_number}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  phone_number: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.location && (
          <div className="flex gap-1 items-center w-[100px]">
            <span>Address</span>
            <input
              className={`border-none text-sm focus:ring-0 focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
              placeholder="Enter Location"
              value={resumeData?.location}
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
              className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter URL"
              value={resumeData?.url}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  url: e.target.value,
                }))
              }
            />
          </div>
        )}
        {config.linkedin && (
          <div className="flex gap-1 items-center w-[100px]">
            <span>Linkedin</span>
            <input
              className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-100 focus:ring-0 focus:outline-none px-2`}
              placeholder="Enter URL"
              value={resumeData?.linkedin_url}
              onChange={(e) =>
                setResumeData((resumeData: any) => ({
                  ...resumeData,
                  linkedin_url: e.target.value,
                }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const AtsExperience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.experience);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [role, setRole] = useState("");
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
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
    if (resumeData?.experience?.length > 0) {
      setItems(resumeData?.experience);
    } else {
      setItems([
        {
          id: 1,
          position: "",
          company: "",
          description:
            "Write details of short overview of the job here. Use bullet point to summaries your key achievement",
          duration: "From-to",
          key_achievements: [
            "Recruiters like to be able to get an idea of why you move from company to company. ",
            "Demonstrate your increasing impact and responsibility from job to job.",
            "You don’t need to include every job you’ve ever had on your resume. Stick to the jobs that are most relevant and demonstrate your career trajectory.",
          ],
        },
        {
          id: 1,
          position: "",
          company: "",
          description: "",
          duration: "From-to",
          key_achievements: [
            "Recruiters like to be able to get an idea of why you move from company to company. ",
            "This shows the recruiter that you’re capable of taking on more and more and gives them an idea of where your career is heading.",
          ],
        },
      ]);
    }
  }, [resumeData?.experience]);
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
        experience: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      experience: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: resumeData?.experience.length + 1,
      position: "Position Title Here",
      company: "Company Name",
      description:
        "Write details of short overview of the job here. Use bullet point to summaries your key achievement",
      duration: "Date-Date",
      key_achievements: [
        "Recruiters like to be able to get an idea of why you move from company to company. ",
        "Demonstrate your increasing impact and responsibility from job to job.",
        "You don’t need to include every job you’ve ever had on your resume. Stick to the jobs that are most relevant and demonstrate your career trajectory.",
      ],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      experience: [...resumeData?.experience, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    // Convert the selected items array into a string format with list-disc (•)
    const formattedItems = selectedDescriptions
      .map((item) => `• ${item}`)
      .join("\n");

    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item.id === currentItem?.id
        ? { ...item, ["description"]: `${item.description}\n${formattedItems}` }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      experience: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedDescriptions([]);
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      experience: updatedItems,
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
  }, [resumeData?.experience[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        {resumeData?.template === "professional" ? (
          <h6
            className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
            style={{
              color: resumeData?.style?.primary_color,
              borderColor: resumeData?.style?.primary_color,
            }}
          >
            Professional Experience{" "}
          </h6>
        ) : (
          <h6
            className="font-semibold text-lg uppercase pl-4.5"
            style={{ color: resumeData?.style?.primary_color }}
          >
            Professional Experience{" "}
          </h6>
        )}
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
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
            {hoveredItemId === item.id && (
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
                        handleRemove(item.id);
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
                        className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                        placeholder="Company Name"
                        value={item?.company}
                        onChange={(e) =>
                          handleInputChange(item.id, "company", e.target.value)
                        }
                      />
                      <div className="flex items-center gap-2 ml-auto">
                        {hoveredItemId === item?.id &&
                        editingPositionId === item?.id ? (
                          <input
                            className={`border-none text-base uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                            placeholder="POSITION"
                            value={item?.position}
                            autoFocus
                            onBlur={() => setEditingPositionId(null)}
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                "position",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span
                            onClick={() => setEditingPositionId(item.id)}
                            className="text-base cursor-text uppercase font-semibold text-zinc-700"
                          >
                            {item?.position}
                          </span>
                        )}

                        <span>|</span>
                        {hoveredItemId === item?.id &&
                        editingDurationId === item?.id ? (
                          <input
                            className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                            placeholder="From - Until"
                            value={item.duration}
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
                            onClick={() => setEditingDurationId(item.id)}
                            className="text-sm cursor-text font-medium"
                          >
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex w-full justify-between items-start">
                      <input
                        className={`border-none text-base font-semibold bg-white text-black dynamic-input-2 focus:outline-none focus:bg-zinc-100 px-2 mb-2`}
                        placeholder="Company Name"
                        value={item?.company}
                        onChange={(e) =>
                          handleInputChange(item.id, "company", e.target.value)
                        }
                      />
                      <input
                        className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                        placeholder="From - Until"
                        value={item.duration}
                        onChange={(e) =>
                          handleInputChange(item.id, "duration", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-center mb-2 ml-[3px">
                      <input
                        className={`border-none text-base uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                        placeholder="POSITION"
                        value={item?.position}
                        onChange={(e) =>
                          handleInputChange(item.id, "position", e.target.value)
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
                      className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                      placeholder="Enter project summary"
                      value={
                        item?.description ||
                        "Provide a brief description of the project, its purpose, and key technologies used."
                      }
                      onChange={(e) =>
                        handleInputChange(
                          item.id,
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
                      }}
                    />
                  ) : (
                    <p
                      className="px-1.5 text-[15px] cursor-text font-medium"
                      onClick={() => setEditingDescId(item.id)}
                    >
                      {item?.description ||
                        "Write details of short overview of the job here. Use bullet point to summaries your key achievement."}
                    </p>
                  )}
                </div>
              )}

              <div>
                <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                  {item?.key_achievements.map(
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
                            const updatedItem = item.key_achievements.filter(
                              (item: string) => item !== achievement
                            );
                            const updatedItems = items.map((item) =>
                              item.id === currentItem?.id
                                ? { ...item, ["key_achievements"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              experience: updatedItems,
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
                          !item?.key_achievements.includes(newAchievement) && [
                            ...item.key_achievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item.id === currentItem?.id
                            ? { ...item, ["key_achievements"]: newItem }
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
          setSelectedDescriptions([]);
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

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your role for bullet point suggestions"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
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
          <GradientButton
            text="Generate Bullet Points"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setAiDescriptions(mockExperiences);
            }}
          />
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
  const [role, setRole] = useState("");
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.internships?.length > 0) {
      setItems(resumeData?.internships);
    } else {
      setItems([
        {
          id: 1,
          position: "",
          company: "",
          description: "",
          duration: "From-to",
          key_achievements: [
            "Key Responsibilities: Use bullet points to describe your tasks, focusing on those most relevant to the job applying for.",
            "Achievements: Highlight quantifiable results, such as system improvements, successful implementations reductions",
          ],
        },
        {
          id: 1,
          position: "",
          company: "",
          description: "",
          duration: "From-to",
          key_achievements: [
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
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      internships: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: resumeData?.experience.length + 1,
      position: "",
      company: "",
      description: "",
      duration: "",
      key_achievements: [],
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      internships: [...resumeData?.internships, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item.id === currentItem?.id
        ? {
            ...item,
            ["key_achievements"]: [...item?.key_achievements, selectedItems],
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
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
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
          style={{ color: resumeData?.style?.primary_color }}
        >
          Internships & Volunteer Experience{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
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
            {hoveredItemId === item.id && (
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
                        handleRemove(item.id);
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
                  onChange={(e) =>
                    handleInputChange(item.id, "company", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="From - Until"
                  value={item.duration}
                  onChange={(e) =>
                    handleInputChange(item.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center mb-2 ml-[3px">
                <input
                  className={`border-none text-base uppercase font-semibold focus:outline-none bg-white text-zinc-700 placeholder:text-zinc-700 focus:bg-zinc-100 px-2`}
                  placeholder="POSITION"
                  value={item?.position}
                  onChange={(e) =>
                    handleInputChange(item.id, "position", e.target.value)
                  }
                />
              </div>

              <div>
                <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                  {item?.key_achievements.map(
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
                            const updatedItem = item.key_achievements.filter(
                              (item: string) => item !== achievement
                            );
                            const updatedItems = items.map((item) =>
                              item.id === currentItem?.id
                                ? { ...item, ["key_achievements"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              experience: updatedItems,
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
                          !item?.key_achievements.includes(newAchievement) && [
                            ...item.key_achievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item.id === currentItem?.id
                            ? { ...item, ["key_achievements"]: newItem }
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
          <p className=" text-zinc-600">Internship/Volunteer Achievements</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your role for key achievement suggestions"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the items you want to apply
            </h6>
            <div className="h-[40vh] overflow-y-auto no-scrollbar">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
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
              Apply Selected Descriptions
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

  const [overview, setOverview] = useState("");

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
          link: "",
        },
        {
          id: 2,
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
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      projects: updatedItems,
    }));
  };

  // Handler to add new experience
  const addProject = () => {
    const newProject = {
      id: resumeData?.projects?.length + 1,
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
  const [showModal, setShowModal] = useState(false);

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
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
          style={{ color: resumeData?.style?.primary_color }}
        >
          Projects{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
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
                    onClick={addProject}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item.id);
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
                    handleInputChange(item.id, "name", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter Technology/skill used for this project"
                  value={item?.technology}
                  onChange={(e) =>
                    handleInputChange(item.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center ml-[3px]">
                {editingItemId === item.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
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
                    onClick={() => setEditingItemId(item.id)}
                  >
                    {item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."}
                  </p>
                )}
              </div>

              <div className={`pb-1 pt-3 border-stroke`}>
                <div className="flex">
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={
                        item?.link ||
                        "Attach a github or website link to this project"
                      }
                      onChange={(e) =>
                        handleInputChange(item.id, "link", e.target.value)
                      }
                      placeholder="Enter link to this project"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <a
                      className="px-1.5 text-[15px] cursor-pointer text-blue-600 font-medium"
                      onClick={() => setEditingItemId(item.id)}
                      href={item?.link || ""}
                      target="_blank"
                    >
                      {item?.link ||
                        "Attach a github or website link to this project"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setOverview("");
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Project Overview</p>
        </div>

        <div className="mb-7.5">
          <FieldInput
            label="Name"
            size="small"
            placeholder="Enter name of project"
            onChange={(val) => {
              console.log(val);
            }}
            id="role"
          />
        </div>

        {overview && (
          <div className="mb-7.5">
            <TextArea
              value={overview}
              onChange={(val) => setOverview(val)}
              label="AI Project Overview"
              disabled
              name="extra-info"
              placeholder=""
            />
          </div>
        )}

        <div className="flex flex-col gap-3 justify-end items-center">
          <GradientButton
            text="Generate Project Overview"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setOverview("This is a test overview lorem ipsum dolor sit amet");
            }}
          />
          {overview && (
            <Button
              rounded
              onClick={() => {
                handleInputChange(currentItem.id, "description", overview);
                setOverview("");
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply AI Overview
            </Button>
          )}
        </div>
      </Modal>
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

  const [overview, setOverview] = useState("");

  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    if (resumeData?.careerHighlights?.length > 0) {
      setItems(resumeData?.careerHighlights);
    } else {
      setItems([
        {
          id: 1,
          name: "",
          technology: "",
          description: "",
          link: "",
        },
        {
          id: 2,
          name: "",
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
        projects: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      projects: updatedItems,
    }));
  };

  // Handler to add new experience
  const addHighlight = () => {
    const newProject = {
      id: resumeData?.projects?.length + 1,
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
  const [showModal, setShowModal] = useState(false);

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
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
  }, [resumeData?.careerHighlights[currentItem?.id - 1]?.description]);
  return (
    <div>
      <div className="flex mb-3 gap-3  justify-between items-center">
        <h6
           className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
          style={{
            color: resumeData?.style?.primary_color,
            borderColor: resumeData?.style?.primary_color,
          }}
        >
          Career Highlights{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-5">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
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
                    onClick={addHighlight}
                    className="h-8 w-8 flex justify-center items-center border-none text-primary/90 hover:text-primary text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item.id);
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
                  onChange={(e) =>
                    handleInputChange(item.id, "title", e.target.value)
                  }
                />
                
              </div>

              <div className="flex items-center ml-[3px]">
                {editingItemId === item.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
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
                    className="px-1.5 text-[15px] cursor-text font-medium"
                    onClick={() => setEditingItemId(item.id)}
                  >
                    {item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."}
                  </p>
                )}
              </div>

              <div className={`pb-1 pt-3 border-stroke`}>
                <div className="flex">
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={
                        item?.link ||
                        "Attach a github or website link to this project"
                      }
                      onChange={(e) =>
                        handleInputChange(item.id, "link", e.target.value)
                      }
                      placeholder="Enter link to this project"
                      className="flex-1 max-sm:w-[75%] rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <a
                      className="px-1.5 text-[15px] cursor-text text-blue-600 font-medium"
                      onClick={() => setEditingItemId(item.id)}
                      href={""}
                      target="_blank"
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

      <Modal
        show={showModal}
        onHide={() => {
          setOverview("");
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Project Overview</p>
        </div>

        <div className="mb-7.5">
          <FieldInput
            label="Name"
            size="small"
            placeholder="Enter name of project"
            onChange={(val) => {
              console.log(val);
            }}
            id="role"
          />
        </div>

        {overview && (
          <div className="mb-7.5">
            <TextArea
              value={overview}
              onChange={(val) => setOverview(val)}
              label="AI Project Overview"
              disabled
              name="extra-info"
              placeholder=""
            />
          </div>
        )}

        <div className="flex flex-col gap-3 justify-end items-center">
          <GradientButton
            text="Generate Project Overview"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setOverview("This is a test overview lorem ipsum dolor sit amet");
            }}
          />
          {overview && (
            <Button
              rounded
              onClick={() => {
                handleInputChange(currentItem.id, "description", overview);
                setOverview("");
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply AI Overview
            </Button>
          )}
        </div>
      </Modal>
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
    const updatedItems = items.filter((item) => item.id !== id);
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
      item.id === currentItem?.id
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
      item.id === id ? { ...item, [field]: value } : item
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
          style={{ color: resumeData?.style?.primary_color }}
        >
          Projects{" "}
        </h6>
      </div>

      <div className="flex flex-col gap-9">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
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
                        handleRemove(item.id);
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
                    handleInputChange(item.id, "name", e.target.value)
                  }
                />
                <input
                  className={`border-none text-sm font-medium focus:outline-none bg-white text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Technology"
                  value={item?.technology}
                  onChange={(e) =>
                    handleInputChange(item.id, "duration", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center mb-5 ml-[3px]">
                {editingItemId === item.id ? (
                  <textarea
                    className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter project summary"
                    value={
                      item?.description ||
                      "Provide a brief description of the project, its purpose, and key technologies used."
                    }
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
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
                    onClick={() => setEditingItemId(item.id)}
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
                              item.id === currentItem?.id
                                ? { ...item, ["responsibilities"]: updatedItem }
                                : item
                            );
                            setResumeData((prev: any) => ({
                              ...prev,
                              projects: updatedItems,
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
                          !item?.key_achievements.includes(newAchievement) && [
                            ...item.key_achievements,
                            newAchievement,
                          ];
                        const updatedItems = items.map((item) =>
                          item.id === currentItem?.id
                            ? { ...item, ["key_achievements"]: newItem }
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
  const [items, setItems] = useState<EducationProps[]>(resumeData?.education);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);

  useEffect(() => {
    if (resumeData?.experience?.length > 0) {
      setItems(resumeData?.education);
    } else {
      setItems([
        {
          id: 1,
          school: "Name of Univerity/Organization",
          degree: "DEGREE TYPE / MAJOR",
          duration: "From-to",
          year: "year",
          info: "Consider listing course titles (not numbers), details of coursework and special projects, or academic accomplishments that show you’re ready to excel in your new industry.",
        },
        {
          id: 2,
          school: "Name of Univerity/Organization",
          degree: "DEGREE TYPE / MAJOR",
          duration: "From-to",
          year: "year",
          info: "¾	You can also list organizations, clubs, teams etc. that show off additional interpersonal and leadership skills.",
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
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      education: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newEducation = {
      id: resumeData?.education?.length + 1,
      degree: "DEGREE TYPE / MAJOR",
      school: "SCHOOL NAME",
      duration: "",
      year: "Year",
      info: "Additional Information (CGPA Relevant Courses, Academic accomplishments, special projects, etc,.)",
    };
    setResumeData(() => ({
      ...resumeData,
      education: [...resumeData?.education, newEducation],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
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
  }, [resumeData?.education[currentItem?.id - 1]?.description]);
  return (
    <div>
      {resumeData?.template === "professional" ? (
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
          style={{
            color: resumeData?.style?.primary_color,
            borderColor: resumeData?.style?.primary_color,
          }}
        >
          Education{" "}
        </h6>
      ) : (
        <h6
          className="font-semibold text-lg uppercase pl-4.5 mb-3"
          style={{ color: resumeData?.style?.primary_color }}
        >
          Education and Certifications
        </h6>
      )}
      <div className="flex flex-col gap-4">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
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
                        handleRemove(item.id);
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
                      {hoveredItemId === item.id &&
                      editingSchoolId === item?.id ? (
                        <input
                          className={`border-none w-full uppercase text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                          placeholder="School"
                          value={item?.school}
                          autoFocus
                          onBlur={() => setEditingSchoolId(null)}
                          onChange={(e) =>
                            handleInputChange(item.id, "school", e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingSchoolId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
                        >
                          {item?.school}
                        </span>
                      )}
                    </div>

                    <span className="font-semibold uppercase hidden">|</span>
                    <div className="pl-2">
                      {hoveredItemId === item.id &&
                      editingDegreeId === item?.id ? (
                        <input
                          className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                          placeholder="DEGREE"
                          value={item?.degree}
                          autoFocus
                          onBlur={() => setEditingDegreeId(null)}
                          onChange={(e) =>
                            handleInputChange(item.id, "degree", e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingDegreeId(item?.id)}
                          className="text-base uppercase font-semibold text-zinc-800"
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
                      onChange={(e) =>
                        handleInputChange(item.id, "year", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="py-2">
                  {hoveredItemId === item.id && editingInfoId === item?.id ? (
                    <div>
                      <textarea
                        className={`border-none bg-white focus:bg-zinc-100 focus:ring-0 focus:outline-none px-3 font-medium text-black text-base placeholder:text-black w-full`}
                        placeholder="Enter project summary"
                        value={item?.info}
                        onChange={(e) =>
                          handleInputChange(item?.id, "info", e.target.value)
                        }
                        onBlur={() => setEditingInfoId(null)}
                        autoFocus
                        ref={textareaRef}
                        rows={2}
                        style={{
                          overflow: "hidden",
                          resize: "none",
                          width: "100%",
                        }}
                      />
                    </div>
                  ) : (
                    <span onClick={() => setEditingInfoId(item?.id)} className="text-[15px]  cursor-text font-medium">
                      {item?.info}
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
                      placeholder="School"
                      value={item?.school}
                      onChange={(e) =>
                        handleInputChange(item.id, "school", e.target.value)
                      }
                    />
                    <div className="ml-auto">
                      <input
                        className={`border-none text-sm text-right w-[50px] font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                        placeholder="Enter Year (yyyy)"
                        value={item?.year}
                        onChange={(e) =>
                          handleInputChange(item.id, "year", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <input
                      className={`border-none w-full text-base uppercase font-semibold bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                      placeholder="DEGREE"
                      value={item?.degree}
                      onChange={(e) =>
                        handleInputChange(item.id, "degree", e.target.value)
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

  useEffect(() => {
    if (resumeData?.trainings?.length > 0) {
      setItems(resumeData?.trainings);
    } else {
      setItems([
        {
          id: 1,
          title: "Bachelor of Science in Computer Science",
          platform: "University of California, Berkeley",
          year: "2015",
        },
        {
          id: 2,
          title: "PHD in Computer Science",
          platform: "NYU School of Engineering",
          year: "2020",
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
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      trainings: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newEducation = {
      id: resumeData?.education?.length + 1,
      title: "Bachelor of Science in Computer Science",
      platform: "University of California, Berkeley",
      year: "2015",
     };
    setResumeData(() => ({
      ...resumeData,
      trainings: [...resumeData?.trainings, newEducation],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
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
            color: resumeData?.style?.primary_color,
            borderColor: resumeData?.style?.primary_color,
          }}
        >
          TRAINING & CERTIFICATIONS
        </h6>
      
      <div className="flex flex-col gap-2.5">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-stroke rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
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
                        handleRemove(item.id);
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
                      {hoveredItemId === item.id &&
                      editingSchoolId === item?.id ? (
                        <input
                          className={`border-none w-full text-base bg-white text-black focus:outline-none focus:bg-zinc-100 px-2`}
                          placeholder="Cert/Training Name"
                          value={item?.title}
                          autoFocus
                          onBlur={() => setEditingSchoolId(null)}
                          onChange={(e) =>
                            handleInputChange(item.id, "title", e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingSchoolId(item?.id)}
                          className="text-base font-semibold text-zinc-800"
                        >
                          {item?.title}
                        </span>
                      )}
                    </div>

                    <span className="font-semibold hidden">|</span>
                    <div className="pl-2">
                      {hoveredItemId === item.id &&
                      editingDegreeId === item?.id ? (
                        <input
                          className={`border-none w-full text-base bg-white text-zinc-800 focus:outline-none placeholder:text-zinc-800 focus:bg-zinc-100 px-2`}
                          placeholder="Platform / Organization"
                          value={item?.platform}
                          autoFocus
                          onBlur={() => setEditingDegreeId(null)}
                          onChange={(e) =>
                            handleInputChange(item.id, "platform", e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onClick={() => setEditingDegreeId(item?.id)}
                          className="text-base text-zinc-800"
                        >
                          {item?.platform}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <input
                      className={`border-none text-sm text-right w-[50px] font-medium bg-white text-black placeholder:text-black focus:outline-none focus:bg-zinc-100 px-2`}
                      placeholder="Enter Year (yyyy)"
                      value={item?.year}
                      onChange={(e) =>
                        handleInputChange(item.id, "year", e.target.value)
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
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [role, setRole] = useState("");
  const [showButon, setShowButton] = useState(false);
  const [AiSkills, setAiSkills] = useState<{ name: string; items: string[] }[]>(
    []
  );
  const [selectedSkills, setSelectedSkills] = useState<
    { name: string; items: string[] }[]
  >([]);
  const [editingSkill, setEditingSkill] = useState<{
    itemId: number;
    skillIndex: number;
  } | null>(null);
  const [editingName, setEditingName] = useState<{
    itemId: number;
    nameIndex: number;
  } | null>(null);
  const [items, setItems] = useState<
    { id: number; name: string; items: string[] }[]
  >(
    resumeData?.skills.map((val: any, index: number) => ({
      id: index + 1,
      name: val.name,
      items: val.items,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    setResumeData((prev: any) => ({
      ...prev,
      skills: [...prev.skills, ...selectedSkills],
    }));
    setAiSkills([]);
    setSelectedSkills([]);
  };

  useEffect(() => {
    if (resumeData?.skills?.length > 0) {
      setItems(
        resumeData?.skills.map((val: any, index: number) => ({
          id: index + 1,
          name: val.name,
          items: val.items,
        }))
      );
    } else {
      setItems([
        {
          id: 1,
          name: "Name of Skill (Ex: Soft Skill)",
          items: [
            "Mention the skill then briefly add some context to it",
            "Ex: Multi-tasking:Utilized task-management apps to manage and prioritize tasks",
          ],
        },
        {
          id: 2,
          name: "Name of Skill (Ex: Hard Skills)",
          items: [
            "Mention the skill then briefly add some context to it",
            "Skill",
          ],
        },
        {
          id: 3,
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
          name: item.name,
          items: item.items,
        })),
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      skills: updatedItems.map((item: any) => ({
        name: item.name,
        items: item.items,
      })),
    }));
  };

  // Handler to add new education
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      skills: [
        ...resumeData?.skills,
        {
          id: items?.length + 1,
          name: "Name of Skill (Ex: Soft Skill)",
          items: [
            "Mention the skill then briefly add some context to it",
            "skill name",
          ],
        },
      ],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      skills: updatedItems.map((item: any) => ({
        name: item.name,
        items: item.items,
      })),
    }));
  };
  return (
    <div
      className="hover:border border-dashed rounded-md border-spacing-1 px-2 py-3"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="w-full relative flex justify-between  mb-2.5">
        <h6
          className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 w-full"
          style={{
            color: resumeData?.style?.primary_color,
            borderColor: resumeData?.style?.primary_color,
          }}
        >
          Key Skills
        </h6>
        {showButon && (
          <div className="absolute right-4 -top-6">
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

      <ul className="gap-3 px-1.5">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 px-1.5 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md flex flex-col mb-1">
              {hoveredItemId === item.id && (
                <div className="flex w-full gap-1 justify-end -mt-4 ">
                  <div className="flex gap-1 items-center bg-white z-0">
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.skills?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item.id);
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
                {editingName?.itemId === item.id &&
                editingName.nameIndex === index ? (
                  <input
                    className={`border-none italic border-b text-base bg-white focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                    placeholder="Enter Skill Title"
                    value={item.name}
                    autoFocus
                    onBlur={() => setEditingName(null)}
                    onChange={(e) =>
                      handleInputChange(item.id, "name", e.target.value)
                    }
                  />
                ) : (
                  <span
                    onClick={() =>
                      setEditingName({ itemId: item.id, nameIndex: index })
                    }
                    className="italic underline text-base text-zinc-500 underline-offset-2 cursor-pointer font-medium"
                  >
                    {item.name}
                  </span>
                )}
              </div>

              <ul className="inline-flex items-center gap-2 flex-wrap">
                {item.items.map((skillItem: string, skillIndex: number) => (
                  <li key={skillIndex}>
                    {editingSkill?.itemId === item.id &&
                    editingSkill.skillIndex === skillIndex ? (
                      <input
                        className={`border-none text-base bg-white focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                        placeholder="Enter Skill Item"
                        value={skillItem}
                        autoFocus={true}
                        onBlur={() => setEditingSkill(null)}
                        onChange={(e) => {
                          const updatedItems = items.map((itm) =>
                            itm.id === item.id
                              ? {
                                  ...itm,
                                  items: itm.items.map((i, idx) =>
                                    idx === skillIndex ? e.target.value : i
                                  ),
                                }
                              : itm
                          );
                          setItems(updatedItems);
                          setResumeData((prev: any) => ({
                            ...prev,
                            skills: updatedItems.map((itm: any) => ({
                              name: itm.name,
                              items: itm.items,
                            })),
                          }));
                        }}
                      />
                    ) : (
                      <span
                        onClick={() =>
                          setEditingSkill({ itemId: item.id, skillIndex })
                        }
                        className="text-[15px] cursor-pointer font-medium"
                      >
                        {skillItem}{" "}
                        {item?.items?.length > 1 &&
                          skillIndex + 1 !== item?.items?.length &&
                          "|"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
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
                        selectedSkills.some((skill) => skill?.name === val.name)
                          ? selectedSkills.filter(
                              (skill) => skill?.name !== val.name
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
                    <div>
                      <strong>{val.name}:</strong> {val.items.join(", ")}
                    </div>
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
              setAiSkills(exampleSkills);
            }}
          />
          {selectedSkills.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Skills
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
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [role, setRole] = useState("");
  const [showButon, setShowButton] = useState(false);
  const [AiSkills, setAiSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [items, setItems] = useState<SkillProps[]>(
    resumeData?.areasOfExpertise.map((val: string) => ({
      id: resumeData?.areasOfExpertise?.length + 1,
      value: val,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    setResumeData((prev: any) => ({
      ...prev,
      areasOfExpertise: [
        ...new Set([...resumeData?.areasOfExpertise, ...selectedSkills]),
      ],
    }));
    setAiSkills([]);
    setSelectedSkills([]);
  };

  useEffect(() => {
    if (resumeData?.areasOfExpertise?.length > 0) {
      setItems(
        resumeData?.areasOfExpertise.map((val: string, index: number) => ({
          id: index + 1,
          value: val,
        }))
      );
    } else {
      setItems([
        {
          id: 1,
          value: "Add Area of Expertise",
        },
        {
          id: 2,
          value: "Add Area of Expertise",
        },
        {
          id: 2,
          value: "Add Area of Expertise",
        },
      ]);
    }
  }, [resumeData?.areasOfExpertise]);

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
        areasOfExpertise: updatedItems.map((item: any) => item.value),
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      areasOfExpertise: updatedItems.map((item: any) => item.value),
    }));
  };

  // Handler to add new education
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      areasOfExpertise: [...resumeData?.areasOfExpertise, ""],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      sareasOfExpertise: updatedItems.map((item: any) => item.value),
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
          style={{ color: resumeData?.style?.primary_color }}
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
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md">
              {hoveredItemId === item.id && (
                <div className="flex w-full gap-1 justify-end -mt-4 ">
                  <div className="flex gap-1 items-center bg-white z-0">
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.areasOfExpertise?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item.id);
                        }}
                        className="h-6 w-6 flex justify-center items-center border-none text-primary/90 hover:text-primary text-xl"
                      >
                        <FaCircleMinus />
                      </button>
                    )}
                    {resumeData?.areasOfExpertise?.length > 1 && (
                      <button className=" h-5 w-5 flex justify-center items-center rounded-full border-none text-white bg-primary cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {editingItemId === item.id ? (
                <input
                  className={`border-none bg-white w-full focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter area of expertise"
                  value={item.value}
                  onChange={(e) =>
                    handleInputChange(item.id, "value", e.target.value)
                  }
                  onBlur={() => setEditingItemId(null)}
                  autoFocus
                />
              ) : (
                <span
                  className="text-[15px] cursor-pointer font-medium"
                  onClick={() => setEditingItemId(item.id)}
                >
                  {item.value || "Enter relevant course"}{" "}
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
          <GradientButton
            text="Generate Bullet Points"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setAiSkills(mockArray);
            }}
          />
          {selectedSkills.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Skills
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
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [role, setRole] = useState("");
  const [showButon, setShowButton] = useState(false);
  const [AiSkills, setAiSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [items, setItems] = useState<SkillProps[]>(
    resumeData?.relevantCourses.map((val: string) => ({
      id: resumeData?.relevantCourses?.length + 1,
      value: val,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    setResumeData((prev: any) => ({
      ...prev,
      relevantCourses: [
        ...new Set([...resumeData?.relevantCourses, ...selectedSkills]),
      ],
    }));
    setAiSkills([]);
    setSelectedSkills([]);
  };

  useEffect(() => {
    setItems(
      resumeData?.relevantCourses.map((val: string, index: number) => ({
        id: index + 1,
        value: val,
      }))
    );
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
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
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
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      relevantCourses: updatedItems.map((item: any) => item.value),
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
          style={{ color: resumeData?.style?.primary_color }}
        >
          RELEVANT COURSES
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

      <ul className="grid grid-cols-3 items-center gap-3 px-2">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-zinc-800 py-0 hover:border hover:rounded-lg border-zinc-300`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-1 rounded-md">
              {hoveredItemId === item.id && (
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
                          handleRemove(item.id);
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

              {editingItemId === item.id ? (
                <input
                  className={`border-none bg-white w-full focus:outline-none text-black placeholder:text-black focus:bg-zinc-100 px-2`}
                  placeholder="Enter area of expertise"
                  value={item.value}
                  onChange={(e) =>
                    handleInputChange(item.id, "value", e.target.value)
                  }
                  onBlur={() => setEditingItemId(null)}
                  autoFocus
                />
              ) : (
                <span
                  className="px-1 text-base font-medium"
                  onClick={() => setEditingItemId(item.id)}
                >
                  {item.value || "Enter relevant course"}
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
          <p className=" text-zinc-600">Relevant Courses</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your role to generate a list of tailored relevant courses"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiSkills?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the courses you want to apply
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
          <GradientButton
            text="Generate Bullet Points"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setAiSkills(mockArray);
            }}
          />
          {selectedSkills.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Skills
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};
