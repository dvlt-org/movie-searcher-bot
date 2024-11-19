const Movie = require("../model/Movies");

module.exports = (bot) => {
    bot.on('callback_query', async (callbackQuery) => {  // callbackQuery deb nomlanadi
        try {
            const movie_id = callbackQuery.data.split("_")[2]; // callbackQuery.data ishlatiladi
            console.log(movie_id);
            const findMovie = await Movie.findById(movie_id);

            if (findMovie) {
                bot.sendMessage(callbackQuery.message.chat.id, "Formatni tanlang !", {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "480 📻",
                                    url: findMovie.movieUrl[0]
                                }
                            ],
                            [
                                {
                                    text: "720 📻",
                                    url: findMovie.movieUrl[1]
                                },
                            ],
                            [
                                {
                                    text: "1080 📻",
                                    url: findMovie.movieUrl[2]
                                }
                            ]
                        ]
                    }
                });
            } else {
                bot.sendMessage(callbackQuery.message.chat.id, "Nimadur xato !");
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(callbackQuery.message.chat.id, "Xatolik yuz berdi!");
        }
    });
};
