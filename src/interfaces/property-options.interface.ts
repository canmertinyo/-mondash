import { Type } from './type.interface'

export interface PropertyOptions<T = any, K = any> {
  type: Type<String | Number | Boolean | Array<T> | Map<T, K> | Date>
  required?: boolean
}
