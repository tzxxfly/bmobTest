/**
 * Created by xfly2 on 2016/7/26.
 */
var myBql = {};
var request = require('request');
myBql.exec = function (param, callback) {



    var ops = require("../AppConfig.json");
    var bql = "bql=" + param.bql;
    var values = "values="
    if(param.values) {
         values = "values=" + param.values;
    }
    //var bql = 'bql=select include userId,* from activity where userId=? limit ?,? ';
    /*var values = 'values=["' + activityId + '"]';*/
    ///var values = 'values=["5f659fc1eb",0,10]';

    var options = {
        url: 'https://api.bmob.cn/1/cloudQuery?' + bql + "&" + values,
        headers: {
            //'User-Agent': 'request'
            'X-Bmob-Application-Id': ops.app_key,
            'X-Bmob-REST-API-Key': ops.rest_key,
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //form: {"where": JSON.stringify({"objectId": "70506ea0bd"})},
        //method: 'POST'
        method: 'GET'
    };

    request(options, function rquestCallback(error, responseS, body) {
        callback(error, body);

        /*            if (error)
         response.end(error);
         if (!error && responseS.statusCode == 200) {
         //ep.emit('timebody', body);
         function (err, data)
         }
         else {
         response.end(body);
         }*/
    });


    /* function httpRequest(ops, emitstr) {
     http(ops, function callback(error, responseS, body) {
     if (error)
     response.end(error);
     if (!error && responseS.statusCode == 200) {
     //ep.emit('timebody', body);
     function (err, data)
     }
     else {
     response.end(body);
     }
     });
     }

     httpRequest(options, 'data');*/
}

exports.myBql = myBql;