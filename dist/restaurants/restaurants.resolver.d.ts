import { User } from "src/users/entities/user.entity";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { CreateDishInput, CreateDishOutput } from "./dtos/create-dish.dto";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { DeleteDishInput, DeleteDishOutput } from "./dtos/delete-dish.dto";
import { DeleteRestauranInput, DeleteRestaurantOutput } from "./dtos/delete-restaurant.dto";
import { EditDishOutput, EdithDishInput } from "./dtos/edit-dish.dto";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { RestaurantInput, RestaurantOutput } from "./dtos/restaurant.dto";
import { RestaurantsInput, RestaurantsOutput } from "./dtos/restaurants.dto";
import { SearchRestaurantInput, SearchRestaurantOutput } from "./dtos/search-restaurant.dto";
import { Category } from "./entities/category.entity";
import { RestaurantService } from "./restaurants.service";
export declare class RestaurantResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    createRestaurant(authuser: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput>;
    editRestaurant(authUser: User, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput>;
    deleteRestaurant(authUser: User, deleteRestaurantInput: DeleteRestauranInput): Promise<DeleteRestaurantOutput>;
    restaurants(restaurantsInput: RestaurantsInput): Promise<RestaurantsOutput>;
    restaurant(restaurantInput: RestaurantInput): Promise<RestaurantOutput>;
    searchRestaurant(searchRestaurantInput: SearchRestaurantInput): Promise<SearchRestaurantOutput>;
}
export declare class CategoryResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    restaurantCount(category: Category): Promise<number>;
    allCategory(): Promise<AllCategoriesOutput>;
    category(categoryInput: CategoryInput, page: number): Promise<CategoryOutput>;
}
export declare class DishResolver {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    createDish(owner: any, createDishInput: CreateDishInput): Promise<CreateDishOutput>;
    editDish(owner: any, editDishInput: EdithDishInput): Promise<EditDishOutput>;
    deleteDish(owner: any, deleteDishInput: DeleteDishInput): Promise<DeleteDishOutput>;
}
