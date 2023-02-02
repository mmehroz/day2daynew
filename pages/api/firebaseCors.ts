import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import serviceAccount from "./user/serviceAccount.json";

export default async function FirebaseCors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (admin.apps.length) {
      const response = await admin
        .storage(admin.app())
        .bucket("day2day-25451.appspot.com")
        .setCorsConfiguration([
          {
            method: ["POST", "GET", "DELETE"],
            origin: ["*"],
          },
        ]);

      // console.log(response);

      res.status(200).json({ success: true });
      return;
    }

    admin.initializeApp({
      //@ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });

    const response = await admin
      .storage(admin.app())
      .bucket("day2day-25451.appspot.com")
      .setCorsConfiguration([
        {
          method: ["POST", "GET", "DELETE"],
          origin: ["*"],
        },
      ]);

    // console.log(response);

    res.status(200).json({ success: true });
  } catch (err) {
    // console.log(err);
    res.send(500);
  }
}
