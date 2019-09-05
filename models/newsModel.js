var mongoose = require("mongoose");

var NewsSchema = new mongoose({
    singleTitle: String,
    time: String,
    singleExcerpt: String,
    listNews: [
        {
            title: String
        }
    ],
    singleMainContent: [
        {title: String, img: String}
    ],
    extraContent: [
        {
            title: String, 
            intro: String,
            img: String
        }
    ]

})

var NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;