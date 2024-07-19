"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (file: File[]) => void;
}

export function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} alt="upload image" width={1000} height={1000} className=" max-h-[400px] object-cover overflow-hidden" />
      ) : (
        <>
          <Image src={"/assets/icons/upload.svg"} width={40} height={40} alt="upload" className=" text-green-500" />
          <div className="file-upload_label">
            <p className=" text-14-regular">
              <span className=" text-green-500">Click to upload</span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
}
