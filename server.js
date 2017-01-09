// server.js

/**IMPORT**/
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

/**GET**/
app.get('/', function (req, res) { //主页
    console.log("[SERVER][GET] /");
    res.sendHtml('index.html');
});

app.get('/img', function(req, res){
    var params = url.parse(req.url,true).query;
    console.log(params)
    var q = params["q"];
    var t = params["t"];
    getCaptcha.get(q,t,function(img){
        res.send(img);
    })
});

app.post('/post', function (req, res) { //pipe
    console.log("[SERVER][GET] /post");
    console.log(req.body);
    res.send("done");
});

/**启动服务器**/
var server = app.listen(9999, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Sever Start @ http://%s:%s", host, port)
}); //于指定端口启动服务器



