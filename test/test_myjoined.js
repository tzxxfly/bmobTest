var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local_xf() {
//调用hello.js云端代码
    var first = require("../cloud/obql_myjoined.js").obql_myjoined;
    tool.test(first, {"app_key": options.app_key, "rest_key": options.rest_key,"userId":"5f659fc1eb","page":10,"index":1});

   /* tool.test(first, {"app_key": options.app_key, "rest_key": options.rest_key,
        "activityId":"FnBp3339","type":2});*/
}
local_xf();


//testWinxinText();
