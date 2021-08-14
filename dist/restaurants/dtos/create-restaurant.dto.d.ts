import { CoreOutput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";
declare const CreateRestaurantInput_base: import("@nestjs/common").Type<Pick<Restaurant, "name" | "coverImg" | "address">>;
export declare class CreateRestaurantInput extends CreateRestaurantInput_base {
    categoryName: string;
}
export declare class CreateRestaurantOutput extends CoreOutput {
}
export {};
