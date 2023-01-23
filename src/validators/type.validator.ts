import { isArray } from 'lodash'

import { PropertyValidator } from '../interfaces'

class TypeValidatorHost implements PropertyValidator {
  public name = 'TYPE'
  public priority = 1

  public validate(optionValue: any, propertyValue: any): boolean {
    const typeOfOptionValue = isArray(optionValue) ? optionValue.constructor : optionValue
    return propertyValue.constructor === typeOfOptionValue
  }

  public catch(optionValue: any, propertyValue: any, propertyKey: string): void {
    const typeOfOptionValue = (new optionValue[0]() || new optionValue()).constructor.name
    const typeOfPropertyValue = propertyValue.constructor.name
    throw new Error(
      `Type for "${propertyKey}" is not valid! Expected: ${typeOfOptionValue}, got: ${typeOfPropertyValue}`
    )
  }
}

export const TypeValidator = new TypeValidatorHost()
