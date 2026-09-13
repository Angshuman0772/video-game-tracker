const UserGames = require("../models/UserGames");
const mongoose = require("mongoose");

const addGameToLibrary = async (req, res) => {
  try {
    const { gameId, gameName, gameImage, status } = req.body;

    const game = await UserGames.create({
      user: req.user.id,
      gameId,
      gameName,
      gameImage,
      status,
    });

    res.status(201).json(game);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Game is already in your library",
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

const getLibraryStats = async (req, res) => {
  try {
    const [totalGames, statusCounts, completedGames] = await Promise.all([
      UserGames.countDocuments({ user: req.user.id }),
      UserGames.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      UserGames.countDocuments({ user: req.user.id, status: "completed" }),
    ]);

    const byStatus = statusCounts.reduce((counts, entry) => {
      counts[entry._id] = entry.count;
      return counts;
    }, {});

    res.json({
      totalGames,
      completedGames,
      byStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLibrary = async (req, res) => {
  try {
    const library = await UserGames.find({ user: req.user.id });
    res.json(library);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateGameStatus = async (req, res) => {
  try {
    const game = await UserGames.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    game.status = req.body.status;

    await game.save();

    res.json(game);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeGame = async (req, res) => {
  try {
    const game = await UserGames.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await game.deleteOne();

    res.json({
      message: "Game removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addGameToLibrary,
  getLibraryStats,
  getLibrary,
  updateGameStatus,
  removeGame,
};
