import { Dispatch, SetStateAction, useRef } from "react";
import { motion } from "framer-motion";

type Position = {
    left: number;
    width: number;
    opacity: number;
  };

const SlideTab = ({
  children,
  setPosition,
  tab,
  activeTab,
  onChange,
  noBg,
  props,
  landing=true,
  activeColor
}: {
  children: React.ReactNode;
  tab?: string;
  activeTab: string;
  onChange: (tab: string) => void;
  noBg: boolean;
  setPosition: Dispatch<SetStateAction<Position>>;
  landing?: boolean;
  props?: any;
  activeColor?: string
}) => {
  const ref = useRef<null | HTMLLIElement>(null);
  let val: any = tab || ""

  let classNames = landing ? 
  "relative z-10 block cursor-pointer hover:text-primary py-2 px-3 text-sm font-medium md:text-base " : 
  "relative z-10 block cursor-pointer group py-1.5 w-full flex justify-center items-center text-center px-3 max-sm:px-2 text-sm font-medium";
  let clsN = landing ? val === activeTab && !noBg ? classNames+' rounded-lg bg-gradient-to-r from-[#3B82F61A] to-[#A855F71A] shadow-lg text-primary' : classNames+' text-zinc-500' :
  val === activeTab && !noBg ? classNames+` ${props?.rounded ? props?.rounded : 'rounded-md'} bg-white shadow-sm ${activeColor} ` : classNames+` bg-white/50 text-zinc-500 `
  ;
  

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => onChange(val)}
      className={clsN}    
      >
      {children}
    </li>
  );
};

export const Cursor = ({ position, landing=true, props }: { position: Position, landing?:boolean, props?:any }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className={`absolute z-0  px-3  ${props?.rounded ? props?.rounded : 'rounded-md'} ${landing ? 'bg-gradient-to-r h-10 from-[#3B82F61A] to-[#A855F71A] text-primary shadow-md' : 'bg-white shadow-md h-8 text-primary'}  py-2`}
    />
  );
};

export default SlideTab;

