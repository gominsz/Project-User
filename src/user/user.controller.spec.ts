import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

const userEntityList: User[] = [
  new User({ id: '1', email: 'teste1@gmail.com', name: 'teste1' }),
  new User({ id: '2', email: 'teste2@gmail.com', name: 'teste2' }),
  new User({ id: '3', email: 'teste3@gmail.com', name: 'teste3' }),
];

const newUserEntity = new User({
  email: 'testecreate@gmail.com',
  password: 'testCreate',
  name: 'createTest',
});

const updatedUserEntity = new User({
  name: 'updateTestSuccessfully',
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(newUserEntity),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a user list all successfully', async () => {
      //Act
      const result = await userController.findAll();
      //Assert
      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should creater a new user successfully', async () => {
      const body: CreateUserDto = {
        email: 'testecreate@gmail.com',
        password: 'testCreate',
        name: 'createTest',
      };
      const result = await userController.create(body);

      expect(result).toEqual(newUserEntity);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateUserDto = {
        email: 'testecreate@gmail.com',
        password: 'testCreate',
        name: 'createTest',
      };

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create(body)).rejects.toThrowError();
    });

    describe('findOne', () => {
      it('should get a user successfully', async () => {
        const result = await userController.findOne('1');

        expect(result).toEqual(userEntityList[0]);
        expect(userService.findOne).toHaveBeenCalledTimes(1);
        expect(userService.findOne).toHaveBeenCalledWith('1');
      });

      it('should throw an exception', () => {
        jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

        expect(userController.findOne('1')).rejects.toThrowError();
      });
    });

    describe('update', () => {
      it('should update a user successfully', async () => {
        const body: UpdateUserInput = {
          email: 'testecreate@gmail.com',
          password: 'testCreate',
          name: 'updateTestSuccessfully',
        };
        const result = await userController.update('1', body);

        expect(result).toEqual(updatedUserEntity);
        expect(userService.update).toHaveBeenCalledTimes(1);
        expect(userService.update).toHaveBeenCalledWith('1', body);
      });

      it('should throw an exception', () => {
        const body: UpdateUserInput = {
          email: 'testecreate@gmail.com',
          password: 'testCreate',
          name: 'updateTestSuccessfully',
        };

        jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
        expect(userController.update('1', body)).rejects.toThrowError();
      });
    });

    describe('remove', () => {
      it('should remove user successfully', async () => {
        const result = await userController.remove('1');

        expect(result).toBeUndefined();
      });

      it('should throw an exception', () => {
        jest.spyOn(userController, 'remove').mockRejectedValueOnce(new Error());

        expect(userController.remove('1')).rejects.toThrowError();
      });
    });
  });
});
