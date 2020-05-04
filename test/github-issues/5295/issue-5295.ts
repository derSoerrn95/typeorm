import "reflect-metadata";
import {expect} from "chai";
import {Connection, getRepository} from "../../../src";
import {closeTestingConnections, createTestingConnections} from "../../utils/test-utils";
import {DayData} from "./entity/DayData";
import {DateTimeData} from "./entity/DateTimeData";

process.env.TZ = "UTC";

const date = new Date("2020-04-22");

const datetime = new Date("2020-05-04T09:32:19.271Z");

console.log(datetime, new Date());

/**
 * to test ts version run:
 * `mocha -r ts-node/register test/github-issues/5295/issue-5295.ts --timeout 10000 --exit`
 */

describe("github issues > #5295 update entity with date pk", () => {

    let connections: Connection[];


    before(async () => {
        connections = await createTestingConnections({
            entities: [DayData, DateTimeData],
            schemaCreate: true,
            dropSchema: true
        });
    });
    after(() => closeTestingConnections(connections));

    it("should create day entity", async () => {
        const quantity = 10;
        const id1 = 1;
        const data = getDayDataObject(date, id1, quantity);

        const result = await getRepository(DayData).save(data);

        expect(result).to.not.be.undefined;
        expect(result.quantity).to.equal(quantity);
        expect(result.id1).to.equal(id1);
    });

    it("should update day entity", async () => {
        const quantity = 20;
        const id1 = 3;
        const data = getDayDataObject(date, id1, quantity);

        const result = await getRepository(DayData).save(data);

        expect(result).to.not.be.undefined;
        expect(result.quantity).to.equal(quantity);
        expect(result.id1).to.equal(id1);
    });

    it("should remove day entity", async () => {
        const data: DayData | undefined = await getRepository(DayData).findOne(date);
        let result = await getRepository(DayData).remove(<DayData>data);

        expect(result).to.not.be.undefined;
        expect(result.day).to.be.undefined;
    });

    it("should create datetime pk entity", async () => {
        const quantity = 10;
        const id1 = 1;
        const data = getDatetimeDataObject(datetime, id1, quantity);

        const result: DateTimeData = await getRepository(DateTimeData).save(data);

        expect(result).to.not.be.undefined;
        expect(result.quantity).to.equal(quantity);
        expect(result.id1).to.equal(id1);
    });

    it("should update datetime entity", async () => {
        const quantity = 20;
        const id1 = 3;
        const data = getDatetimeDataObject(datetime, id1, quantity);

        const result = await getRepository(DateTimeData).save(data);

        expect(result).to.not.be.undefined;
        expect(result.quantity).to.equal(quantity);
        expect(result.id1).to.equal(id1);
    });

    it("should remove datetime entity", async () => {
        const data: DateTimeData | undefined = await getRepository(DateTimeData).findOne(datetime);
        let result = await getRepository(DateTimeData).remove(<DateTimeData>data);

        expect(result).to.not.be.undefined;
        expect(result.day).to.be.undefined;
    });
});

function getDayDataObject(date: Date, id1: number, quantity: number) {
    const data = new DayData();
    data.day = date;
    data.id1 = id1;
    data.quantity = quantity;

    return data;
}

function getDatetimeDataObject(date: Date, id1: number, quantity: number) {
    const data = new DateTimeData();
    data.day = date;
    data.id1 = id1;
    data.quantity = quantity;

    return data;
}
