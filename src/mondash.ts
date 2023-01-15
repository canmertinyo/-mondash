import _ from 'lodash'

import fileSystem from 'fs'

import { PathDoesntExistException } from './exceptions/no-path-error'
import { MondashOptions } from './interfaces/mondash-options'
import { CreateException } from './exceptions/create-exception'

export class Mondash {
  constructor(public options: MondashOptions) {
    this.options.array = []

    if (!options.path) throw new PathDoesntExistException()
  }

  public syncAndUpdateFiles(): void {
    fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.array))
  }

  public create(item: object): void {
    try {
      item = { item }
      this.options.array?.push(item)
      this.syncAndUpdateFiles()
    } catch (error) {
      throw new CreateException()
    }
  }

  public write(array: object[]): object[] {
    this.syncAndUpdateFiles()
    return (this.options.array = _.cloneDeep(array))
  }

  public meld(): unknown {
    return (this.options.array = _.shuffle(this.options.array))
  }

  public findAll(find?: object): unknown {
    return _.filter(this.options.array, find)
  }

  public findOne(find: object): unknown {
    return _.find(this.options.array, find)
  }

  public insertOne(item: object): void {
    if (this.options.array) {
      this.create(item)
    }
  }

  public insertMany(item: object[]): void {
    for (const insert of item) {
      this.create(insert)
    }
  }
}
