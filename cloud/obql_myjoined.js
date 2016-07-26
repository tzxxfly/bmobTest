/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();

    var userId = request.body.userId;//活动Id
    var page = request.body.page;//每页数据量
    var index = request.body.index;//当前页数
    if(!userId)
        userId='5f659fc1eb';
    if (!page)
        page = 100;
    if (!index || index <= 0)
        index = 1;
    var skip = page * (index - 1);
    var limit = page * (index - 1) + page;

/*    var bql = 'select include userId,* from activity where userId=? limit ?,? ';
    /!*var values = 'values=["' + activityId + '"]';*!/
    var values =[];
    values[values.length]=userId;
    values[values.length]=skip
    values[values.length]=limit*/


    var values =[];
    var bql_voteaddress =  "select * from activity where objectId in (select activityId from voteaddress_list where userId='"+userId+"' ) " +
        "limit "+skip+","+page+" order by -createdAt";
    var bql_votetime =  "select * from activity where objectId in (select activityId from votetime_list where userId='"+userId+"' ) " +
        "limit "+skip+","+page+" order by -createdAt";
    var bql_enroll =  "select * from activity where objectId in (select enrollId from enroll where  userId='"+userId+"' ) " +
        "limit "+skip+","+page+" order by -createdAt";


    ep.all('voteaddresslist','votetimelist',"enrolllist", function (voteaddresslist,votetimelist,enrolllist) {

        var voteaddresslist = JSON.parse(voteaddresslist);
        var votetimelist = JSON.parse(votetimelist);
        var enrolllist = JSON.parse(enrolllist);


        var temp = {};
        var result = {};
        var data = [];
        for (var i = 0; i < voteaddresslist.results.length; i++) {
            var object = voteaddresslist.results[i];
            if (object.objectId) {

                temp[object.objectId] = object;
            }
            //result[object.userId.]
        }

        for (var i = 0; i < votetimelist.results.length; i++) {
            var object = votetimelist.results[i];
            if (object.objectId) {
                temp[object.objectId] = object;
            }
            //result[object.userId.]
        }

        for (var i = 0; i < enrolllist.results.length; i++) {
            var object = enrolllist.results[i];
            if (object.objectId) {
                temp[object.objectId] = object;
            }
            //result[object.userId.]
        }

        for (object in temp) {
            data[data.length] = temp[object];
        }
        result.data = data;
        result.total = data.length;
        result.index = index;
        result.page = page;
        result.totalPage = Math.ceil(data.length / page)

        response.end(JSON.stringify(result));
    });


    Bql.exec({
        "bql": bql_voteaddress,
        "values":JSON.stringify(values)
    }, function (err, data) {
        if (err)
            response.end(err);
        ep.emit('voteaddresslist', data);
    });

    Bql.exec({
        "bql": bql_votetime,
        "values":JSON.stringify(values)
    }, function (err, data) {
        if (err)
            response.end(err);
        ep.emit('votetimelist', data);
    });


    Bql.exec({
        "bql": bql_enroll,
        "values":JSON.stringify(values)
    }, function (err, data) {
        if (err)
            response.end(err);
        ep.emit('enrolllist', data);
    });
}
exports.obql_myjoined = onRequest;

