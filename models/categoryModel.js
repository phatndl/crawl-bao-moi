var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
    caterogy_title: String,
    href: String,
    sub_caterogies_length: Number,
    sub_caterogies: [
        {title: String, href: String}
    ] 
})

var CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;