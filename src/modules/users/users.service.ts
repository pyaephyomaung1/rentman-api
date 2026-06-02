import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/common/enums/role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      role: Role.STORE_OWNER,
    });
    return this.userRepository.save(user);
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }
}
