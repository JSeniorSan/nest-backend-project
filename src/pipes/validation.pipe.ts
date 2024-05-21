import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeption } from 'src/exeptions/validation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<Promise<any>> {
  async transform(value: Promise<any>, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length > 0) {
      let messages = errors.map(
        errorObj =>
          `${errorObj.property} - ${Object.values(errorObj.constraints).join(', ')}`,
      );

      throw new ValidationExeption(messages);
    }
    return value;
  }
}
