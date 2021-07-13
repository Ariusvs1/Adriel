const Commands = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
module.exports = class Encuesta extends Commands {
    constructor(client) {
        super(client, {
          name: "encuesta",
          alias: ["enc", "poll"],
          description: "Has una encuesta.",
          usage: "encuesta <pregunta> | <opcion1> | <opcion2>",
          enabled: false,
         });
    }

    async run(message, args) {
        const embed = new MessageEmbed()

let au = message.author;
let ala = args.join(" ");
if(!ala) return message.channel.send("Debes ingresar una pregunta y dos opciones.\nLas preguntas deben estar dentro de `[]` y las opciones deben estar dentro de `{}`")
let reg = /((?<=\[).*(?=\]))/g
let pregunta = ala.match(reg)
let reg2 = /((?<=\{).*(?=\}))/g

let opciones = ala.match(reg2)
console.log(pregunta)
console.log(opciones)


message.channel.send(`\`\`\` ${pregunta} \n ${opciones} \`\`\``)

 }
}