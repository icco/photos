"use server";

import path from "path";

import { Storage } from "@google-cloud/storage";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { getTsid } from "tsid-ts";

const GCP_PROJECT_ID = "icco-cloud";
const GCP_BUCKET_NAME = "icco-cloud";

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const files = data.getAll("photo") as File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = path.extname(file.name).toLowerCase();
      const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      if (!allowedExtensions.includes(ext)) {
        console.log(`Skipping file ${file.name} - not an allowed image type`);
        continue;
      }

      const id = getTsid().toString();

      const filePath = `photos/${format(new Date(), "yyyy")}/${id}${ext}`;

      const storage = new Storage({
        projectId: `${GCP_PROJECT_ID}`,
      });
      const bucket = storage.bucket(`${GCP_BUCKET_NAME}`);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      console.log(
        "uploading file: %s (original name: %s)",
        filePath,
        file.name
      );

      await new Promise((resolve, reject) => {
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream
          .on("error", (err) => {
            console.error(err);
            reject(err);
          })
          .on("finish", () => resolve(true));

        blobStream.end(buffer);
      });
    }

    return new NextResponse(JSON.stringify({ success: true }));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
