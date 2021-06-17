const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
const Servers = require('../../db/servers.js');
module.exports = class Help extends Commands {
    constructor(client) {
        super(client, {
          name: "help",
          alias: ["ayuda"],
          description: "Lista de todos mis comandos o información sobre ellos.",
          usage: "help [categoria] / [comando]",
        });
    }
    async run(message, args) {
  const a = args[0];
let cat = this.client.commands.find((cmd) => cmd.category === a)
let com = this.client.commands.get(a);
const bebe = await Servers.findOne({ servID: message.guild.id })
let prefix = bebe ? bebe.prefix : "^"
if(!a) {

  let nuevo = this.client.commands.map((a) => a.category);
  const data = new Set(nuevo)
  const datos = [...data];

  function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );

    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

removeItemFromArr( datos, 'owner' )

  const embedDatos = new Discord.MessageEmbed()
  
  .setAuthor("Todas mis categorias de comandos.")
  .setDescription(`**<:ranboo:842255066496237619> | Menú de ayuda.**\nTengo \`${datos.length - 1}\` categorias y \`${this.client.commands.size}\` comandos disponibles para explorar.\n\n**Lista de comandos.**\n \`${prefix}help <categoria>\``)
   .addField("<:ranboo:842255066496237619> | Categorías.", "```" + "✥ | " + `${prefix}help ` + datos.join(`\n✥ | ${prefix}help `) + "```")
  .setFooter(`A r i u s versión 2.0.0`, this.client.user.displayAvatarURL())
  .setColor("#c50c92")
  message.channel.send(embedDatos);
} else if(a && cat){

  let ono =  this.client.commands.filter((cmd) => cmd.category === a)
  let huevos = ono.map(cmd => cmd.category)[0];
  const categoriaaa = {

   "fun": "Diversión",
   "music": "Música",
   "action": "Acción",
   "utility": "Utilidad",
   "manager": "Administración",
   "config": "Configuración",
   "mod": "Moderación",
   "misc": "Misceláneo"
  }   

const natu = categoriaaa[huevos] || "Privada"

const embed2 = new Discord.MessageEmbed()

.setAuthor(`Categoria ${natu}.`, this.client.user.displayAvatarURL())
.setDescription(`Para obtener ayuda detallada sobre un comando usa \`${prefix}help <comando>\``)
.addField("<:ranboo:842255066496237619> | Comandos.", "```" + ono.map(cmd => cmd.name).join(' | ') + "```")
.setColor("#c50c92")
message.channel.send(embed2)

} else if(a && com) {
  let na = com.name;
  let uso = com.usage;
  let alias = com.alias ? com.alias.join(" ") : "No tiene"
  let des = com.description;

  const embed = new Discord.MessageEmbed()
  .setAuthor(`Comando ${na}`, this.client.user.displayAvatarURL())
  .setDescription(`<:ranboo:842255066496237619> | ${des}\n\n**Uso:**\n\`${prefix}${uso}\`\n\n**Alias:**\n\`${alias}\``)
  .setFooter("Sintaxis: <requerido> | [Opcional]")
  .setColor("PURPLE") 
  message.channel.send(embed)
} else {
  message.channel.send("Esta categoria o comando no existe!")
}



 }    
}