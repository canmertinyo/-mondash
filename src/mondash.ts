import _ from 'lodash'

import fileSystem from 'fs'

import { PathDoesntExistException } from './exceptions/no-path-error'
import { MondashOptions } from './interfaces/mondash-options'
import { CreateException } from './exceptions/create-exception'
import { WrongFileNameException } from './exceptions/wrong-file-name-exception'
import { EmptyFieldException } from './exceptions'

export class Mondash {
  constructor(public options: MondashOptions) {
    this.options.array = []

    if (this.options.path.includes('.json') == false) throw new WrongFileNameException()

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

  public mixList(): unknown {
    return (this.options.array = _.shuffle(this.options.array))
  }

  public findAll(find: object): unknown {
    return _.filter(this.options.array, find)
  }

  public findOne(item: object): unknown {
    // return _.find(this.options.array, item)
    if (Object.keys(item).length == 0) throw new EmptyFieldException()
    return _.filter(this.options.array, { item })
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
