const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Avatar extends Commands {
    constructor(client) {
        super(client, {
          name: "avatar",
          aliases: ["av"],
          description: "Obten el avatar de alguien o el tuyo.",
          usage: "avatar <mencion>",
         });
    }

    async run(msg, args) {

let usuario;
if(msg.mentions.users.first()) {
  usuario = msg.mentions.users.first().id;
} else if (args[0]) {
usuario = args[0];
} else {
  usuario = msg.author.id;
}
try {
  let user = await this.client.users.fetch(usuario)
  const embed = new Discord.MessageEmbed()

  .setDescription("> Avatar de " + "**" + user.username + "**")
  .setColor("RANDOM")
  .setImage(user.displayAvatarURL({size: 4096,dynamic: true}))
  .setFooter("Pedido por " + msg.author.username, msg.author.displayAvatarURL({dynamic:true}))
  msg.channel.send({ embeds: [embed] })
} catch {
  const error = new Discord.MessageEmbed()

  .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
  .setTitle("Error! ❌")
  .setColor("RED")
  .setDescription(`${user} No es una ID valida, asegurate que sea de un usuario!`)

  msg.channel.send({embeds: [error]})
}

 }
}
