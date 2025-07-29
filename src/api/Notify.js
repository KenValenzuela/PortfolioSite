// Serverless e‑mail relay (Vercel)
// Env vars required:  SENDGRID_API_KEY  +  NOTIFY_EMAIL

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;
  const msg = {
    to: process.env.NOTIFY_EMAIL,
    from: process.env.NOTIFY_EMAIL,
    subject: `New booking from ${data.name}`,
    text: JSON.stringify(data, null, 2),
  };

  try {
    await sgMail.send(msg);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
