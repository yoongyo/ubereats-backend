import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";

@InputType()
export class DeleteRestauranInput {
    @Field(type => Number)
    restaurantId : number
}


@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}
