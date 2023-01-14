import _ from 'lodash'

import fileSystem from 'fs'

import { uuidV4Generator } from './services/uuidv4-generator'
import { PathDoesntExistException } from './exceptions/no-path-error'
import { MondashInterface } from './interfaces/mondash-interface'

export class Mondash {
  constructor(public options: MondashInterface) {
    //create an empty array
    this.options.store = []

    if (!options.path || typeof options.path !== 'string') throw new PathDoesntExistException()
  }

  public createPath(): void {
    if (fileSystem.existsSync(this.options.path)) {
      fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.store))
    } else {
      console.log('i cant find any files in your path. But i created new one!')
      fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.store))
    }
  }

  public createObject(item: object): void {
    item = {
      objectId: uuidV4Generator(),
      item
    }

    this.options.store?.push(item)
  }

  public write(array: object[]): object[] {
    return (this.options.store = _.shuffle(array))
  }

  public shuffle(): void {
    this.options.store = _.shuffle(this.options.store)
  }

  //mongoose metodları
  public insertOne(item: object): void {
    if (this.options.store) {
      //eğer undefined değilse diye böyle bir kontrol yaptım.
      this.options.store.push(item)
    }
  }

  public insertMany(item: object[]): void {
    for (const insert of item) {
      this.createObject(insert)
      console.log(insert) //to log myself
    }
  }
}
