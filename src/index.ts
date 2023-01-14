import { Mondash } from './mondash'

const mondash = new Mondash({
  path: './database1.json'
})

mondash.insertMany([{ name: 'can' }, { name: 'can cevik' }, { name: 'canmertinyo' }])

mondash.createPath()

// console.log(mondash.findAll({}))
console.log(mondash.findOne({ name: 'can' }))

console.log(mondash.meld())
