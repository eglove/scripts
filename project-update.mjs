import { execSync } from 'child_process'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import { projects } from './projects.mjs'
import inquirer from 'inquirer'

const runCommand = (command) => {
  execSync(command, {
    stdio: 'inherit',
  })
}

for (const projectKey in projects) {
  const project = projects[projectKey]

  process.chdir(project.path)

  console.log(chalk.white.bgBlue(`Running for ${projectKey}`))

  await simpleGit().checkout(project.branch)

  if (project.dependencyScripts?.length > 0) {
    for (const script of project.dependencyScripts) {
      runCommand(script)
    }
  }

  const status = await simpleGit().status()

  if (status.isClean()) {
    continue
  }

  if (project.postDependencyScripts?.length > 0) {
    for (const script of project.postDependencyScripts) {
      runCommand(script)
    }
  }

  await simpleGit().add('.')
  await simpleGit().commit('Version Bump')
  await simpleGit().push()

  if (project.publish) {
    const { updateType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'updateType',
        message: 'Update Type',
        choices: ['patch', 'minor', 'major'],
      }
    ])

    runCommand(`npm version ${updateType}`)
    runCommand('node build.mjs')
    await simpleGit().push()
  }
}

process.exit()
