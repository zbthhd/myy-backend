// Start from esbuild@^0.17.1
// Multiple entryPoints in an array of object & pino transports
import {build} from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import esbuildPluginTsc from "esbuild-plugin-tsc";


// --bundle --outfile=./dist/index.js --platform=node --target=node20
build({
    entryPoints: [
        "./src/index.ts",
    ],
    outdir: "dist",
    bundle: true,
    platform: "node",
    target: "node20",
    packages: 'external',
    plugins: [
        esbuildPluginPino({transports: ["pino-pretty"]}),
        esbuildPluginTsc({
            force: true
        }),
    ],
}).catch(() => process.exit(1));
