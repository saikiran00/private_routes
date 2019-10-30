const express = require('express');
const mongoose = require("mongoose");
const app = express();
//Routes
const authRoute =  require('./routes/auth');
const postRoute =  require('./routes/posts');

//dd connect
mongoose.set('useCreateIndex', true);
const url = "mongodb://127.0.0.1:27017/ninjago";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;


//middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, ()=> {
	console.log("called")
});