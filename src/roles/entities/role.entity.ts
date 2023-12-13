import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    Index,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity('roles')
  export class RolesEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    @Index()
    id: number;
  
    @Column({ type: 'varchar', length: 191, default: null })
    name: string;
  
    @Column({ type: 'varchar', length: 191, default: null })
    unit: string;
  
    @Column({ type: 'varchar', length: 191, default: null })
    division: string;
  
    @Column({ default: null })
    status: number;
  
    // @Column({ type: 'timestamp', default: null })
    // created_at: Date;
  
    // @Column({ type: 'timestamp', default: null })
    // updated_at: Date;
  }
  