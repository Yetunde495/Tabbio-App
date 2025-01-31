import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SlideTab, { Cursor } from "../AnimatedUi/SlideTabs";
import Logo from "../assets/brand/logo-1.svg";
import Button from "../components/Button";
import StaggeredDropDown, {
  AnimatedOption,
} from "../AnimatedUi/staggeredDropdown";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export default function Navbar() {
  const [navbar] = useState(false);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;

  const [tab, setTab] = useState(
    pathname.includes("company") ? "company" : "professionals"
  );
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hover, setHover] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const onChangeLang = (code: string) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={` sticky top-0  z-[999] dark:bg-slate-800/80 ${
        navbar ? "dark:bg-slate-900" : ""
      }`}
    >
      <nav
        className={`${
          scroll ? "rounded-b-[40px]" : ""
        } shadow backdrop-blur-md bg-white/50  dark:bg-neutral-1000/80 dark:text-white w-full`}
      >
        <div className="relative mx-auto w-full max-w-screen-2xl 2xl:px-[10rem] 2xl:max-w-full p-2">
          <div className=" gap-4 px-2 mx-auto lg:max-w-7xl 2xl:max-w-full items-center justify-between border-stroke flex md:px-8">
            <div className="text-slate-900 dark:text-white">
              <div className="py-3 block">
                <Link to="/" className="max-sm:block max-sm:w-[65px]">
                  <img src={Logo} className="md:w-30" />
                </Link>
              </div>
            </div>

            <div
              className={` ${
                pathname === "/" || pathname === "/company" ? "" : "hidden "
              }mx-auto`}
            >
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
                className="relative md:flex hidden w-fit rounded-md bg-[#F5F6FD]"
              >
                <SlideTab
                  activeTab={tab}
                  tab="professionals"
                  onChange={(tab) => {
                    setTab(tab);
                    navigate(`/`);
                  }}
                  setPosition={setPosition}
                  noBg={hover}
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="">{t("For Professionals ")}</span>
                  </div>
                </SlideTab>
                <SlideTab
                  activeTab={tab}
                  tab="company"
                  onChange={(tab) => {
                    setTab(tab);
                    navigate(`/company`);
                  }}
                  setPosition={setPosition}
                  noBg={hover}
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="">For Companies</span>
                  </div>
                </SlideTab>

                <Cursor position={position} />
              </ul>
              <div className="md:hidden block border rounded-lg border-stroke">
                <StaggeredDropDown
                  buttonIcon={<IoMdArrowDropdown />}
                  buttonText={
                    <span className="bg-gradient-to-r from-[#2563EB] max-sm:text-xs  text-transparent bg-clip-text to-[#9333EA] inline-block font-medium">
                      {pathname.includes("company")
                        ? "Company"
                        : "Professionals"}
                    </span>
                  }
                >
                  <AnimatedOption
                    text="Professionals"
                    onClick={() => {
                      navigate(`/`);
                    }}
                  />

                  <AnimatedOption
                    text="Company"
                    onClick={() => {
                      navigate(`/company`);
                    }}
                  />
                </StaggeredDropDown>
              </div>
            </div>

            <div className="">
              <div
                className={`flex-1 justify-self-center pb-3 mt-3 md:block md:pb-0 md:mt-0 `}
              >
                <ul className="items-center justify-center flex space-x-6 space-y-0">
                  <div className="">
                    <StaggeredDropDown
                      buttonIcon={<></>}
                      buttonText={
                        <span className="text-zinc-500 flex items-center gap-1 uppercase text-[17px] font-medium">
                          <TbWorld /> {i18n.language}
                        </span>
                      }
                    >
                      <AnimatedOption
                        text="English"
                        onClick={() => {
                          onChangeLang("en");
                        }}
                      />

                      <AnimatedOption
                        text="Spanish"
                        onClick={() => {
                          onChangeLang("it");
                        }}
                      />
                      <AnimatedOption
                        text="Italian"
                        onClick={() => {
                          onChangeLang("es");
                        }}
                      />
                    </StaggeredDropDown>
                  </div>
                  <li>
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li className="max-md:hidden">
                    <Button onClick={() => navigate("/signup")}>
                      {t("Get Started")}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
