import { InternalServerErrorException } from '@nestjs/common';

export class OperationFailureException extends InternalServerErrorException {
  constructor(entity: string, operation: string, id?: number) {
    super(`Failed to ${operation} ${entity}${id ? ` with ID ${id}` : ''}`);
  }
}
