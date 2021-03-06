import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorators";
import { User } from "src/users/entities/user.entity";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";



@Resolver(of => Order)
export class OrderResolver {
    constructor(private readonly ordersService: OrderService) {}

    @Mutation(returns => CreateOrderOutput)
    async createOrder(@AuthUser() customer: User,@Args('input') createOrderInput: CreateOrderInput): Promise<CreateOrderOutput> {
        return {
            ok: true
        }
    }
}