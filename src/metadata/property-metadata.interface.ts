import { PropertyOptions } from '../interfaces'

export interface PropertyMetadata {
  target: Object
  propertyKey: string | symbol
  options: PropertyOptions
}
