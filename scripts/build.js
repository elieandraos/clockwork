const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

// ESM module (ECMAScript)
// Meant for "import" statements in (modern browsers and bundlers)
esbuild.build({
    entryPoints: ['src/clockwork.js'],
    outfile: 'dist/index.esm.js',
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    plugins: [
        nodeExternalsPlugin({
            dependencies: true,
            devDependencies: false,
            peerDependencies: false,
            optionalDependencies: false,
        }),
    ],
    logLevel: 'info',
}).catch( () => {
    process.exit(1)
})

// CJS module (CommonJS)
// Meant for "require" statements in (node)
esbuild.build({
    entryPoints: ['src/clockwork.js'],
    outfile: 'dist/index.cjs.js',
    bundle: true,
    minify: true,
    platform: 'node',
    target: ['node10.4'],
    plugins: [
        nodeExternalsPlugin({
            dependencies: true,
            devDependencies: false,
            peerDependencies: false,
            optionalDependencies: false,
        }),
    ],
    logLevel: 'info',
}).catch( () => {
    process.exit(1)
})