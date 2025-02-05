// import { Link } from 'react-router-dom';
import { NavLink, useLocation } from "react-router-dom";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { BsEye, BsList, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DropdownSupport from "./DropdownSupport";
import SlideTab, { Cursor } from "../AnimatedUi/SlideTabs";
import { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { LuClock, LuExternalLink, LuUsers } from "react-icons/lu";
import { MdBusiness, MdShare } from "react-icons/md";
import StaggeredDropDown, {
  AnimatedOption,
} from "../AnimatedUi/staggeredDropdown";
import { IoIosArrowDown } from "react-icons/io";
import logo1 from "../assets/brand/logo-1.svg";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaCircle, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { truncateString } from "../lib/utils/formatters";
import { UpgradeCandidateSubscription } from "../Pages/PageComponents/UpgradeSubscriptionModal";
import Modal from "../components/modal";
import ResumeAnalytics from "../Pages/Candidate/ResumeAnalytics";
import { FcReddit } from "react-icons/fc";
import { toast } from "react-toastify";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const ShareCV: React.FC = () => {
  const { user } = useApp();
  const [buttonText, setButtonText] = useState("Copy");

  const url = `http://tabbio-app.vercel.app/profile/${user?.tabbioLink}`;

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

const Header = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { user } = useApp();
  const { category, changeCategory } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Candidate");
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hover, setHover] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header className="sticky top-0 z-9999 bg-[#F2F4F6] flex flex-col w-full bg-transparent dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow bg-[#F2F4F6] items-center gap-3 py-3 px-4 md:px-6 2xl:px-11">
          <div>
            <img
              src={logo1}
              alt="Logo"
              className={` w-[70px] md:w-[80px]
              
           lg:hidden`}
            />
          </div>

          <div className="hidden">
            <ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
                setHover(false);
              }}
              onMouseEnter={() => {
                setHover(true);
              }}
              className="relative flex w-fit rounded-md shadow-inner shadow-zinc-400/80 bg-[#F5F6FD]"
            >
              <SlideTab
                activeTab={tab}
                tab="Candidate"
                onChange={(tab) => {
                  setTab(tab);
                  changeCategory(tab);
                  navigate(`/app/candidate/dashboard`);
                }}
                setPosition={setPosition}
                noBg={hover}
                landing={false}
                activeColor="text-primary"
              >
                <div className="flex gap-1.5 text-sm items-center">
                  <span className="md:flex items-center font-medium gap-1.5 hidden">
                    <CgFileDocument className="" />
                    Smart Resume
                  </span>
                  <span className="flex text-xs items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1">
                    <TbWorld />
                    Personal
                  </span>
                </div>
              </SlideTab>
              <SlideTab
                activeTab={tab}
                onChange={(tab) => {
                  setTab(tab);
                  changeCategory(tab);
                }}
                setPosition={setPosition}
                noBg={hover}
                landing={false}
                activeColor="text-[#9333EA]"
              >
                <div className="flex gap-1.5 items-center text-sm">
                  <span className="md:flex gap-1.5 items-center hidden">
                    <LuUsers className="" />
                    ShareList
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full px-1.5 py-1 bg-[#9333EA]/10 text-xs">
                    <MdBusiness />
                    Personal
                  </span>
                </div>
              </SlideTab>

              <Cursor position={position} landing={false} />
            </ul>
          </div>
          <div
            className={`md:hidden block rounded-md ${
              tab === "Candidate"
                ? "bg-primary/10 text-primary"
                : "bg-[#9333EA]/10 text-[#9333EA]"
            }`}
          >
            <StaggeredDropDown
              buttonIcon={<IoIosArrowDown />}
              buttonText={
                <span className="flex gap-1 items-center max-sm:text-xs">
                  {category === "Candidate" ? (
                    <TbWorld className="text-primary" />
                  ) : (
                    <MdBusiness className="text-[#9333EA]" />
                  )}
                  {category === "Candidate" ? "Personal" : "Business"}
                </span>
              }
            >
              <AnimatedOption
                text="Personal"
                Icon={<TbWorld className="text-primary" />}
                onClick={() => {
                  changeCategory("Candidate");
                  navigate(`/app/candidate/profile`);
                }}
              />

              <AnimatedOption
                text="Business"
                Icon={<MdBusiness className="text-[#9333EA]" />}
                onClick={() => {
                  changeCategory("Business");
                  navigate(`/app/company/portal`);
                }}
              />
            </StaggeredDropDown>
          </div>

          <div className="flex ms-auto items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Dark Mode Toggler --> */}
              {/* <DarkModeSwitcher /> */}
              {/* <!-- Dark Mode Toggler --> */}

              {/* <!-- Support --> */}
              <DropdownSupport />
              {/* <!-- Support --> */}

              {/* <!-- Notification Menu Area --> */}
              <DropdownNotification />
              {/* <!-- Notification Menu Area --> */}

              <div className="lg:block hidden">
                {category === "Candidate" ? (
                  <button
                    onClick={() => {
                      changeCategory("Business");
                      navigate(`/app/company/portal`);
                    }}
                    className="text-primary px-4 text-sm py-2 font-semibold rounded-md border border-stroke hover:scale-105 delay-100"
                  >
                    Switch to Business
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      changeCategory("Candidate");
                      navigate(`/app/candidate/profile`);
                    }}
                    className="text-primary px-4 text-sm py-2 font-semibold rounded-md border border-stroke hover:scale-105 delay-100"
                  >
                    Switch to Personal
                  </button>
                )}
              </div>
            </ul>

            {/* <!-- User Area --> */}
            <div className="lg:block hidden">
              <DropdownUser />
            </div>

            {/* <!-- User Area --> */}

            <div className="flex items-center gap-2 lg:hidden">
              {/* <!-- Hamburger Toggle BTN --> */}
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm  bg-white p-1 shadow-sm dark:border-strokedark dark:bg-boxdark"
              >
                <BsList className="text-primary font-extrabold w-6 h-6" />
              </button>
              {/* <!-- Hamburger Toggle BTN --> */}
              <NavLink to="/app"></NavLink>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB] border border-[#F3F4F6] py-2.5 px-4.5 text-sm flex flex-wrap sm:gap-2 lg:items-center justify-between gap-3">
          <div className="flex items-center gap-4 max-sm:justify-between">
            <div className="flex items-center gap-1">
              <FaCircle
                size={10}
                className="text-primary max-lg:hidden rounded-full"
              />
              <span>{user?.plan || "Free Plan"}</span>
              <button
                onClick={() => setUpgradeModal(true)}
                className="py-1 px-1.5 ml-1 text-xs hover:scale-x-105 text-white rounded-full bg-[#C89529]"
              >
                Upgrade <span className="max-lg:hidden">to Premium</span>
              </button>
            </div>
            {user?.profile && <button
              onClick={() => setShowAnalytics(true)}
              className="flex max-sm:hidden items-center gap-1 hover:scale-x-105 duration-100"
            >
              <BsEye className="max-lg:hidden" />
              <span className="max-md:hidden">
                {user?.totalViews || "0"} profile views
              </span>
              <AiOutlineBarChart className="text-primary text-lg" />
            </button>}
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
            {user?.profile && <div className="md:flex hidden items-center gap-1 text-zinc-400">
              <LuClock className="max-sm:hidden" />
              <span>{user?.plan || "Updated 1d ago"}</span>
            </div>}


            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate("/app/candidate/profile/preview-cv")}
                className="py-1 px-1.5 md:ml-1 max-md:pl-0 flex items-center gap-1 hover:scale-x-105"
              >
                <FaCircle size={10} className="text-green-500 max-md:hidden" />
                <span className="max-md:hidden">{user?.tabbioLink}</span>{" "}
                <span className="md:hidden">
                  {truncateString(user?.tabbioLink || "tabbio.com-name", 10)}
                </span>{" "}
                <LuExternalLink size={14} className="" />
              </button>

              <button
                onClick={() => {
                  if (user?.profile) {
                    setShareModal(true)
                  } else {
                    toast.warning("Your profile isn't setup yet. Complete your profile to start sharing your link")
                  }
                }}
                className="py-1 px-1.5 md:ml-1 max-md:pl-0 flex items-center gap-1 hover:scale-x-105 "
              >
                <MdShare /> <span className="">Share</span>
              </button>
              {pathname !== "/app/candidate/profile" && (
                <button
                  onClick={() => navigate("/app/candidate/profile")}
                  className="text-primary hover:scale-x-105 inline-flex items-center gap-1.5"
                >
                  <span className="">View Profile</span>{" "}
                  <LuExternalLink size={14} className="" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
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
    </>
  );
};

export default Header;
