import { useState } from "react";

interface TabsProps {
    tabs: string[];
    setTab: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const Tabs: React.FC<TabsProps> = ({ tabs, setTab }) => {
    const [activeTab, setActiveTab] = useState<string>(
      tabs.length > 0 ? tabs[0] : ""
    );
  
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement>,
      newActiveTab: string
    ) => {
      e.preventDefault();
      setActiveTab(newActiveTab);
      setTab(newActiveTab)
    };
  
    return (
        <div className="flex gap-5 border-b border-zinc-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab ? "border-b-2 border-primary/90" : ""
              } text-gray-700 font-medium py-2`}
              onClick={(e) => handleClick(e, tab)}
            >
              {tab}
            </button>
          ))}
        </div>
       
    );
  };

  export default Tabs;