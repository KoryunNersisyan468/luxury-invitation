import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 5000;

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const appConfig = {
  port,
  env: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  // Absolute base URL for building publicly reachable asset links (e.g. locally stored uploads).
  serverUrl: process.env.SERVER_URL || `http://localhost:${port}`,
  // Directory where uploads are written when Cloudinary is not configured.
  uploadDir: process.env.UPLOAD_DIR || path.resolve(__dirname, "../uploads"),
  jwtSecret: process.env.JWT_SECRET || "super_secret_key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  cloudinary: {
    ...cloudinaryConfig,
    enabled: Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.apiSecret),
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM || "Belle Âme <no-reply@belleame.com>",
    enabled: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  },
  passwordReset: {
    // Minutes a reset link stays valid.
    ttlMinutes: Number(process.env.PASSWORD_RESET_TTL_MINUTES || 60),
  },
};
