/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var Bql = require("../cloud/myBql.js").myBql;
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var batch = modules.oBatch;

    var activityId = request.body.activityId;//活动Id
    var toUser = request.body.toUser;//消息接收方
    var msgInfo = request.body.msgInfo;//信息类容
    var msgType = Number(request.body.msgType);//信息类型 活动取消:0，报名提醒:1,投票提醒:2，私密提醒:3,只做活动取消，私密提醒的功能
    var isRead = (request.body.isRead||request.body.isRead=="false")==false?false:true;//是否已读

    //活动取消:0
    if (msgType == 0) {
        var values = [activityId];
        var bql_activity = "select * from enroll where enrollId=?";

        Bql.exec({
            "bql": bql_activity,
            "values": JSON.stringify(values)
        }, function (err, data) {
            if (err)
                response.end(err);
            var results = JSON.parse(data).results
            if (results) {
                var requests = [];
                for (var i = 0; i < results.length; i++) {
                    var Msg = {};
                    Msg["method"] = "POST";
                    Msg["path"] = "/1/classes/userMsg";
                    Msg["body"] = {
                        "activityId": {
                            "__type": "Pointer",
                            "className": "activity",
                            "objectId": activityId
                        },
                        "toUser": results[i].userId,
                        "msgInfo": msgInfo,
                        "msgType": msgType,
                        "isRead": isRead
                    }
                    requests[requests.length] = Msg;
                }
                if (requests.length == 0)
                    response.end("私密组无数据!")
                var msgPosts = {
                    "data": {
                        "requests": requests
                    }
                };
                batch.exec(msgPosts, function (err, data) {
                    if (err)
                        response.end(err);
                    response.end(data);
                });

            }
        });
    }
    //私密提醒:3
    else if (msgType == 3) {
        var values = [activityId];
        var bql_activity = "select include secretgroup,* from activity where objectId=?";

        Bql.exec({
                "bql": bql_activity,
                "values": JSON.stringify(values)
            }, function (err, data) {
                if (err)
                    response.end(err);
                data = JSON.parse(data);
                if (data.results && data.results.length > 0 && data.results[0].secretgroup) {
                    var bql_groups = " select objectId from group where fullPath regexp '" + data.results[0].secretgroup.fullPath + ".*' ";
                    Bql.exec({
                            "bql": bql_groups,
                            "values": JSON.stringify([])
                        }, function (err, data) {
                            if (err)
                                response.end(err);
                            var results = JSON.parse(data).results;
                            var ids = "";
                            if (results) {
                                for (var i = 0; i < results.length; i++) {
                                    var object = results[i];
                                    ids += "'" + object.objectId + "',";
                                }
                            }
                            if (ids) {
                                ids = ids.substr(0, ids.length - 1);
                                var bql_users = " select * from group_list where groupId in (" + ids + ")";
                                Bql.exec({
                                    "bql": bql_users,
                                    "values": JSON.stringify([])
                                }, function (err, data) {
                                    var results = JSON.parse(data).results
                                    if (results) {
                                        var requests = [];
                                        for (var i = 0; i < results.length; i++) {
                                            var Msg = {};
                                            Msg["method"] = "POST";
                                            Msg["path"] = "/1/classes/userMsg";
                                            Msg["body"] = {
                                                "activityId": {
                                                    "__type": "Pointer",
                                                    "className": "activity",
                                                    "objectId": activityId
                                                },
                                                "toUser": results[i].userId,
                                                "msgInfo": msgInfo,
                                                "msgType": msgType,
                                                "isRead": isRead,
                                            }
                                            requests[requests.length] = Msg;
                                        }
                                        if (requests.length == 0)
                                            response.end("私密组无数据!")
                                        var msgPosts = {
                                            "data": {
                                                "requests": requests
                                            }
                                        };
                                        batch.exec(msgPosts, function (err, data) {
                                            if (err)
                                                response.end(err);
                                            response.end(data);
                                        });

                                    }
                                });
                            }
                            else {
                                response.end("私密组无数据!");
                            }
                        }
                    );
                }
                else {
                    response.end("私密组无数据！");
                }
                //response.end(data);
            }
        )
        ;
    }
    else {
        response.end("无效的信息类型!");
    }

}
exports.obql_insertMsg = onRequest;

