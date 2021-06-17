const Commands = require('../../structures/Command');
const Quiz = require('../../db/quiz.js');
module.exports = class Count extends Commands {
    constructor(client) {
        super(client, {
          name: "count",
          devsOnly: true,
         });
    }

    async run(message) {

await Quiz.countDocuments(function(err, count) {
  if (err) console.log(err);

  message.channel.send("Hay " + count + " artículos.")
})


 }
}