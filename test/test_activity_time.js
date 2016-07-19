var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local_xf() {
//调用hello.js云端代码
    var first = require("../cloud/activity_time.js").activity_time;
    tool.test(first, {"nameContent": "e2rlPPPV"});
}
local_xf();


//testWinxinText();
