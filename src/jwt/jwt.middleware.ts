import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/users/users.service';
import { JwtService } from './jwt.service';


// implements는 부모의 메소드를 반드시 오버라이딩(재정의)해야 한다.
// dependency injection을 하기 위해
@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            try {
                const decoded = this.jwtService.verify(token.toString());
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const { user, ok } = await this.userService.findById(decoded['id']);
                    if (ok) {
                        req['user'] = user;
                    }
                }
            } catch (e) {}
        }
    next();
    }
}