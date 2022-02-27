import { ConflictException } from '@nestjs/common';
import { validate } from 'email-validator';
import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from '../dto/sign-up.dto';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(signUpDto: SignUpDto): Promise<User> {
    const user = await this.create(signUpDto);
    await this.save(user);
    return user;
  }

  async findByEmailOrUsername(id: string): Promise<User> {
    let conditions = {};

    if (validate(id)) {
      // if id is email
      conditions = { email: id };
    } else {
      // if id is username
      conditions = { username: id };
    }

    const user = await this.findOne(conditions);

    return user;
  }

  async checkExistEmail(email: string): Promise<boolean> {
    const user = await this.findOne({ email });

    if (user) return true;
    return false;
  }
  async checkExistUsername(username: string): Promise<boolean> {
    const user = await this.findOne({ username });

    if (user) return true;
    return false;
  }
}
