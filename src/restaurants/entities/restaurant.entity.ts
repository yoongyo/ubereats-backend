import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Category } from "./category.entity";
import { Dish } from "./dish.entity";

@InputType('RestaurantInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{
    @Field(type => String)
    @Column()
    name: string;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg:  string;

    @Field(type => String, {defaultValue: "no address"})
    @Column()
    address: string;

    @Field(type => Category)
    @ManyToOne(
        type=>Category,
        category=>category.restaurants,
        {nullable: true, onDelete: 'SET NULL'}
    )
    category: Category;

    @Field(type => User, {nullable: true})
    @ManyToOne(
        type=>User,
        user=>user.restaurants,
        {nullable: true, onDelete: 'SET NULL'}
    )
    owner: User

    @RelationId((restaurant: Restaurant) => restaurant.owner)
    ownerId: number;

    @Field(type => [Dish])
    @OneToMany(
        type => Dish,
        dish => dish.restaurant
    )
    menu: Dish[]



}