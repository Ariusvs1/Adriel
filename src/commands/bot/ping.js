const Commands = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
module.exports = class Ping extends Commands {
    constructor(client) {
        super(client, {
            name: "ping",
           alias: ["ms"],
           description: "Obten mi velocidad de respuesta en `ms`",
          usage: "ping",
         });
    }
    async run(message) {

	const timeTaken = Date.now() - message.createdTimestamp;

const embed = new MessageEmbed()

.setColor(3447003)
.setDescription(`**🏓 Pong!**\nLa velocidad de respuesta es de ***${timeTaken}ms.***`)

	message.channel.send({embeds: [embed]});
 }
}