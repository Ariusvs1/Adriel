const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Continue extends Commands {
    constructor(client) {
        super(client, {
            name: "continue",
            description: "Reanuda la reproduccion de una canción pausada.",
            usage: "continue",
         });
    }

    async run(message) {


        if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")

            let queue = await this.client.distube.getQueue(message);
          
            if(!queue)return message.channel.send("No hay canciones reproduciendoce!")
            if(!queue.pause) return message.channel.send("La canción no esta pausada.")

            this.client.distube.resume(message)

            message.channel.send("La canción ha sido despausada.")
        
    }
}