import _ from 'lodash'

import path from 'path'
import fileSystem from 'fs'

import { MondashOptions } from './interfaces/mondash-options'
import {
  EmptyCreateFieldException,
  EmptyFieldException,
  PathDoesntExistException,
  WrongFileNameException
} from './exceptions/index'

export class Mondash {
  constructor(public options: MondashOptions) {
    this.options.array = []

    if (path.extname(this.options.path) != '.json') throw new WrongFileNameException()

    if (!options.path) throw new PathDoesntExistException()
  }

  public syncAndUpdateFiles(): void {
    fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.array))
  }

  public create(item: object): void {
    try {
      item = { item }
      this.options.array.push(item)
      this.syncAndUpdateFiles()
    } catch (error) {
      throw new EmptyCreateFieldException()
    }
  }

  public mixList(): object[] {
    return (this.options.array = _.shuffle(this.options.array))
  }

  public findAll(find: object): object {
    return _.filter(this.options.array, find)
  }

  public findOne(item: object): object {
    if (Object.keys(item).length == 0) throw new EmptyFieldException()
    return _.filter(this.options.array, { item })
  }

  public insertOne(item: object): void {
    if (!this.options.array) throw new EmptyFieldException()
    this.create(item)
  }

  public insertMany(item: object[]): void {
    for (const insert of item) {
      this.create(insert)
    }
  }

  public writeDataFromDifferentFile(array: object[]): void {
    if (!array) throw new EmptyFieldException()
    for (const item of array) {
      this.create(item)
    }
  }
}
