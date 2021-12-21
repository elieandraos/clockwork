const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild
    .build({
        entryPoints: ['src/clockwork.js'],
        bundle: true,
        minify: true,
        logLevel: 'info',
        platform: 'browser',
        outfile: 'dist/index.js',
        plugins: [
            nodeExternalsPlugin({
                dependencies: true,
                devDependencies: false,
                peerDependencies: false,
                optionalDependencies: false,
            }),
        ],
    })
    .catch(() => {
        process.exit(1)
    })
