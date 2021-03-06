const Commands = require('../../structures/Command');
const Servers = require('../../db/servers.js');
const Discord = require('discord.js');
module.exports = class Setwelcome extends Commands {
    constructor(client) {
        super(client, {
          name: "setwelcome",
          aliases: ["sw"],
          description: "Establece el canal donde se enviaran las bienvenidas.",
          usage: "setwelcome <canal de bienvenidas>",
          enabled: false,
         });
    }

    async run(message, args) {

    const busca = await Servers.findOne({ servID: message.guild.id })
    if(!busca){
        let nuevo = new Servers({
        servID: message.guild.id })

            nuevo.save(async function (err) {
      if(err) console.log(err)
  
    })
    }
if(!args[0]){
let canal = "";
if(!busca) {
  canal = "none"
} else {
canal = busca.welcomes.channel;

}
let o = "";

if(canal == "none"){
  o = "Sin configurar"
} else {
  o = canal;
}
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Bienvenidas de ${message.guild.name}`, message.guild.iconURL())
  .addField("Canal", canal)
  .addField("Mensaje", "```" + busca.welcomes.msg + "```")  
  message.channel.send({embeds: [embed]})

} else if(args[0] == "ch") {

    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === args[1])
    if(!channel) return message.channel.send("Debes mencionar un canal valido o colocar una ID valida. Si el problema persiste asegurece de que la ID sea de un canal del servidor.");

       busca.welcomes.channel = channel.toString();
       await busca.save()    

      message.channel.send(`Bien enviare las bienvenidas al canal ${channel}`)
  
    } else if(args[0].toLowerCase() == "msg") {
    let msg = args.slice(1).join(" ");
  if(!msg)return message.channel.send("Espesifica un mensaje para las bienvenidas!")
     busca.welcomes.msg = msg;
     await busca.save()

      message.channel.send(`Listo! Puedes usar \`${busca.prefix}setwelcome\` para ver la configuracion actual.`)
    

  } else if(args[0].toLowerCase() == "tipo"){

       let tipo = args[1]
       if(!tipo)return message.channel.send("Espesifica un tipo para las bienvenidas!")
       
       if(tipo.toLowerCase() != "embed" || tipo.toLowerCase() != "text") return message.channel.send(`${tipo} No es una opci??n valida!\n Elige **embed** o **text**`)

       busca.welcomes.tipo = tipo;

       await busca.save()
       
       const msg = {
         "embed": "Los **mensajes de bienvenida** se eviaran dentro de un embed.",
         "text": "Los **mensajes de bienvenida** se enviaran en texto plano."
       }

       const s = msg[tipo]

       message.channel.send(s)
  }else if(args[0].toLowerCase() == "color"){
      let c = args[1]
      if(!c)return message.channel.send("Debes espesificar un color!")
      let isOk =  /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/


      if(!c.match(isOk)) return message.channel.send("No es un codigo Hex!")

      busca.welcomes.color = c;

      await busca.save()

      message.channel.send("Listo!")
  }
  }
}