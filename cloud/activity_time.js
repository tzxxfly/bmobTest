function onRequest(request, response, modules) {

//获取数组对象
    //var content = request.body.nameContent;
    //var bat = modules.oBatch;
    //var data=JSON.parse(content)
    var db = modules.oData;




    var data2 = {};
    data2["aaa1"] = 1;
    data2["aaa2"] = 2;
    data2["aaa3"] = 3;
    data2["aaa4"] = 4;
    data2["baa4"] = 5;
    data2["aaa4"] = 6;

    db.find({
        "table": "votetime_list",
        "keys": "include activityId",
        "where": {
            "activityId":"WZB3666L"
             //"$or":[{"username":"会飞的猪"}]
            //"objectId":"OmB3XXXc"
        }
    }, function (err, data) {
        response.end(data);
    });







    //response.end(JSON.stringify(data));
}

exports.activity_time = onRequest;