import { PropertyMetadata } from '../metadata'

class TypeMetadataStorageHost {
  private properties = new Array<PropertyMetadata>()

  public addPropertyMetadata(metadata: PropertyMetadata): void {
    this.properties.unshift(metadata)
  }

  public getClassFieldsByPredicate(
    belongsToClass: (item: PropertyMetadata) => boolean
  ): PropertyMetadata[] {
    return this.properties.filter(belongsToClass)
  }
}

export const TypeMetadataStorage = new TypeMetadataStorageHost()
