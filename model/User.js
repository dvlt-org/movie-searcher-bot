const { Schema, model } = require("mongoose")


const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: false,
    },
    lastName: {
        type: String,
        require: false,
    },
    telegramId: {
        type: String,
        require: true,
    }
})

module.exports = model("Users", userSchema)