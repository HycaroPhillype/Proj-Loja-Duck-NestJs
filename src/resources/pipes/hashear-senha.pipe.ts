import { Injectable, PipeTransform } from '@nestjs/common';


@Injectable()
export class HashearPasswordPipe implements PipeTransform {
  transform(password: string) {
    return password + 'kde25';
  }

}

