import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { appConfig } from "../config/index.js";
import { deleteFromCloudinary, isCloudinaryConfigured, uploadToCloudinary } from "./cloudinaryService.js";
import { prisma } from "../db/prisma.js";
import { AppError } from "../utils/appError.js";

const MIME_EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
};

const LOCAL_FOLDER = "local";
const CLOUD_FOLDER = "luxury-wedding";

const saveLocally = async (file) => {
  await fs.mkdir(appConfig.uploadDir, { recursive: true });
  const filename = `${randomUUID()}${MIME_EXTENSIONS[file.mimetype] || ".img"}`;
  await fs.writeFile(path.join(appConfig.uploadDir, filename), file.buffer);

  return {
    secure_url: `${appConfig.serverUrl}/uploads/${filename}`,
    public_id: filename,
    width: null,
    height: null,
  };
};

export const handleImageUpload = async (file, userId) => {
  if (!file) {
    throw new AppError("No file provided", 400);
  }

  if (!file.mimetype?.startsWith("image/")) {
    throw new AppError("Only image uploads are allowed", 400);
  }

  // Use Cloudinary when it is fully configured, otherwise fall back to local disk
  // storage so uploads work out of the box in development.
  const useCloudinary = isCloudinaryConfigured();
  const result = useCloudinary
    ? await uploadToCloudinary(file.buffer, CLOUD_FOLDER)
    : await saveLocally(file);

  const uploaded = await prisma.uploadedImage.create({
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width ?? null,
      height: result.height ?? null,
      folder: useCloudinary ? CLOUD_FOLDER : LOCAL_FOLDER,
      createdBy: userId ?? null,
    },
  });

  return {
    id: uploaded.id,
    url: uploaded.url,
    publicId: uploaded.publicId,
    width: uploaded.width,
    height: uploaded.height,
  };
};

export const listUploadedImages = async ({ page = 1, limit = 50 } = {}) => {
  const [total, images] = await prisma.$transaction([
    prisma.uploadedImage.count(),
    prisma.uploadedImage.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
    data: images,
  };
};

export const deleteUploadedImage = async (id) => {
  const image = await prisma.uploadedImage.findUnique({ where: { id } });
  if (!image) {
    throw new AppError("Image not found", 404);
  }

  if (image.folder === LOCAL_FOLDER) {
    await fs.rm(path.join(appConfig.uploadDir, image.publicId), { force: true });
  } else if (image.publicId) {
    await deleteFromCloudinary(image.publicId);
  }

  return prisma.uploadedImage.delete({ where: { id } });
};
