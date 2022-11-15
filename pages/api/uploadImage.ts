import { NextApiRequest, NextApiResponse } from "next";
import client from "../../clients/imgur";

type Data = {
  imageURI: string;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method != "POST") {
    res.status(405).json({ body: "Method Not Allowed" });
    return;
  }

  const { imageToUpload } = req.body;

  const data = await client.upload(imageToUpload);

  res.status(200).json({ imageURI: data.data.link });
}
