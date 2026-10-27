import { search, Separator, confirm } from '@inquirer/prompts';
import fs from 'fs'
import path from 'path'
import child_process from 'child_process';
import checkPackage from '../security/checkPackage.js';
import { wait } from 'waiting-tools';

async function remove(link) {

  const packages = JSON.parse(await fs.readFileSync(`${path.resolve(link)}/package.json`))

  console.log("\n=========== ~--- Remove npm packages ---~ ===========\n")

  const answer = await search({
    message: 'What npm package(s) should I remove ? 🔍',
    source: async (input, { signal }) => {
      if (!input) {
        return [];
      }

      const data = Object.keys(packages.dependencies)

      const dataArray = []
      data.forEach(element => {
        if (element.search(input) == 0) {
          dataArray.push(element)
        }
      });


      return dataArray.map((pkg) => ({
        name: `${pkg}`,
        value: pkg,
        description: `Remove a package`,
      }));
    },
  });


  const beSure = await checkPackage.general(`${answer}`)
  if (!beSure || beSure == 0) {
    console.log("An error occured. Please contact the dev @etoile2feu on GitHub if it's continue.")
    process.exit(0)
  }

  const sure = await confirm({ message: `Are you sure to remove these npm packages ?\n\n${answer}\n\nPlease check your names.` })

  if (sure) {
    console.log(`Remove ${answer}...`)
    child_process.execSync(`npm remove ${answer}`, (err, stdout, stderr) => {

    }) //This isn't a security risk as package name is choosen by the user, and checked a lot of time.
    console.log(`${answer} now removed !`)
    await wait(1000)
  } else {
    console.log(`Removal cancelled !`)
  }

}

export { remove }