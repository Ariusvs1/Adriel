const mongoose = require("mongoose");

const URL = process.env.MONGO


mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

.then(db => console.log('📌 Conectado'))
.catch(err => console.log(err));
