import { PropertyOptions } from '../interfaces'
import { TypeMetadataStorage } from '../storages'

export function Prop(options: PropertyOptions): Function {
  return (target: object, propertyKey: string | symbol) => {
    TypeMetadataStorage.addPropertyMetadata({
      target,
      propertyKey,
      options
    })
  }
}
