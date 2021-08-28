const shell = require('shelljs')
const { Select } = require('enquirer')
const changelogParser = require('changelog-parser');

const cancelRelease = () => {
    shell.exec('git checkout package.json package-lock.json', { silent: true })
}

const abortWithMessage = (message) => {
    console.log(message)
    shell.exit(0)
}

const checkGitStatus = () => {
    if (shell.exec('git diff --stat', { silent: true }).stdout !== '') {
        abortWithMessage('Working directory is not clean. Push your changes.')
    }

    console.log('working directory is clean.')
}

const bumpVersion = (release) => {
    let version = shell.exec(
        `npm version --commit-hooks false --git-tag-version false ${release}`,
        { silent: true }
    ).stdout.trim()

    console.log(`bumping package to version ${version}`)
    return version
}

const parseChangelog = (version) => {
    return new Promise( (resolve, reject) => {
        changelogParser('CHANGELOG.md')
            .then(function (result) {
                let changelog = result.versions.find( v => v.title === version);

                if(!changelog) {
                    cancelRelease();
                    abortWithMessage(`Could not find ${version} changelog. Update CHANGELOG.md file.`);
                }
                else {
                    resolve(changelog.body)
                }
            })
            .catch(function (err) {
                cancelRelease();
                abortWithMessage('Could not parse CHANGELOG.md file.')
                reject(err)
            })
    })
}

// start
const prompt = new Select({
    name: 'release',
    message: 'Pick a semantic release type?',
    choices: ['patch', 'minor', 'major'],
})

prompt.run().then((release) => {
    //checkGitStatus()
    let version = bumpVersion(release)
    parseChangelog(version).then( (body) => {
        console.log(body);
        // git commit package.json package-lock.json with message `:bookmark: release ${version}`
        // git tag with changelog body and version
    })
})
