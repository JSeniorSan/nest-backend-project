import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class UploadsService {
  async transformToFilePath(file: any): Promise<string> {
    try {
      const randomImageName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, randomImageName), file.buffer);
      return randomImageName;
    } catch (error) {
      throw new HttpException(
        'Проблема с подготовкий файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
