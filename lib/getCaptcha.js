// getCaptcha.js

var crypto = require('crypto');
var SA = require('superagent');
var SAproxy = require('superagent-proxy');
SAproxy(SA);

function getResponse(url,callback){
    SA.get(url)
    .end(function(err,res){
        if (!err){
            callback(res);
        }else{
            console.log('retry get');
            setTimeout(function(){
                getResponse(url,callback,num)
            },500);
        }
    });
}

exports.get = function(id,q,t,callback){
    var url = "https://sojump.com/AntiSpamImageGen.aspx?q="+q+"&t="+t;
    getResponse(url,function(res){
        var cookie = res.headers["set-cookie"]; //获取cookie
        //储存id - cookie
        callback(res.body,cookie);
    });
}

