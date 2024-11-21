const Movie = require("../model/Movies")
const dotenv = require("dotenv")
dotenv.config()

const findMovieFromDb = async (message, bot) => {
    if (message.text !== "/start" && message.text !== "/help" && !message.text.includes("/admin*")) {
        if (message.text) {
            try {
                const findMovie = await Movie.findOne({ instagramUrl: message.text.trim() });
                console.log(message.text.trim())
                console.log(findMovie)
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
                } else {
                    bot.sendMessage(message.chat.id, "Bu kino topilmadi")
                }
            } catch (error) {
                console.error(error);  // Xatolarni konsolga chiqarish
                bot.sendMessage(message.chat.id, "Nimadur xato ketdi!");
            }
        }
    }
}

module.exports = {
    upload: adminUploadMovie,
}
