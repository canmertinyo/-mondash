import _ from 'lodash'

import { Type } from '../interfaces'
import { TypeMetadataStorage } from '../storages'
import { RequiredValidator, TypeValidator } from '../validators'

class ValidatorFactoryHost {
  private validators = _.orderBy([RequiredValidator, TypeValidator], 'priority', 'asc')

  public validateForSchema<T>(schema: Type<T>, value: T): boolean {
    const classFieldsMetadata = TypeMetadataStorage.getClassFieldsByPredicate(
      (item) => item.target === schema
    )

    return this.validators.every((validator) => {
      return classFieldsMetadata.every((metadata) => {
        return Object.entries(metadata.options).some(([optionName, optionValue]) => {
          if (validator && validator.name !== optionName.toUpperCase()) return

          const propertyValue = value[metadata.propertyKey as keyof typeof value]
          const isValidated = validator.validate(optionValue, propertyValue)

          if (!isValidated) {
            validator.catch(optionValue, propertyValue, metadata.propertyKey as string)
          }
          return isValidated
        })
      })
    })
  }
}

export const ValidatorFactory = new ValidatorFactoryHost()
