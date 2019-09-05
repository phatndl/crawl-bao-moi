var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var SourceSchema = new mongoose.Schema({
    title: String,
    href: String
})

var SourceModel = mongoose.model("Source", SourceSchema);

module.exports = SourceModel;