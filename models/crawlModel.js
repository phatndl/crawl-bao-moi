var mongoose = require("mongoose");
const crawlSchema = new mongoose.Schema({
    sourceFrom: {type: String, trim: true},
    link: String,
    data: [{
        thumb: String,
        text: String,
        link: String,
        time: String,
        relate: String
    }]
})

const Crawl = mongoose.model("Crawl", crawlSchema);
module.exports = Crawl;