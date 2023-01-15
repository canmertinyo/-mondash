import { Mondash } from '../mondash'

const mondash = new Mondash({
  path: '../database.json'
})

mondash.syncAndUpdateFiles()
