import React, { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface AlertProps {
  variant: "error" | "info" | "warning" | "success";
  children: React.ReactNode;
}

const variantStyles: Record<AlertProps["variant"], string> = {
  error: "bg-red-100 border-red-400 text-red-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  success: "bg-green-100 border-green-400 text-green-700",
};

const iconComponents: Record<AlertProps["variant"], React.ElementType> = {
  error: FaExclamationCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
  success: FaCheckCircle,
};

const Alert: React.FC<AlertProps> = ({ variant, children }) => {
  const Icon = iconComponents[variant];
  const [show, setShow] = useState(true);
  if (!show) {
    return null;
  }
  return (
    <div
      className={`flex w-full items-start px-3 py-3 border-l-4 rounded-md ${variantStyles[variant]}`}
      role="alert"
    >
      <Icon size={20} className="mr-3 mt-0.5" />
      <div className="text-sm font-normal">{children}</div>
      <span
        onClick={() => setShow(false)}
        className="cursor-pointer ml-auto hover:scale-105"
      >
        <BsXCircleFill size={20} />
      </span>
    </div>
  );
};

export default Alert;
