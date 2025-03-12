import { readFileSync } from 'node:fs'
import yargs from 'yargs'

const argv = yargs(process.argv).argv

console.log('???')
console.log(argv)

const data = JSON.parse(readFileSync('/speckle/automate.json', 'utf-8'))

console.log(data)

