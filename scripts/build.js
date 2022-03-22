const esbuild = require('esbuild')

// ESM module (ECMAScript)
// Meant for "import" statements in (modern browsers and bundlers)
esbuild.build({
    entryPoints: ['src/clockwork.js'],
    outfile: 'dist/index.esm.js',
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['esnext'],
    logLevel: 'info',
}).catch( () => {
    process.exit(1)
})

// CJS module (CommonJS)
// Meant for "import" statements in (node)
esbuild.build({
    entryPoints: ['src/clockwork.js'],
    outfile: 'dist/index.cjs.js',
    bundle: true,
    minify: true,
    platform: 'node',
    target: ['node10.4'],
    logLevel: 'info',
}).catch( () => {
    process.exit(1)
})