import { SchemaOptions } from '../interfaces'
import { TypeMetadataStorage } from '../storages'

export function Schema(options: SchemaOptions): Function {
  return (target: object): void => {
    TypeMetadataStorage.addSchemaMetadata({
      target,
      options
    })
  }
}
