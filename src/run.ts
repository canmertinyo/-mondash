import { Mondash } from './mondash'
import database from './database.json'

const mondash = new Mondash({
  array: [],
  path: './database.json'
})

mondash.create({ name: 'can' })
// console.log(mondash.findOne({ name: 'can1' }), typeof mondash.findOne({ name: 'can1' }))
console.log(mondash.findOneAndDelete({ name: 'can' }))

// console.log(database[0].name)
