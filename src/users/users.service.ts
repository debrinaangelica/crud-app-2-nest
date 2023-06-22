import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResult } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {

  // constructor (@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}
  constructor(@Inject(UsersRepository) private usersRepository: UsersRepository) {}

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
      
      await this.usersRepository.updateUser(id, updated);

    } catch (err) {
      console.log(err.stack);
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.removeUser(id);
    } catch (err) {
      console.log(err.stack);
    }
  }
}
