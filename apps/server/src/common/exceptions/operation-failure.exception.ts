import { InternalServerErrorException } from '@nestjs/common';

export class OperationFailureException extends InternalServerErrorException {
  constructor(operation: string, productId?: number) {
    super(`Failed to ${operation} product${productId ? ` with ID ${productId}` : ''}`);
  }
}
