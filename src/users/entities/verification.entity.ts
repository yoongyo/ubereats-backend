import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuidv4 } from 'uuid'

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
    @Column()
    @Field(type => String)
    code: string;

    // onDelete: 'CASCADE' <= user 삭제시 verification도 삭제, verification 삭제시 user 삭제   
    // onDelete: 'SET-NULL' <= OneToOne 관계가 없어도 된다는 것을 의미
    @OneToOne(type => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @BeforeInsert()
    createCode(): void {
        // random code
        // npm i uuid
        this.code = uuidv4()
    }
}