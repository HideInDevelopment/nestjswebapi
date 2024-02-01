import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { UserUtil } from 'src/utils/util.entities';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Return a list of all users',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of users',
  })
  @UseGuards(JwtAuthGuard)
  findAllUser(): Promise<User[]> {
    return this.usersService.findAllUsers();
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
  findUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findUserById(id);
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
  findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findUserByEmail(email);
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
  createUser(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.createUser(user);
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
  updateUser(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
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
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.removeUser(id);
  }

  //!NOTE => Bulk insert of data (necessary only for json file)
  // userInstance = new UserUtil();

  // //Inject multiple users
  // @Post('multiple')
  // createMultipleUsers(): { message: string } {
  //   try {
  //     this.usersService.insert(this.userInstance.userList);
  //     return { message: 'Users inserted correctly...' };
  //   } catch (err) {
  //     return { message: 'Error while inserting users...' };
  //   }
  // }
}
