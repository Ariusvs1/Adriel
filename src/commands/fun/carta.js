const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Carta extends Commands {
    constructor(client) {
        super(client, {
          name: "carta",
         alias: ["crt"],
         description: "Enviale una carta a alguien a su MD.",
         usage: "carta <tag/mencion> <anonimo> <tipo> <color>",
         });
    }

    async run(message, args) {

if (args.length < 4) {
    message.channel.send("**Carta** - envia una carta a otro usuario.\n**Uso:** `^carta <tag/mencion> <anonimo> <tipo> <color> <mensaje>`\n**Argumentos:**\n- tag: La discord tag del usuario (Ej: Tom#8132) `o mencionalo con su @`\n\n- anonimo: Enviar anónimamente el mensaje (s/n)(s = sí, n = no)\n\n- tipo: Elige el tipo de carta que quieres enviar. Normal: `i` o de amor: `l`\n\n- Color: Elige el color que quieras que tenga el embed. `Asegurate de que sea un codigo hex.`\n(Ej: `#C27C0E`) Si quieres un color al azar escribe `r`.\n\n- mensaje: El mensaje que quieres enviar")
  } else {
    var tag = args[0];
    var anon = args[1];
    var type = args[2];
    var colo = args[3];
    var mensaje = args.slice(4).join(" ");
    var target = message.guild.members.cache.find(m => m.user.tag == tag) || message.mentions.users.first();
     if(!target) return message.channel.send("Oh no! No se ha encontrado al usuario.");
  
    anon = anon.toLowerCase();
    if(anon != "s" && anon != "n") return message.channel.send("Argumento `anonimo` vacio. **(Respuestas validas:** `s` **/** `n`**)**");
   type = type.toLowerCase();
    if(type != "i" && type != "l") return message.channel.send("Argumento `tipo` vacio. **(Respuestas validas:** `i` **/** `l`**)**");
    colo = colo.toLowerCase();
    if(colo == "r") {
      colo = "RANDOM";
    }

  

     if (anon == "s" && type == "i") {
       let pagina = 1;

        let correo = new Discord.MessageEmbed()

        .setTitle("Tienes una carta en tu buzon.")
        .setDescription("```Si quieres abrirla reacciona al emoji.```")
        .setThumbnail("https://cdn.discordapp.com/attachments/838296053106606081/838297618311413790/lindo.png")
        .setFooter(`Autor anonimo.`)
        .setColor(colo)

        let carta = new Discord.MessageEmbed()

        .setTitle("Servicio de mensajeria.")
        .setDescription(mensaje)
        .setFooter("Autor anonimo.")
        .setColor(colo)
        
        const mail = [
          correo,
          carta
        ]
      
      let msg = await target.send(mail)
      msg.react("<:mail:838301794794471454>")
      const reaccion = (reaction, user) => reaction.emoji.id === '838301794794471454' && user.id === target.id;
      const raction = msg.createReactionCollector(reaccion, {time: 120000});
      
      raction.on("collect", async function(r){
        
        pagina++;
        await msg.edit(mail[pagina-1])
       })

    } else if (anon == "s" && type == "l") {
    
        let pagina = 1;

        let correo = new Discord.MessageEmbed()

        .setTitle("Tienes una carta en tu buzon.")
        .setDescription("```Si quieres abrirla reacciona al emoji.```")
        .setThumbnail("https://cdn.discordapp.com/attachments/838296053106606081/838296220413198366/car.png")
        .setFooter(`Autor anonimo.`)
        .setColor(colo)

        let carta = new Discord.MessageEmbed()

        .setTitle("Servicio de mensajeria.")
        .setDescription(mensaje)
        .setFooter("Autor anonimo.")
        .setColor(colo)
        
        const mail = [
          correo,
          carta
        ]
      
      let msg = await target.send(mail)
      msg.react("<:car:838301835210784789>")
      const reaccion = (reaction, user) => reaction.emoji.id === '838301835210784789' && user.id === target.id;
      const raction = msg.createReactionCollector(reaccion, {time: 120000});
      
      raction.on("collect", async function(r){
        
        pagina++;
        await msg.edit(mail[pagina-1])
       })
      
      

    } else if (anon == "n" && type == "i") {
 
        
        let pagina = 1;

        let correo = new Discord.MessageEmbed()

        .setTitle("Tienes una carta en tu buzon.")
        .setDescription("```Si quieres abrirla reacciona al emoji.```")
        .setThumbnail("https://cdn.discordapp.com/attachments/838296053106606081/838297618311413790/lindo.png")
        .setFooter(`Autor: ` + message.author.tag)
        .setColor(colo)

        let carta = new Discord.MessageEmbed()

        .setTitle("Servicio de mensajeria.")
        .setDescription(mensaje)
        .setFooter("Autor: " + message.author.tag)
        .setColor(colo)
        
        const mail = [
          correo,
          carta
        ]
 
      let msg = await target.send(mail)
      msg.react("<:mail:838301794794471454>")
      const reaccion = (reaction, user) => reaction.emoji.id === '838301794794471454' && user.id === target.id;
      const raction = msg.createReactionCollector(reaccion, {time: 120000});

      raction.on("collect", async function(r){
         
        pagina++;
        await msg.edit(mail[pagina-1])
       })
      
      
    } else if (anon == "n" && type == "l") {

       
        let pagina = 1;

        let correo = new Discord.MessageEmbed()

        .setTitle("Tienes una carta en tu buzon.")
        .setDescription("```Si quieres abrirla reacciona al emoji.```")
        .setThumbnail("https://cdn.discordapp.com/attachments/838296053106606081/838296220413198366/car.png")
        .setFooter(`Autor: ` + message.author.tag)
        .setColor(colo)

        let carta = new Discord.MessageEmbed()

        .setTitle("Servicio de mensajeria.")
        .setDescription(mensaje)
        .setFooter("Autor: " + message.author.tag)
        .setColor(colo)
        
        const mail = [
          correo,
          carta
        ]

      let msg = await target.send(mail)
      msg.react("<:car:838301835210784789>")
      const reaccion = (reaction, user) => reaction.emoji.id === '838301835210784789' && user.id === target.id;
      const raction = msg.createReactionCollector(reaccion, {time: 120000});

      raction.on("collect", async function(r){
        
        pagina++;
        await msg.edit(mail[pagina-1])
       })

      }
  
  message.channel.send(`El mensaje fue enviado con exito.`)
    message.delete()
  }
  }
}
