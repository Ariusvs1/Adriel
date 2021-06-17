const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Encuesta extends Commands {
    constructor(client) {
        super(client, {
          name: "encuesta",
          alias: ["enc", "poll"],
          description: "Has una encuesta.",
          usage: "encuesta <pregunta> | <opcion1> | <opcion2>",
         });
    }

    async run(message, args) {

      const test = args.join(" ").split(" | ");
  const [pregunta, opcion1, opcion2] = test;

  let [react1, react2] = ["<a:one1:830998558055989288>", "<a:two2:830998598765772831>"]

  if(!pregunta) return message.channel.send("Escribe una pregunta.")
  if(!opcion1) return message.channel.send("Necesitas ingresar dos opciones.")
  if(!opcion2) return message.channel.send("Necesitas ingresar dos opciones.")
  
  const a = new Discord.MessageEmbed()

  .setTitle(`${pregunta} \n`)
  .addField(`${react1}`, `${opcion1}`)
  .addField(`${react2}`, `${opcion2}`)
  .setFooter(`Encuesta realizada por ${message.author.tag}`)
  .setColor("RANDOM")

  message.channel.send(a).then(async msg => {
    await msg.react(`${react1}`), await msg.react(`${react2}`)
  })
 }
}