import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio! ' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailUnico({ message: 'já existe um usuário com esse e-mail' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha tem que ter pelo menos 6 caracteres' })
  @IsOptional()
  senha: string;
}
