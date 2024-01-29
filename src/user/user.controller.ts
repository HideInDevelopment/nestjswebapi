import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as fs from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  jsonData = fs.readFileSync(
    'F:/projects/web-api2/src/utils/users.json',
    'utf-8',
  );
  userList: User[] = JSON.parse(this.jsonData);

  //Inject multiple users
  @Post('multiple')
  create(userList: Partial<User>[]): { message: string } {
    try {
      this.usersService.insert(userList);
      return { message: 'Users inserted correctly...' };
    } catch (err) {
      return { message: 'Error while inserting users...' };
    }
  }
}
