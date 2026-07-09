import { v2 as cloudinary } from "cloudinary";
import { appConfig } from "../config/index.js";

cloudinary.config({
  cloud_name: appConfig.cloudinary.cloudName,
  api_key: appConfig.cloudinary.apiKey,
  api_secret: appConfig.cloudinary.apiSecret,
  secure: true,
});

export const isCloudinaryConfigured = () => appConfig.cloudinary.enabled;

export const uploadToCloudinary = async (buffer, folder = "invites") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};
