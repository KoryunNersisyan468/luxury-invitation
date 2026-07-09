import nodemailer from "nodemailer";
import { appConfig } from "../config/index.js";
import { translate } from "../i18n/index.js";

let cachedTransporter = null;

const getTransporter = () => {
  if (!appConfig.smtp.enabled) return null;
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: appConfig.smtp.host,
    port: appConfig.smtp.port,
    secure: appConfig.smtp.secure,
    auth: { user: appConfig.smtp.user, pass: appConfig.smtp.pass },
  });
  return cachedTransporter;
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]),
  );

const renderPasswordResetEmail = ({ resetUrl, lang, ttlMinutes }) => {
  const t = (key, params) => translate(key, lang, params);
  const safeUrl = escapeHtml(resetUrl);

  const text = [
    t("email.reset.greeting"),
    "",
    t("email.reset.body", { minutes: ttlMinutes }),
    "",
    resetUrl,
    "",
    t("email.reset.ignore"),
    "",
    t("email.reset.footer"),
  ].join("\n");

  const html = `
  <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:32px;color:#1f2937;background:#faf9f6;border-radius:16px;border:1px solid #e7e2d6">
    <p style="font-size:16px;margin:0 0 16px">${t("email.reset.greeting")}</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px">${t("email.reset.body", { minutes: ttlMinutes })}</p>
    <p style="text-align:center;margin:0 0 24px">
      <a href="${safeUrl}" style="display:inline-block;background:#4a6741;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:9999px;font-size:15px;letter-spacing:0.03em">${t("email.reset.button")}</a>
    </p>
    <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0 0 8px">${t("email.reset.ignore")}</p>
    <p style="font-size:12px;color:#9ca3af;word-break:break-all;margin:0 0 24px">${safeUrl}</p>
    <hr style="border:none;border-top:1px solid #e7e2d6;margin:0 0 16px" />
    <p style="font-size:12px;color:#9ca3af;margin:0">${t("email.reset.footer")}</p>
  </div>`;

  return { subject: t("email.reset.subject"), text, html };
};

/**
 * Send a password-reset email. When SMTP is not configured (dev), the reset
 * URL is logged to the server console so the flow is fully testable offline.
 */
export const sendPasswordResetEmail = async ({ to, resetUrl, lang }) => {
  const ttlMinutes = appConfig.passwordReset.ttlMinutes;
  const { subject, text, html } = renderPasswordResetEmail({ resetUrl, lang, ttlMinutes });

  const transporter = getTransporter();
  if (!transporter) {
    // eslint-disable-next-line no-console
    console.info(
      `\n[email:dev] SMTP not configured — password reset link for ${to}:\n${resetUrl}\n`,
    );
    return { delivered: false, preview: resetUrl };
  }

  await transporter.sendMail({ from: appConfig.smtp.from, to, subject, text, html });
  return { delivered: true };
};
