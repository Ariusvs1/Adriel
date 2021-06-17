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

    async run(message, args) {

  
		message.reply("¡Hola! ¿Que tal?", {mention: false});	
	
  }
}