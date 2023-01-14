import { Mondash } from './mondash'

const mondash = new Mondash({
  path: './database1.json'
})

mondash.insertMany([{ name: 'can' }, { name: 'can cevik' }, { name: 'canmertinyo' }])

mondash.syncAndUpdateFiles()
// console.log(mondash.findAll({}))
