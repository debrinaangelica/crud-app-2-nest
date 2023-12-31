import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResult } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repo';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {

  // constructor (@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}
  constructor(
    @Inject(UsersRepository) private usersRepository: UsersRepository,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let res: number;

      const newUser = new UserEntity();
      newUser.role_id = createUserDto.role_id;
      newUser.name = createUserDto.name;
      newUser.username = createUserDto.username;
      newUser.email = createUserDto.email;
      newUser.is_partner = createUserDto.is_partner;
      newUser.status = createUserDto.status;

      res = await this.usersRepository.createUser(newUser);
      return res;

    } catch (err) {
      console.log(err.stack);
    }
  }

  async findAll() {
    try {
      return this.usersRepository.findAllUsers();
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findOne(id: number) {
    try {
      const foundUser = await this.usersRepository.findOneUser(id);

      if (!foundUser) {
        throw new NotFoundException();
      }

      let res = new UserResult();
      res.role_id = foundUser.role_id;
      res.name = foundUser.name;
      res.username = foundUser.username;
      res.email = foundUser.email;
      res.is_partner = foundUser.is_partner;
      res.status = foundUser.status;
      // res.created_at = foundUser.created_at;
      // res.updated_at = foundUser.updated_at;

      return res;

    } catch (err) {
      console.log(err.stack);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const runner = this.dataSource.createQueryRunner();
    console.log('runner is: ', runner);
    console.log('runner created');
    await runner.connect();
    await runner.startTransaction();
    console.log('transaction begun');
    try {
      const existed = await this.usersRepository.findOneUser(id);

      if (!existed) throw new NotFoundException();

      const updated = Object.assign(new UserEntity(), existed);
      updated.role_id = updateUserDto.role_id;
      updated.name = updateUserDto.name;
      updated.username = updateUserDto.username;
      updated.email = updateUserDto.email;
      updated.is_partner = updateUserDto.is_partner;
      updated.status = updateUserDto.status;
      
      await this.usersRepository.updateUser(id, updated, runner);
      await this.usersRepository.updateUser2(id, runner);

      await runner.commitTransaction();

    } catch (err) {
      console.log(err.stack);
      console.log('caught');
      await runner.rollbackTransaction();

    } finally {
      await runner.release();
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.removeUser(id);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async random(id: number) {
    try {
      return await this.usersRepository.random(id);
    } catch (err) {
      console.log(err.stack);
    }
  }
  async otherRepo(id: number) {
    try {
      return await this.usersRepository.otherRepo(id);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async testLock(id: number) {
    try {
      
      return await this.usersRepository.testLock(id);
    } catch (err) {
      console.log(err.stack);
    }
  }
}
