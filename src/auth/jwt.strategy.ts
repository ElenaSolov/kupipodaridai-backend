import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './IJwtPayload';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const { userId } = payload;
    console.log(4, payload);
    const user = this.usersService.findByUserId(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
