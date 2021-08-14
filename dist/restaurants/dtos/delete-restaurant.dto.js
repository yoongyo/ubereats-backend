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
exports.DeleteRestaurantOutput = exports.DeleteRestauranInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let DeleteRestauranInput = class DeleteRestauranInput {
};
__decorate([
    graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], DeleteRestauranInput.prototype, "restaurantId", void 0);
DeleteRestauranInput = __decorate([
    graphql_1.InputType()
], DeleteRestauranInput);
exports.DeleteRestauranInput = DeleteRestauranInput;
let DeleteRestaurantOutput = class DeleteRestaurantOutput extends output_dto_1.CoreOutput {
};
DeleteRestaurantOutput = __decorate([
    graphql_1.ObjectType()
], DeleteRestaurantOutput);
exports.DeleteRestaurantOutput = DeleteRestaurantOutput;
//# sourceMappingURL=delete-restaurant.dto.js.map