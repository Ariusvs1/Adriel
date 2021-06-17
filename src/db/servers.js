const mongoose = require('mongoose');

const servers = new mongoose.Schema({

    servID: String,

    welcomes: {
      channel: {
        type: String,
        default: "none"
      
      },
      msg: {
        type: String,
        default: "none"
      },
      tipo: {
        type: String,
        default: "none"
      },
      img: {
        type: String,
        default: "none"
      },
      color: {
        type: String,
        default: "none"
      },
      titulo: {
        type: String,
        default: "none"
      },
      footer: {
        type: String,
        default: "none"
      },
      thumbnail: {
        type: String,
        default: "none"
      }
    },

    words: {
        type: [String],
        default: "¬¬¬¬"
            },

    prefix: { 
      type: String,
      default: "^"
    }

});

const Servers = mongoose.model("Servers", servers);

module.exports = Servers;