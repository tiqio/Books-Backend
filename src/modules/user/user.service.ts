import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersResposity: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersResposity.findOneBy({ id });
  }
}
