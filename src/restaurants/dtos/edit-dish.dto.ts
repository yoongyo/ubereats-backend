import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Dish } from "../entities/dish.entity";

@InputType()
export class EdithDishInput extends PickType(PartialType(Dish), [
    'name', 
    'price', 
    'options', 
    'description'
]) {
    @Field(type => Int, {nullable: true})
    dishId?: number
}


@ObjectType()
export class EditDishOutput extends CoreOutput {}