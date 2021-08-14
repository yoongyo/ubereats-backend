import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    me(authUser: any): any;
    userProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(authUser: User, editProfileInput: EditProfileInput): Promise<EditProfileOutput>;
    verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput>;
}
