import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn} from 'typeorm';

export enum UserModelRole {
    Admin = 'ADMIN',
    Customer = 'CUSTOMER',
}

@Entity({ name: 'users'})
export default class UserModel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    email!: string;

    @Column({ length: 255 })
    password!: string;

    @Column({ length: 255 })
    firstName!: string;

    @Column({ length: 255 })
    lastName!: string;

    @Column("text")
    type!: UserModelRole;

    @DeleteDateColumn()
    deletedAt!: Date
}
