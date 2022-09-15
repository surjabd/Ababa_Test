import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    return await this.repository.save(user);
  }

  public async loginUser(body: LoginUserDto): Promise<User> {
    const user = await this.repository.findOne(body);
    if (user === undefined) {
      throw new NotFoundException('Invalid user');
    }
    return user;
  }
}
