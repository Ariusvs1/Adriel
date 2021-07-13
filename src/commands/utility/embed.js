const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Embed extends Commands {
    constructor(client) {
        super(client, {
          name: "embed",
          description: "Crea un mensaje embed y envialo a un canal. Si no mencionas un canal se enviara en el canal donde ejecutaste el comando.",
          usage: "embed [canal]",
         });
    }

    async run(message, args) {

      let i = 0;

const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name === args[1]) || message.channel;

    if(channel.guild.id !== message.guild.id) return message.channel.send("Este canal es de otro servidor.");

    const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g

  let questions = ["Para salir de aquí coloque `exit`\npara omitir algo coloca `none` (excepto en los Fields)\n\nDime el contenido del mensaje que no estará en el embed.","Dime el autor del embed", "Escribe un enlace o sube un archivo adjunto para la imagen del autor", "Dime el enlace del autor."," Dime el título "," Dime el enlace del embed","Dime una descripción", "Dime un enlace en miniatura o sube un archivo adjunto", "Dime un enlace de una imagen o sube un archivo adjunto", "Dime un texto de pie de página", "Dime un enlace de imagen de pie de página o sube un archivo adjunto", "Dime el color para ponerlo en el embed "," ¿Quieres campos? "];

    await message.channel.send(questions[0]);
    let msgContent = "";
    let author = "";
    let authorimg = "";
    let authorlink = "";
    let footer = "";

    const embed = new Discord.MessageEmbed();
    const filter = m => m.author.id === message.author.id;
     let collector = message.channel.createMessageCollector({ filter, idle: 120000 })
    collector.on("collect", async m => {
      if(m.content === "exit") return collector.stop("Exited");

      switch(i) {
        case 0:
    if(m.content.toLowerCase() === "none") {
      msgContent = undefined
          } else {
            msgContent = m.content;
          }
        
        i++
      
      await message.channel.send(questions[i]);
          break;
            case 1:
          if(m.content.toLowerCase() === "none") {
            i = i + 3;
            await message.channel.send(questions[i]);
          } else {
            author = m.content
            i++;
            await message.channel.send(questions[i]);
          }
          break;
          case 2:
            if(m.content.toLowerCase() === "none") {
            authorimg = undefined;
            i++
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("No es una URL!");
            else if (m.attachments.first()) {
              authorimg = m.attachments.first().url;
              i++
            } else if (linkregex.test(m.content)) {
              authorimg = m.content;
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 3:

           if(m.content.toLowerCase() === "none") {
            authorlink = undefined;
            i++

            embed.setAuthor(author, authorimg, authorlink);
            await message.channel.send(questions[i]);
          } else {
            if(!linkregex.test(m.content)) return message.channel.send("No es una URL!");
            else {
              authorlink = m.content; 
              i++
            }
            embed.setAuthor(author, authorimg, authorlink);
            await message.channel.send(questions[i]);
          }
          break;
          case 4:
                    if(m.content.toLowerCase() === "none") {
            i++
          } else {
            embed.setTitle(m.content);
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 5:
          if(m.content.toLowerCase() === "none") {
            i++
          } else if (linkregex.test(m.content)){
            embed.setURL(m.content);
            i++
          } else return message.channel.send("No es una URL");
          await message.channel.send(questions[i]);
          break;
          case 6:
          if(m.content.toLowerCase() === "none") {
            i++
          } else {
            embed.setDescription(m.content);
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 7:
      if(m.content.toLowerCase() === "none") {
            i++
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("No es una URL");
            else if (m.attachments.first()) {
              embed.setThumbnail(m.attachments.first().url);
              i++
            } else if (linkregex.test(m.content)) {
               embed.setThumbnail(m.content);
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 8:

              if(m.content === "none") {
            i++
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("No es una URL!");
            else if (m.attachments.first()) {
              embed.setImage(m.attachments.first().url);
              i++
            } else if (linkregex.test(m.content)) {
               embed.setImage(m.content);
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 9:
               if(m.content === "none") {
            footer = undefined
            i = i + 2;
          } else {
            footer = m.content;
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 10:
          if(m.content === "none") {
            i++
            embed.setFooter(footer)
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("No es una URL!");
            else if (m.attachments.first()) {
              embed.setFooter(footer, m.attachments.first().url)
              i++
            } else if (linkregex.test(m.content)) {
               embed.setFooter(footer, m.content)
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
        case 11:
          if(m.content !== "none") embed.setColor(m.content);
          i++
          await message.channel.send(questions[i]);
          break;
          case 12:
             if(m.content.toLowerCase() === "si") {
            collector.stop("field")
          } else if (m.content.toLowerCase() === "no") {
            collector.stop("Finished");
          } else return message.channel.send("Opcion equivocada!");
          break;
      }
    })
    collector.on("end", async (collected, reason) => {
      //Uso "exit" para no crear un embed
      if (reason === "Exited") {
        message.channel.send("Ya veo, no quieres un embed.");

        //Quiere fields. Para este caso llamaremos a una función que retornará una promesa. Si se resuelve devuelve el embed, si no devolverá "una razón". Asi lo programe....
      } else if(reason === "field") {
        fields(message, embed).then(embed => {
          channel.send({ content: msgContent, embeds: [embed] });
        }).catch(reason => {
          //El usuario se demora mucho.
          if (reason === "idle") {
        message.channel.send("El tiempo maximo acabo(2 Minutos). Ejecuta el comando otra vez si quieres un embed.");
      } else {
        //Caso raro de que termine por otra razón...
        message.channel.send("Collector ended with reason: " + reason).catch(err => {});
      }
        });
      }
      else if(reason === "Finished") {
        //Terminó de hacer el embed
        channel.send({ content: msgContent, embeds: [embed] });
      } else if (reason === "idle") {
        //El usuario se demora mucho
        message.channel.send("El tiempo maximo acabo(2 Minutos). Ejecuta el comando otra vez si quieres un embed.");
      } else {
        //Caso raro de que termine por otra razón...
        message.channel.send("Collector ended with reason: " + reason).catch(err => {});
      }
    })
 
function fields(message, embed) {
  return new Promise((resolve, reject) => {
    //Variables.
    let o = 1;
    let i = 0;
    let title = "";
    let des = "";

    //Se puede cambiar al gusto
    let arr = ["Dime el nombre del Field", "Dime el contenido del field", "Quieres que sea un campo en linea?", "Quieres otro field?"];
    message.channel.send(arr[i]);

    //Otro colector
    const filtro = m => m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector({ filtro, idle: 120000 });
    collector.on("collect", m => {
      switch(i) {
        case 0:
          title = m.content
          i++;
          message.channel.send(arr[i]);
          break;
        case 1:
          des = m.content
          i++;
          message.channel.send(arr[i]);
          break;
        case 2:
          if(m.content.toLowerCase() === "si") {
            embed.addField(title, des, true)
            i++;
          } else if (m.content.toLowerCase() === "no") {
            embed.addField(title, des)
            i++;
          } else return message.channel.send("Opcion equivocada!");
          //No puedes crear más de 25 fields
          if (o <= 25) message.channel.send(arr[i]);
          else collector.stop("OK");
          break;
        case 3:
          //Si el usuario quiere más fields
          if(m.content.toLowerCase() === "yes") {
            o++
            title = undefined
            des = undefined
            i = 0;
            message.channel.send(arr[i]);
          } else if (m.content.toLowerCase() === "no") {
            collector.stop("OK");
          } else return message.channel.send("Opcion equivocada!");
          break;
      }
    })
    collector.on("end", (collected, reason) => {
      if(reason === "OK") {
        //Resolver promesa con el nuevo embed :)
        resolve(embed);
      } else {
        //Denegar en caso algo haya sucedido.
        reject(reason);
      }
    })
  })
}

      
  }
}