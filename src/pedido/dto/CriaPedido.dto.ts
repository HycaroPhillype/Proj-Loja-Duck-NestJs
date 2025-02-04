import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested } from 'class-validator';


export class ItemOrderDTO {
  @IsInt()
  quantidade: number;
}

export class CreateOrderDto {
  userId: string;

  @ValidateNested()  // valida objetos aninhados.

  @ArrayMinSize(1)    //valida se um array tem o tamanho mínimo especifico

  @IsArray() // valida se uma propriedade é um arrya.

  @Type(() => ItemOrderDTO)  //valida o tipo de objeto declado.
  itemsOrder: ItemOrderDTO[];
}
