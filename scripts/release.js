const shell = require('shelljs')
const { Select } = require('enquirer')

const checkGitStatus = () => {
    if (shell.exec('git diff --stat', { silent: true }).stdout !== '') {
        shell.echo('Working directory is not clean. Push your changes.')
        shell.exit(0)
    }

    shell.echo('working directory is clean.')
}

const bumpVersion = (release) => {
    let version = shell.exec(`npm version --commit-hooks false --git-tag-version false ${release}`, { silent: true}).stdout
    shell.echo(`bumping package to version ${version}`);
    return version;
}

// start
const prompt = new Select({
    name: 'release',
    message: 'Pick a semantic release type?',
    choices: ['patch', 'minor', 'major'],
})

prompt.run().then((release) => {
    checkGitStatus()
    let version = bumpVersion(release);
})

// check if changelog exists, if not checkout

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

// npm version --commit-hooks false --git-tag-version false <major|minor|patch>
