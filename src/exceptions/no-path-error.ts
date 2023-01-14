import { BaseException } from './base-exception'

export class PathDoesntExistException extends BaseException {
  constructor() {
    super('File is not exist on your path!')
  }
}
