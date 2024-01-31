import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //CRUD OPERATIONS ss

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

  //SPECIFIC OPERATIONS

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async insert(userList: Partial<User>[]): Promise<User[]> {
    const returnedUsers: User[] = [];
    userList.forEach((user) => {
      const newUser = this.usersRepository.create(user);
      returnedUsers.push(newUser);
      this.usersRepository.save(newUser);
    });
    return returnedUsers;
  }
}
