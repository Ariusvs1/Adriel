const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Kill extends Commands {
    constructor(client) {
        super(client, {
          name: "kill",
          description: "Asesina a alguien...",
          usage: "kill <mencion>",
        });
    }

    async run(message, args) {
  
let gifs = ['https://cdn.discordapp.com/attachments/837370629082316882/837449544467742790/Kimetsu_no_yaiba.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837449485046120508/Akame_ga_kill_2.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837449497524305930/Akame_ga_kill.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837449465702121482/Zodiac_creppypasta.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837452369457446922/Kool.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837456474275708999/Noragami.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837464108743917638/nanatsu_no_taizai.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837464110870298634/Nanatsu_no_taiza.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837464350360600576/Escanor.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837467293931012137/escanor_1.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837467318652895282/Nana.gif', 'https://cdn.discordapp.com/attachments/837370629082316882/837467357780901898/monspeet.gif'] 
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
  if(user == message.author) return message.channel.send("> D-debes mencionar a la persona que quieres asesinar.")
  else {
const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " Asesino a " + "**" + user.username + "**" + " D:")
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
  
 