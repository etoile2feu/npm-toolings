import { select, Separator, confirm } from '@inquirer/prompts';
import fs from 'fs';
import child_process from 'child_process';
import path from 'path';
import { wait } from 'waiting-tools';

async function update(link) {

  console.log("\n=========== ~--- Update npm packages ---~ ===========\n")
  console.log("\nHere, you can do a package updates, with more secure options.\nWith recommendeds options, packages publish less than 6 hours ago are not updated, making a huge protection against recents supply chain attacks in the npm ecosytem.")

  const answer = await select({
    message: 'Choose your update options',
    choices: [
      {
        name: "safe update (recommended)",
        value: "safe",
        description: "Update packages that are released more than 6 hours ago; and don't update packages with possible breaking changes"
      },
      {
        name: "stable update",
        value: "stable",
        description: "Update all packages but don't update packages with possible breaking changes"
      },
      {
        name: "full safe update (recommended)",
        value: "full-safe",
        description: "Update all packages that are released more than 6 hours ago, even with possible breaking changes. If you check your dependencies for breaking changes before doing that you should be fine."
      },
      {
        name: "full update",
        value: "full",
        description: "Update all packages, even with possible breaking changes. If you check your dependencies for breaking changes before doing that you should be fine."
      }
    ]
  });


  const sure = await confirm({ message: `Are you sure to ${answer} your npm packages ?\nIf you selected full upgrade, please check your modules for breaking changes with the command npm outdated` })

  if (sure) {
    if (answer === "safe") {
      fs.copyFileSync(`${path.resolve(`${link}`)}/package.json`, `${path.resolve(`${link}`)}/.npe/backups/package.json`)
      console.log(`Updating your npm packages... This can last a few minutes if you have a lot of packages.`)
      child_process.execSync(`npx npm-check-updates --cooldown 0.25 --target minor -u`, (err, stdout, stderr) => {
        child_process.execSync(`npm install`, (err, stdout, stderr) => {
          console.log(`Safe update is now finished !`)
        })
      })
    } else if (answer === "stable") {
      fs.copyFileSync(`${path.resolve(`${link}`)}/package.json`, `${path.resolve(`${link}`)}/.npe/backups/package.json`)
      console.log(`Updating your npm packages... This can last a few minutes if you have a lot of packages.`)
      child_process.execSync(`npx npm-check-updates --target minor -u`, (err, stdout, stderr) => {
        child_process.execSync(`npm install`, (err, stdout, stderr) => {
          console.log(`Stable update is now finished !`)
        })
      })
    } else if (answer === "full-safe") {
      fs.copyFileSync(`${path.resolve(`${link}`)}/package.json`, `${path.resolve(`${link}`)}/.npe/backups/package.json`)
      console.log(`Updating your npm packages... This can last a few minutes if you have a lot of packages.`)
      child_process.execSync(`npx npm-check-updates --cooldown 0.25 -u`, (err, stdout, stderr) => {
        child_process.execSync(`npm install`, (err, stdout, stderr) => {
          console.log(`Full safe update is now finished !`)
        })
      })
    } else if (answer === "full") {
      fs.copyFileSync(`${path.resolve(`${link}`)}/package.json`, `${path.resolve(`${link}`)}/.npe/backups/package.json`)
      console.log(`Updating your npm packages... This can last a few minutes if you have a lot of packages.`)
      child_process.execSync(`npx npm-check-updates -u`, (err, stdout, stderr) => {
        child_process.execSync(`npm install`, (err, stdout, stderr) => {
          console.log(`Full update is now finished !`)
        })
      })
    }

    await wait(1000)

  } else {
    console.log(`Update cancelled !`)
  }

}

export { update }