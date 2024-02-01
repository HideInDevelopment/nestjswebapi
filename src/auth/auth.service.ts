import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //JWT declaration
  jwt = require('jsonwebtoken');
  constructor(private userService: UserService) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      const payload = { email };
      return this.jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1h' });
    } else {
      throw new UnauthorizedException();
    }
  }

  //implement function to register users
}
