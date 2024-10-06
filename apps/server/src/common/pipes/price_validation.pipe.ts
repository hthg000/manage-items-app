import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class PriceValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const price = parseFloat(value);

    if (isNaN(price) || price <= 0) {
      throw new BadRequestException('price must be a positive number greater than 0');
    }

    return price;
  }
}
