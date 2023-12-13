import { DataSource, QueryRunner } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { RolesEntity } from "src/roles/entities/role.entity";

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
      .limit(10)
      .getMany();
      console.log('all_users: ', all_users);
      return all_users;

    } catch (err) {
      console.log(err.stack);
    }
  }
// 
  async findOneUser(id: number, runner?: QueryRunner): Promise<UserEntity> {
    try {
      let entityManager = this.dataSource.manager;     
      if (runner) {
        entityManager = runner.manager;
      } 

      const user = await entityManager
      .createQueryBuilder(UserEntity, "user")
      .where("user.id = :id", { id: id })
      .getOne()

      return user;

    } catch (err) {
      
      console.log(err.stack);
      await runner.rollbackTransaction();
    }
    
  }

  async updateUser(id: number, updated_user: UserEntity, runner?: QueryRunner): Promise<void> {
    try {
      let entityManager = this.dataSource.manager;
      if (runner) {
        console.log('yes,runner');
        entityManager = runner.manager;
      } 
      await entityManager.update(UserEntity, id, updated_user);

      // throw "SimpulatedException";
      // throw new InternalServerErrorException();

    } catch (err) {
      console.log(err.stack);
      throw new Error(err);
    }
  }

  /** 
   * updates the email of the user to be 'updateUser2@gmail.com'
   */
  async updateUser2(id: number, runner?: QueryRunner): Promise<void> {
    try {
      let entityManager = this.dataSource.manager;
      if (runner) {
        entityManager = runner.manager;
      } 
      
      await entityManager.update(UserEntity, id, { email : 'updateUser2@gmail.com' });


    } catch (err) {
      console.log(err.stack);
      await runner.rollbackTransaction(); /** @todo */
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

  async random(id: number) {
    try {
      let entityManager = this.dataSource.manager;

      // const res0 = await entityManager.query(`
      // select * from users
      // limit 10
      // `);
      // console.log('res0 ', res0);
      // return res0;

      /* impl with dataSource */
      const res = await this.dataSource.createQueryBuilder()
      .select('name')
      .addSelect('count(name)', 'frequency')
      .from(UserEntity, 'users')
      .groupBy('name')
      .having('count(name) > 1')
      .getRawMany();
      
      
      /* impl with entitymanager */
      // const res = await entityManager.query(`
      // select name, count(name) as "Number of users with same name" from users
      // group by name
      // having count(name) > 1
      // `);
      // console.log('res ', res);

      return res; 

    } catch (err) {
      console.log(err.stack);
    }

  }
  async otherRepo(id: number) {
    try {
      let entityManager = this.dataSource.manager;

      /* method1 :: using entityManager and raw query */
      const res = await entityManager.query(
        `
        select roles.name as SecondMostFrequentRoleName, count(users.role_id) as SecondMaxFrequency from roles
        left join users on users.role_id = roles.id 
        group by roles.name
        order by count(users.role_id) DESC 
        limit 1 offset 1;
        `
      );

      /* method2 :: using dataSource and querybuilder */
      const res1 = await entityManager.createQueryBuilder()
      .select('roles.name', 'SecondMostFrequentRoleName')
      .addSelect('count(users.role_id)', 'SecondMaxFrequency')
      .from(RolesEntity, 'roles')
      .leftJoin(UserEntity, 'users', 'users.role_id = roles.id')
      .groupBy('roles.name')
      .orderBy('count(users.role_id)', 'DESC')
      .limit(1)
      .offset(1)
      .getRawMany();

      /* method3 :: using subquery */
      // const res2 = await this.dataSource.createQueryBuilder()
      // .select()
      
      console.log('res1; ', res1);
      
      return res1;

    } catch (err) {
      console.log(err.stack);
    }
  }

  async testLock(id: number) {
    try {
      const res1 = await this.dataSource.getRepository(UserEntity)
      // .select('*')
      // .from(UserEntity, 'user')
      .createQueryBuilder('user')
      .useTransaction(true)
      .setLock('pessimistic_read')
      .getMany()

      return res1;

    } catch (err) {
      console.log(err.stack);
    }
  }
}