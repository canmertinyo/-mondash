import _ from 'lodash'
import { v4 as uuid } from 'uuid'

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

    if (path.extname(this.options.path) !== '.json') throw new WrongFileNameException()

    if (!options.path) throw new PathDoesntExistException()
  }

  public syncAndUpdateFiles(): void {
    try {
      fileSystem.writeFileSync(this.options.path, JSON.stringify(this.options.array))
    } catch (error) {
      error
    }
  }

  public create(object: object): void {
    if (!object) throw new EmptyCreateFieldException()
    object = { id: uuid(), object }
    this.options.array.push(object)
    this.syncAndUpdateFiles()
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
