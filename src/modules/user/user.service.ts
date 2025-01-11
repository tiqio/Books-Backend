import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersResposity: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersResposity.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.usersResposity.find();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.avatar = createUserDto.avatar;
    user.nickname = createUserDto.nickname;
    user.active = 1;
    console.log('user', user);

    return this.usersResposity.save(user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersResposity.delete(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersResposity.findOneBy({ username });
  }
}
