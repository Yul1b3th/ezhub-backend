import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async checkUsernameAndEmail(username: string, email: string, id?: number) {
    if (username) {
      const existingUsername = await this.usersRepository.findOne({
        where: { username: username.toLowerCase() },
      });
      if (existingUsername && existingUsername.id !== id) {
        throw new BadRequestException('Username is already in use');
      }
    }

    if (email) {
      const existingEmail = await this.usersRepository.findOne({
        where: { email: email.toLowerCase() },
      });
      if (existingEmail && existingEmail.id !== id) {
        throw new BadRequestException('Email is already in use');
      }
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email } = createUserDto;

    await this.checkUsernameAndEmail(username, email);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
    });
    return this.usersRepository.save(newUser);
  }

  // Método para el login y el registro, retorno si o no el usuario esta en la base de datos
  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  /* async findByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'password', 'role'],
    });
  } */

  /* async findByUsernameOrEmailWithPassword(usernameOrEmail: string) {
    return this.usersRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      select: ['id', 'username', 'email', 'password', 'role'],
    });
  } */

  async findByUsernameOrEmailWithPassword(
    usernameOrEmail: string,
  ): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where(
        'user.username = :usernameOrEmail OR user.email = :usernameOrEmail',
        { usernameOrEmail },
      )
      .addSelect('user.password')
      .getOne();
  }

  // CRUD
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /* async findOne(id: number): Promise<User> {
  return this.usersRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .addSelect('user.password')
    .getOne();
} */

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, email, password } = updateUserDto;

    await this.checkUsernameAndEmail(username, email, id);

    if (password) {
      updateUserDto.password = await bcryptjs.hash(password, 10);
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.usersRepository.softDelete(id);
    return `User with ID ${id} has been deleted`;
  }
}
