const Movie = require("../model/Movies");
const getUrls = require("../config/getUrls")


module.exports = (bot) => {
    bot.on("message", async (message) => {
        const admins = [6168952166, 6313919188]; // Adminlar ID-larining ro'yxati
        if (message.text.includes("/admin") && message.chat.id === admins[0] || message.chat.id === admins[1]) {
            const messages = message.text.split("_")
            try {
                bot.sendMessage(message.chat.id, "🔄 kut!")
                const response = await getUrls(messages[2])
                if (!response || response.length < 4) {
                    bot.sendMessage(message.chat.id, "Axmoq no'to'gri yubording !");
                } else {
                    const newMovie = await Movie.create({
                        instagramUrl: messages[1],
                        movieUrl: response.slice(0, 3),
                        coverImgUrl: response[3],
                        movieName: response[4]
                    });
                    if (newMovie) bot.sendMessage(message.chat.id, "Qabul qildim !")
                    else {
                        bot.sendMessage(message.chat.id, "Xato bor !")
                    }
                }
            } catch (error) {
                console.log(error)
            }

        }
        if (message.text !== "/start" && message.text !== "/help" && message.text !== "/new") {
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
                    }
                } catch (error) {
                    console.error(error);  // Xatolarni konsolga chiqarish
                    bot.sendMessage(message.chat.id, "Nimadur xato ketdi!");
                }
            }
        }
    });
}

