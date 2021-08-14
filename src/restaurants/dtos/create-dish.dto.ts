import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Dish } from "../entities/dish.entity";


@InputType()
export class CreateDishInput extends PickType(Dish, [
    'id',
    'name',
    'description',
    'options',
]) {
    @Field(type => Int)
    restaurantId: number;
}


@ObjectType()
export class CreateDishOutput extends CoreOutput {}