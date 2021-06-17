const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
module.exports = class Stop extends Commands {
    constructor(client) {
        super(client, {
            name: "stop",
            description: "Deten la música en reproducion.",
            usage: "stop",
         });
    }

    async run(message) {
    
        if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")

        let queue = await this.client.distube.getQueue(message);
        if(queue){ 
            this.client.distube.stop(message);

         message.channel.send("Bye Bye! 👋")
    } else {
        return;
    }
    }
}