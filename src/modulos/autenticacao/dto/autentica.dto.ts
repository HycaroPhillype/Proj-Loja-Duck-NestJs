import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido.'})
  email: string;

  @IsNotEmpty({ message: 'A senhya não pode estar vazia'})
  senha: string;
}
