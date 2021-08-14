import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType('CategoryInputType')
@ObjectType()
@Entity()
export class Category extends CoreEntity{
    @Field(type => String)
    @Column({unique: true})
    @IsString()
    name: string;

    @Field(type => String, {nullable: true})
    @Column({nullable: true})
    @IsString()
    coverImg?: string;

    @Field(type => String)
    @Column({unique: true})
    @IsString()
    slug: string;

    @Field(type => [Restaurant])
    @OneToMany(
        type => Restaurant,
        restaurant => restaurant.category
    )
    restaurants: Restaurant[]


}