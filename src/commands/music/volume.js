const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Volume extends Commands {
    constructor(client) {
        super(client, {
            name: "volume",
            alias: ["v", "set", "set-volume"],
            description: "Sube o baja el volumen a tu gusto.",
            usage: "volume <numero entre el 1 y el 100>",
         });
    }

    async run(message, args) {

    if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")

        const queue = this.client.distube.getQueue(message)
        if (!queue) return message.channel.send(`No hay nada en la lista de reproducción!`)
        const volume = parseInt(args[0])
        if (isNaN(volume) || volume > 100) return message.channel.send(`Ingresa un numero valido!`)
        this.client.distube.setVolume(message, volume)
        message.channel.send(`El volumen ha sido cambiado a \`${volume}\`%`)
    }
}