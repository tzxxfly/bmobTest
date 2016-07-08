function onRequest(request, response, modules) {

//获取数组对象
    var content = request.body.nameContent;
    var bat = modules.oBatch;
    var data=JSON.parse(content)

    //批量操作
    bat.exec({
        "data": {
            "requests": [
                {
                    "method": "POST",
                    "path": "/1/classes/voteaddress",
                    "body": {
                        "activityAddress": "越秀区呵呵呵4",
                        "activityId": {"__type":"Pointer","className":"activity","objectId":"WZB3666L"},
                        "userId": {"__type":"Pointer","className":"user","objectId":"5f659fc1eb"}
                    }
                },
                {
                    "method": "POST",
                    "path": "/1/classes/voteaddress",
                    "body": {
                        "activityAddress": "越秀区呵呵呵5",
                        "activityId": {"__type":"Pointer","className":"activity","objectId":"WZB3666L"},
                        "userId": {"__type":"Pointer","className":"user","objectId":"5f659fc1eb"}
                    }
                },
                {
                    "method": "POST",
                    "path": "/1/classes/voteaddress",
                    "body": {
                        "activityAddress": "越秀区呵呵呵6",
                        "activityId": {"__type":"Pointer","className":"activity","objectId":"WZB3666L"},
                        "userId": {"__type":"Pointer","className":"user","objectId":"5f659fc1eb"}
                    }
                },
                {
                    "method": "POST",
                    "path": "/1/classes/votetime",
                    "body": {
                        "startTime": {"__type":"Date","iso":"2016-01-29 11:33:53"},
                        "endTime":{"__type":"Date","iso":"2017-01-29 11:33:53"},
                        "activityId": {"__type":"Pointer","className":"activity","objectId":"WZB3666L"},
                        "userId": {"__type":"Pointer","className":"user","objectId":"5f659fc1eb"}
                    }
                }
            ]
        }
    }, function (err, data) {
        response.end(data);
    });
}

exports.oBatch = onRequest;