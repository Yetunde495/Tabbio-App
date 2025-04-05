import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import { deleteNotificationAsync, ReadAllNotificationAsync, ReadNotificationAsync } from "../notificationServices";


export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (ids: Array<string>) =>  Promise.all(ids.map((id) => deleteNotificationAsync(id))),
      {
        onSuccess: () => {
          // Reload all the notifications data
          queryClient.invalidateQueries(["ALL_USER_NOTIFICATIONS"]);
          queryClient.invalidateQueries(["USER_NOTIFICATIONS"]);
  
          // Notify on success
          toast(
            <Notification variant="success" title="Notification Deleted!">
              The notification has been deleted
            </Notification>,
            {
              type: "success",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_DELETED",
            }
          );
        },
        onError: (err: any) => {
          // Notify on error
          toast(
            <Notification variant="error" title="Deletion Failed!">
              {err.message}
            </Notification>,
            {
              type: "error",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_DELETE_ERROR",
            }
          );
        },
      }
    );
  }

 
  
  
  export const useReadNotification = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      ({notificationId, payload }: any) => ReadNotificationAsync(notificationId, payload),
      {
        onSuccess: () => {
          //Reload the table data
          queryClient.invalidateQueries(["ALL_USER_NOTIFICATIONS"]);
          queryClient.invalidateQueries(["USER_NOTIFICATIONS"]);
  
          //notify on success
          toast(
            <Notification variant="success" title="Read!">
              This notification has been mark as read
            </Notification>,
            {
              type: "success",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_READ",
            }
          );
        },
        onError: (err: any) => {
          // notify on error
          toast(
            <Notification variant="error" title="Request Failed!">
              {err.message}
            </Notification>,
            {
              type: "error",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_READ_ERROR",
            }
          );
        },
      }
    );
  };

  export const useReadAllNotification = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      ({payload }: any) => ReadAllNotificationAsync(payload),
      {
        onSuccess: () => {
          //Reload the table data
          queryClient.invalidateQueries(["ALL_USER_NOTIFICATIONS"]);
          queryClient.invalidateQueries(["USER_NOTIFICATIONS"]);
  
          //notify on success
          toast(
            <Notification variant="success" title="Read!">
              All your notifications has been mark as read
            </Notification>,
            {
              type: "success",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_READ",
            }
          );
        },
        onError: (err: any) => {
          // notify on error
          toast(
            <Notification variant="error" title="Request Failed!">
              {err.message}
            </Notification>,
            {
              type: "error",
              hideProgressBar: true,
              toastId: Date.now() + "@NOTIFICATION_READ_ERROR",
            }
          );
        },
      }
    );
  };