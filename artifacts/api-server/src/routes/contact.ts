import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req, res) => {
  const { name, company, email, phone, vertical, message } = req.body as {
    name: string;
    company: string;
    email: string;
    phone?: string;
    vertical?: string;
    message: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Elixir Kartr <onboarding@resend.dev>",
      to: ["elixirkartr.strategy@zohomail.in"],
      replyTo: email,
      subject: `In-Person Consult Request — ${name}${company ? ` | ${company}` : ""}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d0d0f; color: #f0e8d8; padding: 40px;">
          <div style="border-bottom: 1px solid #c9a84c44; padding-bottom: 24px; margin-bottom: 32px;">
            <h1 style="color: #c9a84c; font-size: 24px; margin: 0; letter-spacing: 0.1em; font-weight: normal; text-transform: uppercase;">
              ELIXIR KARTR
            </h1>
            <p style="color: #c9a84c88; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 6px 0 0;">
              New Consult Request
            </p>
          </div>

          <h2 style="color: #f0e8d8; font-size: 20px; font-weight: normal; margin: 0 0 24px;">
            In-Person Consultation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; width: 130px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #f0e8d8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #f0e8d8;">${email}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #f0e8d8;">${company}</td>
            </tr>` : ""}
            ${phone ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #f0e8d8;">${phone}</td>
            </tr>` : ""}
            ${vertical ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Vertical</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #ffffff0d; color: #f0e8d8;">${vertical}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 32px; padding: 24px; background: #1a1a1e; border-left: 2px solid #c9a84c;">
            <p style="color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 12px;">Message</p>
            <p style="color: #f0e8d8cc; line-height: 1.8; margin: 0;">${message.replace(/\n/g, "<br/>")}</p>
          </div>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #ffffff0d; font-size: 11px; color: #ffffff33; letter-spacing: 0.1em;">
            Sent via elixirkartr.com consult form
          </div>
        </div>
      `,
    });

    if (error) {
      req.log.error({ error }, "Resend error");
      res.status(500).json({ error: "Failed to send message. Please try again." });
      return;
    }

    req.log.info({ id: data?.id }, "Consult request email sent");
    res.json({ success: true, id: data?.id });
  } catch (err) {
    req.log.error({ err }, "Unexpected error sending email");
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

export default router;
