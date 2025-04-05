import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { BsCloudUpload, BsFillTrash3Fill } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { cn } from "../../lib/utils";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { FiUpload } from "react-icons/fi";
import { ParseCV } from "../../services/profileServices";
import { uploadFile } from "../../services/authServices";
import { ParseResumeCV } from "../../services/resumeServices";
import { FaCircle, FaCloudArrowUp, FaUpload } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 0,
    y: -10,
    opacity: 0.9,
  },
};

const getFileType = (mimeType: string) => {
  const mimeMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/webp": "WEBP",
  };

  return mimeMap[mimeType] || "Unknown File Type";
};

export const UploadResume = ({
  onChange,
  acceptedFiles,
  maxWidth,
  onSuccess,
}: {
  onChange?: (files: File[]) => void;
  acceptedFiles?: string[];
  supportedFormat?: string;
  maxWidth?: string;
  onSuccess?: (response: any) => void;
}) => {
  const {} = useApp();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = async (newFiles: File[]) => {
    if (files.length + newFiles.length > 1) {
      return; // Prevent adding more files than the allowed maxFiles
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    // Return the updated files list
  };

  const onProceed = async () => {
    const formData = new FormData();
    formData.append("document", files[0]);
    const id = toast.loading("Processing your document, please wait...");
    try {
      setLoading(true);
      const resp = await ParseCV(formData);
      toast.update(id, {
        render: "Your Resume was successfully processed",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      onSuccess && onSuccess(resp);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
      toast.dismiss(id);
      setFiles([]);
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

  const { getRootProps, isDragActive } = useDropzone({
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
        onClick={handleClick}
        whileHover="animate"
        className={`px-10 py-6 group/file block rounded-3xl ${
          maxWidth ? maxWidth : "max-w-[800px]"
        }  shadow-md bg-white border-2 border-spacing-10 min-h-[250px] border-stroke border-dashed cursor-pointer w-full relative overflow-hidden`}
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
            <div className="flex flex-col items-center justify-center relative">
              {files.length < 1 && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 flex items-center justify-center mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    ""
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col text-center items-center"
                    >
                      Drop it
                      <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <span className="px-3 py-3 rounded-full flex justify-center items-center bg-slate-200">
                      <BsCloudUpload size={32} />
                    </span>
                  )}
                </motion.div>
              )}
              <p className="font-bold text-neutral-700 text-center text-lg pt-4">
                Drop your existing resume here
              </p>

              <p className="text-neutral-500 text-center pt-2 text-lg">
                or click to select from device (PDF, DOC, DOCX)
              </p>
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
                            className="text-danger hover:text-red-500"
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
                // rounded
                size="lg"
                disabled={loading}
                onClick={(e: any) => {
                  e.stopPropagation();
                  onProceed();
                }}
              >
                {loading ? "Processing" : "Proceed"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const FileUpload = ({
  onChange,
  onSuccess,
  acceptedFiles,
  maxWidth,
  children,
}: {
  onChange?: (files: File[]) => void;
  onSuccess: (url: string, fileType: any) => void;
  acceptedFiles?: string[];
  supportedFormat?: string;
  maxWidth?: string;
  children?: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = async (newFiles: File[]) => {
    if (files.length + newFiles.length > 1) {
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

  const { getRootProps, isDragActive } = useDropzone({
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
          if (loading) {
            return;
          } else {
            handleClick();
          }
        }}
        whileHover="animate"
        className={`px-10 py-6 group/file block rounded-3xl ${
          maxWidth ? maxWidth : "max-w-[800px]"
        }  shadow-sm bg-white border min-h-[250px] border-stroke border-dashed cursor-pointer w-full relative overflow-hidden`}
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
            <div className="flex flex-col items-center justify-center relative">
              {files.length < 1 && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 flex items-center justify-center mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    ""
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col text-center items-center"
                    >
                      Drop it
                      <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <span className="px-3 py-3 rounded-xl text-zinc-400 flex justify-center items-center bg-zinc-100">
                      <FiUpload size={30} />
                    </span>
                  )}
                </motion.div>
              )}
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
                            className="text-danger hover:text-red-500"
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

export const ResumeUpload = ({
  onChange,
  acceptedFiles,
  maxWidth,
  onSuccess,
}: {
  onChange?: (files: File[]) => void;
  acceptedFiles?: string[];
  supportedFormat?: string;
  maxWidth?: string;
  onSuccess?: (response: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = async (newFiles: File[]) => {
    if (files.length + newFiles.length > 1) {
      return; // Prevent adding more files than the allowed maxFiles
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    // Return the updated files list
  };

  const onProceed = async () => {
    const formData = new FormData();
    formData.append("document", files[0]);
    try {
      setLoading(true);
      const id = toast.loading("Processing your resume, please wait...");
      const resp = await ParseCV(formData);
      toast.update(id, {
        render: "Your Resume was successfully processed",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      onSuccess && onSuccess(resp);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
      setFiles([]);
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

  const { getRootProps, isDragActive } = useDropzone({
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
        onClick={handleClick}
        whileHover="animate"
        className={`px-10 py-6 group/file block rounded-lg ${
          loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${
          maxWidth ? maxWidth : "max-w-[800px]"
        }  shadow-sm bg-white flex flex-col justify-center border-2 min-h-[170px] border-stroke border-dashed w-full relative overflow-hidden`}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={acceptedFiles ? acceptedFiles.join(",") : undefined}
          multiple
          disabled={loading}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div>
          {files.length < 1 ? (
            <div className="flex flex-col items-center justify-center relative">
              {files.length < 1 && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 flex items-center justify-center mt-4 w-full mx-auto rounded-md",
                    ""
                  )}
                >
                  {isDragActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col text-center items-center"
                    >
                      Drop it
                      <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  )}
                </motion.div>
              )}
              <button className="font-semibold mb-3 flex items-center justify-center gap-2.5 text-white bg-primary rounded-lg hover:scale-105 duration-150 py-2.5 px-6 text-center max-sm:px-3 max-sm:py-1.5">
                <FaUpload fontWeight={600} /> Select from Device
              </button>

              <p className="text-neutral-500 text-center pt-2">
                Supported Format: PDF, DOC, DOCX
              </p>
              <p className="text-neutral-500 text-center pt-2">Up to 10MB</p>
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
                            className="text-danger hover:text-red-500"
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
                size="lg"
                disabled={loading}
                onClick={(e: any) => {
                  e.stopPropagation();
                  onProceed();
                }}
              >
                {loading ? "Processing" : "Proceed"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const ResumeFileUpload = ({
  onChange,
  acceptedFiles,
  maxWidth,
  onSuccess,
}: {
  onChange?: (files: File[]) => void;
  acceptedFiles?: string[];
  supportedFormat?: string;
  maxWidth?: string;
  onSuccess?: (response: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = async (newFiles: File[]) => {
    if (files.length + newFiles.length > 1) {
      return; // Prevent adding more files than the allowed maxFiles
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    // Return the updated files list
  };

  const onProceed = async () => {
    const formData = new FormData();
    formData.append("document", files[0]);
    try {
      setLoading(true);
      const id = toast.loading("Processing your resume, please wait...");
      const resp = await ParseResumeCV(formData);
      toast.update(id, {
        render: "Your Resume was successfully processed",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });
      onSuccess && onSuccess(resp);
    } catch (err: any) {
      toast.error(err?.message || "Request Failed");
      setFiles([]);
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

  const { getRootProps, isDragActive } = useDropzone({
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
          if (loading) {
            return;
          } else {
            handleClick();
          }
        }}
        whileHover="animate"
        className={`px-10 py-6 group/file block rounded-2xl ${
          loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${
          maxWidth && maxWidth
        }  shadow-sm bg-white border min-h-[200px] border-stroke border-dashed  w-full relative overflow-hidden`}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={acceptedFiles ? acceptedFiles.join(",") : undefined}
          multiple
          disabled={loading}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div>
          {files.length < 1 ? (
            <div className="flex flex-col items-center justify-center relative">
              {files.length < 1 && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 flex items-center justify-center mt-4 w-full mx-auto rounded-md",
                    ""
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col text-center items-center"
                    >
                      Drop it
                      <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <span className="px-3 py-3 rounded-full text-black flex justify-center items-center bg-[#F3F4F6]">
                      <FaCloudArrowUp size={30} />
                    </span>
                  )}
                </motion.div>
              )}
              <p className="font-semibold text-black text-center text-base pt-4">
                Drag & drop your resume here
              </p>

              <p className="text-neutral-500 text-center text-sm">
                or click to browse your files
              </p>

              <div className="flex gap-5 text-xs text-neutral-500 items-center justify-center w-full mt-3">
                <p className="flex items-center gap-1">
                  <span>
                    <IoDocumentTextOutline />
                  </span>
                  PDF, DOC, DOCX
                </p>

                <span>
                  <FaCircle size={4} className="rounded-full" />
                </span>
                <p className="flex items-center gap-1">
                  <span>
                    <FiUpload />
                  </span>
                  Up to 10MB
                </p>
              </div>
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
                        "relative overflow-hidden border-t border-stroke/60 z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start  p-4 my-4 w-full mx-auto rounded-md",
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
                            className="text-danger hover:text-red-500"
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
                          File Type: {getFileType(file.type)}
                        </motion.p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                        >
                          Last modified:{" "}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                {/* Placeholder Upload Area */}
              </div>

              <Button
                size="lg"
                disabled={loading}
                onClick={(e: any) => {
                  e.stopPropagation();
                  onProceed();
                }}
              >
                {loading ? "Processing" : "Proceed"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const SelectFileBox = ({
  onChange,
  acceptedFiles,
  maxWidth,
  children,
}: {
  onChange?: (files: File[]) => void;
  acceptedFiles?: string[];
  supportedFormat?: string;
  maxWidth?: string;
  children?: React.ReactNode;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = async (newFiles: File[]) => {
    if (files.length + newFiles.length > 1) {
      return; // Prevent adding more files than the allowed maxFiles
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    onChange && onChange(updatedFiles);
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

  const { getRootProps, isDragActive } = useDropzone({
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
          handleClick();
        }}
        whileHover="animate"
        className={`px-10 py-6 group/file block rounded-xl ${
          maxWidth ? maxWidth : "max-w-[800px]"
        }  shadow-sm bg-white border min-h-[250px] border-stroke border-dashed cursor-pointer w-full relative overflow-hidden`}
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
            <div className="flex flex-col items-center justify-center relative">
              {files.length < 1 && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative z-40 flex items-center justify-center mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    ""
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col text-center items-center"
                    >
                      Drop it
                      <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <span className="px-3 py-3 rounded-full text-black flex justify-center items-center bg-[#F3F4F6]">
                      <FaCloudArrowUp size={30} />
                    </span>
                  )}
                </motion.div>
              )}
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
                            className="text-danger hover:text-red-500"
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
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
