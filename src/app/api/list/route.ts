"use server";

import { Storage } from "@google-cloud/storage";
import { format } from "date-fns";
import { NextResponse } from "next/server";

const GCP_PROJECT_ID = "icco-cloud";
const GCP_BUCKET_NAME = "icco-cloud";

export const GET = async (req: Request) => {
  try {

    const filePath = `/photos/${format(new Date(), "yyyy")}/`;

    const storage = new Storage({
      projectId: `${GCP_PROJECT_ID}`,
    });
    const bucket = storage.bucket(`${GCP_BUCKET_NAME}`);

    const files = await bucket.getFiles({ prefix: filePath });
    const photos = files[0].map((file) => `https://icco.imgix.net${file.name}`);

    return new NextResponse(JSON.stringify({ photos }));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};