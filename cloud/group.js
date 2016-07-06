/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;

    var rel = modules.oRelation;


    var fillPath = function (pobject, results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            if (object.parentId && object.parentId.objectId) {
                if (object.parentId.objectId == pobject.objectId) {
                    object.fullPath = pobject.fullPath + object.objectId + "/";
                    object.fullPathName = pobject.fullPathName + object.groupName + "/";
                    fillPath(object, results);
                }
            }
        }
    };
    db.find({
        "table": "group",
        //"keys": "fullPath",
        "where": {
            /*"userId":{"$select":{"where":{"nickname":"白衣飘飘"},"className":"user"}},
             "$or":[{"username":"会飞的猪"}]*/
            //"objectId":"OmB3XXXc"
        },
    }, function (err, data) {
        //回调函数
        var results = JSON.parse(data).results;

        ep.after('updateGroup', results.length, function (list) {
            // 在所有文件的异步执行结束后将被执行
            // 所有文件的内容都存在list数组中
            response.end("len:" + list.length);
        });
        var ids="";
        var sql="select * from group where 1=1 ";
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            ids+="'"+object.objectId+"',";
        }
        ids= ids.substr(0,ids.length-1);
        if(ids.length>0)
        {
            sql=sql+" and objectId in ( "+ids+")";
        }



        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            if (!object.parentId) {
                object.fullPathName = object.groupName + "/";
                object.fullPath = object.objectId + "/";
                fillPath(object, results);
            }
        }
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            db.update({
                "table": "group",
                "objectId": object.objectId,
                "data": {"fullPathName": object.fullPathName, "fullPath": object.fullPath}
            }, function (err, data) {
                if (!err) {
                    ep.emit('updateGroup', data);
                }
                else {
                    ep.emit('updateGroup', data);
                    response.write(err);
                }
            });
        }

    });
}
exports.group = onRequest;