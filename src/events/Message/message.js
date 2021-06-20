const Events = require('../../structures/Event')
const Servers = require('../../db/servers')
const Profile = require('../../db/Profile.js')
const Discord = require('discord.js-light')
module.exports = class Message extends Events {
    constructor(client) {
        super(client, {
            name: 'message'
        })
    }

    async run(message) {

       
     let i = await Servers.findOne({ servID: message.guild.id });

        let prefix = i ? i.prefix : "^";
        if (!message.author) return;

        const prefixes = [prefix, `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];

        const usedPrefix = prefixes.find((p) => message.content.startsWith(p));
        if (!usedPrefix || message.author.bot) return;
        if (usedPrefix !== prefix)
            message.mentions.users.delete(message.mentions.users.first().id);

        const args = message.content.slice(usedPrefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.find(c => c.name === command || c.aliases.includes(command));
        if (!cmd) return;
        try {
            if (!cmd.canRun(message)) return;
            cmd.run(message, args);
        } catch (e) {
            console.log(e.stack || e);
            message.channel.send(`Un error a ocurrido: ${e.message || e}`);
        }
    }
}
async function appendXp(userId, guildId, xp) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (xp == 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("An amount of xp was not provided/was invalid.");

    const user = await Profile.findOneAndUpdate({ userID: userId, guildID: guildId }, { $inc: { xp: xp  } });

    if (!user) {
      const newUser = new Profile({
        userID: userId,
        guildID: guildId,
        xp: xp
      });

      await newUser.save().catch(e => console.log(`Failed to save new user.`));
    } 

 
    await user.save().catch(e => console.log(`Failed to append xp: ${e}`) );

  }