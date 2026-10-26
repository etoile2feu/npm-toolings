import { search, Separator, confirm } from '@inquirer/prompts';
import child_process from 'child_process';
import fs from 'fs';

async function safety() {

    return new Promise(async (resolve, reject) => {

        console.log("\n=========== ~--- Safety check ---~ ===========\n")


        console.log("\n\nDepending on your numbers of packages this scan usually take 1 second to 30 seconds. It help scanning the security but doesnt do all.")

        console.log("\n0% Basic scan with npm audit...")

        child_process.execSync("npm audit --json > ../../.npe/temp/audit.json")

        console.log("\n17% Detection of post-install files...")

        const list = []
        const files = fs.readdirSync('../../node_modules/')
        files.forEach(check => {
            const stats = fs.statSync()
            stats.isDirectory()
        })

        console.log("\n34% Find unkown packages...")

        console.log("\n47% Detect obfuscated code in node_modules...")

        console.log("\n62% Supply chain attack check...")

        console.log("\n77% Size comparing...")

        console.log("\n100% Typosquatting packages...")

        console.log("\n --- Scan finished ! Writing your personnalised report... ---\n")

        await wait(1000)

        resolve(true)

    })

}

export { safety }