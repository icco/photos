"use client";

import { useRef } from "react";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const formData = new FormData();
    const files = fileInput.current?.files;

    if (!files) {
      console.error("No files selected");
      return;
    }
    for (const file of files) {
      formData.append("photo", file);
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <form className="flex flex-col gap-4">
      <label>
        <span>Upload a file</span>
        <input type="file" name="file" ref={fileInput} />
      </label>
      <button type="submit" onClick={uploadFile}>
        Submit
      </button>
    </form>
  );
}
