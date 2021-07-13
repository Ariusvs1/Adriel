const Commands = require('../../structures/Command');
const Servers = require('../../db/servers.js');
const Discord = require('discord.js');
module.exports = class Setprefix extends Commands {
    constructor(client) {
        super(client, {
          name: "setprefix",
          description: "Establece un nuevo prefijo.",
          usage: "setprefix <nuevo prefijo>",
         });
    }

    async run(message, args) {

let newprefix = args[0];
  if(!message.member.hasPermission("MANAGE_GUILD"))return message.channel.send("No tienes permisos suficientes.");
  if(!newprefix) return message.channel.send("Debes ingresar el nuevo prefijo.");
  if(newprefix.length > 4) return message.channel.send("El nuevo prefix no puede ser mayor a 4 caracteres")

let prefixs = await Servers.findOne({ servID: message.guild.id })
if(prefixs){
  await Servers.updateOne({ servID: message.guild.id, prefix: newprefix })
message.channel.send("Has cambiado el prefijo a " + `\`${newprefix}\``)

} else { 
let prefix2 = new Servers({ servID: message.guild.id, prefix: newprefix })
await prefix2.save()
message.channel.send("Has cambiado el prefijo por " + `${newprefix}`)
}


    }
}