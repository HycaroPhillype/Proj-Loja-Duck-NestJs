import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashearPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string) {
    const salt = this.configService.get<string>('SALT_SENHA');

    const passwordHasheada = await bcrypt.hash(password, salt!);
    return passwordHasheada;
  }
}
