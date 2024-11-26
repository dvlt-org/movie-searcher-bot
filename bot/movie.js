const { find, upload } = require("../controllers/Movie")


module.exports = (bot) => {
    bot.on("message", async (message) => {
        find(message, bot);
        upload(message, bot)
    });
}

