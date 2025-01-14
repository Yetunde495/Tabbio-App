// src/components/ProgressBar.tsx
import React from "react";



interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div className="relative w-full">
      <div className="  mt-4 w-full bg-gray h-2 rounded-full overflow-hidden">
        <div
          className=" h-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#4F46E5]"
          style={{ width: `${percent}%` }}
        ></div>
        <div
          className="h-full bg-neutral-300"
          style={{ width: `${100 - percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export const ProgressBar2: React.FC<ProgressBarProps> = ({ percent }) => {
  const circumference = 2 * Math.PI * 20; // Assuming a radius of 30 // Change to desired color

  return (
    <div className="relative items-center justify-center overflow-hidden rounded-full">
      <svg className="w-10 h-10">
        <circle
          className="text-slate-200"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="17"
          cx="20"
          cy="20"
        />
        <circle
          className="text-blue-600"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="17"
          cx="20"
          cy="20"
        />
      </svg>
      <span className="absolute top-3 left-2  text-[10px] font-normal text-primary">{`${percent}%`}</span>
    </div>
  );
};

export const ProgressBar3: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full bg-gray h-2 rounded-b-md overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary"
          style={{ width: `${percent}%` }}
        ></div>
        <div
          className="h-full bg-gray-300"
          style={{ width: `${100 - percent}%` }}
        ></div>
      </div>
    </div>
  );
};



export default ProgressBar;
