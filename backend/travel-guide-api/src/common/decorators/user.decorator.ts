// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { User } from 'src/drizzle/schema';

// export const ReqUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const req = ctx.switchToHttp().getRequest<Request>();
//     const user = req.user;
//     return user as User;
//   },
// );
