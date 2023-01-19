import { Type } from '../interfaces'
import { PropertyMetadata, SchemaMetadata } from '../metadata'

class TypeMetadataStorageHost {
  private properties = new Array<PropertyMetadata>()
  private schemas = new Array<SchemaMetadata>()

  public addPropertyMetadata(metadata: PropertyMetadata): void {
    this.properties.unshift(metadata)
  }

  public addSchemaMetadata(metadata: SchemaMetadata): void {
    this.schemas.unshift(metadata)
  }

  public getSchemaMetadataByTarget(target: Type): SchemaMetadata | undefined {
    return this.schemas.find((schema) => schema.target === target)
  }

  public getClassFieldsByPredicate(
    belongsToClass: (item: PropertyMetadata) => boolean
  ): PropertyMetadata[] {
    return this.properties.filter(belongsToClass)
  }
}

export const TypeMetadataStorage = new TypeMetadataStorageHost()
