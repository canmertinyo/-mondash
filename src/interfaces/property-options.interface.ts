export interface PropertyOptions<T = any, K = any> {
  type: String | Number | Boolean | Array<T> | Map<T, K> | Date
  required?: boolean
}
