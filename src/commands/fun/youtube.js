const Commands = require('../../structures/Command');
const Discord = require('discord.js-light');
const fetch = require("node-fetch");
module.exports = class Youtube extends Commands {
    constructor(client) {
        super(client, {
          name: "youtube",
         alias: ["yt"],
         description: "Mira cualquier video de Youtube con tus amigos sin compartir pantallá",
         usage: "youtube",
         });
    }

    async run(message, args) {
        let option = args[0];
        if(!option) return message.reply(`Debes elegir una de estas opciones!\n\n**Youtube:** 1\n**Poker:** 2\n**Betrayal:** 3\n**Fishing:** 4\n**Chess:** 5`)
        let channel = message.member.voice.channel;
        if(!channel) return message.reply("Debes estar en un canal de voz!")

        const defaultApplications = {
            //Youtube
            '1':   '755600276941176913', // Note : Thanks to Snowflake thanks to whom I got YouTube ID
          //Poker
            '2':     '755827207812677713',
            //Betrayal
            '3':  '773336526917861400',
            //Fishing
            '4':   '814288819477020702',
          //Chess
            '5':     '832012586023256104'  // Note : Thanks to Asterio thanks to whom I got chess ID
        };
        const aplication = defaultApplications[option]

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_use: 0,
                target_application_id: aplication,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODI5NDgzOTk4MzQ5ODg1NDcx.YG4zLA.2oC_Hk8QSUoaiZK4Y5D1Kxr8a58`,
                "Content-Type": "application/json"
            }
           
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send("No puedo iniciar un yt toggeter :C")
            message.channel.send(`https://discord.com/invite/${invite.code}`)
        })

    }
}