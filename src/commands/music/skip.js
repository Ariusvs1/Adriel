const Commands = require('../../structures/Command');
const Discord = require('discord.js');
module.exports = class Skip extends Commands {
    constructor(client) {
        super(client, {
            name: "skip",
            description: "Salta canciones!",
            usage: "skip",
         });
    }

    async run(message) {

         if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")
        else {
            let queue = await this.client.distube.getQueue(message);
            if(queue){ 
                this.client.distube.skip(message);
                
        } else if(!queue){
            return;
        }
        }
    }
}