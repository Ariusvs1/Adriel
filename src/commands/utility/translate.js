const {  languages } = require('@vitalets/google-translate-api');
const  translate = require('@vitalets/google-translate-api');
const { MessageEmbed } = require("discord.js");
const Commands = require('../../structures/Command');
module.exports = class Translate extends Commands {
    constructor(client) {
        super(client, {
          name: "translate",
          aliases: "tl",
          description: "Traduce el texto que quieras a otro idioma.",
          usage: "translate <texto>",
         });
    }

    async run(message, args) {

        if (!args[0])
            return message.channel.send("Necesitas un texto para traducirlo!");
        //Get language
        let lang = args[args.length - 1];
        if (lang.charAt(0) == '-') {
            lang = lang.substring(1);
            args.pop();
        } else {
            lang = "es"
        }
        
        const reallang = languages.getCode(lang);
        if (!reallang) return message.channel.send("No es un idioma!\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js")

        //Get text
        const text = args.join(" ");
        if (text.length > 700) {
            await message.channel.send("El mensaje es demasiado largo!")
            return;
        }
        const result = await translate(text, { to: reallang });
        const embed = new MessageEmbed()
            .setTitle("Translate")
            .setColor("RANDOM")
            .addField('Texto', `\`\`\`css\n${text}\`\`\``)
            .addField('Idioma', `\`\`\`css\n${reallang}\`\`\``)
            .addField(`Traducción ${result.from.text.autoCorrected ? "(Corregida)" : ""}`, `\`\`\`css\n${"" + result.text}\`\`\``)
            .setTimestamp();
        if (result.from.text.didYouMean) {
            embed.addField("Querías decir ?", `\`\`\`css\n${result.from.text.value}\`\`\``);
        }
        await message.channel.send({embeds: [embed]});
    }
}