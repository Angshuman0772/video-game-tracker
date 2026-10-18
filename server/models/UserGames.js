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

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    rating: {
      type: Number,
      min: 0.5,
      max: 5,
      validate: {
        validator: (rating) => Number.isInteger(rating * 2),
        message: "Rating must use 0.5-star increments",
      },
      default: undefined,
    },

    review: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
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
