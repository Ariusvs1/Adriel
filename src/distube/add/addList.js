const Distu = require('../../structures/Distu')
const Discord = require('discord.js-light')
module.exports = class AddList extends Distu {
    constructor(client) {
        super(client, {
            name: 'addList'
        })
    }

    async run(message, queue, playlist) {

const embed = new Discord.MessageEmbed()

.setTitle("Playlist añadida!")
.setDescription(`Se agrego la playlist\n\`${playlist.name}\`\n(\`${playlist.songs.length}\`canciones)`)
.setColor("BLUE")
.setTimestamp()
.setURL(playlist.url)

message.channel.send(embed)
  
  }
}