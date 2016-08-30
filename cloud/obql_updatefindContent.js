/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;

    var findContentId = request.body.findContentId;//活动Id

    ep.all('praise', 'discuss', function (praise, discuss) {
        db.update({
            "table": "findcontent",
            "objectId": findContentId,
            "data": {
                "praiseCount": praise.count+"",
                "discusses": discuss.count+""
            }
        }, function (err, data) {
            if (err)
                response.end(err);
            response.end(data);
        });

    });

    var values = [findContentId];
    var bql_praise = "select count(*) from findcontent_praise where findcontentId = ? ";
    var bql_discuss = "select count(*) from findcontent_discuss where findcontentId = ? ";
    Bql.exec({
        "bql": bql_praise,
        "values": JSON.stringify(values)
    }, function (err, data) {
        if (err)
            response.end(err);
        ep.emit("praise", JSON.parse(data));
    });

    Bql.exec({
        "bql": bql_discuss,
        "values": JSON.stringify(values)
    }, function (err, data) {
        if (err)
            response.end(err);
        ep.emit("discuss", JSON.parse(data));
    });
}
exports.obql_updatefindContent = onRequest;