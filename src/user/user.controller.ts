import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
// import { UserUtil } from 'src/utils/util.entities';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAllUser(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Post()
  createUser(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
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
