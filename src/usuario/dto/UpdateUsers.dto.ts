import { CriaUsuarioDTO } from './CriaUsuario-dto';
import { PartialType } from '@nestjs/mapped-types';

                                  // esse PartialType subistui os decoreitor @IsOptional()
export class UpdateUserDTO extends PartialType(CriaUsuarioDTO) {
  // @IsNotEmpty({ message: 'O nome não pode ser vazio! ' })
  // @IsOptional()
  // nome: string;

  // @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  // @EmailUnico({ message: 'já existe um usuário com esse e-mail' })
  // @IsOptional()
  // email: string;

  // @MinLength(6, { message: 'A senha tem que ter pelo menos 6 caracteres' })
  // @IsOptional()
  // senha: string;
}
