import type { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "@handlers";

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req?.body?.email || !req?.body?.name) {
      throw new Error("Email not existed");
    }

    const { email, name, orders, orderno, buyDate, total } = req.body;


    await sendMail({
      type: "order",
      email,
      name,
      orderno: orderno,
      buyDate: buyDate,
      data: orders,
      total: total,
    });

    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ data: null, success: false, sendedTo: null });
  }
}
