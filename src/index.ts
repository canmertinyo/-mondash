import { Mondash } from './mondash'

const mondash = new Mondash({
  path: './database1.json'
})

mondash.insertMany([
  { id: '232323', name: 'can' },
  { id: '2308923', name: 'mert' },
  { id: '2308923', name: 'mert' }
])

mondash.createPath()
