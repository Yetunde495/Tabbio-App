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

  export const getProfileAnalytics = async ({ queryKey }: any) => {
    let url = `/profile/profile_performance`;
    let queryOptions = "";
  
    // page
    if (queryKey[1]) {
      queryOptions += `?page=${queryKey[1]}`;
    }
  
    //items per page
    if (queryKey[2]) {
      queryOptions += `&limit=${queryKey[2]}`;
    }
  
    //startDate
    if (queryKey[3]) {
      queryOptions += `&date[gte]=${queryKey[3]}`;
    }
  
    //endDate
    if (queryKey[4]) {
      queryOptions += `&date[lte]=${queryKey[4]}`;
    }

    
    url += queryOptions;
    const response: any = await axios.get(`${url}`).catch((e) => ({ error: e }));

    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const saveProfileActions = async (data: any) => {
    const response: any = await axios
      .post(`/profile/track_profile_action`, data)
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

  export const generateProfileSummary = async (data: any) => {
    const response: any = await axios
      .post(`/profile/assist/summary`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };