import { FormGroup, TextArea, Textarea } from "../../../components/form";
import { FormProvider, useForm } from "react-hook-form";
import { AutoInput } from "../../../components/form/customInput";
import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Button from "../../../components/Button";
import PhoneInput from "react-phone-number-input";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import sparkleIcon from "../../../assets/svg/ai-sparkle.svg";
import Modal from "../../../components/modal";
import FieldInput from "../../../components/form/Input";
import { RiRobot2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { generateProfileSummary } from "../../../services/profileServices";

type Props = {
  CvData: any;
  setCvData: any;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  completeStep: () => void;
  completed: boolean;
};

const BasicDetails: React.FC<Props> = ({
  CvData,
  setCvData,
  activeStep,
  setActiveStep,
  completeStep,
  //   completed,
}) => {
  const { user } = useApp();
  const methods = useForm<any>();
  const [phone, setPhone] = useState<any>(CvData?.phone);
  const [linkedinError, setLinkedinError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  const onSubmit = async (data: any) => {
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return; // Exit the function if there are errors
    }

    setCvData((prevData: any) => ({
      ...prevData,
      ...data,
      name: data?.firstName + " " + data?.lastName,
      tabbioLink: user?.tabbioLink,
    }));
    completeStep();
    setActiveStep(activeStep + 1);
  };

  const isValidLinkedInUrl = (url: string): boolean => {
    const linkedInRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-_%]+\/?$/;
    return linkedInRegex.test(url);
  };

  const handleGenerateSummary = async (role:string) => {
    setAiLoading(true);
    try {
      const resp = await generateProfileSummary({
        role: role,
      });
      setAiSummary(resp?.data?.summary);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="py-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-7.5">
          <FormGroup>
            <AutoInput
              label="First Name"
              name="firstName"
              defaultValue={CvData?.firstName}
              placeholder="Enter First Name"
              rules={{ required: "This field is required" }}
            />

            <AutoInput
              label="Last Name"
              name="lastName"
              defaultValue={CvData?.lastName}
              placeholder="Enter Last Name"
              rules={{ required: "This field is required" }}
            />
          </FormGroup>
          <AutoInput
            label="Professional Title"
            sublabel={
              <span className="text-sm text-zinc-500">
                (Make it stand out!)
              </span>
            }
            name="role"
            defaultValue={CvData?.role}
            placeholder="Ex: Full Stack Developer"
            rules={{ required: "This field is required" }}
          />

          <AutoInput
            label="Email Address"
            name="email"
            placeholder="youremail@example.com"
            defaultValue={CvData?.email}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
          />

          <div className="">
            <label
              htmlFor="phone"
              className="text-[#242424] text-base mb-[0.4rem] flex items-center gap-1"
            >
              Phone Number{" "}
            </label>
            <PhoneInput
              international
              defaultCountry="US"
              placeholder="Enter phone number"
              value={phone}
              onChange={(val) => {
                setPhone(val);
                methods.setValue("phone", val);
              }}
            />
          </div>

          <AutoInput
            label="Location"
            name="location"
            defaultValue={CvData?.location}
            placeholder="Include your Country, State and City"
            rules={{ required: "This field is required" }}
          />

          <div className="mt-2">
            <label
              htmlFor="linkedin"
              className="text-[#242424] text-base mb-[0.4rem] flex items-center gap-1"
            >
              LinkedIn Profile{" "}
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="href"
              defaultValue={CvData?.linkedIn}
              onBlur={() => {
                if (
                  methods.getValues("linkedIn") &&
                  !isValidLinkedInUrl(methods.getValues("linkedIn"))
                ) {
                  setLinkedinError("Invalid LinkedIn profile URL");
                } else {
                  setLinkedinError("");
                }
              }}
              onChange={(e) => {
                methods.setValue("linkedIn", e.target.value);
              }}
              autoComplete="link"
              placeholder="Enter your Linkedin Url"
              className="block w-full rounded-md border focus:border-primary focus:outline-primary border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
            />
            <p className="text-xs mt-1 text-red-600">{linkedinError}</p>
          </div>

          <AutoInput
            label="Portfolio/Github URL"
            sublabel={"(Optional)"}
            name="website"
            defaultValue={CvData?.website}
            placeholder="https://yourwebsite.com"
            rules={{ required: false }}
          />

          <div>
            <Textarea
              label="Tell your story"
              subLabel={
                <button
                  onClick={() => setShowModal(true)}
                  type="button"
                  className="ai-button px-4 ml-2 mb-2 rounded-full py-1 text-center flex justify-center items-center gap-2"
                >
                  <span>
                    <img src={sparkleIcon} />
                  </span>
                  Write with Ai
                </button>
              }
              name="professionalSummary"
              placeholder="Share your professional journey, key achievements and what makes you unique. Think of this as your elevator pitch."
              defaultValue={CvData?.professionalSummary}
              rules={{
                required: "Professional Summary is required",
              }}
            />
            <p className="pt-1 font-normal text-[#5A5A5A]">
              Keep it concise 2-3 sentences works best
            </p>
          </div>

          <div className="flex justify-center items-center gap-x-5 mt-10 py-6 border-stroke border-t">
            <Button
              type="submit"
              onClick={() => {}}
              width="w-full"
              height="h-12"
            >
              Continue to Experience{" "}
              <FaArrowRight
                fontWeight={600}
                className="group-hover:translate-x-2 duration-150 ease-in-out"
              />
            </Button>
          </div>
        </form>
      </FormProvider>
      <Modal
        show={showModal}
        onHide={() => {
          setRole("");
          setAiSummary("");
          setShowModal(false);
        }}
        title="AI Writing Assistant"
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-5 text-center">
          <p className=" text-zinc-600 text-lg">Professional Summary</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-7.5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="E.g UI/UX Designer"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {aiSummary && (
          <div className="mb-7.5">
            <TextArea
              value={aiSummary}
              onChange={(val) => setAiSummary(val)}
              label="AI Generated Response"
              name="extra-info"
              placeholder="Enter any specific details you want to include. E.g skills, industry"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 justify-center items-center">
          <Button
            onClick={() => {
              handleGenerateSummary(role);
            }}
            disabled={aiLoading || !role}
            width="w-[80%]"
          >
            <RiRobot2Line /> {aiLoading ? "Loading..." : "Generate Summary"}
          </Button>
          {aiSummary && (
            <button
              className="flex w-[80%] text-lg font-medium justify-center py-2 rounded-md px-6 items-center gap-2 text-primary bg-primary/15 hover:bg-primary/20 border-none"
              disabled={aiLoading}
              onClick={() => {
                setCvData((resumeData: any) => ({
                  ...resumeData,
                  professionalSummary: aiSummary,
                }));
                methods.setValue("professionalSummary", aiSummary);
                setRole("");
                setAiSummary("");
                setShowModal(false);
              }}
            >
              <FaCheck />
              Apply AI Summary
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BasicDetails;
