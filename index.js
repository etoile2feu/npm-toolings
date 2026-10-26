import { select, confirm } from "@inquirer/prompts";
import data from "./data.json" with { type: "json" }
import path from 'path'
import { init } from "./src/commands/init.js"
import { install } from "./src/commands/install.js"
import { remove } from "./src/commands/remove.js"
import { update } from "./src/commands/update.js"
import { safety } from "./src/commands/safety.js"
import fs from 'fs'

var exit = 0

async function run(link) {

    if (!fs.existsSync(`${path.resolve(link)}/.npe`)) {
        await init(link)
    }

    var answer = ""


    var answer = await select({
        message: `~--- npm-toolings V${data.releaseNumber} ---~`,
        choices: [
            {
                name: "Installing a module",
                value: "install",
                description: "Install modules from the official npm registry"
            },
            {
                name: "Removing a module",
                value: "remove",
                description: "Remove a module from your dependencies"
            },
            {
                name: "Update safely your modules",
                value: "update",
                description: "Update your dependencies, and safely"
            },
            {
                name: "Safety check",
                value: "safety",
                description: "Scan your dependencies for safety (not only with npm audit)"
            },
            {
                name: "Exit npm-toolings",
                value: "exit",
                description: "This will close this program and take you back to a shell"
            }
        ]
    });

    if (answer == "install") {

        await install()

        return 0

    } else if (answer == "remove") {

        await remove(link)

        return 0

    } else if (answer == "update") {

        const test = await update(link)

        return 0

    } else if (answer == "safety") {

        await safety()

        return 0

    } else if (answer == "exit") {
        return 1
    }

}

async function heaven(link) {
    var exit = 0
    while (exit != 1) {
        var exit = await run(link)
    }
}

export { heaven }