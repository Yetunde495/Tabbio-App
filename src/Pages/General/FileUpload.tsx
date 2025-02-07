import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { BsFillTrash3Fill } from "react-icons/bs";
import { cn } from "../../lib/utils";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { uploadFile } from "../../services/authServices";



export const MultipleFileUpload = ({
    onChange,
    onSuccess,
    acceptedFiles,
    maxWidth,
    maxFiles=1,
    children,
  }: {
    onChange?: (files: File[]) => void;
    onSuccess: (url: string, fileType: any) => void;
    acceptedFiles?: string[];
    supportedFormat?: string;
    maxWidth?: string;
    maxFiles?: number
    children?: React.ReactNode;
  }) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    // Handles adding files, respecting the maxFiles limit
    const handleFileChange = async (newFiles: File[]) => {
      if (files.length + newFiles.length > maxFiles) {
        return; // Prevent adding more files than the allowed maxFiles
      }
  
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
  
      // Return the updated files list
    };
  
    const onProceed = async () => {
      try {
        setLoading(true);
        setLoading(true);
  
        const formData = new FormData();
        formData.append("file", files[0]);
  
        setLoading(true);
        const id = toast.loading("Uploading your file, please wait...");
        const resp = await uploadFile(formData);
        toast.update(id, {
          render: "Your file was successfully uploaded",
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: 3000,
        });
        onSuccess(resp?.data?.url || "", files[0].type);
      } catch (err: any) {
        toast.error(err?.message || "Request Failed");
      } finally {
        setLoading(false);
      }
    };
  
    // Handles file deletion
    const handleDelete = (index: number) => {
      const updatedFiles = files.filter((_, idx) => idx !== index);
      setFiles(updatedFiles);
      onChange && onChange(updatedFiles); // Return the updated files list
    };
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const { getRootProps } = useDropzone({
      multiple: true,
      noClick: true,
      onDrop: handleFileChange,
      onDropRejected: (error) => {
        console.log(error);
      },
      accept: acceptedFiles
        ? Object.fromEntries(acceptedFiles.map((type) => [type, []])) // Create object from array
        : undefined,
    });
  
    return (
      <div
        className="w-full flex justify-center items-center"
        {...getRootProps()}
      >
        <motion.div
          onClick={() => {
            if(loading) {
              return;
            } else {
              handleClick()
            }
          }}
          whileHover="animate"
          className={`group/file block ${
            maxWidth ? maxWidth : "max-w-[800px]"
          } cursor-pointer w-full relative overflow-hidden`}
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            accept={acceptedFiles ? acceptedFiles.join(",") : undefined}
            multiple
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <div>
            {files.length < 1 ? (
              <div className="w-full relative">
                
                {children}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center relative">
                <div className="mt-6 max-w-xl w-full mx-auto">
                  {/* File List */}
                  {files.length > 0 &&
                    files.map((file, idx) => (
                      <motion.div
                        key={"file" + idx}
                        layoutId={
                          idx === 0 ? "file-upload" : "file-upload-" + idx
                        }
                        className={cn(
                          "relative overflow-hidden border-t border-stroke/60 z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 my-4 w-full mx-auto rounded-md",
                          "shadow-lg"
                        )}
                      >
                        <div className="flex justify-between w-full items-center gap-4">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                          >
                            {file.name}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="rounded-lg px-2 py-1 w-fit flex-shrink-0 space-x-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                          >
                            <span>
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(idx);
                              }}
                              className="text-danger hover:text-red-500 cursor-pointer"
                            >
                              <BsFillTrash3Fill className="w-4 h-4 -mb-[3px]" />
                            </button>
                          </motion.div>
                        </div>
  
                        <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                          >
                            {file.type}
                          </motion.p>
  
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                          >
                            modified{" "}
                            {new Date(file.lastModified).toLocaleDateString()}
                          </motion.p>
                        </div>
                      </motion.div>
                    ))}
                  {/* Placeholder Upload Area */}
                </div>
  
                <Button
                  rounded
                  size="lg"
                  disabled={loading}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onProceed();
                  }}
                >
                  {loading ? "Loading..." : "Proceed"}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };