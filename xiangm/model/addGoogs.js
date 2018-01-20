var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	goodsName : String,
	goodsNumber : String,
	xiaoliang : String,
	price : String,
	create_date:{type:Date,default:Date.now}
});
var GoodsModel = mongoose.model("lijian",Goods);
module.exports = GoodsModel;