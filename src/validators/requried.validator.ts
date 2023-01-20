import { PropertyValidator } from '../interfaces'

class RequiredValidatorHost implements PropertyValidator {
  public name = 'REQUIRED'
  public priority = 0

  public validate(optionValue: any, propertyValue: any): boolean {
    return optionValue && propertyValue
  }

  public catch(optionValue: any, propertyValue: any): void {
    throw new Error(`Property is requried but got: ${propertyValue}`)
  }
}

export const RequiredValidator = new RequiredValidatorHost()
