import { useApp } from "../../context/AppContext";
import DefaultLayout from "../../layout/DefaultLayout";
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Drawer from "../../components/Drawer";
import { FaCircle } from "react-icons/fa6";
import { LuExternalLink, LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { SlSettings } from "react-icons/sl";
import { UpgradeCandidateSubscription } from "../PageComponents/UpgradeSubscriptionModal";

const PortalSettings: React.FC<{ companyData: any }> = ({}) => {
  const {} = useApp();

  return (
    <section className="bg-white w-full min-w-[319px] h-full">
      <div className="bg-zinc-50/90 flex items-center gap-1.5 py-2 px-3">
        <SlSettings /> Settings
      </div>
    </section>
  );
};

const Portal: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [active, _setActive] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  return (
    <DefaultLayout>
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
          </div>

          <div className="flex items-center  gap-4 max-sm:w-full max-sm:justify-between">
            <div className="flex items-center gap-1">
              <FaCircle size={10} className="text-green-500 max-md:hidden" />
              <span className="max-md:hidden">
                {user?.plan || "company/tabbio.com"}
              </span>
            </div>
            <button
              onClick={() => navigate("preview-cv")}
              className="text-[#9333EA] hover:scale-x-105 inline-flex items-center gap-1.5"
            >
              <span className="">View Portal</span>{" "}
              <LuExternalLink size={14} className="" />
            </button>
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
              <div className="">
                <section className="bg-white flex flex-col space-y-10 px-6 max-sm:px-2.5 py-5 w-full h-full"></section>
              </div>
              <div className="max-xl:hidden">
                <PortalSettings companyData={null} />
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex w-full min-h-[85vh] flex-col items-center justify-center py-20">
                <div className="bg-white flex flex-col gap-3.5 justify-center items-center rounded-xl py-5 px-4 lg:w-[70%] w-[90%]">
                  <span className="p-2 w-12 h-12 rounded-full flex justify-center items-center text-[#A855F7] bg-[#A855F7]/10">
                    <LuUsers size={28} />
                  </span>
                  <h2 className="text-xl text-center font-semibold text-black dark:text-white">
                    Create Your First Portal
                  </h2>
                  <p className="text-neutral-500 mb-3">
                  Start organizing your candidates and collaborate with your team
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showDrawer && (
          <Drawer
            title=""
            isOpen={showDrawer}
            onClose={() => setShowDrawer(false)}
          >
            <div className="mt-10 pb-10">
              <PortalSettings companyData={null} />
            </div>
          </Drawer>
        )}

        {upgradeModal && (
          <UpgradeCandidateSubscription
            show={upgradeModal}
            onHide={() => {
              setUpgradeModal(false);
            }}
          />
        )}
      </section>
    </DefaultLayout>
  );
};

export default Portal;
