const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Report extends Commands {
    constructor(client) {
        super(client, {
          name: "report",
          description: "Reporta cualquier problema con el que te encuentres al ejecutar un comando.",
          usage: "report <argumentos del reporte>",
         });
    }
    async run(message, args) {

 const messagereport = args.join(" ");


  if(!messagereport) return message.channel.send("No puedes enviar un reporte vacio.");

  const report = new Discord.MessageEmbed()
  
  .setDescription("Reporte enviado correctamente. Muchas gracias! :D")
  .setColor("GREEN")

  message.channel.send({embeds: [report]})

  let a = message.author;
  const embed = new Discord.MessageEmbed()

  .setTitle("Reportes.")
  .setDescription(messagereport)
  .addField("Enviado por:", `**${message.author.tag}**`)
  .setColor("BLUE")
  .setFooter("ID: " + a.id)

  client.channels.cache.get("838968214234726420").send({embeds: [embed]})

    }
}