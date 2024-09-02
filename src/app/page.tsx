"use client"

import { useState } from "react";

export default function AudioRecorder() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  // ...app code omitted

  const uploadAudio = async () => {
    if (!audioBlob) {
      throw new Error("No audio to upload");
    }

    // Prepare FormData
    let formData = new FormData();
    const timestamp = Date.now();

    // Append the audio blob to the FormData object. You might want to give it a filename.
    formData.append("audio", audioBlob, `${timestamp}.webm`);

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
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="audio-container">
      <form id="uploadForm">
        <input type="file" id="fileInput" multiple />
        <button type="button" onClick={uploadAudio}>
          Upload
        </button>
      </form>
    </div>
  );
}
