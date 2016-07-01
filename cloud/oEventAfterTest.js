/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var ep = modules.oEvent.create();//拷贝云端要去掉Create();
    var db = modules.oData;
    ep.after('got_file', 3, function (list) {
        // 在所有文件的异步执行结束后将被执行
        // 所有文件的内容都存在list数组中
        response.end("len:"+list.length);
    });

    //发送3次事件后触发事件，输出list的长度
    ep.emit("got_file", "1");
    ep.emit("got_file", "2");
    ep.emit("got_file", "3");


}
exports.oEventAfterTest = onRequest;