import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.dto";
import { Category } from "../entities/category.entity";
export declare class CategoryInput extends PaginationInput {
    slug: string;
}
export declare class CategoryOutput extends PaginationOutput {
    category?: Category;
}
