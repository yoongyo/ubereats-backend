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
exports.Order = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const dish_entity_1 = require("../../restaurants/entities/dish.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Order = class Order extends core_entity_1.CoreEntity {
};
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.orders, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "customer", void 0);
__decorate([
    typeorm_1.RelationId((order) => order.customer),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    graphql_1.Field(type => user_entity_1.User, { nullable: true }),
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.rides, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "driver", void 0);
Order = __decorate([
    graphql_1.InputType('OrderInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map