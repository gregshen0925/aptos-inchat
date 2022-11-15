import { NextApiRequest, NextApiResponse } from "next";

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

  // res.status(200).json({ message: newMessage });
}
