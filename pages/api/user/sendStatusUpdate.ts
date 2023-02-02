import type { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "@handlers";

import NextCors from "nextjs-cors";

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
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (
      !req?.body?.email ||
      !req?.body?.status ||
      !req?.body?.name ||
      !req.body?.orderno
    ) {
      throw new Error("Fields not existed");
    }

    const { email, status, name, orderno } = req.body;

    await sendMail({ type: "orderStatus", email, status, name, orderno });

    res.status(200).json({
      data: "link",
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
