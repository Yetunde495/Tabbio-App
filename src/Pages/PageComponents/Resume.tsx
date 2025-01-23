import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { FaCircle, FaLinkedinIn } from "react-icons/fa6";
import { formatMonthYear } from "../../lib/utils/formatters";

export const LiveResumes: React.FC<{ resumeData: any }> = ({ resumeData }) => {
  return (
    <section className="w-full">
      {resumeData?.template === "standard" && (
        <div className="bg-white py-10 px-6 overflow-x-auto  w-full ">
          <div className="flex w-full gap-9  mb-10">
            {resumeData?.photo_url && (
              <div className="relative w-55 h-55 rounded-full border bg-zinc-300 border-stroke/60">
                <img
                  className={`rounded-full w-full h-full object-cover`}
                  src={resumeData?.photo_url}
                  alt=""
                />
              </div>
            )}
            <div className="mt-15 font-semibold">
              <h1
                className={`font-medium text-[40px] mb-0`}
                style={{ color: resumeData?.style?.primaryColor }}
              >
                {resumeData?.name}
              </h1>
              {resumeData?.role && (
                <h6 className={`text-lg text-zinc-700 mr-2 -mt-2 uppercase`}>
                  {resumeData?.role}
                </h6>
              )}
            </div>
          </div>

          <div className="flex gap-1 w-full">
            <div className="max-w-60">
              {resumeData?.professional_summary && (
                <div className="px-3">
                  <h6 className="font-semibold mb-1">ABOUT ME</h6>
                  <div>
                    <p className="text-zinc-700">
                      {resumeData?.professional_summary}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 mb-9 px-3">
                <div className="flex gap-x-3 gap-y-4.5 items-center flex-wrap text-zinc-700 text-sm font-medium">
                  {resumeData?.location && (
                    <div className="flex gap-1.5 items-center">
                      <SlLocationPin className="text-primary text-lg" />
                      <p>{resumeData?.location}</p>
                    </div>
                  )}
                  {resumeData?.email && (
                    <div className="flex gap-1.5 items-center">
                      <MdOutlineMailOutline className="text-primary text-lg" />
                      <p>{resumeData?.email}</p>
                    </div>
                  )}
                  {resumeData?.phone_number && (
                    <div className="flex gap-1.5 items-center">
                      <MdOutlinePhone className="text-primary text-lg" />
                      <p>{resumeData?.phone_number}</p>
                    </div>
                  )}
                  {resumeData?.website_url && (
                    <div className="flex gap-1.5 items-center">
                      <FiLink className="text-primary text-lg" />
                      <a
                        href={resumeData?.website_url || ""}
                        className="hover:underline hover:text-primary"
                        target="_blank"
                      >
                        {resumeData?.website_url}
                      </a>
                    </div>
                  )}
                  {resumeData?.linkedin_url && (
                    <div className="flex gap-1.5 items-center">
                      <FaLinkedinIn className="text-primary text-lg" />
                      <a
                        href={resumeData?.linkedin_url || ""}
                        className="hover:underline hover:text-primary"
                        target="_blank"
                      >
                        {resumeData?.linkedin_url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full ml-2 px-4">
              {resumeData?.experience && (
                <div>
                  <h6 className="font-bold uppercase mb-1">Experience</h6>
                  <div className="flex flex-col">
                    {resumeData?.experience.map((item: any) => (
                      <div key={item.id} className="relative flex gap-3">
                        {/* Circle with connector line */}
                        <div className="flex flex-col items-center">
                          <FaCircle
                            style={{
                              color: resumeData?.style?.secondary_color,
                            }}
                            size={8}
                            className="mt-2"
                          />
                          {
                            <div className="h-full w-0.5 bg-slate-200 mt-[0.5px]"></div>
                          }
                        </div>

                        {/* Content */}
                        <div className="w-full">
                          <h6
                            className="w-full text-base font-semibold mb-2"
                            style={{
                              color: resumeData?.style?.secondary_color,
                            }}
                          >
                            {item?.company}
                          </h6>
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <p className="text-base uppercase font-semibold text-zinc-800">
                              {item?.position}
                            </p>
                            <p className="text-sm uppercase text-zinc-600">
                              {item.duration}
                            </p>
                          </div>
                          <div className="w-full pb-6">
                            <div className="text-zinc-700 text-base w-full">
                              {item?.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resumeData?.education && (
                <div className="mt-7">
                  <div className="w-full">
                    <h6 className="font-bold uppercase mb-1">Education</h6>
                    <div className="flex flex-col">
                      {resumeData?.education.map(
                        (item: any, _index: number) => (
                          <div key={item.id} className={`relative flex gap-3 `}>
                            <div className="flex flex-col items-center">
                              <FaCircle
                                style={{
                                  color: resumeData?.style?.secondary_color,
                                }}
                                size={8}
                                className="mt-2"
                              />
                              {
                                <div className="h-full w-0.5 bg-slate-200 mt-[0.5px]"></div>
                              }
                            </div>

                            <div className="w-full">
                              <h6
                                className={`w-full text-base font-semibold mb-2`}
                                style={{
                                  color: resumeData?.style?.secondary_color,
                                }}
                              >
                                {item?.school}
                              </h6>
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <p
                                  className={`text-base w-[75%] uppercase font-semibold text-zinc-800`}
                                >
                                  {item?.degree}
                                </p>

                                <span
                                  className={`text-sm uppercase text-zinc-600`}
                                >
                                  {item.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {resumeData?.skills && (
                <div className="mt-7">
                  <div className="py-3">
                    <h6 className="font-bold uppercase mb-2">Skills</h6>

                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {resumeData?.skills.map((item: string, index: number) => (
                        <div key={index} className={`item relative py-0 `}>
                          <div className="py-1 bg-zinc-100 rounded-md">
                            <span
                              className={`border-none text-sm font-medium text-zinc-700 px-2`}
                            >
                              {item}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {resumeData?.languages && (
                <div className="mt-7">
                  <div className="py-3">
                    <h6 className="font-bold uppercase mb-2">Languages</h6>

                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {resumeData?.languages.map(
                        (item: string, index: number) => (
                          <div key={index} className={`item relative py-0 `}>
                            <div className="py-1 bg-zinc-100 rounded-md">
                              <span
                                className={`text-sm font-medium text-zinc-700 px-2`}
                              >
                                {item}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {resumeData?.hobbies && (
                <div className="mt-7">
                  <div className="py-3">
                    <h6 className="font-bold uppercase mb-2">Hobbies</h6>

                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {resumeData?.hobbies.map(
                        (item: string, index: number) => (
                          <div key={index} className={`item relative py-0 `}>
                            <div className="py-1 bg-zinc-100 rounded-md">
                              <span
                                className={`text-sm font-medium text-zinc-700 px-2`}
                              >
                                {item}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const ResumePreview: React.FC<{ resumeData: any }> = ({
  resumeData,
}) => {
  return (
    <section className="w-full bg-white">
      <div className="min-w-[800px] w-full">
        {resumeData?.template === "entry" ? (
          <div className="bg-white  py-8 px-6 w-full overflow-x-auto custom-scrollbar">
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
                  {["email", "phone", "address", "linkedin", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    .map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center text-sm px-2"
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase()}:
                        </span>

                        <span className="text-sm">
                          {resumeData[field] ||
                            `Enter ${
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }`}
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
                <p className={`font-medium text-black text-base w-full`}>
                  {resumeData?.professionalSummary}
                </p>
              </div>
            </div>

            {/* Skills/Areas of Expertise */}
            {resumeData?.config?.areasOfExpertise && (
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
                    {resumeData?.areasOfExpertise.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className={`item  relative  text-zinc-800 py-0`}
                        >
                          <div className="py-1 rounded-md">
                            <span className="px-1.5 text-[15px] font-medium">
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

            {/* Education and CERtifications */}
            {resumeData?.config?.education && (
              <div className="border-b border-stroke py-6">
                <div>
                  <h6
                    className="font-semibold text-lg uppercase pl-4.5 mb-3"
                    style={{ color: resumeData?.style?.primaryColor }}
                  >
                    Education and Certifications
                  </h6>
                  <div className="flex flex-col gap-4">
                    {resumeData?.education.map((item: any, _index: number) => (
                      <div
                        key={item?._id}
                        className={`item px-2 relative  text-black w-full py-1 `}
                        draggable="true"
                      >
                        <div className="w-full flex items-start py-2 ml-3 pr-1">
                          <FaCircle size={6} className="rounded-full mt-2" />
                          <div className="w-full">
                            <div className="flex gap-6 w-full items-start">
                              <p className={`w-full text-base text-black px-2`}>
                                {item?.institution}
                              </p>
                              <div className="ml-auto">
                                <span
                                  className={`text-sm text-right font-medium text-black  px-2`}
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
                            <div className="">
                              <p
                                className={`w-full text-base uppercase font-semibold text-zinc-800 px-2`}
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
            {/* Education and CERtifications */}

            {/*Relevant Courses  */}
            {resumeData?.config?.courses && (
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
                    {resumeData?.relevantCourses.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className={`item relative  text-zinc-800 py-0`}
                        >
                          <div className="py-1">
                            <span className="px-1 text-base font-medium">
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
            {resumeData?.config?.projects && (
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
                      key={item.id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full">
                        <div className="flex w-full justify-between items-start">
                          <p
                            className={`text-base font-semibold text-black px-2 mb-2`}
                          >
                            {item?.name}
                          </p>
                          <p className={`text-sm font-medium text-black px-2`}>
                            {item?.technology}
                          </p>
                        </div>

                        <div className="flex items-center ml-[3px]">
                          <p className="px-1.5 text-[15px] font-medium">
                            {item?.description}
                          </p>
                        </div>

                        {item?.link && (
                          <div className={`pb-1 pt-3 border-stroke`}>
                            <div className="flex">
                              <a
                                className="px-1.5 text-[15px] cursor-pointer text-blue-600 font-medium"
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
            {resumeData?.config?.workExperience && (
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
                  {resumeData?.experience.map((item: any, _index: number) => (
                    <div
                      key={item.id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full">
                        <div className="flex w-full justify-between items-start">
                          <p
                            className={`text-base font-semibold text-black px-2 mb-2`}
                          >
                            {item?.company}
                          </p>
                          <p className={`text-sm font-medium text-black px-2`}>
                            {item.duration}
                          </p>
                        </div>

                        <div className="flex items-center mb-2 ml-[3px">
                          <p
                            className={`text-base uppercase font-semibold text-zinc-700 px-2`}
                          >
                            {item?.position}
                          </p>
                        </div>

                        <div>
                          <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                            {item?.keyAchievements.map(
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
                  ))}
                </div>
              </div>
            )}
            {/* Work Experience */}

            {/* Internships */}
            {resumeData?.config?.internships && (
              <div className="border-b py-9 border-stroke mb-4">
                <div>
                  <div className="flex mb-3 gap-3  justify-between items-center">
                    <h6
                      className="font-semibold text-lg uppercase pl-4.5"
                      style={{ color: resumeData?.style?.primaryColor }}
                    >
                      Internships & Volunteer Experience{" "}
                    </h6>
                  </div>

                  <div className="flex flex-col gap-9">
                    {resumeData?.internships.map(
                      (item: any, _index: number) => (
                        <div
                          key={item.id}
                          className={`item px-2 relative  text-black w-full py-1 `}
                        >
                          <div className="w-full">
                            <div className="flex w-full justify-between items-start">
                              <p
                                className={`text-base font-semibold text-black px-2 mb-2`}
                              >
                                {item?.company}
                              </p>
                              <p
                                className={`text-sm font-medium text-black px-2`}
                              >
                                {item.duration}
                              </p>
                            </div>

                            <div className="flex items-center mb-2 ml-[3px">
                              <p
                                className={`text-base uppercase font-semibold text-zinc-700 px-2`}
                              >
                                {item?.position}
                              </p>
                            </div>

                            <div>
                              <ul className="text-sm w-full font-normal space-y-2 px-2.5">
                                {item?.keyAchievements.map(
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
                  {["email", "phone", "address", "linkedin", "website"]
                    .filter(
                      (field) =>
                        resumeData?.config[
                          field as keyof typeof resumeData.config
                        ]
                    )
                    .map((field) => (
                      <div
                        key={field}
                        className="flex gap-1 items-center text-sm px-2"
                      >
                        <span className="font-semibold">
                          {field.charAt(0).toUpperCase()}:
                        </span>

                        <span className="text-sm">
                          {resumeData[field] ||
                            `Enter ${
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }`}
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
                <p className=" px-3 font-medium text-black text-base">
                  {resumeData?.professionalSummary}
                </p>
              </div>
            )}
            {resumeData?.config?.skills && (
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
                          <span className="italic underline text-base text-zinc-500 underline-offset-2 cursor-pointer font-medium">
                            {item.name}
                          </span>
                        </div>

                        <ul className="inline-flex items-center gap-2 flex-wrap">
                          {item.items.map(
                            (skillItem: string, skillIndex: number) => (
                              <li key={skillIndex}>
                                <span className="text-[15px] font-medium">
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
            {resumeData?.config?.careerHighlights && (
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
                  {resumeData?.careerHighlights.map(
                    (item: any, _index: number) => (
                      <div
                        key={item.id}
                        className={`item hover:border border-stroke hover:my-5 border-space rounded-md border-spacing-1 px-2 relative  text-black w-full py-1 `}
                      >
                        <div className="w-full">
                          <div className="flex w-full">
                            <p
                              className={`text-base font-semibold text-black px-2 mb-2`}
                            >
                              {item?.title}
                            </p>
                          </div>

                          <div className="flex items-center ml-[3px]">
                            <p className="px-1.5 text-[15px] font-medium">
                              {item?.description || ""}
                            </p>
                          </div>

                          <div className={`pb-1 pt-3 border-stroke`}>
                            <div className="flex">
                              <a
                                className="px-1.5 text-[15px] cursor-text text-blue-600 font-medium"
                                href={item?.link}
                                target="_blank"
                              >
                                {item?.link || ""}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {resumeData?.config?.workExperience && (
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
                              {item?.keyAchievements.map(
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
            {resumeData?.config?.education && (
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
                  {resumeData?.education.map((item: any, _index: number) => (
                    <div
                      key={item.id}
                      className={`px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full py-2 ml-3 pr-1">
                        <div className="flex justify-between gap-6 items-center">
                          <div className="flex items-center gap-2 divide-x divide-zinc-600">
                            <div>
                              <span className="text-base uppercase font-semibold text-zinc-800">
                                {item?.school}
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
                              {item?.year}
                            </p>
                          </div>
                        </div>

                        <div className="py-2">
                          <span className="text-[15px] font-medium">
                            {item?.info}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resumeData?.config?.trainings && (
              <div className="py-6">
                <h6
                  className="font-semibold text-lg uppercase border-b-2 ml-3 py-1 mb-2 w-full"
                  style={{
                    color: resumeData?.style?.primaryColor,
                    borderColor: resumeData?.style?.primaryColor,
                  }}
                >
                  TRAINING & CERTIFICATIONS
                </h6>
                <div className="flex flex-col gap-2.5">
                  {resumeData?.trainings.map((item: any, _index: number) => (
                    <div
                      key={item.id}
                      className={`item px-2 relative  text-black w-full py-1 `}
                    >
                      <div className="w-full py-2 ml-3 pr-1">
                        <div className="flex justify-between gap-6 items-center">
                          <div className="flex items-center gap-2 divide-x divide-zinc-600">
                            <div>
                              <span className="text-base font-semibold text-zinc-800">
                                {item?.title}
                              </span>
                            </div>

                            <span className="font-semibold hidden">|</span>
                            <div className="pl-2">
                              <span className="text-base text-zinc-800">
                                {item?.platform}
                              </span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span
                              className={`text-sm text-right font-medium text-black px-2`}
                            >
                              {item?.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
