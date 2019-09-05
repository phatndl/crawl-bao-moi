var app = require("./app");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
var config = require("./config/config.json");


var database_mongo = process.env.DATABASE.replace("username", config.mongo.username).replace("password", config.mongo.password);

mongoose.connect(database_mongo, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(connection => console.log("MongoDB is connected"));

const port = process.env.PORT || 8080;
app.listen(port || 8080, () => {
    console.log("Server is running on port " + port);
})

