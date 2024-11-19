const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    instagramUrl: {
        type: String,
        required: true,
    },
    movieUrl: {
        type: [String],
        required: true,
    },
    coverImgUrl: {
        type: String,
        required: true,
    },
    movieName: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = model("Movies", movieSchema);
