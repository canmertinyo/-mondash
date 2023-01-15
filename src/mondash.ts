import _ from 'lodash'

import fileSystem from 'fs'

import { PathDoesntExistException } from './exceptions/no-path-error'
import { IMondash } from './interfaces/mondash-options'

export class Mondash {
  constructor(public options: IMondash) {
    this.options.store = []

    if (!options.path) throw new PathDoesntExistException()
  }

  public syncAndUpdateFiles(): void {
    if (fileSystem.existsSync(this.options.path) == false) {
      console.log('i cant find any files on your path. But i created new one!')
      fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.store))
    }
    fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.store))
  }

  public createObject(item: object): void {
    item = { item }

    this.options.store?.push(item)
  }

  public write(array: object[]): object[] {
    return (this.options.store = _.cloneDeep(array))
  }

  public meld(): unknown {
    return (this.options.store = _.shuffle(this.options.store))
  }

  public findAll(find?: object): unknown {
    return _.filter(this.options.store, find)
  }

  public findOne(find: object): unknown {
    return _.find(this.options.store, find)
  }

  public insertOne(item: object): void {
    if (this.options.store) {
      this.createObject(item)
    }
  }

  public insertMany(item: object[]): void {
    for (const insert of item) {
      this.createObject(insert)
    }
    console.log('items added!')
  }
}
