import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/brand/logo-1.svg";
import { LuLinkedin } from "react-icons/lu";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f9fafb] text-slate-500 px-10 py-10 border-t-gray-400">
      <section className="container mx-auto lg:max-w-7xl 2xl:max-w-full max-w-screen-2xl 2xl:px-[12rem]">
        <div className="grid text-sm grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 border-stroke border-b pt-4 pb-6">
           {/* Column 1: Logo and Social Links */}
          <div className="col-span-2">
            <img src={Logo} className="w-30 mb-2.5" />
            <p className="mb-2.5">
              Smart Resume & Talent Database. Create your professional resume in
              seconds and get hired faster.{" "}
            </p>
            <div className="relative mb-2.5">
              <ul className="flex items-center space-x-2.5">
              <li>
                <Link to="" target="_blank" className="text-slate-800 hover:scale-105 ease-in-out duration-100">
                <FaXTwitter size={20} />
                </Link>
              </li>
              <li>
                <Link to="" target="_blank" className="text-slate-800 hover:scale-105 ease-in-out duration-100">
                <LuLinkedin size={20} />
                </Link>
              </li>
              <li>
                <Link to="" target="_blank" className="text-slate-800 hover:scale-105 ease-in-out duration-100">
                <FaInstagram size={20} />
                </Link>
              </li>
              </ul>
            </div>
          </div>
          {/* Column 1: Footer Links */}
          <div className="col-span-1  md:col-span-2 lg:col-span-1">
            <h3 className="font-bold mb-2 text-black">For Jobseekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="text-slate-500">
                  Smart Resume
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Application Kit
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Cover Letter
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Company Insights
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Interview Tips
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Linkedin Extension
                </Link>
              </li>

              {/* Add more links */}
            </ul>
          </div>

          {/* Column 2: Footer Links */}
          <div className="col-span-1">
            <h3 className="font-bold mb-2 text-black">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="text-slate-500">
                  Sharelist
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Match to JD
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Talent Hub
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Applicant Builder
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Branded Applicant
                </Link>
              </li>
              <li>
                <Link to="" className="text-slate-500">
                  Evaluation Forms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Footer Links */}
          <div className="col-span-1">
            <h3 className="font-bold mb-2 text-black">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-slate-500 hover:text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-500 hover:text-blue-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-slate-500 hover:text-blue-500">
                  Contact
                </Link>
              </li>
              {/* Add more links */}
            </ul>
          </div>
          {/* Column 4: Footer Links */}
          <div className="col-span-1">
            <h3 className="font-bold mb-2 text-black">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="text-slate-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-500">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-500 hover:text-blue-500">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-slate-500 hover:text-blue-500">
                  Affiliate Program
                </Link>
              </li>
              {/* Add more links */}
            </ul>
          </div>

          {/* Column 5: Newsletter*/}
        </div>

        <div className="pt-4 flex justify-between md:flex-row flex-col items-center">
          <p>© 2024 Tabbio. All Rights Reserved</p>
          <ul className="flex items-center gap-3 flex-wrap">
            <li>
              <Link to="" className="text-slate-500 text-[15px]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="" className="text-slate-500 text-[15px]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="" className="text-slate-500 text-[15px]">
                Security
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
