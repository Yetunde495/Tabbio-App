import Layout from "../../layout/LandingLayout";
import Breadcrumb from "../../components/BreadCrumb";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { FormGroup, Textarea } from "../../components/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AutoInput } from "../../components/form/customInput";
import { toast } from "react-toastify";
import GoogleMapReact from "google-map-react";
import { IoLocation, IoLocationOutline } from "react-icons/io5";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

const LocationPin = ({ text }: any) => (
  <div className="pin flex items-center w-[180px] text-red-600 hover:cursor-pointer">
    <IoLocation className="text-[6rem]" />
    <p className="pin-text rounded-xl text-sm font-medium p-2.5 text-zinc-600 bg-slate-50">
      {text}
    </p>
  </div>
);

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<any>();

  const onSubmit = async (_data: any) => {
    const { errors } = methods.formState;
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      //   await createSupportTicket(data);
      toast.success(
        "Successful! A support ticket has been created for you. We'll send you a response as soon as possible"
      );
      methods.reset();
    } catch (err: any) {
      toast.error(err.message || "An error occured! Please, try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <section className="bg-gradient-to-b from-transparent to-white">
        <div className="bg-white">
          <div className="2xl:px-[12rem] md:pt-8 pt-4 md:px-[4rem] px-4">
            <Breadcrumb
              homeRouteName="Home"
              homeRoute="/"
              pageName="Contact Us"
            />
          </div>
          <section className="p-8 bg-white  md:pt-6 md:pb-14 text grid grid-cols-1 gap-12 xl:max-w-7xl 2xl:max-w-full 2xl:px-[12rem] w-full mx-auto">
            <div className="text-center text-lg text-zinc-500">
              <h1 className="text-center lg:text-6xl sm:text-5xl font-bold text-4xl text-slate-900 tracking-tight">
                Get in Touch
              </h1>
              <p className="mb-2">
                We're here to help with any questions about our platform.
              </p>
            </div>
          </section>
        </div>
        <section className=" py-[5%] px-8 lg:px-[4rem] 2xl:px-[12rem]">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center w-full transition-all mx-auto duration-500 ease xs:gap-y-8 gap-x-6">
            <div className="shadow-lg hover:shadow-xl h-full bg-white  rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center items-center">
              <span className="rounded-md p-2.5 w-10 bg-gradient-to-tr from-[#3B82F61A] to-[#A855F71A] text-slate-900">
                <MdOutlineMail size={20} />
              </span>
              <h1 className="text-black dark:text-white font-semibold text-lg">
                Email Us
              </h1>
              <p className="text-zinc-500">support@tabbio.com</p>
            </div>
            <div className="shadow-lg hover:shadow-xl h-full bg-white rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center items-center">
              <span className="rounded-md p-2.5 w-10 bg-gradient-to-tr from-[#3B82F61A] to-[#A855F71A] text-slate-900">
                <BsChat size={20} />
              </span>
              <h1 className="text-black dark:text-white font-semibold text-lg">
                Live Chat
              </h1>
              <p className="text-zinc-500">Available 24/7</p>
            </div>
            <div className="shadow-lg hover:shadow-xl h-full bg-white rounded-xl w-full px-4 py-4 space-y-3 flex-col flex justify-center items-center">
              <span className="rounded-md p-2.5 w-10 bg-gradient-to-tr from-[#3B82F61A] to-[#A855F71A] text-slate-900">
                <MdOutlinePhone size={20} />
              </span>
              <h1 className="text-black dark:text-white font-semibold text-lg">
                Call Us
              </h1>
              <p className="text-zinc-500">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="bg-white my-16 p-8 rounded-lg shadow-2xl">
            <h1 className="text-2xl text-center font-bold text-slate-900 mb-4">
              Send Us a Message
            </h1>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="max-w-2xl mx-auto py-9"
              >
                <div>
                  <div>
                    <div className="grid gap-7">
                      <FormGroup>
                        <AutoInput
                          label="First Name"
                          name="first_name"
                          isRequired
                          placeholder="Enter your first name"
                          rules={{
                            required: "First name is required",
                          }}
                        />
                        <AutoInput
                          label="Last Name"
                          name="last_name"
                          isRequired
                          placeholder="Enter your last name"
                          rules={{
                            required: "Last name is required",
                          }}
                        />
                      </FormGroup>

                      <AutoInput
                        label="Email address"
                        name="email"
                        isRequired
                        placeholder="Email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                      />

                      <AutoInput
                        label="Subject"
                        name="subject"
                        placeholder="A short summary/headline of your issue"
                        rules={{
                          required: false,
                        }}
                      />

                      <Textarea
                        name="description"
                        isRequired
                        placeholder="Enter more details about your issue/inquiry"
                        label="Description"
                        rules={{ required: "This field is required" }}
                      />
                    </div>

                    <div className="mt-10 flex w-full justify-center items-center">
                      <button
                        type="submit"
                        className=" bg-gradient-to-b from-[#5272EA] to-[#394FC0] hover:from-[#394FC0] disabled:bg-opacity-45 hover:to-[#5272EA] text-white font-semibold text-sm py-3 px-5 rounded-md focus:outline-none transition-all duration-300 ease-in-out"
                        disabled={isLoading}
                        onClick={() => {}}
                      >
                        {isLoading ? "Loading..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="bg-white my-6 py-12 px-8 w-full">
            <h1 className="text-2xl text-center font-bold text-slate-900 mb-3">
              Visit Our Office
            </h1>
            <div className="mb-4 text-zinc-600 w-full flex items-center justify-center text-center gap-2">
              <IoLocationOutline size={18} className="mt-0.5" /> <p>123 Innovation
              Street, San Francisco, CA 94107</p> 
            </div>
            <div className="google-map md:h-[80vh] mt-14 h-[60vh] w-full">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCdggHD_wxDSYILdzqIyCV7-K4U4LXExeM",
                }}
                defaultCenter={location}
                defaultZoom={14}
              >
                <LocationPin
                  lat={location.lat}
                  lng={location.lng}
                  text={location.address}
                />
              </GoogleMapReact>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default ContactPage;
