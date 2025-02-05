import { useRef, useState } from "react";
import Modal from "../../components/modal";
import { FormProvider, useForm } from "react-hook-form";
import { AutoInput } from "../../components/form/customInput";
import { PasswordInput } from "../../components/form";
import { BsPatchCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";
import logo from "../../assets/brand/logo-1.svg";
import { MdOutlineEmail } from "react-icons/md";
import { formatEmail } from "../../lib/utils/formatters";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  sendOtp,
  verifyEmailOtp,
} from "../../services/authServices";
import { useApp } from "../../context/AppContext";
import { SaveProfile } from "../../services/profileServices";
import Button from "../../components/Button";

const OnboardCandidate: React.FC<{
  show: boolean;
  onHide: () => void;
  profileData: any;
}> = ({ show, onHide, profileData }) => {
  const [showSignup, setShowSignup] = useState(true);
  const navigate = useNavigate();
  const { signIn } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showVerify, setShowVerify] = useState(false);

  const methods = useForm<any>();
  const [togglePassword, setTogglePassword] = useState(false);

  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement | null>(null)
  );

  const [otpValue, setOtpValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d{0,1}$/.test(inputValue)) {
      // Update only the specific digit at the given index
      setOtpValue((prevOtpValue) => {
        const newOtpValue = prevOtpValue.split("");
        newOtpValue[index] = inputValue;
        return newOtpValue.join("");
      });

      // Move focus to the next input
      if (inputValue && index < inputRefs.length - 1) {
        inputRefs[index + 1]?.current?.focus();
      }

      // Move focus to the previous input if the current input is cleared
      if (!inputValue && index > 0) {
        inputRefs[index - 1]?.current?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const otpArray = pasteData.split("").slice(0, 6);
    otpArray.forEach((char, index) => {
      const syntheticEvent = {
        target: { value: char },
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(syntheticEvent, index);
    });
  };

  const inputClasses = () =>
    classNames(
      "border-b md:text-2xl text-xl text-primary font-bold border-primary border-0 ring-0",
      "p-3",
      "w-12 focus:border-primary focus:border-b-2 focus:outline-none focus:ring-0 outline-none",
      "text-center",
      {
        "border-red-500": !isValid,
        "border-primary": isValid,
      }
    );

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      await sendOtp();
      setShowVerify(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: any) => {
    if (data.password === data.confirmPassword) {
      setConfirmPassword(true);
      setIsConfirmed(true);
    } else if (!confirmPassword) {
      setIsConfirmed(false);
      return;
    }
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }
    setIsLoading(true);
    try {
      const resp = await registerUser(data);
      signIn({
        email: data?.email,
        token: resp?.token,
        user_id: resp?.data?.user?.id,
        ...resp?.data?.user,
      });
      setEmail(data?.email || "");
      setShowSignup(false);
      sendOTP();
    } catch (err: any) {
      toast.error(err.message || "Request Failed! Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    const toastId = toast.loading("Setting up your Profile...");
    setLoading(true);
    setSuccess(true);
    try {
      await SaveProfile(profileData);
      toast.update(toastId, {
        render: "Your Professional Profile has been setup successfully",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await verifyEmailOtp({
        pin: otpValue,
      });
      setShowVerify(false);
      handleCreateProfile();
    } catch (err: any) {
      setIsValid(false);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        // setShowSignup(false);
        onHide();
      }}
      size="w-full max-w-[600px]"
      closeButton={isSuccess ? false : true}
    >
      {showSignup && (
        <div className="lg:min-w-[420px] md:h-[80vh] h-[90vh] no-scrollbar overflow-y-auto min-w-[300px]">
          <div className="mb-10 text-center flex flex-col w-full justify-center  items-center space-y-4">
            <img src={logo} alt="logo-image" />
            <h1 className="lg:text-[32px] text-center text-zinc-900 mb-6 font-medium sm:text-[30px] text-[20px] dark:text-white leading-[38px]">
              Create an account
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-full">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div>
                    <div>
                      <div className="grid gap-6">
                        <AutoInput
                          label="First Name"
                          name="firstName"
                          placeholder="Enter first name"
                          rules={{
                            required: "First name is required",
                            pattern: {
                              value: /^[A-Za-z]+$/,
                              message:
                                "Invalid! name must contain only alphabetical characters",
                            },
                          }}
                        />

                        <AutoInput
                          label="Last Name"
                          name="lastName"
                          placeholder="Enter last name"
                          rules={{
                            required: "Last name is required",
                            pattern: {
                              value: /^[A-Za-z]+$/,
                              message:
                                "Invalid! name must contain only alphabetical characters",
                            },
                          }}
                        />
                        <AutoInput
                          label="Email"
                          name="email"
                          placeholder="Enter your email"
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          }}
                        />
                        <div>
                          <PasswordInput
                            label="Password"
                            name="password"
                            placeholder="Enter Password"
                            togglePassword={togglePassword}
                            onTogglePassword={setTogglePassword}
                            rules={{ required: "Password is required" }}
                          />
                        </div>

                        <div className="space-y-2 flex flex-col">
                          <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Enter Password"
                            togglePassword={togglePassword}
                            onTogglePassword={setTogglePassword}
                            rules={{ required: "Password is required" }}
                          />
                          {isConfirmed === false && (
                            <small className="text-red-500">
                              Passwords do not match. Please check again.
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full py-3 px-6 rounded-full bg-primary text-white border-none hover:opacity-95"
                          disabled={isLoading}
                          onClick={() => {}}
                        >
                          {isLoading ? "Loading..." : "Sign in"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      )}

      {showVerify && (
        <div className="lg:min-w-[420px] min-w-[300px]">
          <div className="mb-10 text-center flex flex-col w-full justify-center  items-center space-y-4">
            <img src={logo} alt="logo-image" />

            <div className="text-primary bg-primary/15 rounded-full flex items-center justify-center h-14 w-14">
              <MdOutlineEmail size={24} />
            </div>
            <div className="text-center">
              <h1 className="lg:text-[32px] font-medium mb-2 sm:text-[30px] text-[25px] dark:text-white leading-[38px]">
                Check your email
              </h1>
              <p className="text-zinc-500">
                Enter the 6 digit code sent to {formatEmail(email)}
              </p>
            </div>
          </div>
          <div className="lg:h-auto overflow-y-auto custom-scrollbar h-[48vh] w-full flex justify-center items-center">
            <div className="w-full">
              <div className="lg:min-w-[480px] flex items-center flex-col -mt-5">
                <small
                  className={`${
                    !isValid ? "text-red-500" : "text-slate-400"
                  } text-left my-3`}
                >
                  {!isValid ? "Wrong code! Try again" : ""}
                </small>
                <div className="flex gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      value={otpValue[index] || ""}
                      onChange={(e) => handleChange(e, index)}
                      onPaste={(e) => handlePaste(e)}
                      className={inputClasses()}
                      maxLength={1}
                      ref={inputRefs[index]}
                    />
                  ))}
                </div>

                <div className="mt-9 mb-3 w-full">
                  <Button
                    disabled={otpValue.length !== 6 || loading}
                    onClick={() => {
                      handleVerifyOtp();
                    }}
                    width="w-full max-w-[80%]"
                    rounded
                  >
                    {loading ? "Verifying Otp" : "Verify"}{" "}
                  </Button>
                </div>

                <p className="text-center text-zinc-500 font-semibold my-5">
                  Didn’t receive the email?{" "}
                  <span
                    className="text-blue-500 hover:opacity-95 cursor-pointer ml-1"
                    onClick={() => {
                      sendOTP();
                    }}
                  >
                    {isLoading ? "Resending" : "Click to resend"}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="flex w-full flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Successfull!
          </h1>
          <BsPatchCheckFill
            size={58}
            className="mb-4 text-primary text-lg animate-pulse"
          />

          {loading ? (
            <p className="text-zinc-600 font-normal text-center pb-6 lg:px-6">
              Your account has been successfully verified. Please, wait while we
              setup your professional profile and create your unique link.{" "}
              <br />
            </p>
          ) : (
            <p className="text-zinc-600 font-normal text-center pb-6 lg:px-6">
              Successful! Please, sign in to access your profile <br />
            </p>
          )}

          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => navigate("/signin")}
              className="bg-primary px-6 py-2.5 rounded-md hover:scale-105 duration-200 text-white font-medium text-lg"
            >
              Go to Signin
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OnboardCandidate;
