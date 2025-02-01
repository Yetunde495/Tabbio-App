import React from "react";
import cn from "classnames";

interface TabbioScoreProps {
  score: number;
  onClick: () => void;
}

const TabbioScore: React.FC<TabbioScoreProps> = ({ score, onClick }) => {
  const colorClass = cn({
    "text-zinc-700 stroke-slate-200": score === 0, // Light Gray
    "text-zinc-700 stroke-red-400": score > 0 && score <= 35, // Red
    "text-zinc-700 stroke-yellow-400": score > 35 && score <= 65, // Yellow
    "text-zinc-700 stroke-green-400": score > 65, // Green
  });

  return (
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      {/* Circular progress ring */}
      <div className="relative w-12 h-9 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full">
          <circle
           cx="50%"
           cy="50%"
           r="35%"
            className={cn("stroke-[3] fill-none", colorClass)} // Dynamic color
          />
        </svg>
        {/* Percentage text */}
        <span className={cn("absolute text-xs font-semibold", colorClass)}>
          {score}%
        </span>
      </div>

      {/* Label */}
      <span className="text-zinc-600 font-medium">View my Tabbio score</span>
    </div>
  );
};

export default TabbioScore;
