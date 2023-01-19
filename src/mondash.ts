import _ from 'lodash'
import { v4 as uuid } from 'uuid'

import fileSystem from 'fs'

import { MondashOptions } from './interfaces'
import { EmptyFieldException } from './exceptions'

export class Mondash {
  private array: object[] = []

  constructor(private options: MondashOptions) {}

  public syncAndUpdateFiles(): void {
    try {
      fileSystem.writeFileSync(this.options.path, JSON.stringify(this.array))
    } catch (error) {
      error
    }
  }

  public create(object: object): void {
    object = { id: uuid(), object }
    this.array.push(object)
    this.syncAndUpdateFiles()
  }

  public mixList(): object[] {
    this.array = _.shuffle(this.array)
    return this.array
  }

  public findAll(find: object): object {
    return _.filter(this.array, find)
  }

  public findOne(item: object): object | undefined {
    if (Object.keys(item).length === 0) throw new EmptyFieldException()
    return _.find(this.array, item)
  }

  public insertOne(item: object): void {
    this.create(item)
  }

  public insertMany(item: object[]): void {
    for (const insert of item) {
      this.create(insert)
    }
  }

  public writeDataFromDifferentFile(array: object[]): void {
    for (const item of array) {
      this.create(item)
    }
  }

  public findOneAndDelete(item: object): unknown {
    return _.remove(this.array, item)
  }
}
