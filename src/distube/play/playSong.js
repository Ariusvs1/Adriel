const Distu = require('../../structures/Distu')
const Discord = require('discord.js-light')
module.exports = class PlaySong extends Distu {
    constructor(client) {
        super(client, {
            name: 'PlaySong'
        })
    }

    async run(message, queue, song) {

const embed = new Discord.MessageEmbed()

.setTitle(`Reproduciendo la canción  ♪`)
.setURL(`${song.url}`)
.setDescription(`\`${song.name}\` - \`${song.formattedDuration}\``)
.setColor("BLUE")
.setFooter(`Pedida por ${song.user.username}`, message.author.displayAvatarURL())
.setTimestamp()

message.channel.send(embed)
      
 }
}