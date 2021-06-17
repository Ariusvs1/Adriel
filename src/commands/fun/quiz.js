const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
const Quiz = require('../../db/quiz.js');
module.exports = class Pregunta extends Commands {
    constructor(client) {
        super(client, {
          name: "Pregunta",
          aliases: ["quiz"],
          usage: "quiz",
          description: "Una divertida ronda de preguntas!",
          cooldown: 10,
          enabled: false,
         });
    }

    async run(message) {

await Quiz.countDocuments(function(err, count) {
  if (err) console.log(err);

   let min = 1;
   let max = count; 

  return num = Math.floor(Math.random() * (max - min + 1) ) + min;
})

const test = await Quiz.findOne({ id: num });

let pre = test.pregunta;
let res1 = test.respuestas.a;
let res2 = test.respuestas.b;
let res3 = test.respuestas.c;
let res4 = test.respuestas.d
let resCorre = test.respuestas.correct;
let img = test.img;

const embed = new Discord.MessageEmbed()

.setTitle("Pregunta!")
.setDescription(`${pre}`)
.addField("Respuestas!", `**1-** ${res1}\n**2-** ${res2}\n**3-** ${res3}\n**4-** ${res4}\n\n**¡Escribe tu respuesta!**`)
.setFooter(`Tienes 20 segundos para reponder!`)
.setImage(img)
.setColor("RANDOM")

const filtro = response => {
  return resCorre.some(correct => correct.toLowerCase() === response.content.toLowerCase())
};

message.channel.send(embed).then(() => {
message.channel.awaitMessages(filtro, { max: 1, time: 20000, errors: ["time"] }) 
  .then(collected => {

  
      const embed2 = new Discord.MessageEmbed()

      .setDescription(`Muy bien! ${collected.first().author} la respuesta es **${resCorre[1]}**`)
      .setColor("GREEN")
    message.channel.send(embed2)

  })
  .catch(collected => {
    message.channel.send(`Se acabo el tiempo! Las  respuestas validas eran **${resCorre[0]}** o **${resCorre[1]}**`)
  })
})   
    }
  }
