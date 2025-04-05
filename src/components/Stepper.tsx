import React from "react";

interface Step {
  stepNumber: number;
  label: string;
  icon?: React.ReactNode;
  completed?: boolean;
}

interface StepperProps {
  activeStep: number;
  steps: Step[];
}

interface CVStepperProps {
  activeStep: number;
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <div className="w-full lg:px-3">
      <div className="flex flex-wrap items-center justify-evenly mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex-1 w-1/2 sm:w-auto mb-3 sm:mb-0"
          >
            <div className="flex items-center justify-center  gap-3">
              <div>
                <div
                  className={` flex items-center justify-center mb-1 ${
                    index === activeStep ? "text-white" : "text-zinc-600"
                  }`}
                >
                  <span
                    className={`w-8 max-sm:w-6 max-sm:h-6 h-8 flex items-center  justify-center rounded-full ${
                      index === activeStep || index < activeStep
                        ? "bg-primary ring-[3px] shadow-sm ring-primary/25 text-white"
                        : "bg-[#F3F4F6] text-[#9CA3AF]"
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>

                <div
                  className={`step-label text-xs font-medium ${
                    index === activeStep || index < activeStep
                      ? "text-primary "
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index !== 0 - 0 && (
                <span className="hidden sm:inline-block">
                  <div
                    className={` connector absolute h-0.5 -mt-3 mr-5  ${
                      index < activeStep ? "bg-primary" : "bg-stroke"
                    } `}
                  />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CvStepper: React.FC<CVStepperProps> = ({
  activeStep,
  steps,
}) => {
  return (
    <div className="w-full lg:px-3">
      <div className="flex flex-wrap items-center justify-evenly mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex-1 w-1/2 sm:w-auto mb-3 sm:mb-0"
          >
            <div className="flex items-center justify-center  gap-3">
              <div>
                <div
                  className={` flex items-center justify-center ${
                    index === activeStep ? "" : ""
                  }`}
                >
                  {step.completed ? (
                    <span className="w-8 h-8 max-sm:w-6 max-sm:h-6 flex items-center bg-[#E0E0E0] justify-center rounded-full">
                      <svg className=" text-[#242424]" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M9.9 15.9L6 12l1.4-1.4 2.5 2.5L15.6 7l1.4 1.4-6.1 6.1z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className={`w-8 h-8 max-sm:w-6 max-sm:h-6 flex font-semibold items-center justify-center rounded-full ${
                        index === activeStep || index < activeStep
                          ? "bg-[#242424] text-[#E0E0E0] ring-[3px] shadow-sm ring-black/25"
                          : "bg-[#E0E0E0] text-[#9CA3AF]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                <div
                  className={`step-label text-base max-sm:text-xs font-semibold ${
                    index === activeStep || index < activeStep
                      ? "text-[#242424]"
                      : "text-[#8F8F8F]"
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index !== 0 - 0 && (
                <span className="hidden sm:inline-block">
                  <div
                    className={` connector absolute h-0.5 -mt-3 mr-5  ${
                      index === activeStep || index < activeStep
                        ? "bg-[#242424]"
                        : "bg-stroke"
                    } `}
                  />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
