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
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorators_1 = require("../auth/auth-user.decorators");
const user_entity_1 = require("../users/entities/user.entity");
const create_order_dto_1 = require("./dtos/create-order.dto");
const order_entity_1 = require("./entities/order.entity");
const orders_service_1 = require("./orders.service");
let OrderResolver = class OrderResolver {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(customer, createOrderInput) {
        return {
            ok: true
        };
    }
};
__decorate([
    graphql_1.Mutation(returns => create_order_dto_1.CreateOrderOutput),
    __param(0, auth_user_decorators_1.AuthUser()), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_order_dto_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
OrderResolver = __decorate([
    graphql_1.Resolver(of => order_entity_1.Order),
    __metadata("design:paramtypes", [orders_service_1.OrderService])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=orders.resolver.js.map