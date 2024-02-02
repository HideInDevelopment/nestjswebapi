import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAuthDto } from '../dtos/user-auth-dto.request';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import * as dotenv from 'dotenv';

//Create own .env file in each case to implement own database configuration and stuff
dotenv.config();

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('findAllUser', () => {
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
      jest.spyOn(authService, 'findAllUsers').mockResolvedValue(users);

      expect(await authController.findAllUser()).toEqual(users);
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
      jest.spyOn(authService, 'findUserById').mockResolvedValue(user);

      expect(await authController.findUserById(userId)).toEqual(user);
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

      jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(user);

      expect(await authController.findUserByEmail(userEmail)).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const userToCreate: Partial<User> = {
        userName: 'User1',
        email: 'user1@gmail.com',
        password: '1234',
        updateDate: new Date(),
        createDate: new Date(),
        isActive: true,
      };

      const createdUser: User = { id: 1, ...userToCreate } as User;

      jest.spyOn(authService, 'createUser').mockResolvedValue(createdUser);

      const result = await authController.createUser(userToCreate);

      expect(result).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user and return it', async () => {
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

      jest.spyOn(authService, 'updateUser').mockResolvedValue(updatedUser);

      const result = await authController.updateUser(userId, updatedUserData);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return void', async () => {
      const userId = 1;

      jest.spyOn(authService, 'removeUser').mockResolvedValue();

      const result = await authController.deleteUser(userId);

      expect(result).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should return an access token on sucesful login', async () => {
      const email = 'test@example.com';
      const password = 'testPassword';
      const mockAccessToken = 'mockAccessToken';

      jest.spyOn(authService, 'login').mockResolvedValue(mockAccessToken);

      const result = await authController.login({
        email,
        password,
      } as UserAuthDto);

      expect(result).toEqual({ access_token: mockAccessToken });
      expect(authService.login).toHaveBeenCalledWith(email, password);
    });
  });
});
