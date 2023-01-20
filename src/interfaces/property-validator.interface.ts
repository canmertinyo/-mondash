export interface PropertyValidator {
  name: string
  priority: number
  validate(optionValue: any, propertyValue: any): boolean
  catch(optionValue: any, propertyValue: any, propertyKey: string): void
}
