const shell = require('shelljs')
const { Select } = require('enquirer')
const changelogParser = require('changelog-parser')
const { Octokit } = require('@octokit/core')
require('dotenv').config()

const resetVersionedFiles = () => {
    shell.exec('git checkout package.json package-lock.json', { silent: true })
}

const abortWithMessage = (message) => {
    console.log(message)
    shell.exit(0)
}

const print = (message) => {
    console.log(message)
}

const releaseChecklistValidated = new Promise((resolve) => {
    // check if .env token exists
    if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
        abortWithMessage('add GITHUB_PERSONAL_ACCESS_TOKEN in .env file')
    }

    print('GITHUB_PERSONAL_ACCESS_TOKEN exists')

    // check if working directory is clean (nothing to commit)
    if (shell.exec('git diff --stat', { silent: true }).stdout !== '') {
        abortWithMessage('working directory is not clean - push your changes')
    }

    print('working directory is clean')

    // check if local branch is master
    if (
        shell.exec('git branch --show-current', { silent: true }).stdout !==
        'master'
    ) {
        abortWithMessage('switch to master branch to release the package')
    }

    print('current local branch: master')

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

        print(`bumped package to version ${version}`)
        resolve(version)
    })
}

const parseChangelog = (version) => {
    return new Promise((resolve, reject) => {
        changelogParser('CHANGELOG.md')
            .then(function (result) {
                let changelog = result.versions.find((v) => v.title === version)

                if (!changelog) {
                    resetVersionedFiles()
                    abortWithMessage(
                        `could not find ${version} changelog - update CHANGELOG.md file`
                    )
                } else {
                    resolve(changelog.body)
                }
            })
            .catch(function (err) {
                resetVersionedFiles()
                abortWithMessage('could not parse CHANGELOG.md file')
                reject(err)
            })
    })
}

const createGitHubTag = (version) => {
    let tag = version.substring(1)

    shell.exec('git add package-lock.json package.json', { silent: true })
    shell.exec(`git commit -m ':rocket: release ${version}'`, { silent: true })
    shell.exec(`git tag ${tag}`, { silent: true })
    shell.exec('git push && git push --tags', { silent: true })

    print(`created gitHub tag ${tag}`)
}

const createGitHubRelease = async (owner, repo, version, body) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    })

    await octokit.request('POST /repos/{owner}/{repo}/releases', {
        owner: owner,
        repo: repo,
        tag_name: version.substring(1),
        name: version,
        body: body,
    })
}

const prompt = new Select({
    name: 'semantic',
    message: 'Pick a semantic release type?',
    choices: ['patch', 'minor', 'major'],
})

// start
prompt.run().then((semantic) => {
    releaseChecklistValidated.then(() => {
        bumpVersion(semantic).then((version) => {
            parseChangelog(version).then((body) => {
                createGitHubTag(version)
                createGitHubRelease('elieandraos', 'clockwork', version, body)
                    .then(() => {
                        print(`created gitHub release ${version}`)
                        print(
                            "The repo's gitHub action will publish the package to npm registry"
                        )
                    })
                    .catch((err) => {
                        print(err)
                    })
            })
        })
    })
})
