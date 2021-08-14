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
exports.Dish = exports.DishOption = exports.DishChoice = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
let DishChoice = class DishChoice {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], DishChoice.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], DishChoice.prototype, "extra", void 0);
DishChoice = __decorate([
    graphql_1.InputType('DishChoiceInputType', { isAbstract: true }),
    graphql_1.ObjectType()
], DishChoice);
exports.DishChoice = DishChoice;
let DishOption = class DishOption {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], DishOption.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => [DishChoice]),
    __metadata("design:type", Array)
], DishOption.prototype, "choices", void 0);
__decorate([
    graphql_1.Field(type => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], DishOption.prototype, "extra", void 0);
DishOption = __decorate([
    graphql_1.InputType('DishOptionInputType', { isAbstract: true }),
    graphql_1.ObjectType()
], DishOption);
exports.DishOption = DishOption;
let Dish = class Dish extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Dish.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Dish.prototype, "photo", void 0);
__decorate([
    typeorm_1.ManyToOne(type => restaurant_entity_1.Restaurant, restaurant => restaurant.menu, { onDelete: 'CASCADE' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Dish.prototype, "restaurant", void 0);
__decorate([
    graphql_1.Field(type => graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Dish.prototype, "price", void 0);
__decorate([
    graphql_1.Field(type => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Dish.prototype, "description", void 0);
__decorate([
    typeorm_1.RelationId((dish) => dish.restaurant),
    __metadata("design:type", Number)
], Dish.prototype, "restaurantId", void 0);
__decorate([
    graphql_1.Field(type => [DishOption], { nullable: true }),
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", Array)
], Dish.prototype, "options", void 0);
Dish = __decorate([
    graphql_1.InputType('DishInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Dish);
exports.Dish = Dish;
//# sourceMappingURL=dish.entity.js.map