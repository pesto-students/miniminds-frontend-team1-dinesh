import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, verifyLink, parentmail } = req.body;

  if (!name || !verifyLink || !parentmail) {
    return res.send({ status: false });
  }
  const message = {
    sender: {
      email: "info@artistzones.com",
      name: "Miniminds",
    },
    subject: `${name}, verification mail`,
    templateId: 5,
    params: {
      FIRSTNAME: name,
      LASTNAME: verifyLink,
    },
    messageVersions: [
      {
        to: [
          {
            email: parentmail.toString(),
            name: name,
          },
        ],
      },
    ],
  };
  await axios
    .post("https://api.sendinblue.com/v3/smtp/email", message, {
      headers: {
        "content-type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_SENDBLUE_API,
        accept: "application/json",
      },
    })
    .then((resp) => {
      console.log("sendgrid sebt");
      res.send({ status: true });
    })
    .catch((err) => {
      console.log("error", err);
      res.send({ status: false });
    });
}
