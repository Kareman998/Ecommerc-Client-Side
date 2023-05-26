require('dotenv').config();

const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})

