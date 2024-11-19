const Movie = require("../model/Movies");

module.exports = (bot) => {
    bot.on('callback_query', async (callbackQuery) => {
        try {
            // callbackQuery.data formatini tekshirish
            const movie_id = callbackQuery.data.split("_")[2]; // data formatini tekshirib chiqing
            console.log(movie_id);

            // Filmni bazadan olish
            const findMovie = await Movie.findById(movie_id);

            if (findMovie) {
                const updatedKeyboard = {
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
                };
                // Inline keyboardni yangilash (reply_markup ni yangilash)
                await bot.editMessageMedia({
                    type: 'photo',  // Bu rasm
                    media: findMovie.coverImgUrl,  // Rasm URL
                    caption: "Formatni tanlang!"  // Yangi caption
                }, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: updatedKeyboard  // Inline tugmalarni yangilash
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
