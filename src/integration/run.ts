import { Mondash } from '../mondash'

const mondash = new Mondash({
  path: '../database.json'
})

mondash.create({ name: 'can' })
console.log(mondash.findAll({}))
