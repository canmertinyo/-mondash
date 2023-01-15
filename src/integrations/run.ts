import { Mondash } from '../mondash'

const mondash = new Mondash({
  array: [],
  path: './database.json'
})
mondash.create({ name: 'can' })
mondash.syncAndUpdateFiles()
