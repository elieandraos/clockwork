import path from 'path'
import chalk from 'chalk'
import _ from '@elieandraos/cli-tools'

const root = path.join(__dirname, '../')

try {
    _.release(root).then(() => {
        console.log(chalk.bgGreen.white('\nDONE! 🎉\n'))
    })
} catch (e) {
    console.log(e)
}
