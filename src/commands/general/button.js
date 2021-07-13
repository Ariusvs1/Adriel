const Commands = require('../../structures/Command');
const Discord = require('discord.js')
module.exports = class Button extends Commands {
    constructor(client) {
        super(client, {
          name: "button",
         description: "Boton o si",
         });
    }

    async run(message) {
        const boton = new Discord.MessageButton()

        .setLabel("Osi")
        .setStyle("DANGER")
        .setCustomID("3")
        message.channel.send({ content: "O si un boton", button: boton } )

        
  }
}