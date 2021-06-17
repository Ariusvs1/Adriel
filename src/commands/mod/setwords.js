const Servers = require('../../db/servers');
const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Setwords extends Commands {
    constructor(client) {
        super(client, {
          name: "setwords",
          alias: ["badwords"],
          description: "Evita el uso de palabras ofensivas en el servidor.",
          usage: "setwords <palabra> | [palabra]",
         });
    }

    async run(message, args) {


      const palabras = args.join(" ").split(" | ");
 if(!palabras) return message.channel.send("Escribe la/las palabra/s a prohibir separadas con `|`.");
 if(args[0] === " ")return;
      const filtro = message.content.slice(palabras.length).endsWith("--de");
     
      if(!message.member.hasPermission("MANAGE_GUILD"))return message.channel.send("No tienes permisos suficientes.");
     

const busca = await Servers.findOne({ servID: message.guild.id});

if(!filtro) {
if(!busca) {
 const newWord1 = await new Servers({ servID: message.guild.id, words: palabras});

 await newWord1.save();

  message.channel.send("Listo! las palabras " + "`" + `${palabras}` + "` no estan permitidas en este servidor.")
} else {


if(palabras > 1){

const subida = await Servers.updateOne({ servID: message.guild.id }, {$addToSet: { $each: { words: palabras } } } )

  message.channel.send("Listo! la palabras " + "`" + `${palabras}` + "` no estan permitidas en este servidor.")


} else {
  const subida2 = await Servers.updateOne({
    servID: message.guild.id
  }, 
  {$addToSet: { words: palabras } } )

    message.channel.send("Listo! la palabra " + "`" + `${palabras}` + "` No esta permitida en este servidor.")

    }
  }
} else {

  const busca = await Servers.findOne({ servID: message.guild.id });

  let delepa = args[0];

  if(!busca) return message.channel.send("No tienes ningunca palabra agregada en la lista!\n Agregala usando el comando ^words <palabra prohibida");

  else {
    const delet = await Servers.updateOne({ servID: message.guild.id }, { $pull: { words: delepa } } );
    message.channel.send(`Listo! la palabra ` + "`" + `${delepa}` + "` Fue eliminada de la lista prohibida.")

  }


  }
 }
}