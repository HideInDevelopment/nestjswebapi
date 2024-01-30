import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(users);

      expect(await controller.findAllUser()).toEqual(users);
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
      jest.spyOn(userService, 'findUserById').mockResolvedValue(user);

      expect(await controller.findUserById(userId)).toEqual(user);
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

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

      expect(await controller.findUserByEmail(userEmail)).toEqual(user);
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

      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);

      const result = await controller.createUser(userToCreate);

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

      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      const result = await controller.updateUser(userId, updatedUserData);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return void', async () => {
      const userId = 1;

      jest.spyOn(userService, 'removeUser').mockResolvedValue();

      const result = await controller.deleteUser(userId);

      expect(result).toBeUndefined();
    });
  });

  //Cleanup the mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});
