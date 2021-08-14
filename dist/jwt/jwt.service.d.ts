import { JwtModuleOptions } from './interfaces/jwt-module-options.interface';
export declare class JwtService {
    private readonly options;
    constructor(options: JwtModuleOptions);
    sign(userId: object): string;
    verify(token: string): string | object;
}
