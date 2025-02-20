import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import { deleteApplication, updateApplication } from "../applicationServices";

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, payload }: any) => updateApplication(id, payload), {
    onSuccess: () => {
      //Reload all the connector and connectors table data
      queryClient.invalidateQueries(["CANDIDATE_APPLICATIONS", ""]);

      //notify on success
      toast(
        <Notification variant="success" title="SUCCESSFULL!">
          This Application has been successfully updated
        </Notification>,
        {
          type: "success",
          hideProgressBar: true,
          toastId: Date.now() + "@APPLICATION_UPDATED",
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
          toastId: Date.now() + "@APPLICATION_UPDATE_ERROR",
        }
      );
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteApplication(id), {
    onSuccess: () => {
      // Reload all the courses data
      queryClient.invalidateQueries(["CANDIDATE_APPLICATIONS", ""]);

      // Notify on success
      toast(
        <Notification variant="success" title="Application Deleted!">
          The Application has been deleted
        </Notification>,
        {
          type: "success",
          hideProgressBar: true,
          toastId: Date.now() + "@APPLICATION_DELETED",
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
          toastId: Date.now() + "@DELETE_APPLICATION_ERROR",
        }
      );
    },
  });
};