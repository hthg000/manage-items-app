import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseFloatPipe implements PipeTransform {
  transform(value: any) {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(`Validation failed. "${value}" is not a number.`);
    }
    return val;
  }
}
