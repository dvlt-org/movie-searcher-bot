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
            if (!response || !response[2]) {
                bot.sendMessage(message.chat.id, "Response kelmayapti")
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
