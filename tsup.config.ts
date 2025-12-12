import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/main.ts"],
    format: ["esm"],
    outDir: "dist",
    dts: true,
    clean: true,
    treeshake: true,
    esbuildPlugins: [],
    esbuildOptions: (options) => {
        options.alias = {
            "@": "./src",
        };
    },
    watch: process.env.WATCH === "1",
})