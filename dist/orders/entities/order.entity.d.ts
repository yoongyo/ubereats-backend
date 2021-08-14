import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
export declare class Order extends CoreEntity {
    customer?: User;
    customerId: number;
    driver: User;
}
