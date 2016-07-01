/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;

    var rel = modules.oRelation;


    ep.all('tpl', 'data','reldata', 'secretGroup',function (tpl, data,reldata,secretGroup) {
        response.end(JSON.stringify(reldata) );
    });

    db.find({
        "table":"activity",
        "keys": "username",
        "where":{
            //"userId":{"$select":{"where":{"nickname":"白衣飘飘"},"className":"user"}},
            //"$or":[{"username":"会飞的猪"},{"userId":{"$select":{"where":{"nickname":"会飞的猪"},"className":"user"}}}]
        },
    },function(err,data){
        //回调函数
        ep.emit('reldata', data);
    });

    rel.query({
        "table":"user",
        "keys": "nickname",
        "where":{"nickname":"白衣飘飘"}
    },function(err,data){
        //回调函数
        //ep.emit('reldata', data);
    });

    var skip = 0;

    //获取Activity表中的所有值
    db.find({
        "table": "activity",          //表名
        "keys": "username,title",         //返回字段列表，多个字段用,分隔
        //"where": {"objectId": "WZB3666L"},       //查询条件是一个JSON object
        "order":"-username,title",         //排序列表，[-]字段名称,-表示降序，默认为升序
        "limit": 2,            //limit大小，一页返回多少条记录，默认为0
        "skip":2,             //skip,分页offset，(page-1)*limit
        "count": 0            //count,只返回符合条件的记录总数
    }, function (err, data) {
        ep.emit('tpl', data);
        //jsonTest();
    });

    db.find({
        "table": "activity",          //表名
        "keys": "username,title",         //返回字段列表，多个字段用,分隔
        "where": {"objectId": "iEYK2229","username":"白衣飘飘"},       //查询条件是一个JSON object
        //"order":"-a,b",         //排序列表，[-]字段名称,-表示降序，默认为升序
        //"limit":10,            //limit大小，一页返回多少条记录，默认为0
        //"skip":2,             //skip,分页offset，(page-1)*limit
        //"count":4            //count,只返回符合条件的记录总数
    }, function (err, data) {
        ep.emit('data', data);
        //jsonTest();
    });

    db.find({
        "table": "secretGroup",          //表名
        "keys": "objectId",         //返回字段列表，多个字段用,分隔
        "where": {"objectId": "iEYK2229","username":"白衣飘飘"},       //查询条件是一个JSON object
        //"order":"-a,b",         //排序列表，[-]字段名称,-表示降序，默认为升序
        //"limit":10,            //limit大小，一页返回多少条记录，默认为0
        //"skip":2,             //skip,分页offset，(page-1)*limit
        //"count":4            //count,只返回符合条件的记录总数
    }, function (err, data) {
        ep.emit('secretGroup', data);
        //jsonTest();
    });


}
exports.activity = onRequest;