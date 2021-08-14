import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Category } from "./category.entity";
import { Dish } from "./dish.entity";
export declare class Restaurant extends CoreEntity {
    name: string;
    coverImg: string;
    address: string;
    category: Category;
    owner: User;
    ownerId: number;
    menu: Dish[];
}
