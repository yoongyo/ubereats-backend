import { MailModuleOptions } from './mail.interfaces';
export declare class MailService {
    private readonly options;
    constructor(options: MailModuleOptions);
    private sendEmail;
}
