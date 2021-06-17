const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Queue extends Commands {
    constructor(client) {
        super(client, {
          name: "queue",
          alias: ["qe", "lista"],
          description: "Muestra la lista de canciones en cola.",
          usage: "queue",
         });
    }

    async run(message) {

       if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")

let queue = this.client.distube.getQueue(message);
let lista1 = queue.songs.map((song, id) =>
`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
).slice(0, 10).join("\n");

const lista = new Discord.MessageEmbed()

.setTitle("Canciones en cola:")
.setDescription(lista1)
.setColor("BLUE")
.setTimestamp()
message.channel.send(lista)

     
  }
}