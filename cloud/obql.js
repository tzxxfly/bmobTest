/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var http = modules.oHttp;
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var app_key = request.body.app_key;
    var rest_key = request.body.rest_key;
    var activityId = request.body.activityId;
    var page = request.body.page;//每页数据量
    var index = request.body.index;//当前页数
    if (!page)
        page = 100;
    if (!index || index <= 0)
        index = 1;
    var skip = page * (index - 1);
    var limit = page * (index - 1) + page;

    ep.all('timebody', 'addressbody', function (timebody, addressbody) {
        var info_time = JSON.parse(timebody);
        var info_address=JSON.parse(addressbody);
        var temp = {};
        var result = {};
        var data = [];
        for (var i = 0; i < info_time.results.length; i++) {
            var object = info_time.results[i];
            if (object.userId.objectId) {
                //object.userId.voteCreatedAt = object.createdAt;
                var user={};
                user.nickname=object.userId.nickname;
                if(object.userId.headPhoto)
                    user.headPhoto=object.userId.headPhoto.url;
                user.voteCreatedAt=object.createdAt;
                temp[object.userId.objectId] = user;
            }
            //result[object.userId.]
        }

        for (var i = 0; i < info_address.results.length; i++) {
            var object = info_address.results[i];
            if (object.userId.objectId) {
                //object.userId.voteCreatedAt = object.createdAt;
                //temp[object.userId.objectId] = object.userId;
                var user={};
                user.nickname=object.userId.nickname;
                if(object.userId.headPhoto)
                    user.headPhoto=object.userId.headPhoto.url;
                user.voteCreatedAt=object.createdAt;
                temp[object.userId.objectId] = user;
            }
            //result[object.userId.]
        }

        for (object in temp) {
            data[data.length] = temp[object];
        }
        result.data = data.slice(skip, limit);
        result.total = data.length;
        result.index = index;
        result.page = page;
        result.totalPage= Math.ceil(data.length/page)

        response.end(JSON.stringify(result));
    });



    var bql_time = 'bql=select include userId,* from votetime_list  where activityId=? order by createdAt';
    bql_time += '&values=["' + activityId + '"]';

    var bql_address = 'bql=select include userId,* from voteaddress_list  where activityId=? order by createdAt';
    bql_address += '&values=["' + activityId + '"]';

    var options_time = {
        url: 'https://api.bmob.cn/1/cloudQuery?' + encodeURI(bql_time),
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

    var options_address = {
        url: 'https://api.bmob.cn/1/cloudQuery?' + encodeURI(bql_address),
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



    http(options_time, function callback(error, responseS, body) {
        if (error)
            response.end(error);
        if (!error && responseS.statusCode == 200) {
            ep.emit('timebody', body);
        }
    });

    http(options_address, function callback(error, responseS, body) {
        if (error)
            response.end(error);
        if (!error && responseS.statusCode == 200) {
            ep.emit('addressbody', body);
        }
    });

}
exports.obql = onRequest;