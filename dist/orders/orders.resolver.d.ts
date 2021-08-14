import { User } from "src/users/entities/user.entity";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { OrderService } from "./orders.service";
export declare class OrderResolver {
    private readonly ordersService;
    constructor(ordersService: OrderService);
    createOrder(customer: User, createOrderInput: CreateOrderInput): Promise<CreateOrderOutput>;
}
