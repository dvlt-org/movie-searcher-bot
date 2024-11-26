const Movie = require("../model/Movies")
const getUrls = require("../config/getUrls")

const findMovieFromDb = async (message, bot) => {
    if (message.text !== "/start" && message.text !== "/help" && !message.text.includes("/admin")) {
        if (message.text) {
            try {
                const findMovie = await Movie.findOne({ movieId: message.text.trim() });
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
                bot.sendMessage(message.chat.id, "Nimadur xato ketdi!");
            }
        }
    }
}


const uploadMovie = async (message, bot) => {
    try {
        if (message.text.includes("/admin")) {
            const splitText = message.text.split("*")
            if (splitText.length >= 2) {
                const urls = await getUrls(splitText[2])
                console.log("urls ", urls)
                if (urls.length > 3) {
                    try {
                        const newMovie = await Movie.create({
                            movieId: splitText[1],
                            movieUrl: urls.slice(0, 3),
                            coverImgUrl: urls[3],
                            movieName: urls[4],
                        })
                        console.log(newMovie)
                        bot.sendMessage(message.chat.id, `Yangi kinoning malumotlari\n${newMovie}`)
                    } catch (error) {
                        console.log(error)
                        bot.sendMessage(message.chat.id, "Kinoni bazaga yuklashda muammo bor !")
                    }
                } else {
                    console.log("Botda url qismida xatolik mavjud")
                    bot.sendMessage(message.chat.id, "Iltimos botni url qilmini tekshirib chiqing admin ! 😌")
                }
            } else {
                console.log("Yuklash malumotlari notog'ri kelgan !")
                bot.sendMessage(message.chat.id, "Yuklash malumotlari noto'gri kelgan !")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    find: findMovieFromDb,
    upload: uploadMovie
}
