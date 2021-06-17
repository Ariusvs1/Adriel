const Commands = require('../../structures/Command');
const { MessageEmbed } = require('discord.js-light');
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

	message.channel.send({embed: {

		color: 3447003,

		description: `**🏓 Pong!** 
	La velocidad de respuesta es de ***${timeTaken}ms.***`
	}

});
 }
}