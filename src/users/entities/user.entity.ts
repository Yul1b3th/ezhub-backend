import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  Length,
} from 'class-validator';

import { Role } from '../../common/enums/rol.enum';
import { Property } from '../../properties/entities/property.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Preference } from '../../preferences/entities/preference.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false, select: false })
  @IsNotEmpty()
  @Length(6, 128)
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  @IsEnum(Role)
  role: Role;

  @Column({ nullable: true })
  // @Length(3, 30)
  first_name: string;

  @Column({ nullable: true })
  // @Length(3, 30)
  last_name: string;

  @Column({ nullable: true })
  // @IsNumber({}, { message: 'Phone number must be a number' })
  phone: number;

  @Column({ nullable: true })
  // @IsNumber({}, { message: 'Phone number must be a number' })
  whatsapp: number;

  @Column({ nullable: true })
  // @Length(4, 300)
  address: string;

  @Column({ nullable: true })
  @IsDate()
  date_of_birth: Date;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  registration_date: Date;

  @UpdateDateColumn()
  last_update: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToOne(() => Preference, (preference) => preference.user)
  preference: Preference;
}
