import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPosts() {
    return [{ id: 1, title: 'First post' }];
  }
}
