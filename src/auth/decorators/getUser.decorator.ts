import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../../users/user.entity';

export const GetUser = createParamDecorator((_data, ctx): UserEntity => {
  const req = ctx.switchToHttp().getRequest();
  console.log(req.user);
  return req.user;
});
