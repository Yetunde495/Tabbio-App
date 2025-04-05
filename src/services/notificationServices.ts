import axios from "axios";

export const fetchUserNotifications = async ({ queryKey }: any) => {
  let url = `/notifications?page=${queryKey[1]}`;
  let queryOptions = "";

  // page
  if (queryKey[2]) {
    queryOptions += `&limit=${queryKey[2]}`;
  }

  //status
  if (queryKey[3]) {
    queryOptions += `&read=${queryKey[3]}`;
  }
  url += queryOptions;
  const response: any = await axios.get(`${url}`).catch((e) => ({ error: e }));

  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg || "Request Failed");
  }

  return response?.data;
};

export const deleteNotificationAsync = async (
  notificationId: string | undefined | null
) => {
  const response: any = await axios
    .delete(`/notification/${notificationId}`)
    .catch((e) => ({ error: e }));

  // check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.msg || err?.statusText;
    throw new Error(msg);
  }

  return response?.data?.data;
};


export const ReadNotificationAsync = async (
  notificationId: string | undefined | null,
  data: any
) => {
  const response: any = await axios
    .patch(`/notification/${notificationId}`, data)
    .catch((e) => ({ error: e }));

  // check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.msg || err?.statusText;
    throw new Error(msg);
  }

  return response?.data?.data;
};


export const ReadAllNotificationAsync = async (data:any) => {
  const response: any = await axios
    .post(`/notifications/all`, data)
    .catch((e) => ({ error: e }));

  // check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.msg || err?.statusText;
    throw new Error(msg);
  }

  return response?.data?.data;
};

