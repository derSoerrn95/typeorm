import {Entity} from "../../../../src/decorator/entity/Entity";
import {PrimaryColumn} from "../../../../src/decorator/columns/PrimaryColumn";
import {Column} from "../../../../src/decorator/columns/Column";


@Entity()
export class DayDataString {

    @PrimaryColumn({type: "date"})
    day: string;

    @Column({type: "int"})
    id1: number;

    @Column()
    quantity: number;
}
