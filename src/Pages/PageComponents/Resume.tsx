import { formatMonthYear } from "../../lib/utils/formatters";
import { useSpring, animated } from "@react-spring/web";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";

const useGesture = createUseGesture([dragAction, pinchAction]);

export const ResumeDocument: React.FC<{ resumeData: any }> = ({
  resumeData,
}) => {
  const [_userInteracted, _setUserInteracted] = useState(false);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));
  const ref = useRef<HTMLDivElement>(null);
  useGesture(
    {
      //@ts-ignore
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, rotateZ: a, x, y });
        return memo;
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  );

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    // const handleInteraction = () => setUserInteracted(true);
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  return (
    <section className="w-full bg-white">
      <animated.div
        ref={ref}
        // style={{ touchAction: "none" }}
        className={`w-full max-w-[1200px]`}
      >
        {resumeData?.template === "entry" ? (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white  py-8 px-6 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="flex flex-col w-full justify-center items-center  mb-8 border-b pb-2 border-stroke">
              <h1
                className={`text-center px-3 font-medium max-sm:text-sm`}
                style={{ color: resumeData?.style?.primaryColor }}
              >
                {resumeData?.name}
              </h1>
              {resumeData?.config?.role && (
                <p
                  className={`max-sm:text-[11px]  text-xs  text-center text-black/90 px-4`}
                >
                  {resumeData?.role}
                </p>
              )}
              <div className="w-full md:max-w-[90%] py-3">
                <div className="flex flex-wrap gap-1 text-[10px] items-center justify-center gap-x-1 gap-y-2">
                  {["email", "phone", "location", "linkedIn", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div key={field} className="flex gap-1 items-center">
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase()}:
                        </span>

                        <span className="">
                          {resumeData[field] + " " + " " + " " + " |" || `-`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="border-b pb-6 border-stroke mb-6">
              <div className="">
                <h6
                  className={`font-semibold mb-2 max-sm:text-[11px] text-sm py-1 `}
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p className="font-medium text-black text-[11px] max-sm:text-[9px]">
                  {resumeData?.professionalSummary}
                </p>
              </div>
            </div>

            {/* Skills/Areas of Expertise */}

            {resumeData?.config?.skills && resumeData?.skills.length > 0 && (
              <div className="border-b border-stroke pb-6">
                <h6
                  className="font-semibold uppercase text-sm max-sm:text-[11px] py-1 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  Areas of Expertise
                </h6>
                <ul className="gap-1.5 max-sm:gap-1 flex flex-wrap">
                  {resumeData?.skills?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={`item relative  text-zinc-800 py-0`}
                    >
                      <div className="mb-1 py-1">
                        <span className="text-[11px] max-sm:text-[9px] font-medium">
                          {item.name}
                          {item}{" "}
                          {resumeData?.skills?.length > 1 &&
                            index + 1 !== resumeData?.skills?.length &&
                            "|"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Skills/Areas of Expertise */}

            {/* Education */}
            {resumeData?.config?.education &&
              resumeData?.education.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold text-sm max-sm:text-[11px] uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Education{" "}
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education?.map((item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`relative  text-black w-full py-1 `}
                      >
                        <div className="w-full py-2 pr-1">
                          <div className="flex justify-between gap-6 items-center">
                            <div className="text-xs max-sm:text-[10px] text-zinc-800">
                              <span className="uppercase font-semibold">
                                {item?.institution}
                              </span>
                              {item?.location && (
                                <span className="italic text-[13px]">
                                  , {item?.location}
                                </span>
                              )}
                            </div>

                            <div className="ml-auto">
                              <p
                                className={`text-[11px] max-sm:text-[9px] text-right font-medium text-black px-2`}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                {item?.hideEndDate && (
                                  <span>
                                    -{" "}
                                    {item?.endDate
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <span className="text-xs max-sm:text-[10px] uppercase font-semibold text-zinc-800">
                              {item?.degree}
                              {item?.gpa && (
                                <span className=""> ({item?.gpa})</span>
                              )}
                            </span>
                          </div>
                          <div className=" text-zinc-800 text-[0.8rem]">
                            <span className="font-semibold ">Minors: </span>
                            <span>{item?.minors}</span>
                          </div>

                          <div className=" text-zinc-800">
                            <ul className="text-[0.8rem] flex flex-wrap gap-0.5 font-medium">
                              <span className="font-semibold">
                                Relevant Coursework:{" "}
                              </span>
                              {item?.relevantCourseWork?.map(
                                (val: string, index: number) => (
                                  <li key={index}>
                                    {val}{" "}
                                    {item?.relevantCourseWork?.length > 1 &&
                                      index + 1 !==
                                        item?.relevantCourseWork?.length &&
                                      ","}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Education */}

            {/* CERtifications */}
            {resumeData?.config?.certifications &&
              resumeData?.certifications?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Certifications & Trainings
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.certifications?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full pr-1">
                            <div className="flex justify-between gap-6 items-center">
                              <div>
                                <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-[10px] text-right font-medium text-black px-2`}
                                >
                                  {formatMonthYear(item?.date)}
                                </span>
                              </div>
                            </div>
                            <div className="">
                              <span className="text-[13px] max-sm:text-[11px] text-zinc-800">
                                {item?.institution}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* CERtifications */}

            {/* Projects */}

            {resumeData?.config?.projects &&
              resumeData?.projects?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Projects
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.projects?.map((item: any, _index: number) => (
                      <div
                        key={item._id}
                        className={`item relative  text-black w-full py-1.5 `}
                      >
                        <div className="w-full pr-1">
                          <div className="">
                            <div>
                              <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                {item?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs max-sm:text-[9px] font-medium text-zinc-800">
                                {item?.description}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-500 sm:text-xs text-[0.6rem]">
                              {item?.link}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Projects */}

            {/* Work Experience */}
            {resumeData?.config?.workExperience &&
              resumeData?.workExperience.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Professional Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-[13px] max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[13px] max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="sm:px-1.5 text-[11px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Work Experience */}

            {/* Internships */}
            {resumeData?.config?.internships &&
              resumeData?.internships?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Internships{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.internships?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-[13px] max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="text-[0.7rem] max-sm:text-[0.6rem] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[0.8rem] max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[11px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Internships */}

            {/* Volunteer Experience */}
            {resumeData?.config?.volunteerExperience &&
              resumeData?.volunteerExperience?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase  py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Volunteer Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-[0.8rem] max-sm:text-[0.6rem] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="text-[0.6rem] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[0.8rem] max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[0.7rem] max-sm:text-[0.6rem] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Volunteer Experience */}

            {resumeData?.config?.references &&
              resumeData?.references?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Referees
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.references?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full py-2 pr-1">
                            <div className="flex justify-between gap-6 items-start">
                              <div>
                                <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-xs italic text-right font-medium text-black px-2`}
                                >
                                  {item?.relationship}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[13px] max-sm:text-[11px] text-zinc-800">
                                {item?.title} at {item?.company}
                              </span>
                            </div>
                            <div>
                              <span className="text-[13px] text-blue-500 max-sm:text-[11px]  ">
                                Contact Information:{" "}
                                {item?.email && (
                                  <span className="text-zinc-800 italic">
                                    (E)- {item?.email}
                                  </span>
                                )}
                                {item?.phone && (
                                  <span className="ml-2 text-zinc-800 italic">
                                    (P)- {item?.phone}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white py-4 md:px-6 px-4 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="w-full  mb-6">
              <div
                style={{
                  color: resumeData?.style?.primaryColor,
                  borderColor: resumeData?.style?.primaryColor,
                }}
                className="w-full flex divide-x-2 border-b-2 gap-3 pb-1 items-center mt-9"
              >
                <h1 className="text-sm max-sm:text-[11px] font-medium uppercase">
                  {resumeData?.name}{" "}
                  {resumeData?.config.role && (
                    <span className="text-zinc-900 px-1">|</span>
                  )}{" "}
                  {resumeData?.config.role && (
                    <span className="text-sm max-sm:text-[10px] text-zinc-900 uppercase font-medium">
                      {resumeData?.role}
                    </span>
                  )}
                </h1>
              </div>
              <div className="w-full py-3">
                <div className="flex flex-wrap gap-1 text-[10px] items-center">
                  {["email", "phone", "location", "linkedIn", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center px-1 max-sm:px-0.5"
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </span>

                        <span className="">
                          {resumeData[field] || `Unspecified`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {resumeData?.config.professionalSummary && (
              <div className="mb-4">
                <h6
                  className={`font-semibold mb-2 max-sm:text-[11px] text-sm border-b-2 py-1 `}
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p className="font-medium text-black text-[11px] max-sm:text-[9px]">
                  {resumeData?.professionalSummary}
                </p>
              </div>
            )}
            {resumeData?.config?.skills && resumeData?.skills.length > 0 && (
              <div className="pb-4">
                <h6
                  className="font-semibold uppercase text-sm max-sm:text-[11px] border-b-2 py-1 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  Key Skills
                </h6>
                <ul className="gap-2.5 max-sm:gap-1 flex flex-wrap">
                  {resumeData?.skills?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={`item relative  text-zinc-800 py-0 sm:px-1.5`}
                    >
                      <div className="mb-1 py-1">
                        <span className="text-[11px] max-sm:text-[9px] font-medium">
                          {item.name}
                          {item}{" "}
                          {resumeData?.skills?.length > 1 &&
                            index + 1 !== resumeData?.skills?.length &&
                            "|"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resumeData?.config?.workExperience &&
              resumeData?.workExperience.length > 0 && (
                <div className="py-5 mb-4">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Professional Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="text-[13px] max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`text-[13px] max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="sm:px-1.5 text-[11px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.internships &&
              resumeData?.internships?.length > 0 && (
                <div className="py-5 mb-4">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Internships{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.internships?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="text-[0.8rem] max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-[0.7rem] max-sm:text-[0.6rem] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`text-[13px] max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[11px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.education &&
              resumeData?.education.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold text-sm max-sm:text-[11px] uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Education{" "}
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education?.map((item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full py-2 pr-1">
                          <div className="flex justify-between gap-6 items-center">
                            <div>
                              <span className="text-xs max-sm:text-[10px] uppercase font-semibold text-zinc-800">
                                {item?.degree}
                                {item?.gpa && (
                                  <span className=""> ({item?.gpa})</span>
                                )}
                              </span>
                            </div>

                            <div className="ml-auto">
                              <p
                                className={`text-[11px] max-sm:text-[9px] text-right font-medium text-black px-2`}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                {item?.hideEndDate && (
                                  <span>
                                    -{" "}
                                    {item?.endDate
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="text-xs max-sm:text-[10px] text-zinc-800 mb-1.5">
                            <span className="uppercase font-semibold">
                              {item?.institution}
                            </span>
                            {item?.location && (
                              <span className="italic text-[13px]">
                                , {item?.location}
                              </span>
                            )}
                          </div>
                          <div className=" text-zinc-800 text-[0.8rem]">
                            <span className="font-semibold ">Minors: </span>
                            <span>{item?.minors}</span>
                          </div>

                          <div className=" text-zinc-800">
                            <ul className="text-[0.8rem] flex flex-wrap gap-0.5 font-medium">
                              <span className="font-semibold">
                                Relevant Coursework:{" "}
                              </span>
                              {item?.relevantCourseWork?.map(
                                (val: string, index: number) => (
                                  <li key={index}>
                                    {val}{" "}
                                    {item?.relevantCourseWork?.length > 1 &&
                                      index + 1 !==
                                        item?.relevantCourseWork?.length &&
                                      ","}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {resumeData?.config?.careerHighlights &&
              resumeData?.careerHighlights.length > 0 && (
                <div className="pb-4">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 sm:ml-3 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Career Highlights{" "}
                  </h6>

                  <div className="flex flex-col gap-5 max-sm:gap-3">
                    {resumeData?.careerHighlights?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item.id}
                          className={`item sm:px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex w-full">
                              <p
                                className={`text-[13px] max-sm:text-[10px] font-semibold text-black sm:px-2 mb-2`}
                              >
                                {item?.title}
                              </p>
                            </div>

                            <div className="flex items-center sm:ml-[3px]">
                              <p className="sm:px-1.5 text-[11px] max-sm:text-[9px] font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            {item?.link && (
                              <div className={`pb-1 pt-3 border-stroke`}>
                                <div className="flex">
                                  <a
                                    className="px-1.5 text-[11px] cursor-text text-blue-600 font-medium"
                                    href={item?.link}
                                    target="_blank"
                                  >
                                    {item?.link || ""}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.volunteerExperience &&
              resumeData?.volunteerExperience?.length > 0 && (
                <div className="py-5 mb-4">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2  py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Volunteer Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="text-[0.8rem] max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-[0.6rem] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`text-[0.8rem] max-sm:text-[0.6rem] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[0.7rem] max-sm:text-[0.6rem] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-[11px] max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.certifications &&
              resumeData?.certifications?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Certifications & Trainings
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.certifications?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full pr-1">
                            <div className="flex justify-between gap-6 items-center">
                              <div>
                                <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-[10px] text-right font-medium text-black px-2`}
                                >
                                  {formatMonthYear(item?.date)}
                                </span>
                              </div>
                            </div>
                            <div className="">
                              <span className="text-[13px] max-sm:text-[11px] text-zinc-800">
                                {item?.institution}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.projects &&
              resumeData?.projects?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Projects
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.projects?.map((item: any, _index: number) => (
                      <div
                        key={item._id}
                        className={`item px-2 relative  text-black w-full py-1.5 `}
                      >
                        <div className="w-full pr-1">
                          <div className="">
                            <div>
                              <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                {item?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs max-sm:text-[9px] font-medium text-zinc-800">
                                {item?.description}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-500 sm:text-xs text-[0.6rem]">
                              {item?.link}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {resumeData?.config?.memberships &&
              resumeData?.membership?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Memberships
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.membership?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full pr-1">
                            <div className="flex justify-between gap-6 items-center">
                              <div className="">
                                <span className="text-[13px] font-semibold max-sm:text-[11px] text-zinc-800">
                                  {item?.role}
                                </span>
                              </div>
                              <div className="ml-auto">
                                <span
                                  className={`text-[10px] text-right font-medium text-black px-2`}
                                >
                                  {item?.startDate &&
                                    formatMonthYear(item?.startDate)}{" "}
                                  -{" "}
                                  {item?.endDate
                                    ? "Present"
                                    : item?.endDate &&
                                      formatMonthYear(item?.endDate)}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[13px] max-sm:text-[11px] font-medium italic text-zinc-800">
                                {item?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {resumeData?.config?.references &&
              resumeData?.references?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] text-sm uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Professional References
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.references?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full py-2 pr-1">
                            <div className="flex justify-between gap-6 items-start">
                              <div>
                                <span className="text-[13px] max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-xs italic text-right font-medium text-black px-2`}
                                >
                                  {item?.relationship}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[13px] max-sm:text-[11px] text-zinc-800">
                                {item?.title} at {item?.company}
                              </span>
                            </div>
                            <div>
                              <span className="text-[13px] text-blue-500 max-sm:text-[11px]  ">
                                Contact Information:{" "}
                                {item?.email && (
                                  <span className="text-zinc-800 italic">
                                    (E)- {item?.email}
                                  </span>
                                )}
                                {item?.phone && (
                                  <span className="ml-2 text-zinc-800 italic">
                                    (P)- {item?.phone}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </animated.div>
    </section>
  );
};
export const ResumePreview: React.FC<{ resumeData: any }> = ({
  resumeData,
}) => {
  const [_userInteracted, _setUserInteracted] = useState(false);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));
  const ref = useRef<HTMLDivElement>(null);
  useGesture(
    {
      //@ts-ignore
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, rotateZ: a, x, y });
        return memo;
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  );

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    // const handleInteraction = () => setUserInteracted(true);
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);
  return (
    <section className="w-full bg-white">
      <animated.div
        ref={ref}
        className={`w-full max-w-[1200px]`}
      >
        {resumeData?.template === "entry" ? (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white  py-8 px-6 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="flex flex-col w-full justify-center items-center  mb-8 border-b pb-2 border-stroke">
              <h1
                className={`text-center md:text-lg px-3 font-semibold max-sm:text-sm`}
                style={{ color: resumeData?.style?.primaryColor }}
              >
                {resumeData?.name}
              </h1>
              {resumeData?.config?.role && (
                <p
                  className={`max-sm:text-[11px] md:text-[15px] text-center font-semibold text-black/90 px-4`}
                >
                  {resumeData?.role}
                </p>
              )}
              <div className="w-full md:max-w-[90%] py-3">
                <div className="flex flex-wrap gap-1 text-[10px] md:text-xs items-center justify-center gap-x-1 gap-y-2">
                  {["email", "phone", "location", "linkedIn", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div key={field} className="flex gap-1 items-center">
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase()}:
                        </span>

                        <span className="">
                          {resumeData[field] + " " + " " + " " + " |" || `-`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="border-b pb-6 border-stroke mb-6">
              <div className=" px-3">
                <h6
                  className={`font-semibold md:text-lg mb-2 max-sm:text-[11px] text-sm py-1 `}
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p className="font-medium text-black text-[11px] md:text-base max-sm:text-[9px]">
                  {resumeData?.professionalSummary}
                </p>
              </div>
            </div>

           

            {/* Skills/Areas of Expertise */}
            {resumeData?.config?.skills &&
              resumeData?.skills?.skills > 0 && (
                <div className=" border-b border-stroke pt-4 pb-6">
                  <div className="rounded-md px-2 py-3">
                    <div className="w-full flex justify-between">
                      <h6
                        className="font-semibold mb-2 px-3 text-lg uppercase"
                        style={{ color: resumeData?.style?.primaryColor }}
                      >
                        Areas of Expertise
                      </h6>
                    </div>

                    <ul className="gap-1.5 max-sm:gap-1 flex flex-wrap">
                  {resumeData?.skills?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={`item relative  text-zinc-800 py-0`}
                    >
                      <div className="mb-1 py-1">
                        <span className="text-[11px] md:text-xs max-sm:text-[9px] font-medium">
                          {item.name}
                          {item}{" "}
                          {resumeData?.skills?.length > 1 &&
                            index + 1 !== resumeData?.skills?.length &&
                            "|"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                  </div>
                </div>
              )}
            {/* Skills/Areas of Expertise */}
            
            {/* Education */}
            {resumeData?.config?.education &&
              resumeData?.education.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold text-sm md:text-lg max-sm:text-[11px] uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Education{" "}
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education?.map((item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`relative  text-black w-full py-1 `}
                      >
                        <div className="w-full pr-1">
                          <div className="flex justify-between gap-6 items-center">
                            <div className="max-md:text-sm max-sm:text-[10px] text-zinc-800">
                              <span className="uppercase font-semibold">
                                {item?.institution}
                              </span>
                              {item?.location && (
                                <span className="italic text-[13px] md:text-sm">
                                  , {item?.location}
                                </span>
                              )}
                            </div>

                            <div className="ml-auto">
                              <p
                                className={`text-sm max-sm:text-[9px] text-right font-medium text-zinc-500 px-2`}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                {item?.hideEndDate && (
                                  <span>
                                    -{" "}
                                    {item?.endDate
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="mb-1.5">
                            <span className="text-xs max-sm:text-[10px] uppercase font-semibold text-zinc-800">
                              {item?.degree}
                              {item?.gpa && (
                                <span className=""> ({item?.gpa})</span>
                              )}
                            </span>
                          </div>
                          <div className=" text-zinc-800 md:text-sm text-[0.8rem]">
                            <span className="font-semibold ">Minors: </span>
                            <span>{item?.minors}</span>
                          </div>

                          <div className=" text-zinc-800">
                            <ul className="text-[0.8rem] md:text-sm flex flex-wrap gap-0.5 font-medium">
                              <span className="font-semibold">
                                Relevant Coursework:{" "}
                              </span>
                              {item?.relevantCourseWork?.map(
                                (val: string, index: number) => (
                                  <li key={index}>
                                    {val}{" "}
                                    {item?.relevantCourseWork?.length > 1 &&
                                      index + 1 !==
                                        item?.relevantCourseWork?.length &&
                                      ","}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Education */}

            {/* CERtifications */}
            {resumeData?.config?.certifications &&
              resumeData?.certifications?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Certifications & Trainings
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.certifications?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full pr-1">
                            <div className="flex justify-between gap-6 items-center">
                              <div>
                                <span className="text-sm  max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-[10px] md:text-sm text-right font-medium text-zinc-500 px-2`}
                                >
                                  {formatMonthYear(item?.date)}
                                </span>
                              </div>
                            </div>
                            <div className="">
                              <span className="text-sm max-sm:text-[11px] text-zinc-800">
                                {item?.institution}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* CERtifications */}

            {/* Projects */}

            {resumeData?.config?.projects &&
              resumeData?.projects?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Projects
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.projects?.map((item: any, _index: number) => (
                      <div
                        key={item._id}
                        className={`item relative  text-black w-full py-1.5 `}
                      >
                        <div className="w-full pr-1">
                          <div className="">
                            <div>
                              <span className="max-sm:text-[11px] font-semibold text-zinc-800">
                                {item?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm max-sm:text-[9px] font-medium text-zinc-800">
                                {item?.description}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-500 sm:text-sm text-[0.6rem]">
                              {item?.link}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {/* Projects */}

            {/* Work Experience */}
            {resumeData?.config?.workExperience &&
              resumeData?.workExperience.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Professional Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-sm max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[13px] max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="sm:px-1.5 text-sm max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Work Experience */}

            {/* Internships */}
            {resumeData?.config?.internships &&
              resumeData?.internships?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Internships{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.internships?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-sm max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="md:text-sm max-sm:text-[0.6rem] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-sm max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Internships */}

            {/* Volunteer Experience */}
            {resumeData?.config?.volunteerExperience &&
              resumeData?.volunteerExperience?.length > 0 && (
                <div className="py-6 border-b border-stroke">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg uppercase  py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Volunteer Experience{" "}
                  </h6>
                  <div className="flex flex-col gap-9 max-sm:gap-5">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full sm:my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <p
                                    className={`text-sm max-sm:text-[0.6rem] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>

                                  <div className="ml-auto">
                                    <p className="text-[0.6rem] md:text-sm text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm max-sm:text-[0.6rem] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-sm max-sm:text-[0.6rem] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Volunteer Experience */}

            {resumeData?.config?.references &&
              resumeData?.references?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg text-sm uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Referees
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.references?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full py-2 pr-1">
                            <div className="flex justify-between gap-6 items-start">
                              <div>
                                <span className="text-sm max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`text-sm italic text-right font-medium text-black px-2`}
                                >
                                  {item?.relationship}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="text-sm max-sm:text-[11px] text-zinc-800">
                                {item?.title} at {item?.company}
                              </span>
                            </div>
                            <div>
                              <span className="text-[13px] text-blue-500 max-sm:text-[11px]  ">
                                Contact Information:{" "}
                                {item?.email && (
                                  <span className="text-zinc-800 italic">
                                    (E)- {item?.email}
                                  </span>
                                )}
                                {item?.phone && (
                                  <span className="ml-2 text-zinc-800 italic">
                                    (P)- {item?.phone}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          

          

          </div>
        ) : (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white xl:px-12 lg:px-8 py-8 px-4 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="w-full  mb-15">
              <div
                style={{
                  color: resumeData?.style?.primaryColor,
                  borderColor: resumeData?.style?.primaryColor,
                }}
                className="w-full border-b-2 gap-3 items-center mt-15"
              >
                <h1 className="md:text-lg max-sm:text-[11px] font-medium uppercase">
                  {resumeData?.name}{" "}
                  {resumeData?.config.role && (
                    <span className="text-zinc-900 px-1">|</span>
                  )}{" "}
                  {resumeData?.config.role && (
                    <span className="md:text-lg max-sm:text-[10px] text-zinc-900 uppercase font-medium">
                      {resumeData?.role}
                    </span>
                  )}
                </h1>
              </div>
              <div className="w-full lg:max-w-[90%] py-3">
                <div className="flex flex-wrap gap-1 max-sm:text-[10px] text-xs items-center">
                  {["email", "phone", "location", "linkedIn", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center px-1 max-sm:px-0.5"
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </span>

                        <span className="">
                          {resumeData[field] || `Unspecified`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {resumeData?.config.professionalSummary && (
              <div className="mb-4">
                <h6
                  className={`font-semibold mb-2 max-sm:text-[11px] md:text-lg border-b-2 py-1 `}
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p className="font-medium text-black md:text-base text-[10px] sm:text-sm">
                  {resumeData?.professionalSummary}
                </p>
              </div>
            )}
            {resumeData?.config?.skills && resumeData?.skills.length > 0 && (
              <div className="pb-4">
                <h6
                  className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  Key Skills
                </h6>
                <ul className="gap-1.5 max-sm:gap-1 flex flex-wrap">
                  {resumeData?.skills?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={`item relative  text-zinc-800 py-0`}
                    >
                      <div className="mb-1 py-1">
                        <span className="text-xs md:text-sm max-sm:text-[9px] font-medium">
                          {item.name}
                          {item}{" "}
                          {resumeData?.skills?.length > 1 &&
                            index + 1 !== resumeData?.skills?.length &&
                            "|"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resumeData?.config?.careerHighlights &&
              resumeData?.careerHighlights.length > 0 && (
                <div className="pb-4">
                  <div className="flex mb-3 gap-3  justify-between items-center">
                    <h6
                      className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                      style={{
                        color: resumeData?.style?.primaryColor,
                        borderColor: resumeData?.style?.primaryColor,
                      }}
                    >
                      Career Highlights{" "}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-3">
                    {resumeData?.careerHighlights?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex w-full">
                              <p
                                className={`max-sm:text-[10px] font-semibold text-black mb-2`}
                              >
                                {item?.title}
                              </p>
                            </div>

                            <div className="flex items-center">
                              <p className="text-sm max-sm:text-[9px] font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            {item?.link && (
                              <div className={`pb-1 pt-3 border-stroke`}>
                                <div className="flex">
                                  <a
                                    className="max-sm:text-[11px] cursor-text text-blue-600 font-medium"
                                    href={item?.link}
                                    target="_blank"
                                  >
                                    {item?.link || ""}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.workExperience &&
              resumeData?.workExperience.length > 0 && (
                <div className="py-5  mb-4">
                  <div className="mb-3 gap-3">
                    <h6
                      className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                      style={{
                        color: resumeData?.style?.primaryColor,
                        borderColor: resumeData?.style?.primaryColor,
                      }}
                    >
                      Professional Experience{" "}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-9">
                    {resumeData?.workExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[15px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.education &&
              resumeData?.education.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold md:text-lg max-sm:text-[11px] border-b-2 border-primary uppercase py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Education{" "}
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education?.map((item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`relative  text-black w-full py-1 `}
                      >
                        <div className="w-full">
                          <div className="flex justify-between gap-6 items-center">
                            <div>
                              <span className="text-sm max-sm:text-[10px] uppercase font-semibold text-zinc-800">
                                {item?.degree}
                                {item?.gpa && (
                                  <span className=""> ({item?.gpa})</span>
                                )}
                              </span>
                            </div>

                            <div className="ml-auto">
                              <p
                                className={`text-sm max-sm:text-[9px] text-zinc-500 lg:pr-2`}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                {item?.hideEndDate && (
                                  <span>
                                    -{" "}
                                    {item?.endDate
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="text-sm max-sm:text-[10px] text-zinc-800 mb-1.5">
                            <span className="uppercase font-semibold">
                              {item?.institution}
                            </span>
                            {item?.location && (
                              <span className="italic max-md:text-[13px]">
                                , {item?.location}
                              </span>
                            )}
                          </div>
                          <div className=" text-zinc-800 text-sm max-md:text-[0.8rem]">
                            <span className="font-semibold ">Minors: </span>
                            <span>{item?.minors}</span>
                          </div>

                          <div className=" text-zinc-800">
                            <ul className="max-md:text-[0.8rem] text-sm flex flex-wrap gap-0.5 font-medium">
                              <span className="font-semibold">
                                Relevant Coursework:{" "}
                              </span>
                              {item?.relevantCourseWork?.map(
                                (val: string, index: number) => (
                                  <li key={index}>
                                    {val}{" "}
                                    {item?.relevantCourseWork?.length > 1 &&
                                      index + 1 !==
                                        item?.relevantCourseWork?.length &&
                                      ","}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {resumeData?.config?.internships &&
              resumeData?.internships.length > 0 && (
                <div className="py-5  mb-4">
                  <div className="mb-3 gap-3">
                    <h6
                      className="font-semibold max-sm:text-[11px] text-lg uppercase border-b-2 py-1 mb-2 w-full"
                      style={{
                        color: resumeData?.style?.primaryColor,
                        borderColor: resumeData?.style?.primaryColor,
                      }}
                    >
                      Internships{" "}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-9">
                    {resumeData?.internships?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[15px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {resumeData?.config?.volunteerExperience &&
              resumeData?.volunteerExperience.length > 0 && (
                <div className="py-5  mb-4">
                  <div className="mb-3 gap-3">
                    <h6
                      className="font-semibold md:text-lg max-sm:text-[11px] uppercase border-b-2 py-1 mb-2 w-full"
                      style={{
                        color: resumeData?.style?.primaryColor,
                        borderColor: resumeData?.style?.primaryColor,
                      }}
                    >
                      Volunteer Experience{" "}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-9">
                    {resumeData?.volunteerExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?.id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="w-full">
                              <div className="w-full my-1.5">
                                <div className="flex w-full justify-between items-center max-sm:mb-1.5">
                                  <span className="max-sm:text-[10px] uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <div className="ml-auto">
                                    <p className="text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2">
                                      {item?.startDate &&
                                        formatMonthYear(item?.startDate)}
                                      {item?.active
                                        ? "- Present"
                                        : item?.endDate &&
                                          "- " + formatMonthYear(item?.endDate)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p
                                    className={`max-sm:text-[10px] font-semibold text-black`}
                                  >
                                    {item?.company}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              <p className="text-[15px] max-sm:text-[9px] cursor-text font-medium">
                                {item?.description || ""}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm max-sm:text-[9px] w-full font-normal space-y-2 px-1">
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="w-full list-disc list-item items-center ml-4 max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      {achievement}{" "}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            <div className="py-6">
              <h6
                className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                style={{
                  color: resumeData?.style?.primaryColor,
                  borderColor: resumeData?.style?.primaryColor,
                }}
              >
                Certifications & Trainings
              </h6>
              <div className="flex flex-col gap-2.5">
                {resumeData?.certifications?.map(
                  (item: any, _index: number) => (
                    <div
                      key={item._id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full">
                        <div className="flex justify-between gap-6 items-center">
                          <div>
                            <span className="max-sm:text-[11px] font-semibold text-zinc-800">
                              {item?.name}
                            </span>
                          </div>

                          <div className="ml-auto">
                            <span
                              className={`text-sm max-sm:text-[9px] text-zinc-500 lg:mr-2`}
                            >
                              {formatMonthYear(item?.date)}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <span className="max-sm:text-[11px] text-zinc-800">
                            {item?.institution}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            {resumeData?.config?.projects &&
              resumeData?.projects?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Projects
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.projects?.map((item: any, _index: number) => (
                      <div
                        key={item._id}
                        className={`item relative  text-black w-full py-1.5 `}
                      >
                        <div className="w-full">
                          <div className="">
                            <div>
                              <span className="max-sm:text-[11px] font-semibold text-zinc-800">
                                {item?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm max-sm:text-[9px] font-medium text-zinc-800">
                                {item?.description}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-500 sm:text-sm text-[0.6rem]">
                              {item?.link}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {resumeData?.config?.memberships &&
              resumeData?.membership?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Memberships
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.membership?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex justify-between gap-6 items-center">
                              <div className="">
                                <span className="font-semibold max-sm:text-[11px] text-zinc-800">
                                  {item?.role}
                                </span>
                              </div>
                              <div className="ml-auto">
                                <span
                                  className={`text-[10px] text-right font-medium text-black px-2`}
                                >
                                  {item?.startDate &&
                                    formatMonthYear(item?.startDate)}{" "}
                                  -{" "}
                                  {item?.endDate
                                    ? "Present"
                                    : item?.endDate &&
                                      formatMonthYear(item?.endDate)}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="max-sm:text-[11px] font-medium italic text-zinc-800">
                                {item?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {resumeData?.config?.references &&
              resumeData?.references?.length > 0 && (
                <div className="py-6">
                  <h6
                    className="font-semibold max-sm:text-[11px] md:text-lg uppercase border-b-2 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Professional References
                  </h6>
                  <div className="flex flex-col gap-2.5">
                    {resumeData?.references?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item relative  text-black w-full py-1 `}
                        >
                          <div className="w-full py-2">
                            <div className="flex justify-between gap-6 items-start">
                              <div>
                                <span className="max-sm:text-[11px] font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <div className="ml-auto">
                                <span
                                  className={`max-sm:text-xs text-sm italic text-right font-medium text-black px-2`}
                                >
                                  {item?.relationship}
                                </span>
                              </div>
                            </div>

                            <div>
                              <span className="max-sm:text-[11px] text-zinc-800">
                                {item?.title} at {item?.company}
                              </span>
                            </div>
                            <div>
                              <span className=" text-blue-500 max-sm:text-[11px]  ">
                                Contact Information:{" "}
                                {item?.email && (
                                  <span className="text-zinc-800 italic">
                                    (E)- {item?.email}
                                  </span>
                                )}
                                {item?.phone && (
                                  <span className="ml-2 text-zinc-800 italic">
                                    (P)- {item?.phone}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </animated.div>
    </section>
  );
};
