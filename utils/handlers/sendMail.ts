import {
  registerHtml,
  resetPassword,
  orderStatusHtml,
  orderStatusUpdatedHtml,
  customMail,
  newsLetter,
} from "./templates";
import nodemailer from "nodemailer";

interface Props {
  type:
    | "verification"
    | "resetPassword"
    | "order"
    | "orderStatus"
    | "newsletter"
    | "sendEmails";
  email: string;
  link?: string;
  name?: string;
  orderno?: string;
  buyDate?: string;
  data?: Array<{ name: string; price: string; quantity: string }>;
  total?: string;
  status?: string;
  subject?: string;
  content?: string;
}

export default async function sendMail({
  type,
  email,
  link,
  name,
  orderno,
  buyDate,
  data,
  total,
  status,
  subject,
  content,
}: Props) {
  let transporter = nodemailer.createTransport({
    host: "services.day2daywholesale.com",
    port: 465,
    secure: true,
    auth: {
      user: "no-reply@services.day2daywholesale.com",
      pass: "2s7koS+0vy!D",
    },
  });

  if (type === "verification") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: "Welcome to Day2Day WholeSale",
      html: registerHtml({ link: link, name: name }),
    });
  }

  if (type === "resetPassword") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: "Reset Your Password Day2Day WholeSale",
      html: resetPassword({ link: link, email: email }),
    });
  }

  if (type === "order") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: "Thank You For Order Day2Day WholeSale",
      html: orderStatusHtml({
        name: name,
        orderno,
        buyDate,
        orders: data,
        total,
      }),
    });
  }

  if (type === "orderStatus") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: "Your Order Updated Day2Day WholeSale",
      html: orderStatusUpdatedHtml({
        name,
        status,
        orderno,
      }),
    });
  }

  if (type === "newsletter") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: "News Letter Day2Day WholeSale",
      html: newsLetter(),
    });
  }

  if (type === "sendEmails") {
    return await transporter.sendMail({
      from: "'Day2Day WholeSale' <no-reply@services.day2daywholesale.com>",
      to: email,
      subject: subject,
      html: customMail({ content }),
    });
  }
}

