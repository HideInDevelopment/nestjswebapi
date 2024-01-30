import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //CRUD OPERATIONS

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository
      .findOne({ where: { id } })
      .then((user) => user || null);
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user || null;
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
