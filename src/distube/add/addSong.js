const Distu = require('../../structures/Distu')
const Discord = require('discord.js-light')
module.exports = class AddSong extends Distu {
    constructor(client) {
        super(client, {
            name: 'addSong'
        })
    }

    async run(message, queue, song) {

const embed = new Discord.MessageEmbed()

.setTitle("Canción agregada ♪")
.setDescription(`La canción \`${song.name}\` - \`${song.formattedDuration}\` se añadió a la cola ♪`)
.setColor("BLUE")
.setURL(song.url)
.setTimestamp()
.setFooter(`Agregada por ${song.user.username}`, message.author.displayAvatarURL())

message.channel.send(embed)
      
  
  }
}
