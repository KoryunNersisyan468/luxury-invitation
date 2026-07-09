import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import { appConfig } from "./config/index.js";
import authRoutes from "./routes/authRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { languageMiddleware } from "./middleware/language.js";
import { translate } from "./i18n/index.js";

const app = express();

// Allow images (e.g. locally stored uploads) to be embedded by the client on another origin.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = new Set([
  appConfig.clientUrl,
  "http://localhost:5173",
  "http://localhost:3000",
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser requests and any explicitly allowed origin.
      // Outside production we reflect the origin to keep local development frictionless.
      if (!origin || allowedOrigins.has(origin) || appConfig.env !== "production") {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Serve locally stored uploads. Placed before the rate limiter so images are never throttled.
app.use("/uploads", express.static(appConfig.uploadDir));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(xss());
app.use(morgan(appConfig.env === "production" ? "combined" : "dev"));

// Resolve request language before routing so every handler can localize.
app.use(languageMiddleware);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ status: "fail", message: translate("error.rateLimit", req.language) }),
});

app.use(limiter);

app.use(["/auth", "/api/auth"], authRoutes);
app.use(["/invitations", "/api/invitations"], invitationRoutes);
app.use(["/rsvp", "/api/rsvp"], rsvpRoutes);
app.use(["/upload", "/api/upload"], uploadRoutes);
app.use(["/chat", "/api/chat"], chatRoutes);
app.use(["/", "/api"], contentRoutes);
app.use(["/admin", "/api/admin"], adminRoutes);

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use(errorHandler);

export default app;
