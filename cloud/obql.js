function onRequest(request, response, modules) {
    var Bql = modules.oBql;
    var startTime= request.body.startTime;
    var endTime= request.body.endTime;
    Bql({
        "bql":"select include userId,* from activity where (startTime>date('"+startTime+"') and endTime<date('"+endTime+"')) and isopen='是'"

    },function(err,data){
        response.send(data);
    });
    //time，是页面传进来的时间参数，格式必须是:yyyy-MM-dd HH:mm:ss例如2016-06-18 00:00:00
}

exports.obql = onRequest;