import {Entity} from "../../../../src/decorator/entity/Entity";
import {PrimaryColumn} from "../../../../src/decorator/columns/PrimaryColumn";
import {Column} from "../../../../src/decorator/columns/Column";


@Entity()
export class DayData {

    @PrimaryColumn({type: "date"})
    day: Date;

    @Column({type: "int"})
    id1: number;

    @Column()
    quantity: number;
}
