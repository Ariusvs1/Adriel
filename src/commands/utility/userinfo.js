const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Userinfo extends Commands {
    constructor(client) {
        super(client, {
            name: "userinfo",
            aliases: ["ui", "about"],
            description: "Obten tu informacion, o la de un usuario.",
            usage: "userinfo [mencion]",
         });
    }

    async run(message, args) {
 
 let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; 
    
 let status; 
        switch (user.presence.status) {
            case "online":
                status = "🟢 En linea";
                break;
            case "dnd":
                status = "⛔ No molestar";
                break;
            case "idle":
                status = "🌙 Ausente";
                break;
            case "offline":
                status = "⚪ Desconectado";
                break;
        }

  const embed = new Discord.MessageEmbed()

  .setAuthor(`Informacion sobre ${user.user.username}`)
  .setColor(`BLUE`)
  .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
    .addFields(
                {
                    name: "Apodo: ",
                    value: user.nickname ? user.nickname : "No tiene apodo",
                    inline: true 
                },
                {
                    name: "#️⃣ Tag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: "Reciente Actividad: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin actividad",
                    inline: true
                },
                {
                    name: "Estado: ",
                    value: status,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click aquí](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Se unio a discord en: ',
                    value: user.user.createdAt.toLocaleDateString("es-pe"),
                    inline: true
                },
                {
                    name: 'Fecha de entrada al Servidor: ',
                    value: user.joinedAt.toLocaleDateString("es-pe"),
                    inline: true
                },
                {
                    name: 'Roles del usuario: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send({embeds: [embed] })
  

  
  }
}