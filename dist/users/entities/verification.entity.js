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
exports.Verification = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const uuid_1 = require("uuid");
let Verification = class Verification extends core_entity_1.CoreEntity {
    createCode() {
        this.code = uuid_1.v4();
    }
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], Verification.prototype, "code", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.User, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Verification.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Verification.prototype, "createCode", null);
Verification = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Verification);
exports.Verification = Verification;
//# sourceMappingURL=verification.entity.js.map