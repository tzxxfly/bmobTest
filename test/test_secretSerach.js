var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local_xf() {
//调用hello.js云端代码
    var first = require("../cloud/obql_secretSerach.js").obql_secretSerach;
    tool.test(first, {"userid": "8102cba4ab"});
}
local_xf();


//testWinxinText();
