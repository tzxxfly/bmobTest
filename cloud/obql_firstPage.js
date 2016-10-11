/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;

    var userid = request.body.userid;
    var num = request.body.num;
    var values = [];
    Bql.exec({
        "bql": "select   include parentId,* from group where objectId in (select groupId from group_list where userId='" + userid + "' )  ",
        "values": JSON.stringify(values)
    }, function (err, data) {
        var results = JSON.parse(data).results;
        var ids = "";
        var pid = "";
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            ids += "'" + object.objectId + "',";
            if (object.parentId)
                pid += "'" + object.parentId.objectId + "',";
        }
        ids = ids.substr(0, ids.length - 1);

        // response.send(pid);

        if (ids.length > 0) {
            if (pid) {
                pid = pid.substr(0, pid.length - 1);
                ids = ids + "," + pid;
            }
            var bql = "select count(*),include userId,* from activity where secretgroup in (" + ids + ") or userId='" + userid + "' or isopen='是'  limit " + num * 10 + ",10 order by createdAt desc ";
            Bql.exec({
                "bql": bql,
                "values": JSON.stringify(values)
            }, function (err, data) {
                response.end(data);
            });
        } else {
            Bql.exec({
                "bql": "select count(*),include userId,* from activity where isopen='是' or userId='" + userid + "'  limit " + num * 10 + ",10 order by createdAt desc ",
                "values": JSON.stringify(values)
            }, function (err, data) {
                response.end(data);
            });
        }

    });

}
exports.obql_firstPage = onRequest;