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
