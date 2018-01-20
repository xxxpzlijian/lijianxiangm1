var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/addGoogs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '后台模版'});
});
router.post('/api/login4ajax', function(req, res, next) {
  	var username = req.body.username;
  	var psw = req.body.psw;
  	console.log(username,psw)
  	var result = {
  		code : 1,
  		message : "登录成功"
  	}
  	// console.log(UserModel.find({username:123}))
  	UserModel.find({username:username,psw:psw},function(err,dosc){
  		console.log(dosc)
  		if(dosc.length > 0){
  			req.session.username = username;
  			res.json(result);
  			return
  		}else{
  			result.code = -100;
  			result.message = "登录失败，密码或帐号错误";
  			res.json(result);
  			res.end()
  	  		}
  	})
});

router.get('/loginAction', function(req, res, next) {
  res.render('loginAction', { title: '后台系统'});
});
router.all('/api/shangping', function(req, res, next) {
    var goodsName = req.body.goodsName;
    var goodsNumber = req.body.goodsNumber;
    var xiaoliang = req.body.xiaoliang;
    var price = req.body.price;
    var result = {
      code: 1,
      message: "注册成功"
    };
    console.log(goodsName,goodsNumber)
    var um = new GoodsModel();
    um.goodsName = goodsName;
    um.goodsNumber = goodsNumber;
    um.xiaoliang = xiaoliang;
    um.price = price;
    um.save(function(err){
      if(err){
        result.code = -110;
        result.message = "添加失败";
        res.send("添加失败")
        return;
      }
      res.json(result);
    })
});
/*router.post('/goods', function(req, res, next) {
    var goodsName = req.body.goodsName;
    GoodsModel.find({goodsName: {$regex:goodsName}}, (err, docs)=>{
        if(docs.length > 0){
            res.json(docs);
        }else{
          console.log("没有商品")
        }
  });

})*/
router.get('/ajaxfeny', function(req, res, next) {
  var condition = req.query.condition;
  // 注意代码的健壮性
  // 测试中，有异常系测试。 后端最头疼的是异常系测试。
  var pageNO = req.query.pageNO || 1;
  pageNO = parseInt(pageNO);
  var perPageCnt = req.query.perPageCnt || 10;
  perPageCnt = parseInt(perPageCnt);
 console.log(condition)
  GoodsModel.count({goodsNumber: {$regex: condition}}, function(err, count){
    if(err){
      console.log(9)
    }
    console.log("数量:" + count);
    var query = GoodsModel.find({goodsNumber: {$regex: condition}})
    .skip((pageNO-1)*perPageCnt).limit(perPageCnt);
    query.exec(function(err, docs){
      console.log(err, docs);
      var result = {
        total: count,
        data: docs,
        pageNO: pageNO
      }
      res.json(result);
    });
  })
});

module.exports = router;
