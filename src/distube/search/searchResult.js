const Distu = require('../../structures/Distu')
const Servers = require('../../db/servers')
const Discord = require('discord.js-light')
module.exports = class searchResult extends Distu {
    constructor(client) {
        super(client, {
            name: 'searchResult'
        })
    }

    async run(message, result) {
   
   let i = 0;
   let o = result.slice(0, 5);
const embed = new Discord.MessageEmbed()
.setTitle("Escoge la canción ha reproducir ♪")
.setDescription(`${o.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
.setFooter("Ingresa el numero de la canción que quieras o espera 60s para cancelar")
.setColor("RANDOM")
message.channel.send(embed)

  }
}  
   