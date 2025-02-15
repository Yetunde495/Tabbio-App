import { useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar2";
import getUserInitials from "../../lib/utils/getUserInitials";
import { AiFillCamera } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import { uploadFile } from "../../services/authServices";

const ProfilePicture: React.FC<{ photo: string; name: string, onSuccess: (url:string) => void }> = ({
  photo,
  name,
  onSuccess
}) => {
  // const { id } = useParams();
  const { user } = useApp();
  const [imgUrl, setImgUrl] = useState<string>(photo || "");

  const [editForm, setEditForm] = useState(false);
  const [isLoading, _setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    const input = (hiddenFileInput.current as HTMLInputElement) || null;
    if (input) {
      input.click();
    }
  };

  const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target) {
      if (target.files?.length) {
        const file = target.files[0];
        setImgUrl(URL.createObjectURL(file) || "");
        const id = toast.loading("Uploading your image, please wait...");

        try {
          setLoading(true);

          const formData = new FormData();
          formData.append("file", file);
          setLoading(true);
          const resp = await uploadFile(formData);
          toast.update(id, {
            render: "Your image was successfully uploaded",
            type: "success",
            isLoading: false,
            closeButton: true,
            autoClose: 3000,
          });
          setImgUrl(resp?.data?.url || "");
          onSuccess(resp?.data?.url || "");
          setEditForm(false);
          setDropdownOpen(false)
        } catch (err: any) {
          // TODO: Handle the response data according to your needs
          toast.error(err?.message || "Request Failed");
          toast.dismiss(id)
          setImgUrl("");
          // TODO: Handle errors appropriately
        } finally {
          setLoading(false);
          
        }
      }
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (trigger.current && trigger.current.contains(target)) {
        // Handle trigger click
        return;
      }
      if (dropdown.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      if (trigger.current) {
        document.removeEventListener("click", clickHandler);
      }
    };
  }, [setDropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-xl">
        {isLoading ? null : (
          <div>
            {!editForm && user !== null ? (
              <div className="flex items-center gap-3 pb-2 pt-6">
                <div className="relative">
                  <div>
                    <Avatar
                      size="xl"
                      src={photo}
                      initials={getUserInitials(name, "")}
                    />
                    <button
                      ref={trigger}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="absolute -bottom-1 right-1 flex items-center rounded-full bg-[#cfd3da] p-2 text-black"
                    >
                      <AiFillCamera />{" "}
                    </button>
                  </div>

                  {/* <!-- Dropdown start --> */}
                  <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                    className={`absolute z-9999  mt-3 flex w-50  flex-col rounded-lg border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark ${
                      dropdownOpen === true ? "block" : "hidden"
                    }`}
                  >
                    <ul className="flex flex-col border-b border-stroke p-2 dark:border-strokedark">
                      <li>
                        <button
                          onClick={() => setEditForm(true)}
                          className="flex w-full items-center gap-3.5 p-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                          Edit Profile Picture
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setImgUrl("");
                            onSuccess("");
                            setDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-3.5 p-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                        >
                          Remove Photo
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Dropdown End --> */}
                </div>
              </div>
            ) : (
              <div className="relative py-3 w-full">
                <div>
                  <button
                    className="absolute -right-4 text-zinc-400 hover:text-zinc-500"
                    onClick={() => setEditForm(false)}
                  >
                    <BsXCircleFill size={18} />
                  </button>
                </div>
                <div className=" mb-6 flex flex-col items-center gap-4">
                  <div className="cursor-pointer">
                    <Avatar
                      size="xl"
                      initials={getUserInitials(name, "")}
                      src={imgUrl === "" ? undefined : imgUrl}
                    />
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={photoUpload}
                  />
                  <button
                    className="rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-medium hover:bg-primary hover:text-white"
                    onClick={handleClick}
                  >
                    {loading ? "Uploading" : "Choose Photo"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
