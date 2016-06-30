/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;
    ep.all('tpl', 'data', function (tpl, data) {
        // 在所有指定的事件触发后，将会被调用执行
        // 参数对应各自的事件名
        //var tt=parseInt(tpl) + parseInt(data);
        response.end(JSON.stringify(tpl) + JSON.stringify(data));
    });
    //获取Posts表中的所有值
    db.find({
        "table": "activity",          //表名
        //"keys": "username,title",         //返回字段列表，多个字段用,分隔
        "where": {"objectId": "WZB3666L"},       //查询条件是一个JSON object
        //"order":"-a,b",         //排序列表，[-]字段名称,-表示降序，默认为升序
        //"limit":10,            //limit大小，一页返回多少条记录，默认为0
        //"skip":2,             //skip,分页offset，(page-1)*limit
        //"count":4            //count,只返回符合条件的记录总数
    }, function (err, data) {
        ep.emit('tpl', data);
        //jsonTest();
    });

    db.find({
        "table": "activity",          //表名
        //"keys": "username,title",         //返回字段列表，多个字段用,分隔
        "where": {"objectId": "FTOLCCCD"},       //查询条件是一个JSON object
        //"order":"-a,b",         //排序列表，[-]字段名称,-表示降序，默认为升序
        //"limit":10,            //limit大小，一页返回多少条记录，默认为0
        //"skip":2,             //skip,分页offset，(page-1)*limit
        //"count":4            //count,只返回符合条件的记录总数
    }, function (err, data) {
        ep.emit('data', data);
        //jsonTest();
    });


}
exports.oEventTest = onRequest;