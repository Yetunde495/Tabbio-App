import { Icons } from "../../components/icons";
import logo1 from "../../assets/svg/logo-1.svg";
import { cn } from "../../lib/utils/cn";
import { Fragment, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import fireEmoji from "../../assets/fireEmoji.png";

interface Feature {
  name: string;
  starterAccess?: string;
  jobseekerAccess?: string;
  recruiterAccess?: string;
}

interface Section {
  name: string;
  features: Feature[];
}

const sections: Section[] = [
  {
    name: "Features",
    features: [
      {
        name: "Jobseeker Pal",
        starterAccess: "Basic",
        jobseekerAccess: "Full",
        recruiterAccess: "Full",
      },
      {
        name: "Recruiter Pal",
        starterAccess: "Basic",
        jobseekerAccess: "Basic",
        recruiterAccess: "Full",
      },
      {
        name: "Social Pal",
        starterAccess: "Basic",
        jobseekerAccess: "Full",
        recruiterAccess: "Full",
      },
      {
        name: "LinkedIn Optimization",
        starterAccess: "Limited",
        jobseekerAccess: "Unlimited",
        recruiterAccess: "Unlimited",
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Linkedin browser extension features",
        starterAccess: "Basic",
        jobseekerAccess: "Full",
        recruiterAccess: "Full",
      },
      {
        name: "Resume building",
        starterAccess: "Limited",
        jobseekerAccess: "Unlimited",
        recruiterAccess: "Unlimited",
      },
      {
        name: "Cover letter creation",
        starterAccess: "Limited",
        jobseekerAccess: "Unlimited",
        recruiterAccess: "Unlimited",
      },
      {
        name: "Candidate evaluation",
        starterAccess: "-",
        jobseekerAccess: "-",
        recruiterAccess: "-",
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Resume Standardization",
        starterAccess: "Limited",
        jobseekerAccess: "Limited",
        recruiterAccess: "Limited",
      },
      {
        name: "Resume Branding",
        starterAccess: "Limited",
        jobseekerAccess: "Limited",
        recruiterAccess: "Limited",
      },
      {
        name: "Persona and Template creation",
        starterAccess: "Limited",
        jobseekerAccess: "Limited",
        recruiterAccess: "Limited",
      },
    ],
  },
];

interface Frequency {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
}

interface Tier {
  name: string;
  id: string;
  href: string;
  description: string;
  price?: { monthly: string; annually: string };
  users?: { monthly: string; annually: string };
  billsaved?: { monthly: string; annually: string };
  btnText: string;
  mostPopular?: boolean;
  priceMonthly: string;
}

const frequencies: Frequency[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "month" },
  { value: "annually", label: "Annually", priceSuffix: "year" },
];

const tiers: Tier[] = [
  {
    name: "Starter Plan",
    id: "tier-freelancer",
    href: "#",
    description:
      "Get full access to all features. Complete Linkedin browser extension features for personalized drafting messages to candidates based on personas with customized tone templates. ",
    btnText: "Current Plan",
    priceMonthly: "$9",
  },
  {
    name: "Job Seeker Pro",
    id: "tier-startup",
    href: "#",
    price: { monthly: "$30", annually: "$288" },
    description:
      "Get full access to all Jobseeker Pal features, basic access to Recruiter pal features. Complete Linkedin browser extension features for personalized messaging based on personas.",
    btnText: "Upgrade",
    billsaved: { monthly: "34%", annually: "33%" },
    mostPopular: true,
    priceMonthly: "$29",
  },
  {
    name: "Recruiter Pro",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "$15", annually: "$144" },
    users: { monthly: "$19", annually: "$8" },
    billsaved: { monthly: "34%", annually: "33%" },
    description:
      "Get basic access to all features. Limited browser extension features for drafting messages and connecting with recruiters.",
    btnText: "Upgrade",
    priceMonthly: "$59",
  },
];

