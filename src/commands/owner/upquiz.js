const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
const Quiz = require('../../db/quiz.js');
const data = require('../../src/config.js');
module.exports = class Upquiz extends Commands {
    constructor(client) {
        super(client, {
          name: "upquiz",
          devsOnly: true,
         });
    }

    async run(message, args) {


if(message.author.id != process.evn.ID) return;

let test = args.join(" ").split(" | ");

const [id, pregunta, a, b, c, d, img, respuesta, opcion2] = test;

if(test < 9) return message.channel.send("Recuerda, es: `id | pregunta | respuesta a | b | c | d | Imagen | Resuesta en numero | Respuesta en letras.`");

const subida = new Quiz({
  id: id,
  pregunta: pregunta,
  respuestas: {
    a: a,
    b: b,
    c: c,
    d: d,
    correct: [respuesta, opcion2]
  },
  img: img
})

await subida.save()

message.channel.send("Listo! has guardado correctamente la nueva pregunta!")



  }
}