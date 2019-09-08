var categoryModel = require("../models/categoryModel");
const cheerio = require('cheerio');
var { format } = require("../utils/format");
var Caterogy = class categories{

    constructor(){
        this.category_data = [];
    }

    get data(){
        return this.category_data;
    }

    process(body){
        var self = this;
        var $ = cheerio.load(body);
        $(".main-filter").find("a").each((i, el) => {
            self.category_data.push({
                caterogy_title: format($(el).first().text())[0],
                sub_caterogies_length: 0,
                href: $(el).attr("href")        
            })
        })
    
        $(".nav__parent").each((i, el) => {
            // parent
            var parent = $(el).find("a").first();
            var href = $(parent).attr("href");
    
            // childs
            var childs = $(el).find(".nav__child a");
            var sub_caterogies = [];
    
            // save href childs
            if (childs.length > 1){
                $(childs).each((i, child) => {
                    // var obj = 
                    self.category_data.push({
                        caterogy_title: format(childs.text())[i],
                        href: $(child).attr("href")   
                    });
                })
                // $(childs).each((i, child) => {
                //     sub_caterogies.push({
                //         title: format(childs.text())[i],
                //         href: $(child).attr("href")
                //     })
                // })
            }
            
            if (format(parent.text()) && href){
                var obj = {
                    caterogy_title: format(parent.text())[0], 
                    href,
                    // sub_caterogies_length: sub_caterogies.length,
                    // sub_caterogies
                }
                self.category_data.push(obj);
            }
        })                 
        return this;
    }



    save(){
        if (this.category_data.length){
            categoryModel.create(this.category_data, (err, result) => {
                if (err) return new Error(err);
                console.log("category is created in database");
            })

            return this;
        }
    }

    async find(condition){
        return new Promise((resolve, reject) => {
            categoryModel.find(condition, (err, result) => {
                if (err) reject(new Error(`can't find ${condition}`));
                resolve(result);
            })
        })
    }

    get(){
        return new Promise((resolve, reject) => {
            categoryModel.find((err, result) => {
                if (err) reject(new Error("can't get categories from database"));
                resolve(result);
            })
        })
    }

    // parse parent and childrent in same level
}

module.exports = Caterogy;

// exports.saveCaterogies = (data) => {
//     categoryModel.create(data)
//     .then(result => {console.log("category is created in database")})
//     .catch(e => {console.log(e)})
// }

// exports.getCaterogies = () => {
//     return new Promise((resolve, reject) => {
//         categoryModel.find((err, result) => {
//             if (err) reject(new Error("can't get categories from database"));
//             resolve(result);
//         })
//     })
   
// }