const SubPricing = () => {
  const [frequency, setFrequency] = useState(frequencies[0]);
  return (
    <section className="w-[85%] mx-auto">
      <div className="py-15 ">
        <a href="/app/settings">
          <div className="flex gap-2 items-center">
            <Icons.back />
            <p>Back</p>
          </div>
        </a>
        <div>
          <div className="flex items-center justify-center gap-2 px-6 pt-7 pb-10 flex-col">
            <img src={logo1} alt="Logo" className="block object-contain h-8" />
            <p className="text-[#333333] text-[32px] font-bold">Plans</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-6 pt-4 pb-10 flex-col">
            <p className="text-[#333333] text-[40px] font-bold">
              Pricing Built for Main tool and it’s Supporting Tool benefits
            </p>
            <p className="text-[#333333] text-[22px]">
              The Supporting tool is free with any Main tool purchase plan as
              shown below
            </p>
          </div>
          {/* Cards */}
          <div className="">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mt-16 flex justify-center ">
                <fieldset aria-label="Payment frequency" className="w-[50%]">
                  <RadioGroup
                    value={frequency}
                    onChange={setFrequency}
                    className="grid grid-cols-2 gap-x-1 rounded-md p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
                  >
                    {frequencies.map((option) => (
                      <Radio
                        key={option.value}
                        value={option}
                        className="cursor-pointer rounded-lg px-2.5 py-1 text-gray-500 data-[checked]:bg-primary data-[checked]:text-white"
                      >
                        {option.label}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              <div className="isolate mx-auto mt-18 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={cn(
                      tier.name === "Recruiter Pro"
                        ? "text-white recruiter-gradient"
                        : "bg-[#F7F9FE] border border-[#D4D4D4]",
                      tier.name === "Starter Plan" ? " bg-white" : "",
                      "flex flex-col rounded-3xl p-8 xl:p-10 relative"
                    )}
                  >
                    {tier.mostPopular && (
                      <div className="absolute bg-primary top-[-1em] w-[80%] py-2 flex justify-center gap-2">
                        <img src={fireEmoji} className="h-6 object-contain" />
                        <p className="text-white font-bold text-lg">
                          Most Popular
                        </p>
                      </div>
                    )}

                    <div className="flex-grow">
                      <div className="flex items-center justify-between gap-x-4">
                        <h3
                          id={tier.id}
                          className={cn(
                            tier.name === "Recruiter Pro" ? "" : "text-primary",
                            "text-2xl font-semibold leading-8"
                          )}
                        >
                          {tier.name}
                        </h3>
                      </div>

                      {tier?.price ? (
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span
                            className={cn(
                              tier.name === "Recruiter Pro"
                                ? "text-white"
                                : "text-[#333333]",
                              "text-4xl font-bold tracking-tight"
                            )}
                          >
                            {tier.price[frequency.value]}
                          </span>
                          <span
                            className={cn(
                              tier.name === "Recruiter Pro"
                                ? "text-white"
                                : "text-[#5B5B5B]",
                              "text-sm font-semibold leading-6"
                            )}
                          >
                            /{frequency.priceSuffix}
                          </span>
                        </p>
                      ) : (
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-[#333333]">
                            Free
                          </span>
                        </p>
                      )}

                      {tier.users && (
                        <p className="mt-4 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            {tier?.users[frequency.value]}
                          </span>
                          <span className="text-sm font-semibold leading-6 text-gray-600">
                            per user (Teams) /month
                          </span>
                        </p>
                      )}

                      {tier.billsaved && (
                        <div className="flex items-center gap-4 mt-2">
                          <p>Billed {frequency.priceSuffix}ly</p>
                          <div className="border border-[#FAD471] px-4 rounded-md">
                            {tier.billsaved[frequency.value]}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bottomSection mt-auto">
                      <hr className="text-#D4D4D4 my-10" />
                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        {tier.description}
                      </p>
                      <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className={cn(
                          tier.name === "Recruiter Pro"
                            ? "text-primary bg-white shadow-sm"
                            : " text-white bg-primary",
                          tier.name === "Starter Plan"
                            ? " bg-[#5272EA1A] text-black"
                            : "",
                          "mt-6 block rounded-full px-3 py-2 text-center text-sm font-semibold leading-6"
                        )}
                      >
                        {tier.btnText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* table */}
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* xs to lg */}
              <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
                {tiers.map((tier) => (
                  <section
                    key={tier.id}
                    className={cn(
                      tier.mostPopular
                        ? "rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200"
                        : "",
                      "p-8"
                    )}
                  >
                    <h3
                      id={tier.id}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                      <span className="text-4xl font-bold">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-sm font-semibold">/month</span>
                    </p>
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={cn(
                        tier.mostPopular
                          ? "bg-indigo-600 text-white hover:bg-indigo-500"
                          : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                        "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      )}
                    >
                      Buy plan
                    </a>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm leading-6 text-gray-900"
                    >
                      {sections.map((section) => (
                        <li key={section.name}>
                          <ul role="list" className="space-y-4">
                            {section.features.map((feature) => (
                              <li key={feature.name} className="flex gap-x-3">
                                <Icons.checkCircle
                                  aria-hidden="true"
                                  className="h-6 w-5 flex-none text-indigo-600"
                                />
                                <span>
                                  {feature.name}{" "}
                                  {/* <span className="text-sm leading-6 text-gray-500">
                                    {feature.starterAccess}
                                    {feature.jobseekerAccess}
                                    {feature.recruiterAccess}
                                  </span> */}
                                </span>{" "}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {/* lg+ */}
              <div className="isolate mt-20 hidden lg:block">
                <div className="relative -mx-8">
                  <table className="w-full table-fixed border-separate border-spacing-x-8 text-left mb-10">
                    <caption className="sr-only">
                      Pricing plan comparison
                    </caption>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <span className="text-xl">Features</span>
                        </th>
                        {tiers.map((tier) => (
                          <td
                            key={tier.id}
                            className={cn(
                              tier.name === "Recruiter Pro"
                                ? "text-white recruiter-gradient"
                                : "bg-[#F7F9FE] border border-[#D4D4D4]",
                              tier.name === "Starter Plan" ? " bg-white" : "",
                              "px-6 pt-2 xl:px-8 rounded-xl"
                            )}
                          >
                            <div className="text-sm font-semibold leading-7 text-gray-900">
                              {tier.name}
                            </div>
                            <a
                              href={tier.href}
                              aria-describedby={tier.id}
                              className={cn(
                                tier.name === "Recruiter Pro"
                                  ? "text-primary bg-white shadow-sm"
                                  : " text-white bg-primary",
                                tier.name === "Starter Plan"
                                  ? " bg-[#5272EA1A] text-black"
                                  : "",
                                "mb-6 block rounded-full px-3 py-1 text-center text-sm font-semibold leading-6 mt-4"
                              )}
                            >
                              {tier.btnText}
                            </a>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  {sections.map((section) => (
                    <Fragment key={section.name}>
                      {section.features.map((feature) => (
                        <div
                          className="border border-[#dddddd] rounded-lg overflow-hidden mb-5"
                          key={feature.name}
                        >
                          <table className="w-full table-fixed text-left border-separate border-spacing-x-8">
                            <tbody className="text-sm font-normal leading-6">
                              <tr className="p-5">
                                <td className="p-4">{feature.name}</td>
                                <td className="px-6 py-4 xl:px-8">
                                  <div className="flex items-center gap-2">
                                    <div>
                                      {feature.starterAccess}{" "}
                                      {feature.starterAccess != "-"
                                        ? "access"
                                        : ""}
                                    </div>
                                    {feature.starterAccess === "Unlimited" ||
                                    feature.starterAccess === "Full" ? (
                                      <Icons.checkCircle className="text-primary" />
                                    ) : null}
                                  </div>
                                </td>

                                <td className="px-6 py-4 xl:px-8">
                                  <div className="flex items-center gap-2">
                                    <div>
                                      {feature.jobseekerAccess}{" "}
                                      {feature.jobseekerAccess != "-"
                                        ? "access"
                                        : ""}
                                    </div>{" "}
                                    {feature.jobseekerAccess === "Unlimited" ||
                                    feature.jobseekerAccess === "Full" ? (
                                      <Icons.checkCircle className="text-primary" />
                                    ) : null}
                                  </div>
                                </td>

                                <td className="px-6 py-4 xl:px-8">
                                  <div className="flex items-center gap-2">
                                    <div>
                                      {feature.recruiterAccess}{" "}
                                      {feature.recruiterAccess != "-"
                                        ? "access"
                                        : ""}
                                    </div>
                                    {feature.recruiterAccess === "Unlimited" ||
                                    feature.recruiterAccess === "Full" ? (
                                      <Icons.checkCircle className="text-primary" />
                                    ) : null}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubPricing;
