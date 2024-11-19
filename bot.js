const Telegram = require("node-telegram-bot-api")
const connectToDb = require("./config/db")
const commands = require("./bot/commands")
const MovieCallback = require("./callback/Movie")
const movie = require("./bot/movie")
const dotenv = require('dotenv')

// enviroment variable
dotenv.config()

// connect to db and running bot
connectToDb()
const bot = new Telegram(process.env.TOKEN, { polling: true });

// commands section
commands(bot)

// movie section
movie(bot)

// callback query
MovieCallback(bot);