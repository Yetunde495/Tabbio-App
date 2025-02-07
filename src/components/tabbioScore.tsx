import React from "react";
import cn from "classnames";

interface TabbioScoreProps {
  score: number;
  onClick: () => void;
}

const TabbioScore: React.FC<TabbioScoreProps> = ({ score, onClick }) => {
  const circumference = 100; // Total stroke length
  const progressOffset = circumference - (score / 100) * circumference; // Stroke offset for progress

  const colorClass = cn({
    "text-zinc-700 stroke-slate-200": score === 0, // Light Gray
    "text-zinc-700 stroke-red-400": score > 0 && score <= 35, // Red
    "text-zinc-700 stroke-yellow-400": score > 35 && score <= 65, // Yellow
    "text-zinc-700 stroke-green-400": score > 65, // Green
  });

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      {/* Circular progress bar */}
      <div className="relative max-sm:w-6 max-sm:h-6 w-9 h-9">
        <svg className="w-full h-full rotate-[-90deg]">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-slate-200 stroke-4 fill-none"
          />
          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className={cn("stroke-[3] fill-none transition-all duration-300", colorClass)}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
          />
        </svg>
        {/* Percentage text */}
        <span className="absolute inset-0 flex items-center justify-center max-sm:font-medium max-sm:text-[7px] text-xs font-semibold text-gray-800">
          {score}%
        </span>
      </div>

      {/* Label */}
      <span className="text-zinc-800 max-sm:text-[10px] text-sm font-medium">View my Tabbio score</span>
    </div>
  );
};



export default TabbioScore;
