import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

const GCP_PROJECT_ID = "icco-cloud";
const GCP_BUCKET_NAME = "icco-cloud";

export const POST = async (req: Request, res: Response) => {
  try {
   const data = await req.formData();
   const file = data.get("photo") as File;
 
   const filePath = `/${DateTime.now().year}/${randomUUID()}`
 
   const storage = new Storage({
    projectId: `${GCP_PROJECT_ID}`,
   });
   const bucket = storage.bucket(`${GCP_BUCKET_NAME}`);
 
   const bytes = await file.arrayBuffer();
   const buffer = Buffer.from(bytes);
 
   // Wrap the upload logic in a promise
   await new Promise((resolve, reject) => {
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
     resumable: false,
    });
 
    blobStream
     .on("error", (err) => reject(err))
     .on("finish", () => resolve(true));
 
    blobStream.end(buffer);
   });
 
   return new NextResponse(JSON.stringify({ success: true }));
  } catch (error) {
   return new NextResponse(JSON.stringify(error), { status: 500 });
  }
 };