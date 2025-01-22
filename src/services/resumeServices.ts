import axios from "axios";

export const getProfileResume = async (id: string | undefined) => {
    const response: any = await axios
      .get(`/resumes/profile/${id}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };