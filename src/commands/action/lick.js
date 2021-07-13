const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Lick extends Commands {
    constructor(client) {
        super(client, {
          name: "lick",
          description: "Lame a alguien.",
          usage: "lick <mencion>",
        });
    }

    async run(message, args) {

let gifs = [] 
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
  if(user == message.author) return message.channel.send("> ...Debes mencionar a alguien.")
  else {
 const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " lame con amor a " + "**" + user.username + "**")
  .setImage(randomIMG)
  .setColor("RANDOM")
  

  message.channel.send(embed)
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