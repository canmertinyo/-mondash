import _, { ListIteratee } from 'lodash'
import { v4 as uuid } from 'uuid'
import fse from 'fs-extra'

import { MondashOptions, Type } from './interfaces'
import { EmptyFieldException } from './exceptions'
import { ValidatorFactory } from './factories'

export class Mondash<T> {
  private array: T[]
  private fileName: string

  constructor(public schema: Type<T>, private options: MondashOptions) {
    this.fileName = `${this.options.name}.json`

    if (!fse.existsSync(this.fileName)) {
      fse.writeFileSync(this.fileName, '[]')
    }
    this.array = fse.readJSONSync(this.fileName)
  }

  private syncAndUpdateFiles(item?: T): void {
    if (item) {
      ValidatorFactory.validateForSchema(this.schema, item)
    }
    fse.writeJSONSync(this.fileName, this.array, { spaces: 4 })
  }

  public create(item: T): void {
    item = { id: uuid(), ...item }
    this.array.push(item)
    this.syncAndUpdateFiles(item)
  }

  public mixList(): T[] {
    this.array = _.shuffle(this.array)
    return this.array
  }

  public findAll(filter: Partial<T>): T[] {
    return _.filter(this.array, filter) as T[]
  }

  public findOne(filter: Partial<T>): T | undefined {
    if (Object.keys(filter).length === 0) throw new EmptyFieldException()
    return _.find(this.array, filter) as T
  }

  public insertOne(item: T): void {
    this.array.unshift(item)
    this.syncAndUpdateFiles(item)
  }

  public insertMany(items: T[]): void {
    items.forEach(this.create)
  }

  public findOneAndDelete(filter: Partial<T>): T[] {
    const result = _.remove(this.array, filter as ListIteratee<T>) as T[]
    this.syncAndUpdateFiles()
    return result
  }
}
