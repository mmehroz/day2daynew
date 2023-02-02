import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";
import { sendMail } from "@handlers";

interface Response {
  success: boolean;
  data: string;
  sendedTo: string;
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

    if (admin.apps.length) {
      const link = await admin
        .auth(admin.app())
        .generatePasswordResetLink(email);

      await sendMail({ type: "resetPassword", email, link });

      res.status(200).json({ data: link, success: true, sendedTo: email });

      return;
    }

    admin.initializeApp({
      //@ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });

    const link = await admin.auth(admin.app()).generatePasswordResetLink(email);

    await sendMail({ type: "resetPassword", email, link });

    res.status(200).json({
      data: link,
      success: false,
      sendedTo: email,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ data: null, success: false, sendedTo: null });
  }
}
