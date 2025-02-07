import { useState } from "react";
import { Icons } from "../../components/icons";
import { useApp } from "../../context/AppContext";
import Button from "../../components/Button";
import PhoneInput from "react-phone-number-input";
import ProfilePicture from "../PageComponents/ProfilePhoto";
import { toast } from "react-toastify";
import { ChangePassword, deleteUser, updateUserData } from "../../services/authServices";
import Delete from "../../components/modal/Delete";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, updateUser, signOut } = useApp();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedIn?.url || "");
  const [error, setError] = useState('');
  const [basicInfo, setBasicInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    image: user?.image || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateUser = async (data: any) => {
    setLoading(true);
    try {
      const resp = await updateUserData(user?._id, data);
      updateUser({
        ...user,
        ...resp?.data?.user,
      });
      toast.success("Update Successful!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setDeleteLoading(true);
    try {
      await deleteUser(user?._id);
      signOut()
      toast.success("Account deleted Successful!");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleChangePassword = async () => {
    setPasswordLoading(true);
    try {
      await ChangePassword(passwordData);
      toast.success("Password Changed Successful!");
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  const isValidLinkedInUrl = (url: string): boolean => {
    const linkedInRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-_%]+\/?$/;
    return linkedInRegex.test(url);
  };
  return (
    <section>
      <div className="py-6 sm:px-4 md:px-6">
        {/* //personal details? */}
        <div className="py-10 px-5 bg-white shadow-sm rounded-lg mt-10">
          <div className="flex justify-between items-center mb-10">
            <p className="font-medium text-lg font-sans">Profile</p>
            <div className="">
              <Button
                size="sm"
                disabled={loading}
                onClick={() => {
                  handleUpdateUser(basicInfo);
                }}
              >
                {loading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex max-sm:flex-col gap-y-4 justify-center items-center gap-x-8">
              <div>
                <ProfilePicture
                  name={basicInfo?.firstName + " " + basicInfo?.lastName}
                  photo={basicInfo?.image}
                  onSuccess={(url) => {
                    setBasicInfo((data) => ({
                      ...data,
                      iamge: url,
                    }));
                  }}
                />
              </div>
              <div className="w-full font-sans">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={basicInfo?.firstName}
                        onChange={(e) =>
                          setBasicInfo((data) => ({
                            ...data,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="First name"
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium leading-6"
                      onClick={() => console.log(basicInfo)}
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={basicInfo?.lastName}
                        onChange={(e) =>
                          setBasicInfo((data) => ({
                            ...data,
                            lastName: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        pattern="/^\S+@\S+$/i"
                        value={basicInfo?.email}
                        onChange={(e) =>
                          setBasicInfo((data) => ({
                            ...data,
                            email: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <PhoneInput
                        international
                        defaultCountry="US"
                        placeholder="Enter phone number"
                        value={basicInfo?.phone}
                        onChange={(val) => {
                          setBasicInfo((data: any) => ({
                            ...data,
                            phone: val,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //password change? */}
        <div className="pt-10 pb-14 px-5 shadow-sm bg-white rounded-lg font-sans mt-10">
          <div className="flex max-sm:flex-col sm:justify-between gap-y-2.5 sm:items-center mb-10">
            <div>
              <p className="font-medium text-lg">Change Password</p>
              <p className="text-sm">
                Minimum 8 Characters, Including one Number, 0ne Special
                Characters
              </p>
            </div>

            <Button
              size="sm"
              onClick={handleChangePassword}
              disabled={passwordLoading}
            >
              {passwordLoading ? "Loading..." : "Confirm and change"}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 md:col-span-2">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium leading-6 "
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  placeholder="Enter current password"
                  value={passwordData?.oldPassword}
                  onChange={(e) =>
                    setPasswordData((data) => ({
                      ...data,
                      oldPassword: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 md:col-span-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 "
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="text"
                  placeholder="Enter new password"
                  value={passwordData?.newPassword}
                  onChange={(e) =>
                    setPasswordData((data) => ({
                      ...data,
                      newPassword: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 md:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  placeholder="Enter new password again to confirm"
                  value={passwordData?.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((data) => ({
                      ...data,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="block w-full rounded-md border border-[#D4D4D4] px-2 py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* other settings */}
        <div className="py-10 px-5 bg-white rounded-lg mt-10 font-sans shadow-sm">
          <div className="mb-5">
            <p className="font-medium text-lg ">Other Settings</p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6"
              >
                Language
              </label>
              <div className="mt-2">
                <select
                  id="language"
                  name="language"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option disabled>
                    {!user?.language
                      ? "English"
                      : user?.language === "es"
                      ? "Spanish"
                      : user?.language === "it"
                      ? "Italian"
                      : "English"}
                  </option>
                  <option value={"en"}>English</option>
                  <option value={"es"}>Spanish</option>
                  <option value={"it"}>Italian</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="notifications"
                className="block text-sm font-medium leading-6"
              >
                Notifications
              </label>
              <div className="mt-2">
                <select
                  id="notifications"
                  name="notifications"
                  onChange={(e) => {
                    handleUpdateUser({
                      notifications: e.target.value === "On" ? true : false,
                    });
                  }}
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option disabled>{user?.notifications ? "On" : "Off"}</option>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </div>
            </div>
          </div>

          <div className="py-10 bg-white rounded-xl mt-10 linkedin-cont">
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
              <div className="flex justify-between max-sm:flex-col sm:items-center  col-span-full">
                <div className="flex items-center gap-1">
                  <Icons.linkedIn className="text-primary" />
                  <p className="font-bold">LinkedIn</p>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-sm">Toggle to link/unlink Linkedin Profile</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="switch"
                      type="checkbox"
                      className="peer sr-only"
                      value={user?.linkedIn?.isLinked}
                      disabled={linkedinUrl}
                      onChange={() => {
                        handleUpdateUser({
                          linkedIn: {
                            url: linkedinUrl,
                            isLinked: user?.linkedIn?.isLinked ? false : true,
                          },
                        });
                      }}
                    />
                    <label htmlFor="switch" className="">
                      
                    </label>
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>
              <div className="col-span-full mb-5">
                <div className="mt-2">
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="href"
                    value={linkedinUrl}
                    onChange={(e) => {
                      setLinkedinUrl(e.target.value);

                      if (!isValidLinkedInUrl(e.target.value)) {
                        setError("Invalid LinkedIn profile URL");
                      } else {
                        setError("");
                      }
                    }}
                    autoComplete="link"
                    placeholder="Enter your Linkedin Url"
                    className="block w-full rounded-md border focus:border-primary focus:outline-primary border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                  />
                  <p className="text-xs mt-1 text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-10">
            <button
              onClick={() => {
                setDeleteModal(true);
              }}
              className="border border-red-600 px-4 py-2 hover:bg-red-600 hover:text-white text-red-600 rounded-md font-medium font-sans"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Delete
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        onProceed={() => {handleDeleteUser()}}
        isLoading={deleteLoading}
        isLoadingText="Deleting Account..."
        title="Delete Account?"
        desc="Are you sure you want to delete your Tabbio account? This action is irreversible"
        size="w-[90%] max-w-[450px]"
      ></Delete>
    </section>
  );
};

export default Settings;
