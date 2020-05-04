import {Column, Entity, PrimaryColumn} from "../../../../src";

@Entity()
export class DateTimeData {

    @PrimaryColumn({type: "datetime", precision: 6})
    day: Date;

    @Column()
    id1: number;

    @Column()
    quantity: number;
}
