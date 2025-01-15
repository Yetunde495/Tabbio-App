import {useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/brand/logo-1.svg";
import { useEffect, useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { useApp } from "../../context/AppContext";
import { MdCancel } from "react-icons/md";
import Button from "../../components/Button";
import { TbLoader3 } from "react-icons/tb";
import { toast } from "react-toastify";

const GoogleCallback: React.FC = () => {
  const { status } = useParams();
  const { user, signIn } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status === "error") {
      setError(true);
    } else {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userFromUrl = params.get("user");

      if (userFromUrl) {
        try {
          // Decode the URL-encoded user data and parse it as JSON
          const decodedUser = decodeURIComponent(userFromUrl);
          const parsedUser = JSON.parse(decodedUser);
          signIn({
            ...parsedUser,
            token: token,
          });
          setError(false);
        } catch (error: any) {
          console.error("Failed to parse user data:", error);
          toast.error(
            error?.message || "Failed to load your data! Please, try again"
          );
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    }
  }, [status]);

  return (
    <section className="w-full min-h-screen">
      <section className="flex flex-col w-full h-full relative items-center justify-center py-[5%] px-4 md:px-10 lg:px-0">
        <div className="my-6">
          <img src={logo} alt="logo-image" />
        </div>

        <div className="max-xl:min-w-[45%] min-w-[35%] w-full max-w-[585px] bg-white shadow-lg rounded-lg py-[3%] px-[5%]">
          <h1 className="lg:text-[32px] hidden text-center text-zinc-900 mb-6 font-medium sm:text-[30px] text-[25px] dark:text-white leading-[38px]">
            Google Auth
          </h1>
          <div className="min-w-full py-6">
            {error && (
              <div className="lg:min-w-[420px]">
                <div className="mb-5 text-center flex flex-col gap-5 w-full justify-center  items-center">
                  <div className=" text-red-500 rounded-full">
                    <MdCancel size={60} />
                  </div>
                  <h1 className="lg:text-3xl text-zinc-800 font-semibold text-center mb-3 sm:text-[30px] text-[25px] dark:text-white leading-[40px]">
                    Failed to Load up your data
                  </h1>
                </div>

                <div className="w-full flex justify-center items-center">
                  <Button
                    type="submit"
                    width="w-[80%]"
                    height="14"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            )}
            <div>
              {loading ? (
                <div className="lg:min-w-[420px]">
                  <div className="mb-5 text-center flex flex-col gap-5 w-full justify-center  items-center">
                    <div className=" text-primary rounded-full">
                      <TbLoader3
                        size={100}
                        className="animate-spin text-primary"
                      />
                    </div>
                    <div>
                      <h1 className="lg:text-3xl font-semibold text-center font-nunito mb-1 sm:text-[30px] text-[25px] dark:text-white leading-[40px]">
                        Loading up your data
                      </h1>
                      <p className="text-stone-500 text-center">
                        Please, wait while we load up your data
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                !error && (
                  <section>
                    <div className="lg:min-w-[420px]">
                      <div className="mb-5 text-center flex flex-col gap-5 w-full justify-center  items-center">
                        <div className=" text-success rounded-full">
                          <GoCheckCircleFill size={60} />
                        </div>
                        <h1 className="lg:text-3xl font-semibold text-zinc-800 mb-3 sm:text-[30px] text-[25px] dark:text-white leading-[40px]">
                          Welcome Back, {user?.firstName || "User"}!
                        </h1>
                      </div>

                      <div className="w-full flex justify-center items-center">
                        <Button
                          type="submit"
                          width="w-[80%]"
                          height="14"
                          onClick={() => {
                            navigate("/app/candidate/profile");
                          }}
                        >
                          Go to Dashbord
                        </Button>
                      </div>
                    </div>
                  </section>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default GoogleCallback;
