var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var ProviderSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Number,
    data: [
        {
            idx: Number,
            thumb: String,
            title: String,
            href: String,
            time: String,
            relate: String,
            source: String
        }
    ]
})

var ProviderModel = mongoose.model("Provider", ProviderSchema);

module.exports = ProviderModel;