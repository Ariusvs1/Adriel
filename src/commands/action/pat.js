const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Pat extends Commands {
    constructor(client) {
        super(client, {
          name: "pat",
          description: "Acaricia a alguien. :D",
          usage: "pat <mencion>",
        });
    }

    async run(message, args) {

let gifs = ['https://cdn.discordapp.com/attachments/837370553835716718/837480644853628978/kotaro_pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478816313114634/Shiro_pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478810702184448/rem_pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478791164067870/pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478774886891580/head_pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478271862964225/pat_pat.gif', 'https://cdn.discordapp.com/attachments/837370553835716718/837478171661565992/Kanna_pat.gif'] 
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
  if(user == message.author) return message.channel.send("> Oww.. Debes mencionar a alguien. :D")
  else {
const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " acaricia con amor a " + "**" + user.username + "**")
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

  message.channel.send({ embeds: [error]})
}
    }
}