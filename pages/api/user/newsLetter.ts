import type { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "@handlers";

interface Response {
  success: boolean;
  data: string;
  sendedTo: string;
  errorMessage: string | null;
}

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    if (!req?.body?.email) {
      throw new Error("Email not existed");
    }

    const { email } = req.body;

    await sendMail({ type: "newsletter", email });

    res.status(200).json({
      data: "subscribed",
      success: true,
      sendedTo: email,
      errorMessage: null,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      data: null,
      success: false,
      sendedTo: null,
      errorMessage: err?.message,
    });
  }
}

export const cofig = {
  api: {
    externalResolver: true,
  },
};
