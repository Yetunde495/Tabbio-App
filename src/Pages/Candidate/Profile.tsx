import { useApp } from "../../context/AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import { ResumeUpload } from "../General/ResumeUpload";
import { useMemo, useState } from "react";
import Modal from "../../components/modal";
import { Switch } from "../../components/form/Switch";
import { CiEdit } from "react-icons/ci";
import {
  BsCopy,
  BsDatabaseGear,
  BsEye,
  BsPlusLg,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import {
  MdInsertLink,
  MdKeyboardDoubleArrowLeft,
  // MdOutlineShield,
  MdShare,
} from "react-icons/md";
import Drawer from "../../components/Drawer";
import Button from "../../components/Button";
import {
  FaCheck,
  FaCircle,
  FaFacebookF,
  FaLinkedinIn,
  FaRegCalendar,
} from "react-icons/fa6";
import { AiOutlineBarChart } from "react-icons/ai";
import {
  LuBriefcase,
  LuClock,
  LuContact,
  LuExternalLink,
  LuPencil,
} from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { SlSettings } from "react-icons/sl";
import { TbCopy, TbWorld } from "react-icons/tb";
import ResumeAnalytics from "./ResumeAnalytics";
import { UpgradeCandidateSubscription } from "../PageComponents/UpgradeSubscriptionModal";
import { FcReddit } from "react-icons/fc";
import { mockProfileData } from "../../data/mockData";
import {
  BasicDetails,
  CareerHighlight,
  Certifications,
  Education,
  Internships,
  Memberships,
  ProfessionalReference,
  ProfileSummary,
  VolunteerExperience,
  WorkExperience,
} from "./SmartResumeComponents";
import { IoDocumentTextOutline } from "react-icons/io5";
import { truncateString } from "../../lib/utils/formatters";
import {
  getUserProfile,
  SaveProfile,
  updateProfile,
} from "../../services/profileServices";
import { toast } from "react-toastify";
import { PageLoader } from "../../components/Loader";
import { RiLoader3Fill } from "react-icons/ri";

const SmartResumeSettings: React.FC<{
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ profileData, setProfileData }) => {
  const { user, updateUser } = useApp();
  const [editLink, setEditLink] = useState(false);
  const navigate = useNavigate();
  const prefix = "tabbio.link/";
  const [inputValue, setInputValue] = useState(
    `${user?.tabbioLink}` || "tabbio.link/"
  );
  const [linkModal, setLinkModal] = useState(false);
  const [contactPrivacyModal, setContactPrivacyModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");

  const [infoModal, setInfoModal] = useState(false);
  const [basicDetails, setBasicDetails] = useState({
    linkedin: profileData?.linkedin,
    location: profileData?.location,
    locationType: profileData?.locationType,
    relocation: profileData?.relocation,
    workAvailability: profileData?.workAvailability || false,
  });
  const toggleLocationType = (type: string) => {
    const d = basicDetails?.locationType.includes(type)
      ? basicDetails?.locationType.filter((item: string) => item !== type)
      : [...basicDetails?.locationType, type];

    setBasicDetails((data: any) => ({
      ...data,
      locationType: d,
    }));
  };

  const handleUpdateProfile = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setInfoModal(false);
      setKey("");
    }
  };
  const handleUpdateLink = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateProfile(profileData?._id, data);
      setProfileData(resp?.data?.profile);
      updateUser({
        ...user,
        tabbioLink: inputValue,
      });
      setLinkModal(true);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
      setEditLink(false)
    }
  };

  return (
    <section className="bg-white w-full min-w-[319px] h-full">
      <div className="bg-zinc-50/90 flex items-center gap-1.5 py-2 px-3">
        <SlSettings /> Settings
      </div>
      <div className="p-3">
        {!editLink && (
          <div className="bg-gradient-to-l from-[#EFF6FF] to-[#DBEAFE] rounded-lg px-2 py-2.5">
            <div
              onClick={() => setKey("isLive")}
              className="flex items-center gap-2"
            >
              <TbWorld className="text-primary" size={14} />
              <div className="flex flex-col">
                <span className="text-sm">Smart Resume</span>
                <span className="text-xs">
                  Your Smart Resume is{" "}
                  {profileData?.isLive ? "live" : "not live"}
                </span>
              </div>
              <div className="ml-auto">
                {loading && key === "isLive" ? (
                  <span>
                    <RiLoader3Fill className="animate-spin" />
                  </span>
                ) : (
                  <Switch
                    value={profileData?.config?.isLive}
                    checked={profileData?.config?.isLive}
                    onChange={(value) => {
                      handleUpdateProfile({
                        config: {
                          ...profileData?.config,
                          isLive: value,
                        },
                      });
                    }}
                    size="sm"
                  />
                )}
              </div>
            </div>
            <div className="bg-white flex items-center gap-1 py-2 px-2 rounded-md border border-slate-200 my-3">
              <div className="flex items-center gap-2 ">
                <MdInsertLink className="text-primary" />
                <span className="text-sm break-words w-[150px]">{user?.tabbioLink}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="text-primary" onClick={() => {
                    navigator.clipboard.writeText(user?.tabbioLink).then(() => {
                      alert("Tabbio link Copied!");
                    });
                  }}>
                  <TbCopy />
                </button>
                <button
                  className="text-primary"
                  onClick={() => setEditLink(true)}
                >
                  <CiEdit size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {editLink && user?.tabbioLink && (
          <div className="bg-gradient-to-l from-[#EFF6FF] to-[#DBEAFE] rounded-lg px-2 py-2.5">
            <div className="flex items-center gap-2">
              <TbWorld className="text-primary" size={14} />
              <div className="flex flex-col">
                <span className="text-sm">Edit your custom URL</span>
                <span className="text-xs">
                  Personalize the URL for your profile.
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-2 px-2 my-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value;
                  // Prevent the user from modifying the prefix
                  if (!inputValue.startsWith(prefix)) {
                    return;
                  }

                  // Update the state but keep the prefix intact
                  setInputValue(inputValue);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const inputValue = e.currentTarget.value;
                  // Prevent deleting the prefix using Backspace or Delete keys
                  if (
                    (e.key === "Backspace" || e.key === "Delete") &&
                    inputValue.length === prefix.length
                  ) {
                    e.preventDefault();
                  }
                }}
                placeholder="your-name"
                className={` outline-none w-full px-2 bg-white ml-1 border border-slate-300 rounded-lg py-2 focus:border-primary`}
              />
              <button
                className="bg-primary px-6 py-2.5 rounded-md text-white hover:scale-95 w-full font-medium"
                onClick={() => {
                  handleUpdateLink({
                    tabbioLink: inputValue
                  })
                
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="bg-gradient-to-l from-[#EFF6FF] to-[#DBEAFE] rounded-lg py-4 px-3">
          <div className="flex items-center gap-2">
            <div>
              <IoDocumentTextOutline className="text-primary" size={16} />
            </div>
            <div className="">
              <p className="text-sm">Edit Downloadable CV</p>
              <p className="text-xs">
                The ATS-friendly CV recruiters can download from your profile.
              </p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => navigate(`edit-cv/${profileData?._id}`)}
                className="text-zinc-500"
              >
                <LuPencil />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 border-t border-zinc-100 py-4 px-3 mb-5 shadow rounded-lg">
          <LuBriefcase className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Open to</span>
            <span className="text-xs">
              Let recruiters know your availability
            </span>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setInfoModal(true)}
              className="text-zinc-500"
            >
              <LuPencil />
            </button>
          </div>
        </div>
        <div
          onClick={() => setKey("lastUpdate")}
          className="flex items-center border-t border-zinc-100 gap-2 py-4 px-3 mb-5 shadow rounded-lg"
        >
          <FaRegCalendar className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Last Update Status</span>
            <span className="text-xs">
              Let recruiters know your update time
            </span>
          </div>
          <div className="ml-auto">
            {loading && key === "lastUpdate" ? (
              <span>
                <RiLoader3Fill className="animate-spin" />
              </span>
            ) : (
              <Switch
                value={profileData?.config?.lastUpdate}
                checked={profileData?.config?.lastUpdate}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      lastUpdate: value,
                    },
                  });
                }}
                size="sm"
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-zinc-100 py-4 px-3 mb-5 shadow rounded-lg">
          <LuContact className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Contact Privacy</span>
            <span className="text-xs">Showing all contact details</span>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setContactPrivacyModal(true)}
              className="text-zinc-500"
            >
              <LuPencil />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center text-lg gap-1.5 mb-3">
          <BsDatabaseGear className="text-primary" /> Controls
        </div>

        <div className="flex flex-col gap-4 border-t border-zinc-100 py-4 px-3 mb-5 shadow rounded-lg">
          <div className="flex text-sm items-center gap-3 justify-between">
            <p>Profile Summary</p>
            <div className="ml-auto flex items-center gap-1">
              <span>
                {profileData?.config?.professionalSummary ? "+" : "-"}
              </span>
              <Switch
                value={status}
                checked={profileData?.config?.professionalSummary}
                onChange={(value) => {
                  setStatus(value);
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("role")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Professional Title</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "role" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.role ? "+" : "-"}</span>
              )}

              <Switch
                value={profileData?.config?.role}
                checked={profileData?.config?.role}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      role: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("careerHighlight")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Career Highlights</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "careerHighlight" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.careerHighlights ? "+" : "-"}</span>
              )}

              <Switch
                value={profileData?.config?.careerHighlights}
                checked={profileData?.config?.careerHighlights}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      careerHighlights: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("workExperience")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Work Experience</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "workExperience" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.workExperience ? "+" : "-"}</span>
              )}

              <Switch
                value={profileData?.config?.workExperience}
                checked={profileData?.config?.workExperience}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      workExperience: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("volunteerExperience")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Volunteer Experience</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "volunteerExperience" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>
                  {profileData?.config?.volunteerExperience ? "+" : "-"}
                </span>
              )}

              <Switch
                value={profileData?.config?.volunteerExperience}
                checked={profileData?.config?.volunteerExperience}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      volunteerExperience: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("internships")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Internships</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "internships" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.internships ? "+" : "-"}</span>
              )}

              <Switch
                value={profileData?.config?.internships}
                checked={profileData?.config?.internships}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      internships: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("education")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Education</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "education" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.education ? "+" : "-"}</span>
              )}
              <Switch
                value={profileData?.config?.education}
                checked={profileData?.config?.education}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      education: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("certifications")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Certifications and Trainings</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "certifications" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.certifications ? "+" : "-"}</span>
              )}
              <Switch
                value={profileData?.config?.certifications}
                checked={profileData?.config?.certifications}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      certifications: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("memberships")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Membership & Affiliation</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "memberships" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.memberships ? "+" : "-"}</span>
              )}
              <Switch
                value={profileData?.config?.memberships}
                checked={profileData?.config?.memberships}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      memberships: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
          <div
            onClick={() => setKey("references")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Professional Reference</p>
            <div className="ml-auto flex items-center gap-1">
              {loading && key === "references" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <span>{profileData?.config?.references ? "+" : "-"}</span>
              )}
              <Switch
                value={profileData?.config?.references}
                checked={profileData?.config?.references}
                onChange={(value) => {
                  handleUpdateProfile({
                    config: {
                      ...profileData?.config,
                      references: value,
                    },
                  });
                }}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={linkModal}
        onHide={() => {
          setLinkModal(false);
        }}
        size="w-full max-w-[450px]"
      >
        <div className="space-y-3 flex-col w-full items-center flex justify-center">
          <h6 className="text-xl text-zinc-800 font-semibold">
            Your Tabbio link is live
          </h6>
          <p className="text-zinc-500 text-center">
            Send it to your Linkedin, Twitter, TikTok, YouTube, and wherever
            your audience are.
          </p>

          <p className="text-3xl font-medium text-primary py-3 text-center">
            {user?.tabbioLink}
          </p>
          <Button
            size="lg"
            rounded
            onClick={() => {
              setEditLink(false);
            }}
          >
            <BsCopy /> Copy Link
          </Button>
        </div>
      </Modal>
      <Modal
        show={contactPrivacyModal}
        onHide={() => {
          setContactPrivacyModal(false);
        }}
        size="w-full max-w-[300px]"
        title="Contact Privacy"
      >
        <div className="space-y-4 flex-col w-full flex">
          <div
            onClick={() => setKey("email")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Email</p>
            <div className="ml-auto">
              {loading && key === "email" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <Switch
                  value={profileData?.config?.email}
                  checked={profileData?.config?.email}
                  onChange={(value) => {
                    handleUpdateProfile({
                      config: {
                        ...profileData?.config,
                        email: value,
                      },
                    });
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
          <div
            onClick={() => setKey("phone")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Phone</p>
            <div className="ml-auto">
              {loading && key === "phone" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <Switch
                  value={profileData?.config?.phone}
                  checked={profileData?.config?.phone}
                  onChange={(value) => {
                    handleUpdateProfile({
                      config: {
                        ...profileData?.config,
                        phone: value,
                      },
                    });
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
          <div
            onClick={() => setKey("location")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Location</p>
            <div className="ml-auto">
              {loading && key === "location" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <Switch
                  value={profileData?.config?.location}
                  checked={profileData?.config?.location}
                  onChange={(value) => {
                    handleUpdateProfile({
                      config: {
                        ...profileData?.config,
                        location: value,
                      },
                    });
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
          <div
            onClick={() => setKey("links")}
            className="flex text-sm items-center gap-3 justify-between"
          >
            <p>Links</p>
            <div className="ml-auto">
              {loading && key === "links" ? (
                <span>
                  <RiLoader3Fill className="animate-spin" />
                </span>
              ) : (
                <Switch
                  value={profileData?.config?.links}
                  checked={profileData?.config?.links}
                  onChange={(value) => {
                    handleUpdateProfile({
                      config: {
                        ...profileData?.config,
                        links: value,
                      },
                    });
                  }}
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={infoModal}
        onHide={() => setInfoModal(false)}
        title={profileData?.name}
        size="max-w-[600px] w-full"
      >
        <div>
          <div className="no-scrollbar max-h-[65vh] max-sm:max-h-[70vh] overflow-y-auto pr-2">
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={basicDetails?.location}
                onChange={(e) =>
                  setBasicDetails((data: any) => ({
                    ...data,
                    location: e.target.value,
                  }))
                }
                placeholder="Enter your location"
                className="mt-1 block w-full rounded-md border-stroke shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Type
              </label>
              <div className="flex gap-4 max-sm:flex-wrap">
                {["On-Site", "Hybrid", "Remote"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleLocationType(type)}
                    className={`px-4 py-1.5 rounded-full flex gap-2 font-normal items-center border border-stroke focus:outline-none  transition 
              ${
                basicDetails?.locationType.includes(type)
                  ? "bg-primary text-white"
                  : "bg-white text-zinc-700"
              }`}
                  >
                    {basicDetails?.locationType.includes(type) ? (
                      <FaCheck />
                    ) : (
                      <BsPlusLg />
                    )}{" "}
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relocation
              </label>
              <div className="flex flex-col gap-3 pl-1">
                {[
                  { label: "Open to Relocate", value: true },
                  {
                    label: "Not Open to Relocate",
                    value: false,
                  },
                ].map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="relocation"
                      value={String(option.value)}
                      checked={basicDetails?.relocation === option.value}
                      onChange={(e) => {
                        setBasicDetails((data: any) => ({
                          ...data,
                          relocation: e.target.value === "true",
                        }));
                      }}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="flex flex-col gap-3 pl-1">
                {[
                  { label: "Available for Work", value: true },
                  {
                    label: "Not available for work ",
                    value: false,
                  },
                ].map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="availability"
                      value={String(option.value)}
                      checked={basicDetails?.workAvailability === option.value}
                      onChange={(e) => {
                        setBasicDetails((data: any) => ({
                          ...data,
                          workAvailability: e.target.value === "true",
                        }));
                      }}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full border-t flex bg-white mt-3 pt-4 justify-between items-center border-stroke">
            <button
              onClick={() => {
                setInfoModal(false);
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
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

const ShareCV: React.FC = () => {
  const {user} = useApp();
  const [buttonText, setButtonText] = useState("Copy");

  const url = `http://tabbio-app.vercel.app/profile/${user?.tabbioLink}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copied!");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  };
  const text = "Check this out!";
  const title = "Check this out!";

  return (
    <div className="bg-white pb-6">
      <div className="flex items-center gap-4 mb-7">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white rounded-full p-2 hover:bg-blue-900"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn size={22} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-800"
          aria-label="Share on Facebook Messenger"
        >
          <FaFacebookF size={22} />
        </a>
        <a
          href={`https://twitter.com/messages/compose?text=${text}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white rounded-full p-2 hover:bg-zinc-800"
          aria-label="Share on X (Twitter)"
        >
          <BsTwitterX size={20} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${text}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
          aria-label="Share on WhatsApp"
        >
          <BsWhatsapp size={22} />
        </a>

        <a
          href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-700"
          aria-label="Share on Reddit"
        >
          <FcReddit size={22} />
        </a>
      </div>
      <div className="flex items-center border bg-neutral-300 border-stroke rounded-lg">
        <input
          type="text"
          readOnly
          className="flex-1 max-sm:w-[75%] text-gray-700 rounded-l-lg focus:outline-none bg-white focus-within:ring-0 border-none focus:border-none"
          value={user?.tabbioLink}
        />
        <button
          className="text-zinc-900 hover:scale-105 px-4 py-1.5 font-medium ml-2"
          onClick={handleCopy}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (data: any) => {
    const toastId = toast.loading("Setting up your Profile...");
    try {
      const resp = await SaveProfile(data);
      setProfileData(resp?.data?.profile);
      toast.update(toastId, {
        render: "Your Professional Profile has been setup successfully",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      setActive(true);
      // console.log(resp?.data?.profile);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed");
    }
  };

  useMemo(async () => {
    if (user) {
      try {
        setLoading(true);
        const resp = await getUserProfile();
        setProfileData(resp?.data?.profile);
        setActive(true);
        console.log(resp.data?.profile);
      } catch (err: any) {
        if (err?.message !== "Profile not found") {
          toast.error(err?.message || "Request Failed");
        }
      } finally {
        setLoading(false);
      }
    }
  }, [user]);
  return (
    <DefaultLayout>
      {loading ? (
        <PageLoader />
      ) : (
        <section className="">
          <div className="bg-gradient-to-r from-[#F9FAFBCC] to-[#FFFFFF66] border border-[#F3F4F6] py-2.5 px-4.5 text-sm flex flex-wrap sm:gap-2 lg:items-center justify-between gap-3">
            <div className="flex items-center gap-4 max-sm:justify-between">
              <div className="flex items-center gap-1">
                <FaCircle size={10} className="text-green-500 max-lg:hidden" />
                <span>{user?.plan || "Free Plan"}</span>
                <button
                  onClick={() => setUpgradeModal(true)}
                  className="py-1 px-1.5 ml-1 text-xs hover:scale-x-105 text-white rounded-full bg-[#C89529]"
                >
                  Upgrade <span className="max-lg:hidden">to Premium</span>
                </button>
              </div>
              <button
                onClick={() => setShowAnalytics(true)}
                className="flex max-sm:hidden items-center gap-1 hover:scale-x-105 duration-100"
              >
                <BsEye className="max-lg:hidden" />
                <span className="max-md:hidden">
                  {user?.plan || "10 profile views"}
                </span>
                <AiOutlineBarChart className="text-primary text-lg" />
              </button>
            </div>

            <button
              onClick={() => setShowAnalytics(true)}
              className="flex sm:hidden items-center gap-1 hover:scale-x-105 duration-100"
            >
              <BsEye className="" />
              <span className="">{user?.plan || "10 profile views"}</span>
              <AiOutlineBarChart className="text-primary text-lg hidden" />
            </button>

            <div className="flex items-center  gap-4 max-sm:w-full max-sm:justify-between">
              <div className="lg:flex hidden max-sm:flex items-center gap-1 text-zinc-400">
                <LuClock className="max-sm:hidden" />
                <span>{user?.plan || "Updated 1d ago"}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate("preview-cv")}
                  className="py-1 px-1.5 md:ml-1 max-md:pl-0 flex items-center gap-1 hover:scale-x-105"
                >
                  <FaCircle
                    size={10}
                    className="text-green-500 max-md:hidden"
                  />
                  <span className="max-md:hidden">
                    {user?.tabbioLink}
                  </span>{" "}
                  <span className="md:hidden">
                    {truncateString(
                      user?.plan || "tabbio.com/ahmed-mohammed",
                      10
                    )}
                  </span>{" "}
                  <LuExternalLink size={14} className="" />
                </button>

                <button
                  onClick={() => setShareModal(true)}
                  className="py-1 px-1.5 md:ml-1 max-md:pl-0 flex items-center gap-1 hover:scale-x-105 "
                >
                  <MdShare /> <span className="">Share</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 md:pl-8 md:pr-2">
            <div className="xl:hidden flex justify-end items-center">
              <button
                onClick={() => setShowDrawer(true)}
                className="px-4 py-1.5 flex items-center text-xl mb-3 gap-3"
              >
                <MdKeyboardDoubleArrowLeft /> <SlSettings />
              </button>
            </div>
            {active ? (
              <div className="w-full flex xl:flex-row flex-col gap-5">
                <div className="xl:min-w-[68%]">
                  <section className="bg-white flex flex-col space-y-10 px-6 max-sm:px-2.5 py-5 w-full h-full ">
                    <BasicDetails setProfileData={setProfileData} profileData={profileData} />
                    {profileData?.config?.professionalSummary && (
                      <ProfileSummary
                        resumeData={profileData}
                        setResumeData={setProfileData}
                      />
                    )}
                    {profileData?.config?.careerHighlights && (
                      <CareerHighlight profileData={profileData} setProfileData={setProfileData} />
                    )}
                    {profileData?.config?.workExperience && (
                      <WorkExperience profileData={profileData} setProfileData={setProfileData} />
                    )}
                    {profileData?.config?.volunteerExperience && (
                      <VolunteerExperience profileData={profileData} setProfileData={setProfileData} />
                    )}

                    {profileData?.config?.internships && (
                      <Internships profileData={profileData} setProfileData={setProfileData} />
                    )}
                    {profileData?.config?.education && (
                      <Education profileData={profileData} setProfileData={setProfileData} />
                    )}

                    {profileData?.config?.certifications && (
                      <Certifications profileData={profileData} setProfileData={setProfileData} />
                    )}

                    {profileData?.config?.memberships && (
                      <Memberships profileData={profileData} setProfileData={setProfileData} />
                    )}
                    {profileData?.config?.references && (
                      <ProfessionalReference profileData={profileData} setProfileData={setProfileData} />
                    )}
                  </section>
                </div>
                <div className="max-xl:hidden">
                  <SmartResumeSettings
                    setProfileData={setProfileData}
                    profileData={profileData}
                  />
                </div>
              </div>
            ) : (
              <div className="">
                <div className="flex w-full min-h-[85vh] flex-col items-center justify-center py-20">
                  <div className="bg-white flex flex-col gap-3.5 justify-center items-center rounded-xl py-5 px-4 lg:w-[70%] w-[90%]">
                    <span className="p-2 w-12 h-12 rounded-full flex justify-center items-center text-primary bg-primary/10">
                      <CgFileDocument size={28} />
                    </span>
                    <h2 className="text-xl text-center font-semibold text-black dark:text-white">
                      Create Your Profile
                    </h2>
                    <p className="text-neutral-500 mb-3">
                      Upload your existing resume or create a new one
                    </p>
                    <div className="px-5 w-full">
                      <ResumeUpload
                        onSuccess={(response: any) => {
                          handleCreateProfile(response?.data?.profile);
                        }}
                      />
                    </div>
                  </div>

                  <div className="my-6 flex flex-col gap-4 w-full justify-center items-center">
                    <p>OR</p>
                    <button
                      onClick={() => {
                        navigate(`/app/candidate/resume-builder`);
                        setProfileData(mockProfileData);
                        setActive(true);
                      }}
                      className="text-lg text-primary flex items-center gap-2 hover:scale-x-105"
                    >
                      Create from Scratch <FiExternalLink />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showDrawer && (
            <Drawer
              title="Profile Settings"
              isOpen={showDrawer}
              onClose={() => setShowDrawer(false)}
              props={{ disableCloseOnOutsideClick: true }}
            >
              <div className="mt-10 pb-10">
                <SmartResumeSettings
                  setProfileData={setProfileData}
                  profileData={profileData}
                />
              </div>
            </Drawer>
          )}

          {showAnalytics && (
            <ResumeAnalytics
              show={showAnalytics}
              onHide={() => setShowAnalytics(false)}
            />
          )}
          {upgradeModal && (
            <UpgradeCandidateSubscription
              show={upgradeModal}
              onHide={() => {
                setUpgradeModal(false);
              }}
            />
          )}
          {shareModal && (
            <Modal
              title="Share your CV"
              show={shareModal}
              onHide={() => setShareModal(false)}
            >
              <ShareCV />
            </Modal>
          )}
        </section>
      )}
    </DefaultLayout>
  );
};

export default Profile;
