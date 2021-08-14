
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorators";
import { AuthGaurd } from "src/auth/auth.guard";
import { Role } from "src/auth/role.decorator";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";


@Resolver(of => User)
export class UserResolver{
    constructor(private readonly userService: UserService){}
    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.userService.createAccount(createAccountInput)
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput)
    }

    @Query(returns => User)
    @Role(["Any"])
    me(@AuthUser() authUser){
        return authUser
    }

    @Query(returns => UserProfileOutput)
    @Role(["Any"])
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput>  {
        return this.userService.findById(userProfileInput.userId)
    }

    @Mutation(returns => EditProfileOutput)
    @Role(["Any"])
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
        return this.userService.editProfile(authUser.id, editProfileInput)
    }

    @Mutation(returns => VerifyEmailOutput) 
    async verifyEmail(@Args('input') {code}: VerifyEmailInput): Promise<VerifyEmailOutput> {
        return await this.userService.verifyEmail(code)
    }
}