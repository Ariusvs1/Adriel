const Distu = require('../../structures/Distu')
const Discord = require('discord.js-light')
module.exports = class PlayList extends Distu {
    constructor(client) {
        super(client, {
            name: 'playList'
        })
    }

    async run(message, queue, playlist, song) {

      const embed = new Discord.MessageEmbed()

      .setTitle("PlayList agregada!")
      .setDescription(`Se agrego la playlist \`${playlist.name}\`\n\n(${playlist.songs.length} canciones).\nReproduciendo:\n\`${song.name}\` - \`${song.formattedDuration}\``)
      .setColor("WHITE")
      .setTimestamp()
      .setFooter(`Agregada por ${song.user.username}`, message.author.displayAvatarURL())
      .setURL(playlist.url)

    message.channel.send(embed)

   }
 }
 
 
