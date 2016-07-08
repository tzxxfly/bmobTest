function onRequest(request, response, modules) {

    var Bql = modules.oBql;
    var userid = request.body.userid;

    Bql.run(request,function (err,data) {
        response.end(data);
    })
    Bql.exec({
        "bql": "select   include parentId,* from group where objectId in (select groupId from group_list where userId='" + userid + "' )  "
    }, function (err, data) {
        var results = JSON.parse(data).results;
        var ids = "";
        var pid = "";
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            ids += "'" + object.objectId + "',";
            pid += "'" + object.parentId.objectId + "',";
        }
        ids = ids.substr(0, ids.length - 1);
        pid = pid.substr(0, pid.length - 1);
        if (ids.length > 0) {
            Bql.exec({
                "bql": "select include userId,* from activity where secretgroup in (" + pid + "," + ids + ") or isopen='是' order by createdAt desc "
            }, function (err, data) {
                response.send(data);
            });
        } else {
            Bql.exec({
                "bql": "select include userId,* from activity where isopen='是' order by createdAt desc "
            }, function (err, data) {
                response.send(data);
            });
        }

    });
    //测试用的userid=5f659fc1eb
}

exports.second = onRequest;