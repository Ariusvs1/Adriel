const Commands = require('../../structures/Command');
module.exports = class Hola extends Commands {
    constructor(client) {
        super(client, {
          name: "hola",
          alias: ["hi", "hello"],
         description: "Holaaaaaaa!",
         usage: "hola",
         });
    }

    async run(message) {

  
		message.reply("¡Hola! ¿Que tal?", { allowedMention: false});	
	
  }
}