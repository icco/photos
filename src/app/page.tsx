"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { useRef, useState } from "react";

import { RecentPhotoList } from "@/components/RecentPhotoList";

function SuccessModal({ onClose }: { onClose: () => void }): React.JSX.Element {
  return (
    <div
      role="alert"
      className="alert alert-success w-full my-4 flex justify-between"
      onClick={onClose}
    >
      <CircleCheck className="h-6 w-6 shrink-0" />
      <span>Upload Successful!</span>
    </div>
  );
}

function FailModal({ onClose }: { onClose: () => void }): React.JSX.Element {
  return (
    <div
      role="alert"
      className="alert alert-error w-full my-4 flex justify-between"
      onClick={onClose}
    >
      <CircleX className="h-6 w-6 shrink-0" />
      <span>Error! Upload Failed.</span>
    </div>
  );
}

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const formData = new FormData();
    const files = fileInput.current?.files;

    if (!files) {
      console.error("No files selected");
      setFailModalOpen(true);
      return;
    }

    if (files.length === 0) {
      console.error("No files selected");
      setFailModalOpen(true);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("photo", files[i]);
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccessModalOpen(true);
      setReload(!reload);
    } else {
      setFailModalOpen(true);
    }
    fileInput.current.value = "";
  }

  return (
    <div className="">
      <h1 className="mb-2 text-3xl font-bold sm:text-5xl">Photos</h1>
      <p className="mb-6">Upload, browse, and share your photos.</p>
      {successModalOpen && (
        <SuccessModal onClose={() => setSuccessModalOpen(false)} />
      )}
      {failModalOpen && <FailModal onClose={() => setFailModalOpen(false)} />}

      <form className="flex flex-col gap-4">
        <input
          className="file-input file-input-bordered w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-hidden dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file"
          type="file"
          name="file"
          multiple={true}
          ref={fileInput}
          aria-describedby="upload-help"
        />
        <p id="upload-help" className="text-sm opacity-75">
          JPEG, PNG, GIF, WebP, SVG, HEIC, or HEIF. Choose multiple photos to upload
          them together.
        </p>
        <div className="flex-row">
          <button
            className="btn btn-primary w-1/5 p-2"
            type="submit"
            onClick={uploadFile}
          >
            Submit
          </button>
        </div>
      </form>

      <div className="my-4">
        <RecentPhotoList reload={reload} />
      </div>
    </div>
  );
}
