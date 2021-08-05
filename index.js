#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const createPassword = require('./utils/createPassword')
const savePassword = require('./utils/savePassword')
const log = console.log

// Makes a --help tab for the cli
program.version('1.0.0').description('Simple Password Generator')

program
    .option('-l, --length <numbers>','length of password','8')
    .option('-s, --save','save passwords to passwords.txt')
    .option('-nn, --no-numbers','remove numbers')
    .option('-ns, --no-symbols','remove symbols')
    .parse()

const {length, save, numbers, symbols} = program.opts()

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols)

// Save to file
if(save) {
    savePassword(generatedPassword)
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword)

// Output generated password
log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword))
log(chalk.yellow('Password copied to clipboard'))
