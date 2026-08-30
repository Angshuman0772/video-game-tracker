const mongoose = require("mongoose");

const userGamesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gameId: {
      type: Number,
      required: true,
    },

    gameName: {
      type: String,
      required: true,
    },

    gameImage: {
      type: String,
    },

    status: {
      type: String,
      enum: ["wishlist", "backlog", "playing", "completed", "dropped"],
      default: "wishlist",
    },

    rating: {
      type: Number,
      min: 1,
      max: 10,
    },

    hoursPlayed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

userGamesSchema.index({ user: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model("UserGames", userGamesSchema);
