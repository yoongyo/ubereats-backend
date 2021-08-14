import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AllowedRoles} from './role.decorator'

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        // @Role('~~') 에서 가져오는 것.
        const roles = this.reflector.get<AllowedRoles>(
            'roles', 
            context.getHandler()
        )
        // @Role()이 안붙어 있으면 통과
        if (!roles) {
            return true;
        }

        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user = gqlContext['user']
        // 가져온 토큰을 해독해서 id를 찾고 찾은 id로 user를 찾았을 때 user가 없으면 불통
        if (!user) {
            return false;
        }

        // @Role(['Any'])면 모두 통과 
        if(roles.includes('Any')) {
            return true;
        }
        
        // @Role에서 가져오는것들이, user.role에 포함되어 있으면 true, 포함되어 있지 않으면 false,
        return roles.includes(user.role)
    }
}