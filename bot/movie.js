const { upload, find } = require("../controllers/Movie")


module.exports = (bot) => {
    bot.on("message", async (message) => {
        upload(message, bot)
        find(message, bot)
    });
}

