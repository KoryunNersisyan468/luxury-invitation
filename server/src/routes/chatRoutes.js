import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createChatRoom,
  getChatRoom,
  sendMessage,
  getChatRooms,
  addParticipant,
} from "../controllers/chatController.js";

const router = Router();

// All chat routes require authentication
router.use(protect);

router.post("/", createChatRoom);
router.get("/", getChatRooms);
router.get("/:id", getChatRoom);
router.post("/:chatRoomId/messages", sendMessage);
router.post("/:chatRoomId/participants", addParticipant);

export default router;
