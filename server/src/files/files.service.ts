import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

  async createFile(file: any): Promise<any> {
    try {
      const fileName = uuid.v4() + `.${file.originalname.split('.').pop()}`
      const filePath = path.resolve(__dirname, '../../..', 'uploads')
      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer)
      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
