var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var ProviderSchema = new mongoose.Schema({
    sourceId: ObjectId,
    length: Number,
    data: [
        {
            idx: Number,
            thumb: String,
            title: String,
            href: String,
            time: String,
            relate: String,
        }
    ]
})

var ProviderModel = mongoose.model("Provider", ProviderSchema);

module.exports = ProviderModel;