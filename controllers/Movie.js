const Movie = require("../model/Movies")
const getUrls = require("../config/getUrls")
const dotenv = require("dotenv")
dotenv.config()


const new_admins = process.env.ADMINS
const admins = new_admins.split(",").map(Number)

function isAdmin(userId) {
    return admins.includes(userId)
}

const adminUploadMovie = async (message, bot) => {
    if (message.text.includes("/admin") && isAdmin(message.chat.id)) {
        const messages = message.text.split("*");
        console.log(messages)

        // Tekshiruv: messages[2] mavjudligini tekshirish
        if (messages.length < 3) {
            bot.sendMessage(message.chat.id, "Iltimos, barcha ma'lumotlarni to'g'ri yuboring!");
            return;
        }
        try {
            bot.sendMessage(message.chat.id, "🔄 kut!")
            const response = await getUrls(messages[2]);
            console.log(response)

            // getUrlsdan javobni tekshirish
            if (!response || response.length < 4) {
                bot.sendMessage(message.chat.id, "Malumot notog'ri yuborilgan !");
            } else {
                try {
                    // Movie modeliga ma'lumot kiritish
                    const newMovie = await Movie.create({
                        instagramUrl: messages[1],
                        movieUrl: response.slice(0, 3),
                        coverImgUrl: response[3],
                        movieName: response[4]
                    });
                    console.log(newMovie)

                    console.log(newMovie)

                    if (newMovie) {
                        bot.sendMessage(message.chat.id, "Qabul qildim !");
                    } else {
                        bot.sendMessage(message.chat.id, "Bu kino yuklanmadi !");
                    }
                } catch (error) {
                    console.log("Movie.create xatosi: ", error); // Xatoni loglash
                    bot.sendMessage(message.chat.id, "Bu raqam ishlatilingan bo'lishi mumkin yoki no'to'g'ri yuborilgan !");
                }
            }
        } catch (error) {
            console.log("getUrls xatosi: ", error); // Xatoni loglash
            bot.sendMessage(message.chat.id, "Malumot olishda xatolik yuz berdi!");
        }
    }
}

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
    find: findMovieFromDb,
}
