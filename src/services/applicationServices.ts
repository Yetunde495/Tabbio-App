import axios from "axios";

export const getUserApplications = async ({ queryKey }: any) => {
  let url = `/resumes/applications?search=${queryKey[1]}`;
  let queryOptions = "";

  // page
  if (queryKey[2]) {
    queryOptions += `&page=${queryKey[2]}`;
  }

  //items per page
  if (queryKey[3]) {
    queryOptions += `&limit=${queryKey[3]}`;
  }

  //status
  if (queryKey[4]) {
    queryOptions += `&status=${queryKey[4]}`;
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

export const getSingleApplication = async (id: string) => {
  const response: any = await axios
    .get(`/resumes/applications/${id}`)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const generateApplication = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/generate_application_package`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};
export const generateCoverLetter = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/generate_cover_letter`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const generateCompanyIntelligence = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/generate_company_description`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const generateInterviewTips = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/generate_interview_tips`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const saveCoverLetter = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/save_cover_letter`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const saveCompanyIntelligence = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/save_company_description`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};

export const saveInterviewTips = async (data: any) => {
  const response: any = await axios
    .post(`/resumes/save_interview_tips`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || response?.error?.message);
  }
  return response?.data;
};
export const updateApplication = async (id: string | undefined, data: any) => {
  const response: any = await axios
    .patch(`/resumes/applications/${id}`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const deleteApplication = async (id: string | undefined) => {
  const response: any = await axios
    .delete(`/resumes/applications/${id}`)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
