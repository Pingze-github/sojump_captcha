// storage.js

var fs = require('fs');
var storage_path = './storage.json';

exports.push = function(data,callback){
    var q=data.q;
    var t=data.t;
    var code=data.code;
    if(typeof(storage)=="undefined"){
        storage = {};
    }
    if(typeof(storage[q])=="undefined"){
        storage[q] = []
    }
    storage[q].splice(0,0,{
        't':t
        ,'code':code
    });
    var json = JSON.stringify(storage);
    fs.writeFile(storage_path, json, function(err){
        if (err){
            console.error(err);
            callback('error');
        }else{
            callback('done');
        }
    })
}
