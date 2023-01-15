import { BaseException } from './base-exception'

export class WrongFileNameException extends BaseException {
  constructor() {
    super('Your file has doesnt supported file type.')
  }
}
