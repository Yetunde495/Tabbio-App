import axios from "axios";


export const registerUser = async (data: any) => {
  const response: any = await axios
    .post(`/auth/signup`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.statusText;
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};

export const signInUser = async (data: any) => {
  const response: any = await axios
    .post(`/user/login`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.statusText;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const sendOtp = async () => {
  const response: any = await axios
    .post(`/auth/send-otp`)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
export const verifyEmailOtp = async (data: any) => {
  const response: any = await axios
    .post(`/user/complete_email_verification`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.error || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const uploadPhoto = async (data: any) => {
    const response: any = await axios
      .post(`/upload/pfp`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response.data;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
  };