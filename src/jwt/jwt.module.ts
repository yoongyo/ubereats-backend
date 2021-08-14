import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './interfaces/jwt-module-options.interface';
import { JwtService } from './jwt.service';

@Module({})
// 다른 앱에서 import 할 필요없게 만든다. ==  isGlobal: true
@Global()
export class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule {
        return {
            module: JwtModule, 
            exports: [JwtService],
            // options을 JwtService로 가져가려는 목적 => injection 
            providers: [{
                provide: CONFIG_OPTIONS,
                useValue: options,
            },JwtService]
        }
    }
}
