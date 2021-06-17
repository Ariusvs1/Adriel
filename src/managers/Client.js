const { Client, Intents } = require('discord.js-light')
const Commands = require('./Commands')
const Events = require('./Events')
const Distube = require('distube')
const DisTube = require('./DisTube')
module.exports = class Bot extends Client {
    constructor() {
        super({
            /* Intents necesarios por ustedes por defecto por defecto servidores y mensajes de servidores. */
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
            /* Las siguientes lineas deben activarlas o desactivarlas depende de lo que necesiten */
            cacheRoles: true,
            cacheGuilds: true,
            cacheEmojis: false,
            cacheMembers: true,
            cacheChannels: true,
            cachePresences: false,
            cacheOverwrites: true,
            messageCacheMaxSize: 20,
        })
        this.events = new Events(this)
        this.events.load()
        this.commands = new Commands(this)
        this.commands.load()
        this.devs = "731748818579882076"
        require("./others")
        this.queue = new Map()
        this.distube = new Distube(this, {
            searchSongs: true,
            emitNewSongOnly: false,
            leaveOnStop: true,
            leaveOnFinish: true,
            leaveOnEmpty: true
        })
        this.distu = new DisTube(this)
        this.distu.load()
        this.login("ODI5NDgzOTk4MzQ5ODg1NDcx.YG4zLA.2oC_Hk8QSUoaiZK4Y5D1Kxr8a58")
    }
}