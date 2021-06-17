const Distu = require('../../structures/Distu')
const Discord = require('discord.js-light')
module.exports = class Error extends Distu {
    constructor(client) {
        super(client, {
            name: 'error'
        })
    }

    async run(message, e) {

    console.error(e)
  }
}

