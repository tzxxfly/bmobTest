/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;
    // ep.all('activity', 'group', function (activity, group) {
    //     // 在所有指定的事件触发后，将会被调用执行
    //     // 参数对应各自的事件名
    //     //var tt=parseInt(tpl) + parseInt(data);
    //     response.end(JSON.stringify(activity));
    // });
    db.find({
        "table":"activity",
        //"keys": "*",
        "where":{
            "userId":{"$select":{"where":{"objectId":"5f659fc1eb"},"className":"user"}},
            //"$or":[{"username":"会飞的猪"},{"userId":{"$select":{"where":{"nickname":"会飞的猪"},"className":"user"}}}]
            //"secretgroup":{"__type":"Pointer","className":"group","groupName":"画画组"},
        },
    },function(err,data){
        //回调函数
        //ep.emit('activity', data);
        //response.end(JSON.stringify(data))
        var data2=JSON.parse(data);
        var results = JSON.parse(data).results;
        db.find({
            "table":"votetime",
            //"keys": "secretgroup",
            "where":{
                //"userId":{"$select":{"where":{"nickname":"白衣飘飘"},"className":"user"}},
                //"$or":[{"username":"会飞的猪"},{"userId":{"$select":{"where":{"nickname":"会飞的猪"},"className":"user"}}}]
                "groupName":"画画组",
            },
        },function(err,data){
            //回调函数
            //response.end(JSON.stringify(data))
            db.find({
                "table":"votetime_list",
                //"keys": "secretgroup",
                "where":{
                    //"userId":{"$select":{"where":{"nickname":"白衣飘飘"},"className":"user"}},
                    //"$or":[{"username":"会飞的猪"},{"userId":{"$select":{"where":{"nickname":"会飞的猪"},"className":"user"}}}]
                    "groupName":"画画组",
                },
            },function(err,data){
                //回调函数
                //response.end(JSON.stringify(data))
                ep.emit('group', data);
            });

            ep.emit('group', data);
        });
    });



}
exports.activity = onRequest;

function obql_refTest(text) {

    
    console.info(text);

}
exports.obql_refTest = obql_refTest;