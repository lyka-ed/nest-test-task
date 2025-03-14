import { User } from 'src/user/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class SignResponse {
  @Field()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => User)
  user: User;
}
