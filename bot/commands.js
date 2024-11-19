const User = require("../model/User");

module.exports = (bot) => {
    bot.onText(/\/start/, async (message) => {
        const chatId = message.chat.id;
        try {
            const findUser = await User.findOne({ telegramId: chatId });
            console.log(findUser);
            if (findUser) {
                bot.sendMessage(chatId, `Yana ko'rganimdan xursanman @${findUser.username}`);
            } else {
                console.log("ishlamoqda");
                await User.create({
                    username: message.chat.username,
                    firstName: message.chat.first_name,
                    lastName: message.chat.last_name,
                    telegramId: message.chat.id
                });
                bot.sendMessage(chatId, "Salom men sizni eslab qoldim !");
            }
        } catch (error) {
            console.error(error);
        }
    });

    bot.onText(/\/help/, async (msg) => {
        const chatId = msg.chat.id;
        try {
            const findUser = await User.findOne({ telegramId: chatId }); // username o'rniga telegramId ishlatilsin
            console.log(findUser);
            bot.sendMessage(chatId,
                `Botni ishlatish ketma ketligi:\n1-Instagramdagi biror bir kinoning silkasini oling!\n2-Uni botga yuboring !\nShunday qilib bot sizga siz qidirayotgan kinoni tashlaydi !`);
        } catch (error) {
            console.error(error);
        }
    })
};
