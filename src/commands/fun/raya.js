const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Raya extends Commands {
    constructor(client) {
        super(client, {
          name: "3raya",
          alias: ["tresenraya", "raya", "game3"],
          usage: "3raya <mencion a un usuario>",
          enabled: false
         });
    }

    async run(message, args) {


const vs = message.mentions.users.first();
if(!vs) return message.channel.send("Debes mencionar a alguien!");

if(message.mentions.users.first().bot) return message.channel.send("No puedes jugar contra un bot!")

if(vs.id === client.user.id) return message.channel.send("No puedes jugar contra mi!");

const partida = new tresenraya.partida({ jugadores: [message.author.id, vs.id]});

partida.on("ganador", (jugador, tablero, paso) => {

message.channel.send('¡Ha ganado **' + client.users.cache.get(jugador).username + '** en esta partida! Después de `' + paso + ' pasos.`\n\n' + tablero.string + '\n\nLo siento, **' + client.users.cache.get(partida.perdedor).username + '**... 😦');
    

});

partida.on('empate', (jugadores, tablero, paso) => { // si se produce un empate se emite el evento 'empate'
    
    message.channel.send('¡Ha habido un empate entre ' + jugadores.map(x => client.users.cache.get(x).username).join(' y ') + '!');
      
});

message.channel.send('Empieza **' + client.users.cache.get(partida.turno.jugador).username + '**, elige un número del **1** al **9** [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
 
const colector = message.channel.createMessageCollector(msg =>  !msg.author.bot && !partida.finalizado);
 
colector.on('collect', (msg) => {
   // elegir la posición dependiendo del contenido del mensaje recolectado  
  if(partida.finalizado) {
    
    colector.stop();
    return;
    
  } 
  let num = parseInt(msg.content || "")
  if(!isNaN(msg.content) && (num >= 1 && num <= 9) && partida.disponible(msg.content) && msg.author.id === partida.turno.jugador){ 
    partida.elegir(msg.content)
    
  }
  
  switch(msg.content){  
      case "surrender".toLocaleLowerCase():
        if(msg.author.id != partida.turno.jugador) return message.channel.send("No es tu turno!")
        else {
           partida.finalizar() 
          message.channel.send(`\`${client.users.cache.get(partida.turno.jugador).username}\` se ha rendido.`)
        }
        break;
        case "end".toLocaleLowerCase():
          if(msg.author.id != partida.turno.jugador) return message.channel.send("No es tu turno!")
          else {
              partida.finalizar() 
              message.channel.send(`\`${client.users.cache.get(partida.turno.jugador).username}\` se ha rendido.`)
          }
          break;
          case "ff".toLocaleLowerCase():
            if(msg.author.id != partida.turno.jugador) return message.channel.send("No es tu turno!")
            else {
              partida.finalizar()
                message.channel.send(`\`${client.users.cache.get(partida.turno.jugador).username}\` se ha rendido.`)
            }
            break;
  }
      
  message.channel.send('Turno de **' + client.users.cache.get(partida.turno.jugador).username + '** [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
      
});


    }
}