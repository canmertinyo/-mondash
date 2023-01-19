import { Type } from '../interfaces'
import { Mondash } from '../mondash'
import { TypeMetadataStorage } from '../storages'

export class SchemaFactory {
  public static createForClass<T>(schema: Type<T>): Mondash<T> {
    const schemaMetadata = TypeMetadataStorage.getSchemaMetadataByTarget(schema)

    if (!schemaMetadata) {
      throw new Error(`Schema cannot found for: ${schema.name}`)
    }
    return new Mondash<T>(schema, schemaMetadata.options)
  }
}
