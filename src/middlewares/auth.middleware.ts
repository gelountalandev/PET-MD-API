import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express"
import { AccessTokenModel } from "../models/access_token.model";
import { Repository } from "typeorm";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class AuthUser implements NestMiddleware {

  constructor(
    @InjectRepository(AccessTokenModel)
    private accessTokenRepository: Repository<AccessTokenModel>,
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


    //   const token = authHeader;
    //   if (!token)
    //     return res
    //       .status(403)
    //       .send({ error: 'No Authentication Token Provided' })

    //   if (authorization === token) {
    //     next();
    //   } else {
    //     return res
    //       .status(403)
    //       .send({ error: 'Invalid Authentication Token Provided' })
    //   }
  }
}