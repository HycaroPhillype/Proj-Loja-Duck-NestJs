import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico-validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio! ' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailUnico({ message: 'já existe um usuário com esse e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha tem que ter pelo menos 6 caracteres' })
  senha: string;
}
