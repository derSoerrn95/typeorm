import {Column, Entity, PrimaryColumn} from "../../../../src";

@Entity()
export class DayData {

    @PrimaryColumn({type: "date"})
    day: Date;

    @Column()
    id1: number;

    @Column()
    quantity: number;
}
