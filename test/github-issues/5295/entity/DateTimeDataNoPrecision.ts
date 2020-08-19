import {Column, Entity, PrimaryColumn} from "../../../../src";

@Entity()
export class DateTimeDataNoPrecision {

    @PrimaryColumn({type: "datetime"})
    day: Date;

    @Column()
    id1: number;

    @Column()
    quantity: number;
}
