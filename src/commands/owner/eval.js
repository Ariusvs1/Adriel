const Commands = require('../../structures/Command');
const Discord = require('discord.js');
const Quiz = require('../../db/quiz.js');
const data = require('../../src/config.js');
const jsp = require('jspaste');
module.exports = class Eval extends Commands {
    constructor(client) {
        super(client, {
          name: "eval",
          aliases: ["e", "ev"],
          devsOnly: true,
         });
    }

    async run(message, args) {

        async function enviar(mensaje) {
        return await message.channel.send(mensaje)
        }

        async function exec(codigo) {
        return await require("child_process").execSync(codigo)
        }

    
        function mayuscula(string) {
            string = string.replace(/[^a-z]/gi, '')
            return string[0].toUpperCase()+string.slice(1)
        }
    

        let tiempo1 = Date.now()
    
    
        const edit = new Discord.MessageEmbed()
        .setDescription("Evaluando...")
        .setColor("#7289DA")
        message.channel.send({embeds: [edit]}).then(async msg => { 
            try {
              let code = args.join(" ");
              let evalued = await eval(code);
              let tipo = typeof evalued||"Tipo no encontrado."
              if (typeof evalued !== 'string') evalued = require('util').inspect(evalued, { depth: 0, maxStringLength: 2000});
              let txt = "" + evalued;

    
              if (txt.length > 1000) {

                let link = await jsp.publicar(`- - - - Eval - - - -\n\n${txt.replace(this.client.token, "Wow, un token")}`)
            
                const embed = new Discord.MessageEmbed()
                .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
                .addField(":outbox_tray: Salida", `\`El codigo es muy largo, link:\` ${link.url}`)
                .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
                .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
                .setColor("#7289DA")
                msg.edit({embeds: [embed]});
  
        
              } else { 
    
    
                const embed = new Discord.MessageEmbed()
                .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
                .addField(":outbox_tray: Salida", `\`\`\`js\n${txt.replace(this.client.token, "No quieres saber eso.")}\n\`\`\``)
                .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
                .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
                .setColor("#7289DA")
                msg.edit({embeds: [embed]});
              }
            } catch (err) {          
              let code = args.join(" ")
              const embed = new Discord.MessageEmbed()
              .setAuthor("Error en el eval", this.client.user.displayAvatarURL({dynamic : true}))
              .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
              .addField(":outbox_tray: Salida", `\`\`\`js\n${err}\n\`\`\``)
              .addField(":file_folder: Tipo", `\`\`\`js\nError\n\`\`\``)
              .setColor("RED")
              msg.edit({embeds: [embed]});
          }
        })
        } 

  }
