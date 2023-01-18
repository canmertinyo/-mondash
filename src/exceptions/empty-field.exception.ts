import { BaseException } from './base.exception'

export class EmptyFieldException extends BaseException {
  constructor() {
    super('This field cant be empty! Try to fill with something')
  }
}
