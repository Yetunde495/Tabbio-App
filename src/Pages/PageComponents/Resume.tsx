import { FaCircle } from "react-icons/fa6";
import { formatMonthYear } from "../../lib/utils/formatters";

const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
};
const fontSizeSmMap = {
  small: "13px",
  medium: "14px",
  large: "15px",
};
export const ResumePreview: React.FC<{ resumeData: any }> = ({
  resumeData,
}) => {
  const fontSize =
    fontSizeMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "16px";
  const fontSizeSm =
    fontSizeSmMap[resumeData?.style?.fontSize as keyof typeof fontSizeMap] ||
    "14px";
  return (
    <section className="w-full bg-white">
      <div className="min-w-[800px] w-full">
        {resumeData?.template !== "entry" ? (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white  py-8 px-6 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="flex flex-col w-full justify-center items-center  mb-8 border-b pb-2 border-stroke">
              <h1
                className={`text-center px-3 font-medium text-[40px]`}
                style={{ color: resumeData?.style?.primaryColor }}
              >
                {resumeData?.name}
              </h1>
              {resumeData?.config?.role && (
                <p
                  className={`text-lg  text-center text-black px-4 font-semibold`}
                >
                  {resumeData?.role}
                </p>
              )}
              <div className="w-full max-w-[90%] py-3">
                <div className="flex flex-wrap justify-center gap-x-2 divide-x gap-y-3 items-center">
                  {["email", "phone", "location", "linkedin", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center px-2"
                        style={{ fontSize: fontSizeSm }}
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase()}:
                        </span>

                        <span className="">
                          {resumeData[field] || `Unspecified`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="border-b pb-6 border-stroke mb-6">
              <div className=" rounded-md px-3">
                <h6
                  className="font-semibold mb-2 text-lg"
                  style={{ color: resumeData?.style?.primaryColor }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p
                  style={{ fontSize: fontSize }}
                  className={`font-medium text-black text-base w-full`}
                >
                  {resumeData?.professionalSummary}
                </p>
              </div>
            </div>

            {/* Skills/Areas of Expertise */}
            {resumeData?.config?.areasOfExpertise &&  resumeData?.areasOfExpertise > 0 && (
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

                  <ul className="inline-flex items-center gap-3 px-2.5 divide-x flex-wrap">
                    {resumeData?.areasOfExpertise?.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className={`item  relative  text-zinc-800 py-0`}
                        >
                          <div className="py-1 rounded-md">
                            <span
                              style={{ fontSize: fontSizeSm }}
                              className="px-1.5 text-[15px] font-medium"
                            >
                              {item}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
            {/* Skills/Areas of Expertise */}

            {/* Education */}
            {resumeData?.config?.education &&  resumeData?.education > 0 && (
              <div className="border-b border-stroke py-6">
                <div>
                  <h6
                    className="font-semibold text-lg uppercase pl-4.5 mb-3"
                    style={{ color: resumeData?.style?.primaryColor }}
                  >
                    Education
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education?.map((item: any, _index: number) => (
                      <div
                        key={item?._id}
                        className={`item px-2 relative  text-black w-full py-1 `}
                        draggable="true"
                      >
                        <div className="w-full flex items-start py-2 ml-3 pr-1">
                          <FaCircle size={6} className="rounded-full mt-2" />
                          <div className="w-full">
                            <div className="flex gap-6 w-full items-start">
                              <p
                                style={{ fontSize: fontSize }}
                                className={`text-base text-black px-2`}
                              >
                                {item?.institution}
                              </p>
                              <div className="ml-auto">
                                <p
                                  className={`text-sm text-right font-medium text-black  px-2`}
                                  style={{ fontSize: fontSizeSm }}
                                >
                                  {item?.startDate &&
                                    formatMonthYear(item?.startDate)}
                                  -
                                  {item?.active
                                    ? "Present"
                                    : item?.endDate &&
                                      formatMonthYear(item?.endDate)}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <p
                                className={`w-full text-base uppercase font-semibold text-zinc-800 px-2`}
                                style={{ fontSize: fontSizeSm }}
                              >
                                {item?.degree}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Education */}

            {/* CERtifications */}
            {resumeData?.config?.certifications && resumeData?.certifications > 0 && (
              <div className="border-b border-stroke py-6">
                <div>
                  <h6
                    className="font-semibold text-lg uppercase pl-4.5 mb-3"
                    style={{ color: resumeData?.style?.primaryColor }}
                  >
                    Certifications
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.certifications?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item?._id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                          draggable="true"
                        >
                          <div className="w-full flex items-start py-2 ml-3 pr-1">
                            <FaCircle size={6} className="rounded-full mt-2" />
                            <div className="w-full">
                              <div className="flex gap-6 w-full items-start">
                                <p
                                  style={{ fontSize: fontSize }}
                                  className={`text-base text-black px-2`}
                                >
                                  {item?.institution}
                                </p>
                                <div className="ml-auto">
                                  {item?.date && (
                                    <p
                                      className={`text-sm text-right font-medium text-black  px-2`}
                                      style={{ fontSize: fontSizeSm }}
                                    >
                                      {formatMonthYear(item?.date)}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <p
                                  className={`w-full text-base uppercase font-semibold text-zinc-800 px-2`}
                                  style={{ fontSize: fontSize }}
                                >
                                  {item?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* CERtifications */}

            {/*Relevant Courses  */}
            {resumeData?.config?.relevantCourses && resumeData?.relevantCourses > 0 && (
              <div className="border-b border-stroke py-6">
                <div className=" px-2 py-3">
                  <div className="w-full flex justify-between">
                    <h6
                      className="font-semibold mb-2 px-3 text-lg uppercase"
                      style={{ color: resumeData?.style?.primaryColor }}
                    >
                      RELEVANT COURSES
                    </h6>
                  </div>

                  <ul className="grid grid-cols-3 items-center gap-3 px-2">
                    {resumeData?.relevantCourses?.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className={`item relative  text-zinc-800 py-0`}
                        >
                          <div className="py-1">
                            <span
                              style={{ fontSize: fontSize }}
                              className="px-1 text-base font-medium"
                            >
                              {item}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
            {/*Relevant Courses */}

            {/* Projects */}
            {resumeData?.config?.projects && resumeData?.projects > 0 && (
              <div className="border-b border-stroke py-6">
                <div className="flex mb-3 gap-3  justify-between items-center">
                  <h6
                    className="font-semibold text-lg uppercase pl-4.5"
                    style={{ color: resumeData?.style?.primaryColor }}
                  >
                    Projects{" "}
                  </h6>
                </div>

                <div className="flex flex-col gap-9">
                  {resumeData?.projects?.map((item: any, _index: number) => (
                    <div
                      key={item._id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full">
                        <div className="flex w-full justify-between items-start">
                          <p
                            className={`text-base font-semibold text-black px-2 mb-2`}
                            style={{ fontSize: fontSize }}
                          >
                            {item?.name}
                          </p>
                          <p
                            className={`text-sm font-medium text-black px-2`}
                            style={{ fontSize: fontSizeSm }}
                          >
                            {item?.technology}
                          </p>
                        </div>

                        <div className="flex items-center ml-[3px]">
                          <p
                            style={{ fontSize: fontSize }}
                            className="px-1.5 text-[15px] font-medium"
                          >
                            {item?.description}
                          </p>
                        </div>

                        {item?.link && (
                          <div className={`pb-1 pt-3 border-stroke`}>
                            <div className="flex">
                              <a
                                className="px-1.5 text-[15px] cursor-pointer text-blue-600 font-medium"
                                style={{ fontSize: fontSize }}
                                href={item?.link || ""}
                                target="_blank"
                              >
                                {item?.link}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Projects */}

            {/* Work Experience */}
            {resumeData?.config?.workExperience && resumeData?.workExperience > 0 && (
              <div className="border-b py-9 border-stroke mb-4">
                <div className="flex mb-3 gap-3  justify-between items-center">
                  <h6
                    className="font-semibold text-lg uppercase pl-4.5"
                    style={{ color: resumeData?.style?.primaryColor }}
                  >
                    Professional Experience{" "}
                  </h6>
                </div>

                <div className="flex flex-col gap-9">
                  {resumeData?.workExperience?.map(
                    (item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`item px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full">
                          <div className="flex w-full justify-between items-start">
                            <p
                              className={`text-base font-semibold text-black px-2 mb-2`}
                              style={{ fontSize: fontSize }}
                            >
                              {item?.company}
                            </p>
                            <p
                              className={`text-sm font-medium text-black px-2`}
                              style={{ fontSize: fontSizeSm }}
                            >
                              {item?.startDate &&
                                formatMonthYear(item?.startDate)}
                              -
                              {item?.active
                                ? "Present"
                                : item?.endDate &&
                                  formatMonthYear(item?.endDate)}
                            </p>
                          </div>

                          <div className="flex items-center mb-2 ml-[3px">
                            <p
                              className={`text-base uppercase font-semibold text-zinc-700 px-2`}
                              style={{ fontSize: fontSize }}
                            >
                              {item?.title}
                            </p>
                          </div>

                          <div>
                            <ul
                              style={{ fontSize: fontSizeSm }}
                              className="text-sm w-full font-normal space-y-2 px-2.5"
                            >
                              {item?.keyAchievements?.map(
                                (achievement: string, index: number) => (
                                  <li
                                    className="flex w-full items-center max-sm:items-start gap-1"
                                    key={index}
                                  >
                                    <FaCircle
                                      size={6}
                                      className="rounded-full max-sm:mt-2"
                                    />
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
            {resumeData?.config?.internships && resumeData?.internships > 0 && (
              <div className="border-b py-9 border-stroke mb-4">
                <div>
                  <div className="flex mb-3 gap-3  justify-between items-center">
                    <h6
                      className="font-semibold text-lg uppercase pl-4.5"
                      style={{ color: resumeData?.style?.primaryColor }}
                    >
                      Internships{" "}
                    </h6>
                  </div>

                  <div className="flex flex-col gap-9">
                    {resumeData?.internships?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item.id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex w-full justify-between items-start">
                              <p
                                className={`text-base font-semibold text-black px-2 mb-2`}
                                style={{ fontSize: fontSize }}
                              >
                                {item?.company}
                              </p>
                              <p
                                className={`text-sm font-medium text-black px-2`}
                                style={{ fontSize: fontSizeSm }}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                -
                                {item?.active
                                  ? "Present"
                                  : item?.endDate &&
                                    formatMonthYear(item?.endDate)}
                              </p>
                            </div>

                            <div className="flex items-center mb-2 ml-[3px">
                              <p
                                className={`text-base uppercase font-semibold text-zinc-700 px-2`}
                                style={{ fontSize: fontSize }}
                              >
                                {item?.title}
                              </p>
                            </div>

                            <div>
                              <ul
                                style={{ fontSize: fontSizeSm }}
                                className="text-sm w-full font-normal space-y-2 px-2.5"
                              >
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="flex w-full items-center max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      <FaCircle
                                        size={6}
                                        className="rounded-full max-sm:mt-2"
                                      />
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
              </div>
            )}
            {/* Internships */}

            {/* Volunteer Experience */}
            {resumeData?.volunteerExperience?.length > 0 && (
              <div className="border-b py-9 border-stroke mb-4">
                <div>
                  <div className="flex mb-3 gap-3  justify-between items-center">
                    <h6
                      className="font-semibold text-lg uppercase pl-4.5"
                      style={{ color: resumeData?.style?.primaryColor }}
                    >
                      Volunteer Experience{" "}
                    </h6>
                  </div>

                  <div className="flex flex-col gap-9">
                    {resumeData?.volunteerExperience?.map(
                      (item: any, _index: number) => (
                        <div
                          key={item._id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex w-full justify-between items-start">
                              <p
                                className={`text-base font-semibold text-black px-2 mb-2`}
                                style={{ fontSize: fontSize }}
                              >
                                {item?.company}
                              </p>
                              <p
                                className={`text-sm font-medium text-black px-2`}
                                style={{ fontSize: fontSizeSm }}
                              >
                                {item?.startDate &&
                                  formatMonthYear(item?.startDate)}
                                -
                                {item?.active
                                  ? "Present"
                                  : item?.endDate &&
                                    formatMonthYear(item?.endDate)}
                              </p>
                            </div>

                            <div className="flex items-center mb-2 ml-[3px">
                              <p
                                className={`text-base uppercase font-semibold text-zinc-700 px-2`}
                                style={{ fontSize: fontSize }}
                              >
                                {item?.title}
                              </p>
                            </div>

                            <div>
                              <ul
                                style={{ fontSize: fontSizeSm }}
                                className="text-sm w-full font-normal space-y-2 px-2.5"
                              >
                                {item?.keyAchievements?.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      className="flex w-full items-center max-sm:items-start gap-1"
                                      key={index}
                                    >
                                      <FaCircle
                                        size={6}
                                        className="rounded-full max-sm:mt-2"
                                      />
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
              </div>
            )}
            {/* Volunteer Experience */}
          </div>
        ) : (
          <div
            style={{ fontFamily: resumeData?.style?.fontFamily || "" }}
            className="bg-white p-8 w-full overflow-x-auto custom-scrollbar"
          >
            <div className="w-full  mb-15">
              <div
                style={{
                  color: resumeData?.style?.primaryColor,
                  borderColor: resumeData?.style?.primaryColor,
                }}
                className="w-full flex divide-x-2 border-b-2 gap-3 items-center mt-15"
              >
                <h1 className="text-[40px] font-medium uppercase">
                  {resumeData?.name}
                </h1>

                {resumeData?.config.role && (
                  <h3 className="text-lg text-black px-2 uppercase font-medium">
                    {resumeData?.role}
                  </h3>
                )}
              </div>
              <div className="w-full max-w-[90%] py-3">
                <div className="flex flex-wrap gap-x-2 divide-x gap-y-3 items-center">
                  {["email", "phone", "location", "linkedin", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    ?.map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center text-sm px-2"
                        style={{ fontSize: fontSizeSm }}
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </span>

                        <span className="text-sm">
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
                  className={`font-semibold mb-2 text-lg border-b-2 py-1 ml-3 `}
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h6>
                <p
                  style={{ fontSize: fontSize }}
                  className=" px-3 font-medium text-black text-base"
                >
                  {resumeData?.professionalSummary}
                </p>
              </div>
            )}
            {resumeData?.config?.skills && resumeData?.skills > 0 && (
              <div className="pb-4">
                <h6
                  className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  Key Skills
                </h6>
                <ul className="gap-3 px-1.5">
                  {resumeData?.skills?.map((item: any, index: number) => (
                    <li
                      key={index}
                      className={`item  relative  text-zinc-800 py-0 px-1.5 hover:border hover:rounded-lg border-zinc-300`}
                    >
                      <div className="py-1 rounded-md flex flex-col mb-1">
                        <div className="">
                          <span
                            style={{ fontSize: fontSize }}
                            className="italic underline text-base text-zinc-500 underline-offset-2 cursor-pointer font-medium"
                          >
                            {item.name}
                          </span>
                        </div>

                        <ul className="inline-flex items-center gap-2 flex-wrap">
                          {item.items?.map(
                            (skillItem: string, skillIndex: number) => (
                              <li key={skillIndex}>
                                <span
                                  style={{ fontSize: fontSize }}
                                  className="text-[15px] font-medium"
                                >
                                  {skillItem}{" "}
                                  {item?.items?.length > 1 &&
                                    skillIndex + 1 !== item?.items?.length &&
                                    "|"}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {resumeData?.config?.careerHighlights &&  resumeData?.careerHighlights > 0 && (
              <div className="pb-4">
                <div className="flex mb-3 gap-3  justify-between items-center">
                  <h6
                    className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
                    style={{
                      color: resumeData?.style?.primaryColor,
                      borderColor: resumeData?.style?.primaryColor,
                    }}
                  >
                    Career Highlights{" "}
                  </h6>
                </div>
                <div className="flex flex-col gap-5">
                  {resumeData?.careerHighlights?.map(
                    (item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`item hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full">
                          <div className="flex w-full">
                            <p
                              className={`text-base font-semibold text-black px-2 mb-2`}
                              style={{ fontSize: fontSize }}
                            >
                              {item?.title}
                            </p>
                          </div>

                          <div className="flex items-center ml-[3px]">
                            <p
                              className="px-1.5 text-[15px] font-medium"
                              style={{ fontSize: fontSize }}
                            >
                              {item?.description || ""}
                            </p>
                          </div>

                          {item?.link && (
                            <div className={`pb-1 pt-3 border-stroke`}>
                              <div className="flex">
                                <a
                                  className="px-1.5 text-[15px] cursor-text text-blue-600 font-medium"
                                  style={{ fontSize: fontSizeSm }}
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
            {resumeData?.config?.workExperience &&  resumeData?.workExperience > 0 && (
              <div className="py-5  mb-4">
                <div className="mb-3 gap-3">
                  <h6
                    className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
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
                        className={`item  hover:border border-stroke border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full">
                          <div className="w-full">
                            <div className="w-full my-1.5">
                              <div className="flex w-full justify-between items-start">
                                <p
                                  className={`text-base font-semibold text-black px-2 mb-2`}
                                >
                                  {item?.company}
                                </p>
                                <div className="flex items-center gap-2 ml-auto">
                                  <span className="text-base uppercase font-semibold text-zinc-700">
                                    {item?.title}
                                  </span>

                                  <span>|</span>

                                  <p className="text-sm text-zinc-500 lg:mr-4">
                                    {item?.startDate &&
                                      formatMonthYear(item?.startDate)}{" "}
                                    -{" "}
                                    {item?.active
                                      ? "Present"
                                      : item?.endDate &&
                                        formatMonthYear(item?.endDate)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center ml-[3px] mb-4">
                            <p className="px-1.5 text-[15px] cursor-text font-medium">
                              {item?.description || ""}
                            </p>
                          </div>

                          <div>
                            <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                              {item?.keyAchievements?.map(
                                (achievement: string, index: number) => (
                                  <li
                                    className="flex w-full items-center max-sm:items-start gap-1"
                                    key={index}
                                  >
                                    <FaCircle
                                      size={6}
                                      className="rounded-full max-sm:mt-2"
                                    />
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
            {resumeData?.config?.education && resumeData?.education > 0 && (
              <div className="py-6">
                <h6
                  className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
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
                      <div className="w-full py-2 ml-3 pr-1">
                        <div className="flex justify-between gap-6 items-center">
                          <div className="flex items-center gap-2 divide-x divide-zinc-600">
                            <div>
                              <span className="text-base uppercase font-semibold text-zinc-800">
                                {item?.institution}
                              </span>
                            </div>

                            <span className="font-semibold uppercase hidden">
                              |
                            </span>
                            <div className="pl-2">
                              <span className="text-base uppercase font-semibold text-zinc-800">
                                {item?.degree}
                              </span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <p
                              className={`text-sm text-right font-medium text-black px-2`}
                            >
                              {item?.startDate &&
                                formatMonthYear(item?.startDate)}
                              -
                              {item?.active
                                ? "Present"
                                : item?.endDate &&
                                  formatMonthYear(item?.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="py-2">
                          <span className="text-[15px] font-medium">
                            {item?.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resumeData?.config?.trainings && resumeData?.trainings > 0 && (
              <div className="py-6">
                <h6
                  className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  TRAINING
                </h6>
                <div className="flex flex-col gap-2.5">
                  {resumeData?.trainings?.map((item: any, _index: number) => (
                    <div
                      key={item._id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full py-2 ml-3 pr-1">
                        <div className="flex justify-between gap-6 items-center">
                          <div className="flex items-center gap-2 divide-x divide-zinc-600">
                            <div>
                              <span className="text-base font-semibold text-zinc-800">
                                {item?.degree}
                              </span>
                            </div>

                            <span className="font-semibold hidden">|</span>
                            <div className="pl-2">
                              <span className="text-base text-zinc-800">
                                {item?.institution}
                              </span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span
                              className={`text-sm text-right font-medium text-black px-2`}
                            >
                              {item?.startDate &&
                                formatMonthYear(item?.startDate)}
                              -
                              {item?.active
                                ? "Present"
                                : item?.endDate &&
                                  formatMonthYear(item?.endDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resumeData?.certifications?.length > 0 && (
              <div className="py-6">
                <h6
                  className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  CERTIFICATIONS
                </h6>
                <div className="flex flex-col gap-2.5">
                  {resumeData?.certifications?.map(
                    (item: any, _index: number) => (
                      <div
                        key={item._id}
                        className={`item px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full py-2 ml-3 pr-1">
                          <div className="flex justify-between gap-6 items-center">
                            <div className="flex items-center gap-2 divide-x divide-zinc-600">
                              <div>
                                <span className="text-base font-semibold text-zinc-800">
                                  {item?.name}
                                </span>
                              </div>

                              <span className="font-semibold hidden">|</span>
                              <div className="pl-2">
                                <span className="text-base font-semibold text-zinc-800">
                                  {item?.institution}
                                </span>
                              </div>
                            </div>
                            <div className="ml-auto">
                              {item?.date && (
                                <span
                                  className={`text-sm text-right font-medium text-black px-2`}
                                >
                                  {formatMonthYear(item?.date)}
                                </span>
                              )}
                            </div>
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
      </div>
    </section>
  );
};
