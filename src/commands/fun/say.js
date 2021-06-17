const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Say extends Commands {
    constructor(client) {
        super(client, {
          name: "say",
          description: "Puedo repetir lo que quieras",
          usage: "say <texto a repetir>",
         });
    }

    async run(message, args) {
    let text = args.join(" ");

    if(!text) return message.channel.send("> ¿Que quieres que repita?");
    else {
      message.channel.send(text)
    }

  message.delete()


  }
}