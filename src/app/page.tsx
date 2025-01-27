"use client";

import { useRef, useState } from "react";

import { RecentPhotoList } from "@/components/RecentPhotoList";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  function SuccessModal(): React.JSX.Element {
    function close(): void {
      setSuccessModalOpen(false);
    }

    return (
      <div
        role="alert"
        className="alert alert-success w-full my-4 flex justify-between"
        onClick={close}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Upload Successful!</span>
      </div>
    );
  }

  function FailModal(): React.JSX.Element {
    function close(): void {
      setFailModalOpen(false);
    }

    return (
      <div
        role="alert"
        className="alert alert-error w-full my-4 flex justify-between"
        onClick={close}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Upload Failed.</span>
      </div>
    );
  }

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
      {successModalOpen && <SuccessModal />}
      {failModalOpen && <FailModal />}

      <form className="flex flex-col gap-4">
        <input
          className="file-input file-input-bordered w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file"
          type="file"
          name="file"
          multiple={true}
          ref={fileInput}
        />
        <div className="flex-row">
          <button
            className="btn btn-primary w-1/5 flex-1"
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
