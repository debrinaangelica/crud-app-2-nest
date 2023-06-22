import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersRepository {

  constructor(private dataSource: DataSource) {} 


  async createUser(new_user: UserEntity) : Promise<number> {
    try {
      let entityManager = this.dataSource.manager;
      
      const new_user_saved = await entityManager.save(new_user);
      return new_user_saved.id;

    } catch (err) {
      console.log(err.stack);
    }
  }

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      let entityManager = this.dataSource.manager;

      const all_users = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .getMany();
      return all_users;

    } catch (err) {
      console.log(err.stack);
    }
  }

  async findOneUser(id: number): Promise<UserEntity> {
    try {
      let entityManager = this.dataSource.manager;      

      const user = await entityManager
      .createQueryBuilder(UserEntity, "user")
      .where("user.id = :id", { id: id })
      .getOne()

      return user;

    } catch (err) {
      console.log(err.stack);
    }
    
  }

  async updateUser(id: number, updated_user: UserEntity): Promise<void> {
    try {
      let entityManager = this.dataSource.manager;

      await entityManager.update(UserEntity, id, updated_user);

    } catch (err) {
      console.log(err.stack);
    }
  }

  async removeUser(id: number): Promise<void> {
    try {
      let entityManager = this.dataSource.manager;

      await entityManager.delete(UserEntity, id);

    } catch (err) {
      console.log(err.stack);
    }
  }
}