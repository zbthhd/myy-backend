// Start from esbuild@^0.17.1
// Multiple entryPoints in an array of object & pino transports
import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import esbuildPluginTsc from "esbuild-plugin-tsc";


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
    plugins: [
        esbuildPluginPino({ transports: ["pino-pretty"] }),
        esbuildPluginTsc({
            force: true
        }),
    ],
}).catch(() => process.exit(1));