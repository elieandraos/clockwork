const shell = require('shelljs')
const { Select } = require('enquirer')
const changelogParser = require('changelog-parser')

const cancelRelease = () => {
    shell.exec('git checkout package.json package-lock.json', { silent: true })
}

const abortWithMessage = (message) => {
    console.log(message)
    shell.exit(0)
}

const checkGitStatus = new Promise((resolve) => {
    if (shell.exec('git diff --stat', { silent: true }).stdout !== '') {
        abortWithMessage('Working directory is not clean. Push your changes.')
    }

    // todo: heck if this is master branch (if not, cannot release)

    console.log('working directory is clean.')
    resolve(true)
})

const bumpVersion = (release) => {
    return new Promise((resolve) => {
        let version = shell
            .exec(
                `npm version --commit-hooks false --git-tag-version false ${release}`,
                { silent: true }
            )
            .stdout.trim()

        console.log(`bumping package to version ${version}`)
        resolve(version)
    })
}

const parseChangelog = (version) => {
    return new Promise((resolve, reject) => {
        changelogParser('CHANGELOG.md')
            .then(function (result) {
                let changelog = result.versions.find((v) => v.title === version)

                if (!changelog) {
                    cancelRelease()
                    abortWithMessage(
                        `Could not find ${version} changelog. Update CHANGELOG.md file.`
                    )
                } else {
                    resolve(changelog.body)
                }
            })
            .catch(function (err) {
                cancelRelease()
                abortWithMessage('Could not parse CHANGELOG.md file.')
                reject(err)
            })
    })
}

// start
const prompt = new Select({
    name: 'semantic',
    message: 'Pick a semantic release type?',
    choices: ['patch', 'minor', 'major'],
})

prompt.run().then((semantic) => {
    checkGitStatus.then(() => {
        bumpVersion(semantic).then((version) => {
            parseChangelog(version).then((body) => {
                console.log(body)
                // git add package.json package-lock.json
                // git commit message `:rocket: release ${version}`
                // git tag with changelog body and version

                //git commit -am $npm_package_version && git tag $npm_package_version && git push && git push --tags
                // https://docs.github.com/en/rest/reference/repos#releases
            })
        })
    })
})
