import multer from "multer";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { handleImageUpload, listUploadedImages, deleteUploadedImage } from "../services/uploadService.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadMiddleware = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "files", maxCount: 10 },
]);

export const uploadImage = asyncHandler(async (req, res) => {
  const files = [
    ...(req.files?.file || []),
    ...(req.files?.files || []),
  ];

  if (!files.length) {
    return res.status(400).json({ status: "fail", message: "No file uploaded" });
  }

  const uploads = await Promise.all(files.map((file) => handleImageUpload(file, req.user?.id)));
  res.status(201).json({
    status: "success",
    data: uploads.length === 1 ? uploads[0] : uploads,
  });
});

export const listImages = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const result = await listUploadedImages({ page, limit });
  res.json({ status: "success", meta: result.meta, data: result.data });
});

export const deleteImage = asyncHandler(async (req, res) => {
  await deleteUploadedImage(req.params.id);
  res.status(204).send();
});
