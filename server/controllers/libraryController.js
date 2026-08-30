import UserGames from "../models/UserGames.js";

export const addGameToLibrary = async (req, res) => {
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
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getLibrary = async (req, res) => {
  try {
    const library = await UserGames.find({ user: req.user.id });
    res.json(library);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateGameStatus = async (req, res) => {
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

export const removeGame = async (req, res) => {
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
  getLibrary,
  updateGameStatus,
  removeGame,
};
