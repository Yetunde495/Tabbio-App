import axios from "axios";


export const registerUser = async (data: any) => {
  const response: any = await axios
    .post(`/auth/signup`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const signInUser = async (data: any) => {
  const response: any = await axios
    .post(`/auth/login`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};
export const updateUserData = async (id:string | undefined, data: any) => {
  const response: any = await axios
    .patch(`/users/${id}`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};
export const GoogleAuth = async () => {
  const response: any = await axios
    .get(`/auth/google`)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const getUserData = async () => {
  const response: any = await axios
    .get(`users/user_data`)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
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
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};

export const sendResetOtp = async (data:any) => {
  const response: any = await axios
    .post(`/auth/forgot-password`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};
export const verifyEmailOtp = async (data: any) => {
  const response: any = await axios
    .post(`/auth/verify-otp`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.error || err?.status;
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};

export const ResetPassword = async (data:any) => {
  const response: any = await axios
    .post(`/auth/reset-password`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};

export const ChangePassword = async (data:any) => {
  const response: any = await axios
    .post(`/auth/change_password`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }

  return response?.data;
};

export const uploadFile = async (data: any) => {
    const response: any = await axios
      .post(`/profile/upload_file`, data, {
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