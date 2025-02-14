import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './CriaProduto.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateProductDTO extends PartialType(CriaProdutoDTO) {
  @IsUUID(undefined, { message: 'ID do produto inválido' })
  @IsOptional()
  id: string;

}
