import { useState } from "react";
import Modal from "../../components/modal";
import { FormProvider, useForm } from "react-hook-form";
import { AutoInput } from "../../components/form/customInput";
import { Textarea } from "../../components/form";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { MultipleFileUpload } from "./FileUpload";
import { MdOutlineFileUpload } from "react-icons/md";


const ContactForm: React.FC<{ show: boolean; setShow: () => void }> = ({
  show,
  setShow,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<any>();
  const [_files, setFiles] = useState<File[]>([]);
  // const [loading, setLoading] = useState(false);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFiles([...files, ...Array.from(e.target.files)]);
  //   }
  // };

  // const handleFileRemove = (index: number) => {
  //   setFiles(files.filter((_, i) => i !== index));
  // };

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
      setShow();
    } catch (err: any) {
      toast.error(err.message || "An error occured! Please, try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={setShow}
        size=""
        title={
          <div>
            <h3 className="font-semibold max-sm:text-lg text-xl mb-0">
              Contact Support
            </h3>
            <p className="mb-3 max-sm:text-sm">
              Fill the form below to submit an enquiry or complaint
            </p>
          </div>
        }
      >
        <section className="pr-2 2xl:max-h-full overflow-y-auto no-scrollbar">
          <div className="md:pl-6">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="">
                <div>
                  <div>
                    <div className="grid gap-7 h-[60vh] overflow-y-auto no-scrollbar">
                      <AutoInput
                        label="Full Name"
                        name="full_name"
                        isRequired
                        placeholder="Enter a preferred username"
                        rules={{
                          required: "Full name is required",
                        }}
                      />

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

                      <div className="mb-4">
                       <MultipleFileUpload
                        maxFiles={3}
                        onSuccess={() => {setFiles([])}}
                       >
                        <label
                          htmlFor="files"
                          className="block text-black mb-2"
                        >
                          Attach Files
                        </label>
                        <div className="w-full bg-primary/10 shadow rounded-lg py-4 px-5">
                        
                          <p className="sm:text-lg mb-2 text-base text-primary flex items-center gap-2 text-center"><MdOutlineFileUpload /> Click to select from Device</p>
                          <p className="text-zinc-500 font-medium text-center">Up to 10mb</p>
                        </div>
                       </MultipleFileUpload>
                      </div>

                     

                      <Textarea
                        name="description"
                        isRequired
                        placeholder="Enter more details about your issue/inquiry"
                        label="Description"
                        rules={{ required: "This field is required" }}
                      />
                    </div>

                    <div className="mt-10">
                      <Button
                        type="submit"
                        width="w-full"
                        disabled={isLoading}
                        onClick={() => {}}
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default ContactForm;
