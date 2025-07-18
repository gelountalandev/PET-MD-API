import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { UserService } from "../modules/user/user.service";

@Injectable()
export class AuthUser implements NestMiddleware {

  constructor(
    private userService: UserService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(403)
        .send({ error: 'No Authentication Token Provided' })
    }

    const validToken = await this.userService.validToken(authHeader);
    if (!validToken) {
      return res
        .status(403)
        .send({ error: 'Invalid Authentication Token Provided' })
    }
    req['user_id'] = validToken.user_id;
    next();
  }
  
}