import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
   constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>
    ) {}


  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const emailExiste = await this.userRepository.findOne({where: {email: value}});
    return !emailExiste;
  }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return function (objeto: object, propriedade: string) {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
