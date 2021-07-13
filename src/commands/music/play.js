const Commands = require('../../structures/Command');
module.exports = class Play extends Commands {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p", "pa"],
            description: "Reproduce la cancion que quieras!",
            usage: "p <nombre da la cancion>",
            enabled: false,
         });
    }

    async run(message, args) {

        if(!message.member.voice.channel) return message.channel.send("No estas en un canal de voz!");
        if(message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo!")
        else {

        const music = args.join(" ");

        if(!music) return message.channel.send("Debes escribir una canción!")
        
        this.client.distube.play(message, music);
        }
    }
}