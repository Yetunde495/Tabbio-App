
import BtnIcon from "../assets/svg/btn-icon-2.svg";

interface ButtonProps {
    children?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    size?: "xsm" | "sm" | "md" | "lg";
    type?: "submit" | "button" | "reset";
    classNames?: string;
    btnProps?: any;
    elevation?: number;
    width?: string;
    height?: string;
    rounded?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }



export default function Button({
    children,
    text,
    disabled,
    onClick,
    type = "button",
    btnProps,
    width,
    height,
    rounded,
    size,
  }: ButtonProps) {
    let className ="flex group disabled:hover:scale-100 max-sm:text-sm disabled:bg-opacity-60 items-center gap-3 bg-gradient-to-b hover:bg-gradient-to-t hover:scale-105 duration-300 ease-in-out from-[#5272EA] to-[#394FC0] justify-center text-white border-none"

    let btnCls = `${className} ${
      rounded ? "rounded-full" : "rounded-lg"
    } ${size === "lg" ? "py-3 max-sm:py-2 max-sm:px-4 max-sm:text-base px-10 text-lg" : size === "sm" ? "py-1.5 px-4 text-base" : "md:py-3 py-2 px-6 text-lg"}  font-medium `;
    btnCls = width ? btnCls + width : btnCls;
    btnCls = height ? btnCls + " h-" + height : btnCls;
  
    return (
      <button
        disabled={disabled}
        aria-disabled={disabled}
        onClick={onClick}
        className={btnCls}
        type={type}
        {...btnProps}
      >
        {/* <span className="hover:scale-105 w-full flex justify-center items-center gap-2"> */}
        {text || children}
        {/* </span> */}
      </button>
    );
  }

  export const GradientButton: React.FC<{disabled?:boolean, onClick:() => void, text:string, className?: string, props?: any}> = ({disabled, onClick, text, className, props}) => {
    return (
      <div className={`${className && className} button-wrapper`}>
      <div className={`${props?.roundedMd ? 'rounded-md py-[3px] px-[2.5px]' : 'rounded-full py-[3px] px-[4px]'} button-bg group w-full text-center`}>
        <button
          className={`${props?.roundedMd ? 'rounded-md' : 'rounded-full'} rounded-full bg-white group-hover:bg-transparent group:hover:text-white w-full`}
          onClick={onClick}
          disabled={disabled}
          type="button"
        >
          <span className={`text-gradient gap-2 font-medium text-center justify-center items-center w-full ${props?.padding ? props?.padding : 'py-1 px-3'} text-sm`}> <img src={BtnIcon} alt="icon" /> {text}</span>
        </button>
      </div>
    </div>
    )
  }