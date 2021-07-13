const Commands = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
module.exports = class Invite extends Commands {
    constructor(client) {
        super(client, {
          name: "invite",
          alias: ["inv"],
          category: "info",
        });
    }
    async run(message) {


      const embed = new MessageEmbed()

      .setTitle("Invitame a tu servidor!")
      .setDescription(`Haz click [aquí](https://discord.com/oauth2/authorize?client_id=829483998349885471&scope=bot&permissions=808460479) Para invitarme!`)
      .setColor("RED")
      .setThumbnail("https://cdn.discordapp.com/attachments/838296053106606081/846130864223813642/f0924c9ffa9efba7bfe00ac94072226c.jpg")
      message.channel.send({ embeds: [embed]})



  }
}