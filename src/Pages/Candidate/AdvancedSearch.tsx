import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaBriefcase, FaLocationArrow, FaUserGraduate } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MultiDropdown } from "../../components/form/customDropdown";

type Props = {
  show?: boolean;
  onHide: () => void;
  children?: React.ReactNode;
};

const AdvancedSearchModal: React.FC<Props> = ({ show, onHide }) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState({
    careerLevel: "",
    location: [] as string[], // Multiselect
    experience: [] as string[],
    gender: "",
    education: "",
    nationality: "",
    industry: "",
    skills: "",
  });

  // Handle change for single-select dropdowns
  const handleSingleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  

  const applyFilters = () => {
    // Send filters to the backend or handle them accordingly
    console.log("Applied Filters:", filters);
  };

  const resetFilters = () => {
    setFilters({
      careerLevel: "",
      location: [],
      experience: [],
      gender: "",
      education: "",
      nationality: "",
      industry: "",
      skills: "",
    });
  };
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click target is outside the modal content and not on the scrollbar
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        event.target !== document.documentElement
      ) {
        onHide(); // Call onHide when clicking outside the modal, excluding the scrollbar
      }
    };

    if (show) {
      // Add the event listener when the modal is shown
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Remove the event listener when the modal is hidden
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, onHide]);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-screen h-screen z-9999 bg-black bg-opacity-50 fixed top-0 flex md:items-center md:justify-center text-[#444444] overflow-x-auto">
      <div
        className={` bg-white pt-5  flex flex-col w-full lg:max-w-[60%] lg:w-[650px]  md:rounded-2xl md:justify-center md:mx-6 md:my-auto mx-0`}
        ref={modalRef}
      >
        <div className="flex flex-col justify-center relative">
          <div className="flex items-center md:px-6 pb-2 px-4 border-b border-stroke">
            <div className="flex items-center gap-2">
              <IoSearch size={28} className="text-primary" />
              <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-0">
                Advanced Search
              </h3>
            </div>

            <button
              onClick={onHide}
              className="absolute -top-[12px] text-zinc-900 right-2 bg-slate-200 hover:bg-slate-300 rounded-full p-[4px]"
            >
              <RxCross2 size={18} className="" />
            </button>
          </div>

          <div className="px-10 py-9">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 mb-4">
              {/* Career Level */}
              <div className="w-full">
                <label
                  className="text-sm font-medium capitalize mb-1 flex items-center"
                  htmlFor="careerLevel"
                >
                  <FaBriefcase className="mr-2 text-zinc-400" /> Career Level
                </label>
                <select
                  id="careerLevel"
                  name="careerLevel"
                  value={filters.careerLevel}
                  onChange={handleSingleFilterChange}
                  className="w-full border border-zinc-200 rounded px-2 py-1.5"
                >
                  <option value="">All</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              {/* Location (Multiselect) */}

              <div>
                <MultiDropdown
                  label="Location"
                  props={{ labelIcon: <FaLocationArrow className="mr-2 text-zinc-400" /> }}
                  options={[
                    { label: "Hybrid", value: "Hybrid" },
                    { label: "Onsite", value: "Onsite" },
                    { label: "Remote", value: "Remote" },
                  ]}
                  placeholder="Select Location"
                  onSelect={(val) => {
                    const v = val.map((item: any) => item.value);
                    setFilters((prev) => ({ ...prev, location: v }));
                  }}
                />
              </div>

              {/* Experience (Multiselect) */}
              <div>
                <MultiDropdown
                  label="Experience"
                  props={{ labelIcon: <IoMdSchool className="mr-2 text-zinc-400" /> }}
                  options={[
                    { label: "1-2 years", value: "1-2" },
                    { label: "3-5 years", value: "3-5" },
                    { label: "5+ years", value: "5" },
                  ]}
                  placeholder="Select Experience"
                  onSelect={(val) => {
                    const v = val.map((item: any) => item.value);
                    setFilters((prev) => ({ ...prev, experience: v }));
                  }}
                />
              </div>
             

              {/* Education */}
              <div className="w-full">
                <label
                  className="text-sm font-medium capitalize mb-1 flex items-center"
                  htmlFor="education"
                >
                  <FaUserGraduate className="mr-2 text-zinc-400" /> Education
                </label>
                <select
                  id="education"
                  name="education"
                  value={filters.education}
                  onChange={handleSingleFilterChange}
                  className="w-full border border-zinc-200 rounded px-2 py-1.5"
                >
                  <option value="">All</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
             
            </div>
          </div>

          <div className="flex justify-between gap-4 py-3 md:px-4 px-2.5 rounded-b-2xl w-full bg-[#F9FAFB]">
          <button
              onClick={() => {
                resetFilters()
                onHide()
              }}
              className="rounded-md text-zinc-500 hover:scale-105"
            >
              Cancel
            </button>
            <div className="flex gap-4 items-center">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-md text-zinc-600 hover:scale-105"
            >
              Clear all filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-blue-600"
            >
              Apply Filters
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>,

    document.querySelector("#modal") as HTMLElement
  );
};

export default AdvancedSearchModal;
