/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;
    var userid = request.body.userid;
    var type = request.body.type; //0;1;2;3;4;5;6
    var keyword = request.body.keyword;
    var values = [];
    var keyWhere="";
    Bql.exec({
        "bql": "select   include parentId,* from group where objectId in (select groupId from group_list where user_id='" + userid + "' )  ",
        "values": JSON.stringify(values)
    }, function (err, data) {
        if(err)
            response.end(err);
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

        switch (type) {
            case 0:
                keyWhere="title regexp  '.*"+keyword+".*'";
                break;
            case 1:
                keyWhere="title like '%"+keyword+"%'";
                break;
            case 2:
                keyWhere="title like '%"+keyword+"%'";
                break;
            case 3:
                keyWhere="title like '%"+keyword+"%'";
                break;
            case 4:
                keyWhere="title like '%"+keyword+"%'";
                break;
            case 5:
                keyWhere="title like '%"+keyword+"%'";
                break;
            default:
                keyWhere="title like '%"+keyword+"%'";
                break;
        }


        // response.send(pid);

        if (ids.length > 0) {
            if (pid) {
                pid = pid.substr(0, pid.length - 1);
                ids = ids + "," + pid;
            }
            var bql = "select include userId,* from activity where news=1 and title like '%"+keyword+"%' and secretgroup in (" + pid + "," + ids + ") or isopen='是'  order by createdAt desc";
            Bql.exec({
                "bql": bql,
                "values": JSON.stringify(values)
            }, function (err, data) {
                if(err)
                    response.end(err);
                response.end(data);
            });
        } else {
            var bql = " select include userId,* from activity where title regexp '朋友小聚.*' ";
            Bql.exec({
                "bql": bql,
                "values": JSON.stringify(values)
            }, function (err, data) {
                if(err)
                    response.end(err);
                response.end(data);
            });
        }

    });

}
exports.obql_activeSearch = onRequest;