var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var NewsSchema = new mongoose.Schema({
    breadthumb_current: String,
    _id: ObjectId,
    article_header: String,
    href: String,
    // article_source: String,
    // article_time: String,
    article_sapo: String,
    // article_author: Array,
    // article_publish: String,
    // article_summary: String,
    article_body: Array
    // headline: String,
    // author: {
    //     src: String,
    //     mail: String,
    //     rating: String
    // },

    // sapo: {
    //     content: String,
    //     highlight: String
    // },

    // contentAvatar: {
    //     src: string,
    //     content: String
    // },

    // mainDetails: [
    //     {content: String, src: String}
    // ]

    // singleTitle: String,
    // time: String,
    // singleExcerpt: String,
    // listNews: [
    //     {
    //         title: String
    //     }
    // ],
    // singleMainContent: [
    //     {title: String, img: String}
    // ],
    // extraContent: [
    //     {
    //         title: String, 
    //         intro: String,
    //         img: String
    //     }
    // ]

})

var NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;