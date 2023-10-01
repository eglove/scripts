import { execSync } from 'child_process'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import { projects } from './projects.mjs'
import inquirer from 'inquirer'

const runCommand = (command, condition = true) => {
  if (condition === true) {
    execSync(command, {
      stdio: 'inherit',
    })
  }
}

for (const projectKey in projects) {
  const project = projects[projectKey]

  process.chdir(project.path)

  console.log(chalk.white.bgBlue(`Running for ${projectKey}`))

  await simpleGit().checkout(project.branch)
  runCommand('pnpm prune')
  runCommand('pnpm up -i --latest', project.updateDeps)
  runCommand('pnpm up -i -r --latest', project.isTurboRepo)

  const status = await simpleGit().status()

  if (status.isClean()) {
    continue
  }

  runCommand('pnpm dedupe')
  runCommand('turbo daemon clean', project.isTurboRepo)
  runCommand('pnpm lint', project.lint)
  runCommand('pnpm test', project.test)
  runCommand(`pnpm build`, project.build)

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
