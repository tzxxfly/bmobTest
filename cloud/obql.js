/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var http = modules.oHttp;
    var app_key = request.body.app_key;
    var rest_key = request.body.rest_key;
    var page = request.body.page;//每页数据量
    var index = request.body.index;//当前页数
    if (!page)
        page = 100;
    if (!index || index<=0)
        index = 1;
    var skip = page * (index - 1);
    var limit = page * (index - 1) + page;

    var bql = 'bql=select include userId,* from votetime_list limit 0,100 where activityId=? order by createdAt';
    bql += '&values=["WZB3666L"]';

    var options = {
        url: 'https://api.bmob.cn/1/cloudQuery?' + bql,
        headers: {
            //'User-Agent': 'request'
            'X-Bmob-Application-Id': app_key,
            'X-Bmob-REST-API-Key': rest_key,
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //form: {"where": JSON.stringify({"objectId": "70506ea0bd"})},
        //method: 'POST'
        method: 'GET'
    };

    function callback(error, responseS, body) {
        if (error)
            response.end(error);
        if (!error && responseS.statusCode == 200) {
            var info = JSON.parse(body);
            var temp = {};
            var result = {};
            var data = [];
            //console.log(info.stargazers_count + " Stars");
            //console.log(info.forks_count + " Forks");
            for (var i = 0; i < info.results.length; i++) {
                var object = info.results[i];
                if (object.userId.objectId) {
                    object.userId.voteCreatedAt = object.createdAt;
                    temp[object.userId.objectId] = object.userId;
                }
                //result[object.userId.]
            }

            for (object in temp) {
                data[data.length] = temp[object];
            }
            result.data = data.slice(skip, limit);
            result.total = data.length;
            result.index = index;
            result.page=page;

            response.end(JSON.stringify(result));
        }
    }

    http(options, callback);

}
exports.obql = onRequest;