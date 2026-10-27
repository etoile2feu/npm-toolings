import fs from 'fs';
import path from 'path';
import { confirm } from '@inquirer/prompts';
import child_process from 'child_process';

async function init(link) {

    const sure = await confirm({ message: `Welcome to npm-toolings !\nTo make the project works with the module, it'll make your package.json target specific release, so if you want to update your modules use this program.\nAs it's the first release of npm-toolings, please use it in testing environment only. If you have a .npmrc config save it because this will also remove it.` })

    if (!sure) {
        console.log("Cancelled, aborting program.")
        process.exit(0)
    }

    try {
        fs.mkdirSync(`${path.resolve(`${link}`)}/.npe`)
    } catch (e) {

    }

    try {
        fs.mkdirSync(`${path.resolve(`${link}`)}/.npe/backups`)
    } catch (e) {

    }

    try {
        fs.mkdirSync(`${path.resolve(`${link}`)}/.npe/temp`)
    } catch (e) {

    }

    try {
        fs.writeFileSync(`${path.resolve(`${link}`)}/.npmrc`, `save-exact = true`)
        var data = JSON.stringify(fs.readFileSync(`${path.resolve(`${link}`)}/package.json`, 'utf-8'));
        var fan = data.replace(/[\^~]/g, '');
        fs.writeFileSync(`${path.resolve(`${link}`)}/package.json`, JSON.parse(fan), 'utf-8');
    } catch (e) {

    }

    const suree = await confirm({ message: `If you do not want to use this module anymore, or want to update your packages with the npm update command without doing it with this module, you'll have to set your .npmrc save-exact=false and put a ^ before each releases on your package.json file.` })

    if (!suree) {
        console.log("Uninstalling the module... To reinstall the module, delete the .npe folder and launch npm-toolings again.")
        try {

            fs.unlinkSync(`${path.resolve(`${link}`)}/.npe`)
        } catch (e) {

        }
        try {

            fs.writeFileSync(`${path.resolve(`${link}`)}/.npmrc`, `save-exact = false`)

        } catch (e) {

        }

        try {
            fs.writeFileSync(`${path.resolve(`${link}`)}/.npmrc`, `save-exact = true`)
        } catch (e) {

        }

        var data = fs.readFileSync(`${path.resolve(`${link}`)}/package.json`, 'utf-8');
        var fan = data.replace(/(:\s*\")(\d)/g, '$1^$2');

        fs.writeFileSync(`${path.resolve(`${link}`)}/package.json`, fan, 'utf-8');
        process.exit(0)
    }

    console.log(`Thank you for installing npm-toolings ! Just so you know, if anything goes wrong all the logs are in ${path.resolve(`${link}`)}/.npe/backups.`)

}

export { init }