import axios from "axios";

export const ParseCV = async (data: any) => {
    const response: any = await axios
      .post(`/profile/process`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
  };

  export const SaveProfile = async (data: any) => {
    const response: any = await axios
      .post(`/profile`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const updateProfile = async (id:string, data: any) => {
    const response: any = await axios
      .patch(`/profile/${id}`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const getUserProfile = async () => {
    const response: any = await axios
      .get(`/profile/current_user`)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const getProfileById = async (id: string) => {
    const response: any = await axios
      .get(`/profile/${id}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const getProfileByTabbiolink = async (tabbioLink: string) => {
    const response: any = await axios
      .get(`/profile/user?tabbio_link=${tabbioLink}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };