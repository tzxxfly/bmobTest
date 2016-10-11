/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;

    var userid = request.body.userid;
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
                "bql": "select include userId,* from activity where news=0 and secretgroup in (" + pid + "," + ids + ")  "
            }, function (err, data) {
                response.end(data);
            });
        }
        else {
            response.end("{\"results\":[]}");
        }

    });

}
exports.obql_nicknameSerach = onRequest;