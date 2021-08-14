import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailOutput } from "./dtos/verify-email.dto";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
        private readonly jwtService: JwtService,
    ){}

    async createAccount({email, password, role}: CreateAccountInput): Promise<CreateAccountOutput>{
        try {
            const exists = await this.users.findOne({email})
            console.log(exists)
            if(exists) {
                return {
                    ok: false, 
                    error: 'There is a user with that email already'
                }
            }
            const user = await this.users.save(this.users.create({email, password, role}))
            await this.verifications.save(this.verifications.create({
                user
            }))
            return {ok: true}
        } catch(error) {
            return {
                ok: false,
                error
            }
        }
    }

    async login({email, password}: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne(
                {email},
                // password가 {select: false}가 되어있기 때문에 password를 select하고 싶다고 명확하게 전달해줘야한다.
                // 이걸 안하게되면 user에 password가 없고 checkPassword에서 this.password가 undefined로 전달된다. 
                // 이렇게 select에 명시하면 명시한것만 가져오기 때문에 추가적으로 id도 sign에서 필요하기 때문에 id도 select 해준다. 
                {select: ['id', 'password']}
            )
            if (!user) {
                return {
                    ok: false,
                    error: 'User not Found'
                }
            }
            const passwordCorrect = await user.checkPassword(password)
            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: 'Wrong password'
                }
            }
            const token = this.jwtService.sign({id: user.id})
            return {
                ok: true,
                token
            }
        } catch (error){
            console.log(error)
            return {
                ok: false,
                error
            }
        }
    }

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOneOrFail({id})
            return {
                ok: true,
                user
            }
        } catch (error) {
            return {
                ok: false,
                error: 'User Not Found'
            }
        }
    }

    async editProfile(userId: number, {email, password}: EditProfileInput): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(userId)
            if (email) {
                user.email = email
                user.verified = false,
                await this.verifications.delete({ user: { id: user.id } });
                await this.verifications.save(this.verifications.create({user}))
            }
            if (password) {
                user.password = password
            }
            await this.users.save(user)
            return {
                ok: true
            }
        } catch (e) {
            return {
                ok: false,
                error: 'Could not edit profile' + e
            }
        }
    }

    async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try {
            // relationship된 OneToOne 이된 user를 가져오려면 loadRelationIds를 true로 하면 user.id를 가져옴(추가적으로)
            // 또는 relations: ["user"] 라고 하면 user 전체를 가져올 수 있음. (추가적으로)
            // 결과적으로 verification으로 user에 접근 할 수 있다.
            const verification = await this.verifications.findOne({code}, {relations: ['user']})
            if (verification) {
                verification.user.verified = true;
                await this.users.save(verification.user)
                await this.verifications.delete(verification.id)
                return {ok: true}
            }
            return {ok: false, error:'Verification not found'}
        } catch(e) {
            return {
                ok: false,
                error: 'Could not verify email'
            }
        }
    }
}

