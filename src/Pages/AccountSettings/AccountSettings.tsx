import { useState } from "react";
import Settings from "./Settings";
import Subscription from "./Subscription";
import DropdownUser from "../../layout/DropdownUser";
import DropdownSupport from "../../layout/DropdownSupport";
import DropdownNotification from "../../layout/DropdownNotification";
import { useNavigate } from "react-router-dom";
import Tabs from "../../components/tabs/Tab2";
import { FaArrowLeft } from "react-icons/fa6";

const AccountSettings: React.FC = () => {
  const [tab, setTab] = useState<string>("Settings");
  const navigate = useNavigate();

  return (
    <section className="">
      <header className="sticky top-0 shadow z-9999 bg-[#F2F4F6] flex flex-col w-full bg-transparent dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow bg-[#F2F4F6] items-center gap-3 py-3 px-4 md:px-6 2xl:px-11">
          <div>
            <button
              onClick={() => navigate(`/app/candidate/profile`)}
              className="flex group items-center gap-2 font-semibold"
            >
              <FaArrowLeft className="group-hover:-translate-x-2 duration-150 ease-out" />{" "}
              Back
            </button>
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
            </ul>

            {/* <!-- User Area --> */}
            <div className="">
              <DropdownUser />
            </div>

            {/* <!-- User Area --> */}
          </div>
        </div>
        <div className="bg-[#F2F4F6] items-center gap-3 px-4 md:px-6 2xl:px-11">
          <div>
            <Tabs setTab={setTab} tabs={["Settings", "Subscription"]} />
          </div>
        </div>
      </header>

      <div className="pb-6 px-4 md:px-6">
        {tab === "Settings" ? <Settings /> : null}
        {tab === "Subscription" ? <Subscription /> : null}
        {/* {tab === "Teams" ? <Teams /> : null} */}
      </div>
    </section>
  );
};

export default AccountSettings;
