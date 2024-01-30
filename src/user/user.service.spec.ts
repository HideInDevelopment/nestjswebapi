import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

  //Add more test cases for other methods

  //CleanUp
  afterEach(() => {
    jest.clearAllMocks();
  });
});
