import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/sigin-input.';
import { BiometricLoginInputDto } from './dto/biometric-input';
import { SignResponse } from './dto/sign-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Mutation(() => SignResponse)
  async signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    // return this.authService.findAll();
  }

  // @Mutation(() => Auth)
  // async biometricLogin(
  //   @Args('biometricInput') biometricLoginInput: BiometricLoginInputDto,
  // ) {
  //   return this.authService.biometricLogin(biometricLoginInput);
  // }
}
