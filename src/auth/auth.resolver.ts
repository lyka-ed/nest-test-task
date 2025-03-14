import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/sigin-input.';
import { BiometricLoginInputDto } from './dto/biometric-input';
import { SignResponse } from './dto/sign-response';
import { Public } from './decorators/public.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignResponse)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  async signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Public()
  @Query(() => String)
  hello() {
    return 'Testing Nest Backend';
  }

  // @Public()
  // @Mutation(() => Auth)
  // async biometricLogin(
  //   @Args('biometricInput') biometricLoginInput: BiometricLoginInputDto,
  // ) {
  //   return this.authService.biometricLogin(biometricLoginInput);
  // }
}
