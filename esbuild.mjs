import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outfile: 'bin/app.js',
    platform: 'node'
})