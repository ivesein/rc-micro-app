//是否需要修正接口网关转发前缀（如果该项目由多个后台编写，
// 需要多处修正请置false，自行在接口调用时添加对应前缀）
const ifNeedPrefix = false;
exports.GATEWAY_URL_PREFIX = ifNeedPrefix ? "/userperm" : ""; //后台服务API接口网关转发修正前缀

exports.DEV_BUILD_URL = "http://www.glydev.cn"; //开发环境线上地址
exports.TEST_BUILD_URL = "http://www.glyrel.cn"; //测试环境线上地址
exports.PREPRODUCT_BUILD_URL = "https://www.gongluyun.cn"; //预生产环境线上地址

exports.DEV_API_BASE_URL = "http://www.glydev.cn"; //开发环境线上接口API_BASE地址
exports.TEST_API_BASE_URL = "http://www.glyrel.cn"; //测试环境线上接口API_BASE地址
exports.PREPRODUCT_API_BASE_URL = "https://www.gongluyun.cn"; //预生产环境线上地址接口API_BASE地址

exports.OUTPUT_PORT = "project_do_micro"; //微前端线上部署访问端口路由
exports.GATEWAY_PORT = "/rc"; //中台接口网关
exports.XAPI_GATEWAY_PORT = "/mp"; //客户端接口网关
