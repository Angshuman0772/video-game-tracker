import express from "express";

import {
  addGameToLibrary,
  getLibrary,
  updateGameStatus,
  removeGame,
} from "../controllers/libraryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getLibrary);

router.post("/", addGameToLibrary);

router.put("/:id", updateGameStatus);

router.delete("/:id", removeGame);

export default router;
