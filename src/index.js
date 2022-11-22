const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/route.js');
const { default: mongoose } = require('mongoose');
const app = express();


app.use(bodyParser.json());

mongoose.connect("mongodb+srv://manjunathkc:krLwKYZrOSmltQIw@cluster0.clnn3jh.mongodb.net/group37Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
app.use('/', route);


app.listen(3000, function () {
    console.log('Express app running on port ' +  3000)
});