import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Dish } from "src/restaurants/entities/dish.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('OrderInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Order extends CoreEntity {
    @ManyToOne(
        type => User,
        user=>user.orders,
        {nullable: true, onDelete: 'SET NULL'}
    )
    customer?: User

    @RelationId((order: Order) => order.customer)
    customerId: number;

    @Field(type => User, {nullable: true})
    @ManyToOne(
        type => User,
        user => user.rides,
        {nullable: true, onDelete: 'SET NULL'}
    )
    driver: User
}