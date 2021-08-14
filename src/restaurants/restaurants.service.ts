import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorators";
import { User } from "src/users/entities/user.entity";
import { Raw, Repository } from "typeorm";
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
import { Dish } from "./entities/dish.entity";
import { Restaurant } from "./entities/restaurant.entity";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class RestaurantService {
    constructor( 
        @InjectRepository(Restaurant) 
        private readonly restaurants: Repository<Restaurant>,
        private readonly categories: CategoryRepository,
        @InjectRepository(Dish) 
        private readonly dishes: Repository<Dish>
    ) {}
    
    async createRestaurant(owner: User, createRestaurantInput: CreateRestaurantInput): Promise<CreateRestaurantOutput>{
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput)
            newRestaurant.owner = owner
            const category = await this.categories.getOrCreate(createRestaurantInput.categoryName)
            newRestaurant.category = category;
            await this.restaurants.save(newRestaurant)
            return {
                ok: true,
            }
        } catch (e){
            return {
                ok: false,
                error: 'Could not create restaurant.' + e
            }
        }
    }

    async editRestaurant(owner: User, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput> {
        const restaurant = await this.restaurants.findOne(editRestaurantInput.restaurantId, {loadRelationIds: true})
        try {
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant Not Found'
                }
            }
            if (owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't edit a restaurant that you don't owner"
                }
            }
            let category: Category = null;
            if (editRestaurantInput.categoryName) {
                category = await this.categories.getOrCreate(editRestaurantInput.categoryName)
            }

            await this.restaurants.save([{
                id: editRestaurantInput.restaurantId,
                ...editRestaurantInput,
                ...(category && {category})
            }])
            return { ok: true }
        } catch(e) {
            return {
                ok: false,
                error: 'Could not Edit Restaurant'
            }
        }
    }

    async deleteRestaurant(owner: User, {restaurantId}: DeleteRestauranInput): Promise<DeleteRestaurantOutput> {
        const restaurant = await this.restaurants.findOne({id: restaurantId}, {loadRelationIds: true})
        try {
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant Not Found'
                }
            }
            if (owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't delete a Restaurant that you don't owner"
                }
            }
            await this.restaurants.delete(restaurantId)
            return { ok: true }
        } catch(e) {
            return {
                ok: false,
                error: 'Could not Delete a Restaurant' + e
            }
        }
    }

    async allCategories(): Promise<AllCategoriesOutput> {
        try {
            const categories = await this.categories.find();
            return {
                ok: true,
                categories
            }
        } catch (e) {
            return {
                ok: false,
                error: 'Could not '
            }
        }
    }

    async countRestaurants(category: Category) {
        return this.restaurants.count({category})
    }

    async findCategoryBySlug({slug}: CategoryInput, page: number): Promise<CategoryOutput> {
        try {
            const category = await this.categories.findOne({slug})
            if(!category) {
                return {
                    ok: false,
                    error: 'Category not found'
                }
            }
            const restaurants = await this.restaurants.find({
                where: {
                    category
                },
                take: 25,
                skip: (page-1) * 25
            })
            category.restaurants = restaurants
            const totalResults = await this.countRestaurants(category)
            return {
                ok: true,
                category,
                totalPages: Math.ceil(totalResults / 25)
            }
        } catch (e){
            return {
                ok: false,
                error: 'Could not load category'
            }
        }
    }

    async allRestaurants({page}: RestaurantsInput): Promise<RestaurantsOutput> {
        try {
            const [restaurants, totalResults] = await this.restaurants.findAndCount({
                skip: (page -1) * 25,
                take: 25
            })
            return {
                ok: true,
                results: restaurants,
                totalPages: Math.ceil(totalResults/25),
                totalResults
            }
        } catch(e) {
            return {
                ok: false,
                error: 'Could not load restaurants'
            }
        }
    }

    async findRestaurantById({restaurantId}: RestaurantInput): Promise<RestaurantOutput> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId)
            if(!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant Not Found'
                }
            }
            return {
                ok: true,
                restaurant
            }
        } catch (e) {
            return {
                ok: false,
                error: 'Could not load restaurant'
            }
        }
    }

    async searchRestaurantByName({query, page}: SearchRestaurantInput):Promise<SearchRestaurantOutput> {
        try {
            const [restaurants, totalResults] = await this.restaurants.findAndCount({
                where: {
                    name: Raw(name => `${name} ILIKE '%${query}%'`)
                },
                skip: (page -1) * 25,
                take: 25
            })
            return {
                ok: true,
                restaurants,
                totalResults,
                totalPages: Math.ceil(totalResults/25)
            }
        } catch (e) {
            return {
                ok: false,
                error: 'Could not Search Restaurant by name'
            }
        }
    }

    async createDish(owner: User, createDishInput: CreateDishInput): Promise<CreateDishOutput> {
        try {
            const restaurant = await this.restaurants.findOne(createDishInput.restaurantId)
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant Found not'
                }
            }
            if (restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: "You can't create Dish that Restaurant"
                }
            }
            await this.dishes.save(this.dishes.create({...createDishInput, restaurant}))
            return {
                ok: true,
            }
        } catch {
            return {
                ok: false,
                error: 'Could not create dish'
            }
        }
    }

    async editDish(owner: User, editDishInput: EdithDishInput): Promise<EditDishOutput> {
        try {
            const dish = await this.dishes.findOne(editDishInput.dishId, {relations: ['restaurant']})
            if (!dish) {
                return {
                    ok: false,
                    error: 'Dish Found Not'
                }
            }
            if (dish.restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: "You can't edit Dish that Restaurant"
                }
            }
            await this.dishes.save([{
                id: editDishInput.dishId,
                ...editDishInput
            }])
            return {
                ok: true,
            }
        } catch(e) {
            return {
                ok: false,
                error: 'Could not edit dish'
            }
        }
    }

    async deleteDish(owner: User, {dishId}: DeleteDishInput): Promise<DeleteDishOutput> {
        try {
            const dish = await this.dishes.findOne(dishId, {relations: ['restaurant']})
            if (!dish) {
                return {
                    ok: false,
                    error: 'Dish Found Not'
                }
            }
            if (dish.restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: "You can't delete Dish that Restaurant"
                }
            }
            await this.dishes.delete(dishId)
            return {
                ok: true
            }
        } catch {
            return {
                ok: false,
                error: 'Could not delete dish'
            }
        }
    }


}