var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local_xf() {
    //
    var first = require("../cloud/obql_titleSerach.js").obql_titleSerach;
    tool.test(first, {"userid":"5f659fc1eb","title":"夜游"});


//调用hello.js云端代码
/*    var first = require("../cloud/obql_activeSearch.js").obql_activeSearch;
    //tool.test(first, {"activityId":"FTOLCCCD","toUser":null,"msgInfo":"邀请您参加:飞羽协会活动","msgType":3,"isRead":false});
    tool.test(first, {"userid":"8102cba4ab","type":0,"keyword":"朋友小聚"});*/
//tool.test(first, {"app_key": options.app_key, "rest_key": options.rest_key,"userId":"5f659fc1eb","page":10,"index":1});
   /* tool.test(first, {"app_key": options.app_key, "rest_key": options.rest_key,
        "activityId":"FnBp3339","type":2});*/
}
local_xf();


//testWinxinText();
