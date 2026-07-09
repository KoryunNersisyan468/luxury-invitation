import dotenv from "dotenv";
import app from "./src/app.js";
import { appConfig } from "./src/config/index.js";

dotenv.config();

const server = app.listen(appConfig.port, () => {
  console.log(`Server running in ${appConfig.env} mode on port ${appConfig.port}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.info("SIGTERM received. Shutting down gracefully.");
  server.close(() => process.exit(0));
});
