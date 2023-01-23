import _, { ListIteratee } from 'lodash'
import { v4 as uuid } from 'uuid'
import fse from 'fs-extra'

import { Document, MondashOptions, Type } from './interfaces'
import { ValidatorFactory } from './factories'

export class Mondash<T> {
  private array: Document<T>[]
  private fileName: string

  constructor(private schema: Type<T>, private options: MondashOptions) {
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

  public create(item: T): Document<T> {
    const createdItem: Document<T> = { id: uuid(), ...item }
    this.array.push(createdItem)
    this.syncAndUpdateFiles(createdItem)
    return createdItem
  }

  public mixList(): Document<T>[] {
    this.array = _.shuffle(this.array)
    return this.array
  }

  public findAll(filter: Partial<T>): Document<T>[] {
    return _.filter(this.array, filter) as Document<T>[]
  }

  public findOne(filter: Partial<T>): Document<T> | undefined {
    return _.find(this.array, filter) as Document<T>
  }

  public insertMany(items: T[]): void {
    items.forEach(this.create)
  }

  public findOneAndDelete(filter: Partial<T>): Document<T>[] {
    const result = _.remove(this.array, filter as ListIteratee<T>) as Document<T>[]
    this.syncAndUpdateFiles()
    return result
  }
}
