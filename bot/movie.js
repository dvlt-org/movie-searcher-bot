const Movie = require("../model/Movies");
const MovieCallback = require("../callback/Movie")

module.exports = (bot) => {
    bot.on("message", async (message) => {
        if (message?.entities && message.entities[0]?.type === "url") {
            try {
                const findMovie = await Movie.findOne({ instagramUrl: message.text });

                if (findMovie) {
                    bot.sendPhoto(message.chat.id, findMovie.coverImgUrl, {
                        caption: findMovie.movieName,
                        reply_markup: {
                            inline_keyboard: [  // Bu yerda inline_keyboard ishlatiladi
                                [
                                    {
                                        text: "Online ko'rish",
                                        url: `https://asilmedia.org`
                                    }
                                ],
                                [
                                    {
                                        text: "Yuklab olish",
                                        callback_data: `download_movie_${findMovie._id}`  // Bo'sh joylardan saqlaning
                                    }
                                ]
                            ]
                        }
                    });
                    MovieCallback(bot);
                } else {
                    bot.sendMessage(message.chat.id, "Kino topilmadi !");
                }
            } catch (error) {
                console.error(error);  // Xatolarni konsolga chiqarish
                bot.sendMessage(message.chat.id, "Nimadur xato ketdi!");
            }
        } else {
            bot.sendMessage(message.chat.id, "Xech narsa topilmadi !");
        }
    });
}

