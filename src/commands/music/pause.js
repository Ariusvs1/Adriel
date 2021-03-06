const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Pause extends Commands {
    constructor(client) {
        super(client, {
            name: "pause",
            description: "Pon en pausa la canción en reproducción",
            usage: "pause",
         });
    }

    async run(message, args) {

        if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")

            let queue = await this.client.distube.getQueue(message);
          
            if(!queue)return message.channel.send("No hay canciones reproduciendoce!")
            if(queue.pause) return message.channel.send("La canción ya esta pausada.")

            this.client.distube.pause(message)

            message.channel.send("La cancion ha sido pausada.")
        
    }
}