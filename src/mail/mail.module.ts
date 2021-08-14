import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';

@Module({})
// 다른 앱에서 import 할 필요없게 만든다. ==  isGlobal: true
@Global()
export class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
        return {
            module: MailModule, 
            exports: [MailService],
            // options을 JwtService로 가져가려는 목적 => injection 
            providers: [{
                provide: CONFIG_OPTIONS,
                useValue: options,
            },MailService]
        }
    }
}
