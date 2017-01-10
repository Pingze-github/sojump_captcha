// server.js

/**IMPORT**/
var fs = require('fs');
var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var getCaptcha = require('./lib/getCaptcha.js');

/** SET **/
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./src')); //add src files

/**FUNCTION**/
function sendViewMiddleware(req, res, next) { //send .html
    res.sendHtml = function(html) {
        return res.sendFile(__dirname + "/" + html);
    }
    next();
}
app.use(sendViewMiddleware);

/**VARIABLE**/
var data = {};

/**GET**/
app.get('/', function (req, res) { //主页
    console.log("[SERVER][GET] /");
    res.sendHtml('index.html');
});

app.get('/img', function(req, res){
    console.log("[SERVER][GET] /img");
    var params = url.parse(req.url,true).query;
    //console.log(params)
    var id = params["id"];
    var q = params["q"];
    var t = params["t"];
    getCaptcha.get(id,q,t,function(img,cookie){
        data[id] = {
            "q":q
            ,"t":t
            ,"cookie":cookie
            ,"code":null //尚未获取
        }
        res.send(img);
    })
});

app.post('/post', function (req, res) { //pipe
    console.log("[SERVER][POST] /post");
    //console.log(req.body)
    var id = req.body["id"];
    var code = req.body["code"];
    if(typeof(data[id])!="undefined"){
        data[id]["code"] = code;
        var json = JSON.stringify(data);
        fs.writeFileSync('./captcha.json',json);
        res.send("saved");
        console.log("成功储存：");
        console.log(data[id]);
    }else{
        res.send("invalid");
    }
});

/**启动服务器**/
var server = app.listen(9999, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Sever Start @ http://%s:%s", host, port)
}); //于指定端口启动服务器



/*
考虑按q分类数据
考虑使用微型数据库存储和查询数据
*/
