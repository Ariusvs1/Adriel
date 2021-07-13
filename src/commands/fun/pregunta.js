const Commands = require('../../structures/Command');
const { MessageButton, MessageEmbed } = require('discord.js');
const Quiz = require('../../db/quiz.js');
module.exports = class Pregunta extends Commands {
    constructor(client) {
        super(client, {
          name: "pregunta",
          aliases: ["quiz"],
          usage: "quiz",
          description: "Una divertida ronda de preguntas!",
         });
    }

    async run(message) {

let count = await Quiz.countDocuments(function(err, count) {
  if (err) console.log(err);

})

let min = 1;
let max = count; 
let num = Math.floor(Math.random() * (max - min + 1) ) + min;

const test = await Quiz.findOne({ id: num });

let pre = test.pregunta;
let res1 = test.respuestas.a;
let res2 = test.respuestas.b;
let res3 = test.respuestas.c;
let res4 = test.respuestas.d
let resCorre = test.respuestas.correct;
let img = test.img;

const but1 = new MessageButton()
.setCustomID(`1`)
.setLabel(`${res1}`);
const but2 = new MessageButton()
.setCustomID(`2`)
.setLabel(`${res2}`);
const but3 = new MessageButton()
.setCustomID(`3`)
.setLabel(`${res3}`);
const but4 = new MessageButton()
.setCustomID(`4`)
.setLabel(`${res4}`);

let algo1 = "1" == resCorre[0] ? "SUCCESS" : "DANGER";
let algo2 = "2" == resCorre[0] ? "SUCCESS" : "DANGER";
let algo3 = "3" == resCorre[0] ? "SUCCESS" : "DANGER";
let algo4 = "4" == resCorre[0] ? "SUCCESS" : "DANGER";

const err1 = new MessageButton()
.setCustomID(`1`)
.setStyle(algo1)
.setLabel(`${res1}`);
const err2 = new MessageButton()
.setCustomID(`2`)
.setStyle(algo2)
.setLabel(`${res2}`);
const err3 = new MessageButton()
.setCustomID(`3`)
.setStyle(algo3)
.setLabel(`${res3}`);
const err4 = new MessageButton()
.setCustomID(`4`)
.setStyle(algo4)
.setLabel(`${res4}`);

const embed = new MessageEmbed()

.setTitle("Pregunta!")
.setDescription(`${pre}`)
.addField("Respuestas!", `**1-** ${res1}\n**2-** ${res2}\n**3-** ${res3}\n**4-** ${res4}\n\n**¡Escribe tu respuesta!**`)
.setFooter(`Tienes 20 segundos para reponder!`)
.setImage(img)
.setColor("RANDOM")

const filtro = response => {
  return resCorre.some(correct => correct.toLowerCase() === response.content.toLowerCase())
};


let msg = message.channel.send({embeds: [embed], components: [[but1.setStyle("PRIMARY"), but2.setStyle("PRIMARY"), but3.setStyle("PRIMARY"), but4.setStyle("PRIMARY")]] }).then(() => {
  message.channel.awaitMessageComponentInteraction({ time: 20000 })
.then(async interaction => {

if(interaction.customID === resCorre[0]) {
//await interaction.deferUpdate()
  const embed2 = new MessageEmbed()
  .setColor("GREEN")
  .setDescription(`Muy bien ${interaction.user} la respuesta correcta es **${resCorre[1]}**`)
   message.channel.send({ embeds: [embed2] })



    await interaction.update({ components: [[err1.setDisabled(true), err2.setDisabled(true), err3.setDisabled(true), err4.setDisabled(true)]]})
} else {
 
  const embed3 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`Nop, de hecho la respuesta correcta era **${resCorre[1]}**\nIntenta otra vez!`)

  message.channel.send({ embeds: [embed3]})
  await interaction.update({ components: [[err1.setDisabled(true), err2.setDisabled(true), err3.setDisabled(true), err4.setDisabled(true)]]})
}

  })
  .catch( (e) => {
    message.channel.send("Acabo el tiempo!")
    console.log(e)
  })
})

/*.then(() => {
message.channel.awaitMessages({ filtro, max: 1, time: 20000, errors: ["time"] }) 
  .then(collected => {

  
      const embed2 = new Discord.MessageEmbed()

      .setDescription(`Muy bien! ${collected.first().author} la respuesta es **${resCorre[1]}**`)
      .setColor("GREEN")
    message.channel.send({embeds: [embed2]})

  })
  .catch(collected => {
    message.channel.send(`Se acabo el tiempo! Las  respuestas validas eran **${resCorre[0]}** o **${resCorre[1]}**`)
  })
})   */
    }
  }
