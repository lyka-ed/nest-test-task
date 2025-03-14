import { IsOptional, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BiometricLoginInputDto {
  @Field()
  @MinLength(10)
  @IsOptional()
  biometricKey: string;
}
