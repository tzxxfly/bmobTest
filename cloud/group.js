/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;

    var rel = modules.oRelation;


    /*   ep.all('group',function (group) {
     response.end(JSON.stringify(secretGroup) );
     });*/

    var fillPath = function (pobject, results) {
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            if (object.parentId && object.parentId.objectId) {
                if (object.parentId.objectId == pobject.objectId) {
                    object.fullPath = pobject.fullPath + object.objectId + "/";
                    object.fullPathName = pobject.fullPathName + object.groupName + "/";
                    //results[i] = object;
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
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            //response.write(JSON.stringify(object) )
            if (!object.parentId) {
                object.fullPathName = object.groupName + "/";
                object.fullPath = object.objectId + "/";
                //results[i] = object;
                fillPath(object, results);
            }
            //alert(object.id + ' - ' + object.get('playerName'));
        }
        response.end(JSON.stringify(results));
        //ep.emit('reldata', data);
    });
}
exports.group = onRequest;