const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Kiss extends Commands {
    constructor(client) {
        super(client, {
          name: "kiss",
          description: "Dale un beso a alguien O///O",
          usage: "kiss <mencion>",
        });
    }

    async run(message, args) {
  
let gifs = ['https://cdn.discordapp.com/attachments/837370067707756628/837500598626025492/Kiss_one.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500598709387274/kiss_two.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500571630960690/Kiss_seven.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500570201096192/Kiss_six.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500564711276584/kiss_treh.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500552538882119/kiss_four.gif', 'https://cdn.discordapp.com/attachments/837370067707756628/837500522424172554/Kiss_five.gif'] 
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
  if(user == message.author) return message.channel.send("> Debes mencionar a alguien jeje.")
  else {
 const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " le dio un beso a " + "**" + user.username + "**")
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

  message.channel.send(error)
}

   }
 }




 