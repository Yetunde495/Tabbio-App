import { FormGroup } from "../../../components/form";
import { useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { generateUniqueId } from "../../../lib/utils";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { MdAddCircle } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { SaveProfile } from "../../../services/profileServices";
import { createResume } from "../../../services/resumeServices";

type Props = {
  CvData: any;
  setCvData: any;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  completeStep: () => void;
  completed: boolean;
};

const Education: React.FC<Props> = ({
  CvData,
  setCvData,
  activeStep,
  setActiveStep,
  completeStep,
  //   completed,
}) => {
  const { user, updateUser } = useApp();
  const [items, setItems] = useState<any[]>(CvData?.education);
  const [courses, setCourses] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newCourse, setNewCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [educationData, setEducationData] = useState({
    degree: "",
    institution: "",
    description: "",
    field: "",
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

  const removeCourse = (minor: string) => {
    setCourses(courses.filter((s) => s !== minor));
    setEducationData((data: any) => ({
      ...data,
      relevantCourseWork: courses.filter((s) => s !== minor),
    }));
  };

  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setCvData((data: any) => ({
      ...data,
      education: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const itemIndex = items.findIndex((item) => item.id === currentItem.id);

    if (itemIndex !== -1) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === currentItem.id ? { ...item, ...educationData } : item
      );
      setItems(updatedItems);
      setCvData((data: any) => ({
        ...data,
        education: updatedItems,
      }));
    } else {
      // Add new item
      setItems([...items, educationData]);
      setCvData((data: any) => ({
        ...data,
        education: [...CvData?.education, educationData],
      }));
    }
    setCurrentItem(null);
    setCourses([]);
  };

  const addNewExperience = () => {
    const id = generateUniqueId();
    const newItem = {
      degree: "",
      institution: "",
      description: "",
      field: "",
      location: "",
      gpa: "",
      minors: "",
      startDate: new Date(),
      endDate: new Date(),
      relevantCourseWork: [],
      active: false,
      hideEndDate: false,
      id: id,
    };
    if (CvData?.education?.length > 0) {
      setItems((item: any) => [...item, newItem]);
    } else {
      setItems([newItem]);
    }
    setCurrentItem(newItem);
    setEducationData(newItem);
  };

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      const resp = await SaveProfile(CvData);
      updateUser({
        ...user,
        profile: true,
        profileId: resp?.data?.profile?._id,
      });
      completeStep();
      setActiveStep(activeStep + 1);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (CvData?.education?.length > 0) {
      setItems(CvData?.education);
    } else {
      addNewExperience();
    }
  }, [CvData?.education]);

  return (
    <div className="py-4">
      <div className="w-full flex justify-between items-center gap-x-3 mb-4.5">
        <h6 className="text-[#242424] font-medium text-[17px]">
          Education History
        </h6>
        {!currentItem && (
          <button
            onClick={() => {
              addNewExperience();
            }}
            className="py-2 px-4 font-medium ml-auto flex gap-1.5 items-center justify-center"
          >
            <MdAddCircle size={18} className="text-black" /> Add another Degree
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {items.map((item, _index) => (
          <div key={item?.id}>
            {currentItem?.id !== item?.id && (
              <div className="flex shadow-card p-3 rounded justify-between w-full gap-4 items-start mb-3">
                <div>
                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                    {item?.degree}
                  </h6>
                  <p className="max-md:text-sm italic text-zinc-600">
                    {item?.institution}
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
                      setEducationData(item);
                      setCourses(item?.relevantCourseWork || []);
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
                      value={educationData?.field}
                      onChange={(e) =>
                        setEducationData((data: any) => ({
                          ...data,
                          field: e.target.value,
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
                      Consider hiding the end date to avoid potential age bias
                      in your application
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
                  {courses.length > 0 && (
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

                <div className="w-full flex justify-center">
                  <button
                    className="bg-primary w-full rounded-md text-white font-semibold flex items-center justify-center py-2 px-5 md:py-3 hover:bg-opacity-90"
                    onClick={() => {
                      addExperience();
                    }}
                  >
                    Save Education
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center gap-x-5 mt-10 py-6 border-stroke border-t">
          <button
            className="flex items-center text-[#5A5A5A] h-12 group font-semibold justify-center gap-2 border rounded-md border-[#5A5A5A] sm:px-6 sm:py-2 px-4 py-2"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <FaArrowLeft
              fontWeight={600}
              className="group-hover:-translate-x-2 duration-150 ease-in-out"
            />{" "}
            Back to Experience
          </button>
          <button
            type="submit"
            disabled={loading}
            className="md:px-6 md:py-3 px-4 py-2 group rounded-md text-white disabled:bg-opacity-65 flex justify-center items-center gap-2 bg-[#15803D]"
            onClick={() => {
              console.log(CvData);
              handleCreateProfile();
            }}
          >
            {loading ? "Loading" : "Submit & Complete"}
            <FaCheck
              fontWeight={600}
              className="group-hover:scale-105 duration-150 ease-in-out"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ResumeEducation: React.FC<Props> = ({
  CvData,
  setCvData,
  activeStep,
  setActiveStep,
  completeStep,
  //   completed,
}) => {
  const {} = useApp();
  const [items, setItems] = useState<any[]>(CvData?.education);
  const [courses, setCourses] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newCourse, setNewCourse] = useState("");
  const [loading, setLoading] = useState(false);
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

  const removeCourse = (minor: string) => {
    setCourses(courses.filter((s) => s !== minor));
    setEducationData((data: any) => ({
      ...data,
      relevantCourseWork: courses.filter((s) => s !== minor),
    }));
  };

  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item?.id !== id);
    setItems(updatedItems);
    setCvData((data: any) => ({
      ...data,
      education: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const itemIndex = items.findIndex((item) => item.id === currentItem.id);

    if (itemIndex !== -1) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === currentItem.id ? { ...item, ...educationData } : item
      );
      setItems(updatedItems);
      setCvData((data: any) => ({
        ...data,
        education: updatedItems,
      }));
    } else {
      // Add new item
      setItems([...items, educationData]);
      setCvData((data: any) => ({
        ...data,
        education: [...CvData?.education, educationData],
      }));
    }
    setCurrentItem(null);
    setCourses([]);
  };

  const addNewExperience = () => {
    const id = generateUniqueId();
    const newItem = {
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
      id: id,
    };
    if (CvData?.education?.length > 0) {
      setItems((item: any) => [...item, newItem]);
    } else {
      setItems([newItem]);
    }
    setCurrentItem(newItem);
    setEducationData(newItem);
  };

  const handleCreateResume = async () => {
    setLoading(true);

    try {
      const resp = await createResume(CvData);
      setCvData(resp?.data?.resume);
      completeStep();
      setActiveStep(activeStep + 1);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (CvData?.education?.length > 0) {
      setItems(CvData?.education);
    } else {
      addNewExperience();
    }
  }, [CvData?.education]);

  return (
    <div className="py-4">
      <div className="w-full flex justify-between items-center gap-x-3 mb-4.5">
        <h6 className="text-[#242424] font-medium text-[17px]">
          Education History
        </h6>
        {!currentItem && (
          <button
            onClick={() => {
              addNewExperience();
            }}
            className="py-2 px-4 font-medium ml-auto flex gap-1.5 items-center justify-center"
          >
            <MdAddCircle size={18} className="text-black" /> Add another Degree
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {items.map((item, _index) => (
          <div key={item?.id}>
            {currentItem?.id !== item?.id && (
              <div className="flex shadow-card p-3 rounded justify-between w-full gap-4 items-start mb-3">
                <div>
                  <h6 className="md:text-lg text-base font-medium text-zinc-800 mb-0">
                    {item?.degree}
                  </h6>
                  <p className="max-md:text-sm italic text-zinc-600">
                    {item?.institution}
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
                      setEducationData(item);
                      setCourses(item?.relevantCourseWork || []);
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
                      Consider hiding the end date to avoid potential age bias
                      in your application
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
                  {courses.length > 0 && (
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

                <div className="w-full flex justify-center">
                  <button
                    className="bg-primary w-full rounded-md text-white font-semibold flex items-center justify-center py-2 px-5 md:py-3 hover:bg-opacity-90"
                    onClick={() => {
                      addExperience();
                    }}
                  >
                    Save Education
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center gap-x-5 mt-10 py-6 border-stroke border-t">
          <button
            className="flex items-center text-[#5A5A5A] h-12 group font-semibold justify-center gap-2 border rounded-md border-[#5A5A5A] sm:px-6 sm:py-2 px-4 py-2"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <FaArrowLeft
              fontWeight={600}
              className="group-hover:-translate-x-2 duration-150 ease-in-out"
            />{" "}
            Back to Experience
          </button>
          <button
            type="submit"
            disabled={loading}
            className="md:px-6 md:py-3 px-4 py-2 group rounded-md text-white disabled:bg-opacity-65 flex justify-center items-center gap-2 bg-[#15803D]"
            onClick={() => {
              console.log(CvData);
              handleCreateResume();
            }}
          >
            {loading ? "Loading" : "Submit & Complete"}
            <FaCheck
              fontWeight={600}
              className="group-hover:scale-105 duration-150 ease-in-out"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Education;
