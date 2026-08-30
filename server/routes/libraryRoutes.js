const express = require("express");

const {
  addGameToLibrary,
  getLibrary,
  updateGameStatus,
  removeGame,
} = require("../controllers/libraryController");

const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getLibrary);

router.post("/", addGameToLibrary);

router.put("/:id", updateGameStatus);

router.delete("/:id", removeGame);

module.exports = router;
