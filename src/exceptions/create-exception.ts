import { BaseException } from './base-exception'

export class CreateException extends BaseException {
  constructor() {
    super('Something wrong with your object!')
  }
}
