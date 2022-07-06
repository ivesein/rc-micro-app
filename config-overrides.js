const packageName = require("./package.json").name;
const {
	override,
	fixBabelImports,
	addWebpackPlugin,
	adjustStyleLoaders,
	addWebpackAlias,
	overrideDevServer,
	addLessLoader,
} = require("customize-cra");

const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const isDEV = process.env.NODE_ENV === "development"; // 引入当前的node环境
const BUILD_ENV = process.env.BUILD_ENV; // 引入当前的cross-env build环境
const {
	DEV_BUILD_URL, //开发环境线上地址
	TEST_BUILD_URL, //测试环境线上地址
	PREPRODUCT_BUILD_URL, //预测试环境线上地址
	GATEWAY_URL_PREFIX, //后台服务API接口网关转发修正前缀
	OUTPUT_PORT, //线上部署访问端口
	GATEWAY_PORT, //中台接口网关端口
	XAPI_GATEWAY_PORT, //客户端接口网关端口
	DEV_API_BASE_URL, //开发环境线上接口API_BASE地址
	TEST_API_BASE_URL, //测试环境线上接口API_BASE地址
	PREPRODUCT_API_BASE_URL, //预生产环境线上地址接口API_BASE地址
} = require("./build_options.js");
const webconfig = () => (config) => {
	let pubPath = isDEV
		? `http://localhost:${process.env.PORT}/`
		: `/${OUTPUT_PORT}/`;
	config.output.library = packageName;
	config.output.libraryTarget = "umd";
	config.output.publicPath = pubPath;
	config.output.jsonpFunction = `webpackJsonp_${packageName}`;
	return config;
};

const devServerConfig = () => (config) => {
	config.headers = {
		"Access-Control-Allow-Origin": "*",
	};
	return {
		...config,
		proxy: {
			"/inspectionApi": {
				target: "http://192.168.11.118:30309",
				changeOrigin: true,
				pathRewrite: {
					"^/inspectionApi": "",
				},
			},
			"/middleApi": {
				target: "http://192.168.11.118:30071",
				changeOrigin: true,
				pathRewrite: {
					"^/middleApi": "",
				},
			},
			"/foxApi": {
				target: "http://127.0.0.1:4523/mock/1134117",
				changeOrigin: true,
				pathRewrite: {
					"^/foxApi": "",
				},
			},
		},
	};
};

module.exports = {
	webpack: override(
		webconfig(),
		fixBabelImports("import", {
			libraryName: "antd",
			libraryDirectory: "es",
			style: true,
		}),
		addLessLoader({
			javascriptEnabled: true,
			modifyVars: {
				"@primary-color": "#245FF2",
				"@border-radius-base": "0px",
			},
		}),
		addWebpackPlugin(new AntdDayjsWebpackPlugin()),
		addWebpackPlugin(
			new webpack.DefinePlugin({
				"process.env.CURRENT_BUILD_ENV": JSON.stringify(BUILD_ENV),
				"process.env.ENTRY_PORT": isDEV
					? JSON.stringify(process.env.PORT)
					: JSON.stringify(OUTPUT_PORT),
				"process.env.ENTRY_PATH":
					BUILD_ENV === "develop"
						? JSON.stringify(DEV_BUILD_URL)
						: BUILD_ENV === "release"
						? JSON.stringify(TEST_BUILD_URL)
						: BUILD_ENV === "preproduct"
						? JSON.stringify(PREPRODUCT_BUILD_URL)
						: JSON.stringify("http://localhost"),
				"process.env.API_BASE":
					BUILD_ENV === "develop"
						? JSON.stringify(
								DEV_API_BASE_URL +
									GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: BUILD_ENV === "release"
						? JSON.stringify(
								TEST_API_BASE_URL +
									GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: BUILD_ENV === "preproduct"
						? JSON.stringify(
								PREPRODUCT_API_BASE_URL +
									GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: JSON.stringify(""),
				"process.env.XAPI_BASE":
					BUILD_ENV === "develop"
						? JSON.stringify(
								DEV_API_BASE_URL +
									XAPI_GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: BUILD_ENV === "release"
						? JSON.stringify(
								TEST_API_BASE_URL +
									XAPI_GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: BUILD_ENV === "preproduct"
						? JSON.stringify(
								PREPRODUCT_API_BASE_URL +
									XAPI_GATEWAY_PORT +
									GATEWAY_URL_PREFIX
						  )
						: JSON.stringify(""),
			})
		),
		adjustStyleLoaders((rule) => {
			if (rule.test.toString().includes("scss")) {
				rule.use.push({
					loader: require.resolve("sass-resources-loader"),
					options: {
						resources: ["./src/styles/main.scss"],
					},
				});
			}
		}),
		addWebpackAlias({
			["@"]: path.resolve(__dirname, "src"),
		})
	),
	devServer: overrideDevServer(devServerConfig()),
};
