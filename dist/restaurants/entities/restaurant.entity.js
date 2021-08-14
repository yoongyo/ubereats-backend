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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/entities/core.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const dish_entity_1 = require("./dish.entity");
let Restaurant = class Restaurant extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Restaurant.prototype, "coverImg", void 0);
__decorate([
    graphql_1.Field(type => String, { defaultValue: "no address" }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    graphql_1.Field(type => category_entity_1.Category),
    typeorm_1.ManyToOne(type => category_entity_1.Category, category => category.restaurants, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", category_entity_1.Category)
], Restaurant.prototype, "category", void 0);
__decorate([
    graphql_1.Field(type => user_entity_1.User, { nullable: true }),
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.restaurants, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.User)
], Restaurant.prototype, "owner", void 0);
__decorate([
    typeorm_1.RelationId((restaurant) => restaurant.owner),
    __metadata("design:type", Number)
], Restaurant.prototype, "ownerId", void 0);
__decorate([
    graphql_1.Field(type => [dish_entity_1.Dish]),
    typeorm_1.OneToMany(type => dish_entity_1.Dish, dish => dish.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "menu", void 0);
Restaurant = __decorate([
    graphql_1.InputType('RestaurantInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=restaurant.entity.js.map