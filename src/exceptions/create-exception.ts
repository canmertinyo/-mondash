import { BaseException } from './base-exception'

export class EmptyCreateFieldException extends BaseException {
  constructor() {
    super('Something wrong with your object!')
  }
}
