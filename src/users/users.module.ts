import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])],
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class UsersModule {}
