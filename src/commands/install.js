import { search, Separator, confirm } from '@inquirer/prompts';
import child_process from 'child_process';
import checkPackage from '../security/checkPackage.js';
import { wait } from 'waiting-tools';

async function install() {

  console.log("\n=========== ~--- Install npm packages ---~ ===========\n")

  var answer = await search({
    message: 'Wich npm package(s) should I install ? 🔍',
    source: async (input, { signal }) => {
      if (!input) {
        return [];
      }
      if (input.length < 2) return []

      const response = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(input)}&size=20`,
        { signal },
      );
      const data = await response.json();

      return data.objects.map((pkg) => ({
        name: `${pkg.package.name} - by ${pkg.package.publisher.username} | ${pkg.downloads.monthly} downloads`,
        value: { 'name': `${pkg.package.name}`, 'score': pkg.score.detail },
        description: `${pkg.package.description} | Depend on ${pkg.dependents}\n`,
      }));
    },
  });

  var warning = 0

  if (answer.score.popularity + answer.score.quality + answer.score.maintenance != 3) warning = 1

  var answer = answer.name

  //"popularity":1,"quality":1,"maintenance":1

  const beSure = await checkPackage.general(`${answer}`)
  if (!beSure || beSure == 0) {
    console.log("An error occured. Please contact the dev @etoile2feu on GitHub if it persist.")
    process.exit(0)
  }

  if (warning == 1) {
    const check = await confirm({ message: `This npm package may be not secure. Please check this manually for your safety.` })
    if (!check) return
  }


  const sure = await confirm({ message: `Are you sure to download these npm packages ?\n\n${answer}\n\n I recommend you to install packages from trustwory mainteners only.` })

  if (sure) {
    console.log(`Installation of ${answer}...`)
    child_process.execSync(`npm install ${answer}`, (err, sdout, stderr) => {
    }) //This isn't a security risk as package name is choosen by the user, and checked a lot of time.
    console.log(`${answer} now installed !`)
    await wait(1000)
  } else {
    console.log(`Installation cancelled !`)
  }
}

export { install }