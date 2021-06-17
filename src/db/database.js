const mongoose = require("mongoose");

const URL = "mongodb+srv://Arius:ariusbt1@arius.7udox.mongodb.net/data1?retryWrites=true&w=majority"


mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

.then(db => console.log('📌 Conectado'))
.catch(err => console.log(err));