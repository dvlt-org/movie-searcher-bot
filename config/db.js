const mongoose = require('mongoose')

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("Bazaga ulandim ..."))
    } catch (error) {
        console.log("Bazaga ulanishda muammo bor ...")
    }
}


module.exports = connectToDb;