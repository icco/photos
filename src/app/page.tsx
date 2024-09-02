"use client"

import { useState } from "react";

export default function Home() {
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);

  const uploadphoto = async () => {
    if (!photoBlob) {
      throw new Error("No photo to upload");
    }

    // Prepare FormData
    let formData = new FormData();
    const timestamp = Date.now();

    // Append the photo blob to the FormData object. You might want to give it a filename.
    formData.append("photo", photoBlob, `${timestamp}.webm`);

    // Setup the fetch request options
    const requestOptions: RequestInit = {
      method: "POST",
      body: formData,
    };

    // Send the request to your API endpoint
    try {
      const response = await fetch("/api/upload", requestOptions);
      if (!response.ok) throw new Error("Failed to upload");
      const data = await response.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div className="photo-container">
      <form id="uploadForm">
        <input type="file" id="fileInput" multiple />
        <button type="button" onClick={uploadphoto}>
          Upload
        </button>
      </form>
    </div>
  );
}
