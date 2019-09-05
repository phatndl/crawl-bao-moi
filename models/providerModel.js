var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var ProviderSchema = new mongoose.Schema({
    thumb: String,
    title: String,
    href: String,
    time: String,
    relate: String,
    source: ObjectId
})

var ProviderModel = mongoose.model("Provider", ProviderSchema);

module.exports = ProviderModel;