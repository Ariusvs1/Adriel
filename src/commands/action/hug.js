const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Hug extends Commands {
    constructor(client) {
        super(client, {
            name: 'hug',
            description: "¿Quieres un abrazo?\nCon este comando puedes abrazar a alguien.",
            usage: "hug <mencion>", 
        });
    }

    async run(message, args) {

let gifs = ['https://cdn.discordapp.com/attachments/837370465366179861/837496829309747250/crying-hug.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496430435893268/Mirai.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496429785251840/hugging.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496426292183050/hug.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496420016980038/Anime.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496388174086184/K-on.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496383912017930/i_love_u.gif', 'https://cdn.discordapp.com/attachments/837370465366179861/837496356188848169/3_hug.gif'] 
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

  if(user == message.author) return message.channel.send("> Menciona a alguien jeje.")
  else {
  const embed = new Discord.MessageEmbed()

  .setDescription("> **" + message.author.username + "**" + " le dio un abrazo a " + "**" + user.username + "**")
  .setImage(randomIMG)
  .setColor("RANDOM")
  .setFooter("(◕‿◕)♡")

  message.channel.send({ embeds: [embed] })
  }
} catch {
  const error = new Discord.MessageEmbed()

  .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
  .setTitle("Error! ❌")
  .setColor("RED")
  .setDescription(`${user} No es una ID valida, asegurate que sea de un usuario!`)

  message.channel.send({embeds: [error]})
}

 }
}