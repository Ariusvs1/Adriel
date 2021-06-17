const Distu = require('../../structures/Distu')
module.exports = class SearchCancel extends Distu {
    constructor(client) {
        super(client, {
            name: 'searchCancel'
        })
    }

    async run(message) {


    message.channel.send("Utiliza el comando otra vez para buscar una canción.")
  }
}
