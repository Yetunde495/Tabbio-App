import axios from "axios";


export const ParseResumeCV = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/parse_resume`, data, {
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

  
  export const generateExperienceData = async (data: any) => {
    const response: any = await axios
      .post(`/profile/experience_assistant`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const generateResumeSkills = async (data: any) => {
    const response: any = await axios
      .post(`/resumes/skills_autocomplete`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  
  export const generateAreasOfExpertise = async (data: any) => {
    const response: any = await axios
      .post(`/resumes/area_of_expertise_autocomplete`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };
  export const createResume = async (data:any) => {
    const response: any = await axios
      .post(`/resumes/`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  export const updateResume = async (id: string | undefined, data:any) => {
    const response: any = await axios
      .patch(`/resumes/${id}`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };
  export const analyzeResume = async (data: any, id?: string | undefined) => {
    const response: any = await axios
      .post(`/resumes/analyze_resume?resumeId=${id}`, data)
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg || response?.error?.message);
    }
    return response?.data;
  };

  