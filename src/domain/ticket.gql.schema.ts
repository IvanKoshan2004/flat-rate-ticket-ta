import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Ticket {
    @Field(() => String)
    row!: string;
    @Field(() => Int)
    seatNumber!: number;
    @Field(() => Int)
    price!: number;
    @Field(() => String)
    section!: string;
}
