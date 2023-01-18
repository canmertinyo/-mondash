import { BaseException } from './base.exception'

export class WrongFileExtensionException extends BaseException {
  constructor() {
    super('Your file has doesnt supported file type.')
  }
}
