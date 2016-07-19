function onRequest(request, response, modules) {
    
    var db = modules.oData;
    db.find({
        "table": "activity",             //表名
        "where":{
            "objectId":"WZB3666L"
        }
    }, function (err, data) {
        //data是json字符串，为了查看方便（无转移字符）将返回结果转换为Json对象
        //var resultObject = JSON.parse(data);
        response.end(data || err);
    });

}

exports.first = onRequest;