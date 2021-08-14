"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishResolver = exports.CategoryResolver = exports.RestaurantResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorators_1 = require("../auth/auth-user.decorators");
const role_decorator_1 = require("../auth/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const all_categories_dto_1 = require("./dtos/all-categories.dto");
const category_dto_1 = require("./dtos/category.dto");
const create_dish_dto_1 = require("./dtos/create-dish.dto");
const create_restaurant_dto_1 = require("./dtos/create-restaurant.dto");
const delete_dish_dto_1 = require("./dtos/delete-dish.dto");
const delete_restaurant_dto_1 = require("./dtos/delete-restaurant.dto");
const edit_dish_dto_1 = require("./dtos/edit-dish.dto");
const edit_restaurant_dto_1 = require("./dtos/edit-restaurant.dto");
const restaurant_dto_1 = require("./dtos/restaurant.dto");
const restaurants_dto_1 = require("./dtos/restaurants.dto");
const search_restaurant_dto_1 = require("./dtos/search-restaurant.dto");
const category_entity_1 = require("./entities/category.entity");
const dish_entity_1 = require("./entities/dish.entity");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const restaurants_service_1 = require("./restaurants.service");
let RestaurantResolver = class RestaurantResolver {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async createRestaurant(authuser, createRestaurantInput) {
        return await this.restaurantService.createRestaurant(authuser, createRestaurantInput);
    }
    async editRestaurant(authUser, editRestaurantInput) {
        return await this.restaurantService.editRestaurant(authUser, editRestaurantInput);
    }
    async deleteRestaurant(authUser, deleteRestaurantInput) {
        return await this.restaurantService.deleteRestaurant(authUser, deleteRestaurantInput);
    }
    restaurants(restaurantsInput) {
        return this.restaurantService.allRestaurants(restaurantsInput);
    }
    restaurant(restaurantInput) {
        return this.restaurantService.findRestaurantById(restaurantInput);
    }
    searchRestaurant(searchRestaurantInput) {
        return this.restaurantService.searchRestaurantByName(searchRestaurantInput);
    }
};
__decorate([
    graphql_1.Mutation(returns => create_restaurant_dto_1.CreateRestaurantOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_restaurant_dto_1.CreateRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "createRestaurant", null);
__decorate([
    graphql_1.Mutation(returns => edit_restaurant_dto_1.EditRestaurantOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, edit_restaurant_dto_1.EditRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "editRestaurant", null);
__decorate([
    graphql_1.Mutation(returns => delete_restaurant_dto_1.DeleteRestaurantOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, delete_restaurant_dto_1.DeleteRestauranInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "deleteRestaurant", null);
__decorate([
    graphql_1.Query(returns => restaurants_dto_1.RestaurantsOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurants_dto_1.RestaurantsInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "restaurants", null);
__decorate([
    graphql_1.Query(returns => restaurant_dto_1.RestaurantOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_dto_1.RestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "restaurant", null);
__decorate([
    graphql_1.Query(resturns => search_restaurant_dto_1.SearchRestaurantOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_restaurant_dto_1.SearchRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurantResolver.prototype, "searchRestaurant", null);
RestaurantResolver = __decorate([
    graphql_1.Resolver(of => restaurant_entity_1.Restaurant),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantService])
], RestaurantResolver);
exports.RestaurantResolver = RestaurantResolver;
let CategoryResolver = class CategoryResolver {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    restaurantCount(category) {
        return this.restaurantService.countRestaurants(category);
    }
    allCategory() {
        return this.restaurantService.allCategories();
    }
    category(categoryInput, page) {
        return this.restaurantService.findCategoryBySlug(categoryInput, page);
    }
};
__decorate([
    graphql_1.ResolveField(type => graphql_1.Int),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.Category]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "restaurantCount", null);
__decorate([
    graphql_1.Query(returns => all_categories_dto_1.AllCategoriesOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "allCategory", null);
__decorate([
    graphql_1.Query(returns => category_dto_1.CategoryOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryInput, Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
CategoryResolver = __decorate([
    graphql_1.Resolver(of => category_entity_1.Category),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantService])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
let DishResolver = class DishResolver {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    createDish(owner, createDishInput) {
        return this.restaurantService.createDish(owner, createDishInput);
    }
    editDish(owner, editDishInput) {
        return this.restaurantService.editDish(owner, editDishInput);
    }
    deleteDish(owner, deleteDishInput) {
        return this.restaurantService.deleteDish(owner, deleteDishInput);
    }
};
__decorate([
    graphql_1.Mutation(type => create_dish_dto_1.CreateDishOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dish_dto_1.CreateDishInput]),
    __metadata("design:returntype", Promise)
], DishResolver.prototype, "createDish", null);
__decorate([
    graphql_1.Mutation(type => edit_dish_dto_1.EditDishOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_dish_dto_1.EdithDishInput]),
    __metadata("design:returntype", Promise)
], DishResolver.prototype, "editDish", null);
__decorate([
    graphql_1.Mutation(type => delete_dish_dto_1.DeleteDishOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_dish_dto_1.DeleteDishInput]),
    __metadata("design:returntype", Promise)
], DishResolver.prototype, "deleteDish", null);
DishResolver = __decorate([
    graphql_1.Resolver(of => dish_entity_1.Dish),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantService])
], DishResolver);
exports.DishResolver = DishResolver;
//# sourceMappingURL=restaurants.resolver.js.map