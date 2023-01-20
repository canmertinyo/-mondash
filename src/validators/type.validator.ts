import { PropertyValidator } from '../interfaces'

class TypeValidatorHost implements PropertyValidator {
  public name = 'TYPE'
  public priority = 1

  public validate(optionValue: any, propertyValue: any): boolean {
    return propertyValue.constructor === optionValue
  }

  public catch(optionValue: any, propertyValue: any, propertyKey: string): void {
    const typeOfOptionValue = typeof Object.prototype.toString.call(new optionValue())
    throw new Error(
      `Type for "${propertyKey}" is not valid! Expected: ${typeOfOptionValue}, got: ${typeof propertyValue}`
    )
  }
}

export const TypeValidator = new TypeValidatorHost()
