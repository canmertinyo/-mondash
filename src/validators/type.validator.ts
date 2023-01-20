import { PropertyValidator } from '../interfaces'

class TypeValidatorHost implements PropertyValidator {
  public name = 'TYPE'
  public priority = 1

  public validate(optionValue: any, propertyValue: any): boolean {
    return propertyValue.constructor === optionValue
  }

  public catch(optionValue: any, propertyValue: any): void {
    const typeOfOptionValue = typeof Object.prototype.toString.call(new optionValue())
    throw new Error(`Type of ${propertyValue} is not valid! Expected: ${typeOfOptionValue}`)
  }
}

export const TypeValidator = new TypeValidatorHost()
