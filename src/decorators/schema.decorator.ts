import { SchemaOptions } from '../interfaces'
import { TypeMetadataStorage } from '../storages'

export function Schema(options: SchemaOptions): Function {
  return (target: object) => {
    TypeMetadataStorage.addSchemaMetadata({
      target,
      options
    })
  }
}
