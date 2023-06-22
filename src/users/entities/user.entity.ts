import {
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Index,
    Column,
  } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    @Index()
    id: number;

    @Column({ type: 'tinyint', width: 1, default: 0 })
    is_partner: number;

    @Column({
        type: 'int',
        width: 11,
        default: null,
    })
    role_id: number;

    @Column({
        type: 'varchar',
        length: 191,
        default: null,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 191,
        default: null,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 191,
        default: null,
    })
    email: string;

    @Column({
        type: 'tinyint',
        width: 4,
        default: 0,
    })
    status: number;

    @Column({ type: 'timestamp', default: null })
    created_at: Date;

    @Column({ type: 'timestamp', default: null })
    updated_at: Date;
}
