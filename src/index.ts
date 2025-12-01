import { aocData } from './data.js'

const day = +process.argv[2]
const part = +process.argv[3]
const data = aocData(day)[process.argv[4] === 'test' ? 'test' : 'real']

const { [`star${part}`]: run } = await import(`./days/D${day}.js`)

console.time(`running part ${part} of day ${day}`)
run(data)
console.timeEnd(`running part ${part} of day ${day}`)
