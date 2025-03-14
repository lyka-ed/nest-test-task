import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  biometricKey?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
