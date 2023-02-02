import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";

interface props {
  success: boolean;
}

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse<props>
) {
  try {
    if (!req?.body?.email) throw new Error("Email not define");
    if (!req?.body?.password) throw new Error("Email not define");

    const { email, password } = req?.body;

    if (admin.apps.length) {
      const user = await admin.auth(admin.app()).getUserByEmail(email);

      await admin.auth(admin.app()).updateUser(user.uid, {
        password,
      });

      res.status(200).json({ success: true });

      return;
    }

    admin.initializeApp({
      //@ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });

    const user = await admin.auth(admin.app()).getUserByEmail(email);

    await admin.auth(admin.app()).updateUser(user.uid, {
      password,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}
