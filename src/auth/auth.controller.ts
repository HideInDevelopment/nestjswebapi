import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { UserAuthDto } from '../dtos/user-auth-dto.request';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Return a list of all users',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of users',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllUser(): Promise<User[]> {
    try {
      return this.authService.findAllUsers();
    } catch (error) {
      console.error('Error in findAllUser', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Return a user by its id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user find by id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findUserById(@Param('id') id: number): Promise<User> {
    return this.authService.findUserById(id);
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'Get user by email',
    description: 'Return a user by its email',
  })
  @ApiResponse({
    status: 200,
    description: 'The user find by email',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.authService.findUserByEmail(email);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Body of the request for create a user', type: User })
  createUser(@Body() user: Partial<User>): Promise<User> {
    return this.authService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Updates a user find by its id',
  })
  @ApiResponse({
    status: 201,
    description: 'User updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Body of the request for update a user', type: User })
  updateUser(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.authService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Delete a user find by its id',
  })
  @ApiResponse({
    status: 201,
    description: 'User deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.authService.removeUser(id);
  }

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
  async login(@Body() userAuthDto: UserAuthDto): Promise<any> {
    const { email, password } = userAuthDto;
    return { access_token: await this.authService.login(email, password) };
  }
}
