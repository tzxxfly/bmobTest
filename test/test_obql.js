var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local_xf() {
//调用hello.js云端代码
    var first = require("../cloud/obql.js").obql;
    tool.test(first, {"app_key": options.app_key, "rest_key": options.rest_key,
        "page":5,"index":1,"activityId":"WZB3666L"});
}
local_xf();


//testWinxinText();
