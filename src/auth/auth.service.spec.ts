import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import * as dotenv from 'dotenv';

//Create own .env file in each case to implement own database configuration and stuff
dotenv.config();

jest.mock('./auth.service');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          userName: 'User1',
          email: 'user1@gmail.com',
          password: '1234',
          updateDate: new Date(),
          createDate: new Date(),
          isActive: true,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(users);
    });
  });

  describe('findUserById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: User = {
        id: 1,
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await authService.findUserById(userId);

      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const result = await authService.findUserById(999);
      expect(result).toBeNull();
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email', async () => {
      const userEmail = 'user1@gmail.com';
      const user: User = {
        id: 1,
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await authService.findUserByEmail(userEmail);

      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const result = await authService.findUserByEmail('user2@gmail.com');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a user succesfully', async () => {
      const userToCreate: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };
      const createdUser: User = { id: 1, ...userToCreate } as User;

      jest.spyOn(repository, 'create').mockReturnValue(createdUser);
      jest.spyOn(repository, 'save').mockResolvedValue(createdUser);

      const result = await authService.createUser(userToCreate);

      expect(result).toEqual(createdUser);
    });

    it('shoudl handle the case weher user creation fails', async () => {
      const userToCreate: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };
      jest.spyOn(repository, 'create').mockReturnValue(userToCreate as User);
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Failed to save user'));

      await expect(authService.createUser(userToCreate)).rejects.toThrow(
        'Failed to save user',
      );
    });
  });

  describe('updateUser', () => {
    it('should update a user succesfully', async () => {
      const userId = 1;
      const updatedUserData: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };
      const updatedUser: User = { id: userId, ...updatedUserData } as User;

      jest.spyOn(repository, 'update').mockResolvedValue({} as any);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedUser);

      const result = await authService.updateUser(userId, updatedUserData);

      expect(result).toEqual(updatedUser);
    });

    it('should handle the case where user update fails', async () => {
      const userId = 1;
      const updatedUserData: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };

      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error('Failed to update user'));

      await expect(
        authService.updateUser(userId, updatedUserData),
      ).rejects.toThrow('Failed to update user');
    });

    it('should handle the case where user is not found', async () => {
      const userId = 999;
      const updatedUserData: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };

      jest.spyOn(repository, 'update').mockResolvedValue({ raw: [0] } as any);
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await authService.updateUser(userId, updatedUserData);

      expect(result).toBeNull();
    });
  });

  describe('removeUser', () => {
    it('should remove a user successfully', async () => {
      const userId = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: [userId] } as any);

      await authService.removeUser(userId);
    });

    it('should handle the case where user is not found', async () => {
      const userId = 999;

      jest.spyOn(repository, 'delete').mockResolvedValue({ raw: [0] } as any);

      await authService.removeUser(userId);
    });

    it('should handle the case where user deletion fails', async () => {
      const userId = 1;

      jest
        .spyOn(repository, 'delete')
        .mockRejectedValue(new Error('Failed to delete user'));

      await expect(authService.removeUser(userId)).rejects.toThrow(
        'Failed to delete user',
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';

      (jwt.sign as jest.Mock).mockReturnValue('mockedJWTToken');

      const result = await authService.login(email, password);

      expect(result).toEqual('mockedJWTToken');
    });

    it('should throw UnauthorizedException on unsuccessful login', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';

      (jwt.sign as jest.Mock).mockReturnValue('mockedJWTToken');

      const result = authService.login(email, password);

      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
