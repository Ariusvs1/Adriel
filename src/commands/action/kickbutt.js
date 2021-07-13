const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Kickbutt extends Commands {
    constructor(client) {
        super(client, {
          name: "kickbutt",
          alias: ["boot"],
          description: "Patea a alguien. Hehe",
          usage: "kickbutt <mencion>",
        });
    }

    async run(message, args) {

let gifs = ['https://cdn.discordapp.com/attachments/837371860231782473/837502116293115914/Kick_angel_bets.gif', 'https://cdn.discordapp.com/attachments/837371860231782473/837501989750964234/Nezuko.gif', 'https://cdn.discordapp.com/attachments/837371860231782473/837501889419149333/Kick.gif', 'https://cdn.discordapp.com/attachments/837371860231782473/837474425640189962/Akamega_kill.gif'] 
let randomIMG = gifs[Math.floor(Math.random() * gifs.length)]

let usuario;
if(message.mentions.users.first()) {
  usuario = message.mentions.users.first().id;
} else if (args[0]) {
usuario = args[0];
} else {
  usuario = message.author.id;
}
try {
  let user = await this.client.users.fetch(usuario)
  if(user == message.author) return message.channel.send("> Menciona el trasero que quieres patear.")
  else {
const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " le da una patada a " + "**" + user.username + "**")
  .setImage(randomIMG)
  .setColor("RANDOM")
  

  message.channel.send({embeds: [embed]})
  }
} catch {
  const error = new Discord.MessageEmbed()

  .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
  .setTitle("Error! ❌")
  .setColor("RED")
  .setDescription(`${user} No es una ID valida, asegurate que sea de un usuario!`)

  message.channel.send(error)
}

 }
}
  