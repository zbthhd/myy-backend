// Start from esbuild@^0.17.1
// Multiple entryPoints in an array of object & pino transports
import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import { dotenvRun } from "@dotenv-run/esbuild";


// --bundle --outfile=./dist/index.js --platform=node --target=node20
build({
    entryPoints: [
        "./index.ts",
    ],
    outdir: "dist",
    bundle: true,
    platform: "node",
    target: "node20",
    // 将依赖标记为外部依赖，不打包到构建文件中
    // 注意：这需要在部署环境中安装这些依赖
    packages: 'external',
    // 设置输出格式为 ES 模块，与 package.json 中的 "type": "module" 兼容
    format: 'esm',
    define: {
        // 定义NODE_ENV为production，使index.ts中的条件判断生效
        'process.env.NODE_ENV': '"production"'
    },
    keepNames: true,
    plugins: [
        // 添加 dotenv-run 插件，用于处理环境变量
        dotenvRun({
            verbose: true,
            // files: ['.env.dev'],
            // 只包含以下前缀的环境变量，排除系统环境变量
            // prefix: "^(NODE_|APP_|API_)",
            // 确保环境变量被注入到构建文件中
            inject: true,
            // 使用正则表达式排除包含(x86)的环境变量
            prefix: "^(?!.*\\(x86\\)).*$",
            verbose: true
        }),
        esbuildPluginPino({ transports: ["pino-pretty"] }),
        esbuildPluginTsc({
            force: true
        }),
    ],
}).catch(() => process.exit(1));