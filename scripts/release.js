// check if working directory is clean
const shell = require('shelljs')

if (shell.exec('git diff --stat', { silent: true }) !== '') {
    console.log('Working directory is not clean. Push your changes.')
    shell.exit(0)
}

// bump npm version
console.log('working directory is clean.')

// bump package.json version: npm version major|minor|patch
// parse change log
// create git tag and release

// const shell = require('shelljs');
// const parseChangelog = require('changelog-parser');
//
// parseChangelog('CHANGELOG.md')
//     .then(function (result) {
//         // changelog object
//         console.log(result)
//     })
//     .catch(function (err) {
//         // Whoops, something went wrong!
//         console.error(err)
//     })

// "release": "node scripts/release.js"
