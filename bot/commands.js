const User = require("../model/User");

module.exports = (bot) => {
    bot.onText(/\/start/, async (message) => {
        const chatId = message.chat.id;
        try {
            const findUser = await User.findOne({ telegramId: chatId });
            console.log(findUser);
            if (findUser) {
                bot.sendMessage(chatId, `📩Ko'rmoqchi bo'lgan kinoniyingizni instagram urlini yuboring !\n👉Agar qanday qilib url olishni bilmasangiz /help`);
            } else {
                console.log("ishlamoqda");
                await User.create({
                    username: message.chat.username,
                    firstName: message.chat.first_name,
                    lastName: message.chat.last_name,
                    telegramId: message.chat.id
                });
                bot.sendMessage(chatId, `📩Ko'rmoqchi bo'lgan kinoniyingizni raqamini yuboring !\n👉Agar qanday qilib url olishni bilmasangiz /help`);
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
                `👤 Botni ishlatish qoidalari\n🔗 Instagramdan kanaldan kino *raqamini* oling !\n✅ Va bot sizga kinoni tashlaydi\n👨‍💻 Agar shunda ham muammo bo'lsa admin bialn bo'g'laning @L_O_R_D_o8`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error(error);
        }
    })
};
