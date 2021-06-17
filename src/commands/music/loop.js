const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Loop extends Commands {
    constructor(client) {
        super(client, {
            name: "loop",
            alias: ["repeat", "repite", "bucle"],
            description: "Coloca en estado bucle tu canción o playlist favorita.",
            usage: "loop <song> / <queue> / <off>",
         });
    }

    async run(message, args) {
      
        if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!"); 
let lista = this.client.distube.getQueue(message);
if(!lista) return message.channel.send("No hay canciones en la lista de reproducción!"); 
if(!args[0]) return message.channel.send("Debes elegir un modo para el bucle!\n\n Usa `off` para desactivar el bucle, `song` para activar el modo bucle de una canción, o `queue` para activar el modo bucle de una playlist!")
let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break;
            case "song":
                mode = 1
                break;
            case "queue":
                mode = 2
                break;
        }

       mode = this.client.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? "Playlist en modo bucle" : "canción en bucle." : "bucle desactivado."
        message.reply(`\`${mode}\`\n\n Por defecto este modo estara activo hasta que lo cambies.`)

 

  }
}