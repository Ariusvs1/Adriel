const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const Commands = require('../../structures/Command');
const googleIt = require('google-it');
const data = require('../../assets/sites.json');
module.exports = class Encuesta extends Commands {
    constructor(client) {
        super(client, {
          name: "search",
          alias: ["google", "srch"],
          description: "Busca algo en Google",
          usage: "search <texto a buscar>",
         });
    }

    async run(message, args) {
        if (!args[0]) return message.channel.send('Debes escribir algo.')
      //  if (bot.badwords.isProfane(args.slice(1).join(" ").toLowerCase()) && !message.channel.nsfw) return message.channel.send("To order this content go to an NSFW channel.")
       // message.channel.startTyping();
    
        const results = await googleIt({ 'query': args.slice(1).join(" "), 'limit': 7, disableConsole: true });
    
        if (results.some(e => checkCleanUrl(e.link)) && !message.channel.nsfw) {
          message.channel.stopTyping(true);
          return message.channel.send("Tu busqueda contiene **NSFW.** Ve a un canal NSFW e intenta otra vez.");
        }
    //    if (results.some(e => (bot.badwords.isProfane(e.title.toLowerCase()) || bot.badwords.isProfane(e.snippet.toLowerCase()))) && !message.channel.nsfw) {
      //    message.channel.stopTyping(true);
       //   return message.channel.send("Your search includes NSFW content. To order this content go to an NSFW channel.");
       // }
        let text = '';
        let i = 0;
        for (const elements of Object.values(results)) {
          i++
          const toadd = `${i}. [${elements.title}](${elements.link})\n${elements.snippet}\n\n`;
          if ((text.length + toadd.length) > 2040) break;
          text += toadd;
        }
        const embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setColor('RANDOM')
          .setTitle('Google Search Results')
          .setDescription(text)
          .setFooter('Powered by Google-it')
          .addField('Time', ((Date.now() - message.createdTimestamp) / 1000) + 's', true)
          .setTimestamp();
        const but_link_google = new MessageButton()
          .setStyle("LINK")
          .setURL(`https://www.google.com/search?q=${args.slice(1).join("+")}`)
          .setLabel("Google search link");
        message.channel.stopTyping(true);
        await message.channel.send({ embed: embed, component: but_link_google });

    }
}

function checkCleanUrl(urlFromReq) {
    const parsedUrl = new URL(urlFromReq);
    let host = parsedUrl.host || parsedUrl.pathname.trim().split("/")[0];
    if (host in data) return true;
    const thing = host.split(".");
    const check1 = thing.slice(thing.length - 2).join(".");
    const check2 = "www." + check1;
    if (check2 in data) return true;
    if (!host.startsWith('www.')) host = `www.${host}`;
    if (host in data) return true;
    return false;
}