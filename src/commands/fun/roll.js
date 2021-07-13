const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Roll extends Commands {
    constructor(client) {
        super(client, {
          name: "roll",
          alias: [],
          description: "Lanza un dado.",
         usage: "roll",
         });
    }

    async run(message) {

  let links = ["https://cdn.discordapp.com/attachments/684757256658747451/794277079243685888/dado-1.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277107537805332/dado-2.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277142800105483/dado-3.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277176592826368/dado-4.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277207619010590/dado-5.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277245157113866/dado-6.png"]

  var dado = links[Math.floor(Math.random() * links.length)]
  const embed = new Discord.MessageEmbed()

  .setTitle(`${message.author.username} ha lanzado el dado.`)
  .setDescription("> El dado cayó en:")
  .setImage(dado)
  .setColor("RANDOM")
  
  message.channel.send({embeds: [embed]})
  }
}