import { CoreOutput } from "src/common/dtos/output.dto";
import { Dish } from "../entities/dish.entity";
declare const EdithDishInput_base: import("@nestjs/common").Type<Pick<Partial<Dish>, "name" | "price" | "description" | "options">>;
export declare class EdithDishInput extends EdithDishInput_base {
    dishId?: number;
}
export declare class EditDishOutput extends CoreOutput {
}
export {};
