import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

//import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //JWT declaration
  jwt = require('jsonwebtoken');

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail(email);

    if (user && user.password === password) {
      const payload = { email };
      return this.jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}
