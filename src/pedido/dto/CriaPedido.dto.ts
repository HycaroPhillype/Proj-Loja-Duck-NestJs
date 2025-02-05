import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ItemOrderDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  quantidade: number;
}

export class CreateOrderDto {
  userId: string;

  @ValidateNested() // valida objetos aninhados.

  @ArrayMinSize(1) //valida se um array tem o tamanho mínimo especifico

  @IsArray() // valida se uma propriedade é um arrya.

  @IsOptional()

  @Type(() => ItemOrderDTO) //valida o tipo de objeto declado.
  itemsOrder: ItemOrderDTO[];
}
