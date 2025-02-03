import React, { useEffect, useState } from "react";
import {
  useApp,
  DATA_CENTER_TOKEN,
  DATA_CENTER_USER,
} from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import logo from "../../assets/brand/logo-1.svg";
import { AutoInput } from "../../components/form/customInput";
import { LockedPasswordInput } from "../../components/form/PasswordInput";
import { BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { TbLoader3 } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { getUserData, sendOtp, signInUser } from "../../services/authServices";
import Button from "../../components/Button";

const Signin: React.FC = () => {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const auth_url = import.meta.env.VITE_PUBLIC_TABBIO_GOOGLE_AUTH;

  //   const [success, setSuccess] = useState(false);

  const methods = useForm<any>();
  const sendOTP = async () => {
    try {
      const response = await sendOtp();
      toast.success(response.message);
      navigate("/email-verify");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      const response = await signInUser(data);
      signIn({
        token: response?.token,
        ...response?.data?.user,
        category: "Candidate",
      });
      const resp2 = await getUserData();
      signIn({
        token: response?.token,
        ...response?.data?.user,
        category: "Candidate",
        ...resp2?.data?.userData,
      });
      if (response?.data?.user?.verified) {
        navigate(`/app/candidate/profile`);
      } else {
        sendOTP();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signinWithGoogle = async () => {
    try {
      setIsLoading(true);
      window.location.href = auth_url;
    } catch (err: any) {
      toast.error(err?.message || "Request Failed! Please, try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userData: any = localStorage.getItem(DATA_CENTER_USER);
    const token: any = localStorage.getItem(DATA_CENTER_TOKEN);

    const parsedData = JSON.parse(userData);
    if (
      //@ts-ignore
      token !== (null || undefined) &&
      //@ts-ignore
      userData !== (null || undefined) &&
      parsedData?.is_active
    ) {
      signIn(JSON.parse(userData));
      navigate(`/app/candidate/profile`);
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      <div className="flex flex-col w-full h-full relative items-center justify-center py-[5%] px-4 md:px-10 lg:px-0">
        <div className="my-6">
          <img src={logo} alt="logo-image" />
        </div>
        <div className="max-xl:min-w-[45%] min-w-[35%] w-full max-w-[585px] bg-white shadow-lg rounded-lg py-[3%] px-[5%]">
          <h1 className="lg:text-[32px] text-center text-zinc-900 mb-1 font-medium sm:text-[30px] text-[25px] dark:text-white leading-[38px]">
            Welcome Back
          </h1>
          <p className="text-center text-lg mb-6 font-medium">
            Login to continue
          </p>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
              <div>
                <div>
                  <div className="grid gap-6">
                    <AutoInput
                      label="Email address"
                      name="email"
                      placeholder="Email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      }}
                    />
                    <div>
                      <LockedPasswordInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        togglePassword={false}
                        onTogglePassword={() => {}}
                        rules={{ required: "Password is required" }}
                        extraLabel={
                          <Link
                            className="text-primary font-cabin"
                            to="/forgot-password"
                          >
                            Forgot password
                          </Link>
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      width="w-full"
                      disabled={isLoading}
                      onClick={() => {}}
                    >
                      {isLoading ? "Loading" : "Sign In"}
                      {isLoading ? (
                        <TbLoader3 size={20} className="animate-spin" />
                      ) : (
                        <FaArrowRightLong className="group-hover:translate-x-1.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="my-6 text-center flex flex-col w-full justify-center  items-center space-y-6">
            <div className="flex items-center mt-1 w-full">
              <hr className="border-t-2  w-[30%] border-zinc-300" />
              <span className="mx-2 text-base text-center rounded-md py-1 px-2 text-zinc-400">
                or continue with
              </span>
              <hr className="border-t-2  w-[30%] border-zinc-300" />
            </div>
            <div className="flex w-full max-sm:gap-3 max-sm:px-1.5 items-center justify-center gap-5">
              <button
                className="bg-transparent flex items-center justify-center gap-3 rounded-full hover:border-primary border border-slate-300 w-[200px] py-2 px-8"
                onClick={() => {
                  signinWithGoogle();
                }}
                disabled={isLoading}
              >
                <FcGoogle size={20} />
                {isLoading ? "Signing in..." : "Google"}
              </button>

              <button
                className="bg-transparent flex items-center justify-center gap-3 rounded-full border border-slate-300 hover:border-primary w-[200px] py-2 px-8"
                onClick={() => {}}
                disabled={isLoading}
              >
                <BsLinkedin className="text-primary" size={20} />
                {isLoading ? "Signing in..." : "Linkedin"}
              </button>
            </div>

            <p className="text-center text-zinc-800 mt-4 dark:text-slate-100">
              Don't have an account?{" "}
              <span>
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:opacity-95"
                >
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
