/**
 * Created by xfly on 2016/6/29.
 */


function onRequest(request, response, modules) {
    var http = modules.oHttp;
    var app_key = request.body.app_key;
    var rest_key = request.body.rest_key;

    /*http({
     method: 'PUT',
     preambleCRLF: true,
     postambleCRLF: true,
     uri: 'http://service.com/upload',
     multipart: [
     {
     'content-type': 'application/json',
     body: JSON.stringify({
     foo: 'bar',
     _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain'}}
     })
     },
     {body: 'I am an attachment'},
     {body: fs.createReadStream('image.png')}
     ],
     // alternatively pass an object containing additional options
     multipart: {
     chunked: false,
     data: [
     {
     'content-type': 'application/json',
     body: JSON.stringify({
     foo: 'bar',
     _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain'}}
     })
     },
     {body: 'I am an attachment'}
     ]
     }
     },
     function (error, response, body) {
     if (error) {
     return console.error('upload failed:', error);
     }
     console.log('Upload successful!  Server responded with:', body);
     });*/
    var where = 'where={"activityId":"WZB3666L"}&include=userId';
    //where += '&limit=1&skip=0';

    var options = {
        url: 'https://api.bmob.cn/1/classes/votetime_list?' + where,
        headers: {
            //'User-Agent': 'request'
            'X-Bmob-Application-Id': app_key,
            'X-Bmob-REST-API-Key': rest_key,
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //form: {"where": JSON.stringify({"objectId": "70506ea0bd"})},
        //method: 'POST'
        method: 'GET'
    };

    function callback(error, responseS, body) {
        if (error)
            response.end(error);
        if (!error && responseS.statusCode == 200) {
            var info = JSON.parse(body);
            var result = {};
            //console.log(info.stargazers_count + " Stars");
            //console.log(info.forks_count + " Forks");
            for (var i = 0; i < info.results.length; i++) {
                var object = info.results[i];
                if(object.userId.objectId){
                    result[object.userId.objectId]=object.userId;
                }
                //result[object.userId.]
            }
            response.end(JSON.stringify(result));
        }
    }

    http(options, callback);

}
exports.httphelp = onRequest;


//参考https://www.npmjs.com/package/request
/*    var http = modules.oHttp;
 http('http://www.bmob.cn', function (error, res, body) {
 if (!error && res.statusCode == 200) {
 response.send(body);
 }
 })*/

/**
 *发起Post请求
 */
//获取Http模块

/*//往http://bmob.cn/save发起POST请求
 http.post('http://bmob.cn/save', {form: {key: 'value'}})*/