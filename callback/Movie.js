const movieCallback = require("../controllers/MovieCallback")

module.exports = (bot) => {
    bot.on('callback_query', async (callbackQuery) => {
        try {
            // callbackQuery.data formatini tekshirish
            movieCallback(callbackQuery, bot)
        } catch (error) {
            console.error(error);
            bot.sendMessage(callbackQuery.message.chat.id, "Xatolik yuz berdi!");
        }
    });
};
