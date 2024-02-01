import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthDto } from 'src/dtos/user-auth-dto.request';
//import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Log the user based on its credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'A token to authenticate the user',
  })
  @ApiBody({ description: 'Body of the request for login', type: UserAuthDto })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return { access_token: await this.authService.login(email, password) };
  }
}
