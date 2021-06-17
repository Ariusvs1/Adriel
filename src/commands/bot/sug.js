const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Sug extends Commands {
    constructor(client) {
        super(client, {
          name: "sug",
          description: "Sugiere nuevos comandos o diseños para el bot.",
          usage: "sug <argumentos de la sugerencia>",
         });
    }

    async run(message, args) {

 const messagereport = args.join(" ");


  if(!messagereport) return message.channel.send("No puedes enviar una sugerencia vacia.");

  const report = new Discord.MessageEmbed()
  
  .setDescription("Muchas gracias por la sugerencia! :D")
  .setColor("PURPLE")

  message.channel.send(report)

  let a = message.author;
  const embed = new Discord.MessageEmbed()

  .setTitle("Sugerencias.")
  .setDescription(messagereport)
  .addField("Enviado por:", `**${message.author.tag}**`)
  .setColor("BLUE")
  .setFooter("ID: " + a.id)

  client.channels.cache.get("838968248762236988").send(embed)
    }

}