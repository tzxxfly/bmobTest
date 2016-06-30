/**
 * Created by xfly on 2016/6/29.
 */
function onRequest(request, response, modules) {
    // var db = modules.oData;
    //
    // db.find({
    //     "table":"activity"
    // },function(err,data){
    //     // var leagueTeamsObject = JSON.parse(data);
    //     //回调函数
    //     checkAddress(data);
    //     //response.write(data);
    // });
    //获取数据库对象

    //获取Posts表中的所有值
    /*    db.find({
     "table":"activity"
     },function(err,data){
     response.write(data || err);
     });*/

    //获取数据库对象
    var db = modules.oData;
    var objectId = request.body.objectId;
    //获取Posts表中的所有值
    db.find({
        "table":"activity",          //表名
        "keys":"username,title",         //返回字段列表，多个字段用,分隔
        "where":{"objectId":objectId},       //查询条件是一个JSON object
        //"order":"-a,b",         //排序列表，[-]字段名称,-表示降序，默认为升序
        //"limit":10,            //limit大小，一页返回多少条记录，默认为0
        //"skip":2,             //skip,分页offset，(page-1)*limit
        //"count":4            //count,只返回符合条件的记录总数
    },function(err,data){

        response.end(JSON.stringify(data));
        //jsonTest();
    });



    function jsonTest() {
        var name = request.body.name;
        var jsonObject = {};
        var list = [];
        list[list.length] = 1;
        list[list.length] = 2;

        jsonObject.a = "bbb";
        jsonObject.b = "cccc";
        var jsonSubObject = {};
        jsonSubObject.c = "mmm";
        jsonSubObject.d = "eee";
        jsonObject.subobject = jsonSubObject;
        jsonObject.list = list;
        jsonObject.name = name;
        response.end(JSON.stringify(jsonObject));
    }

    //jsonTest();

    function checkAddress(jsonStr) {
        var leagueTeamsObject = JSON.parse(jsonStr);
        response.write(leagueTeamsObject.results[0].address);
    }
}
exports.xf = onRequest;