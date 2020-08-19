import "reflect-metadata";
import {expect} from "chai";
import {Connection, getRepository} from "../../../src";
import {closeTestingConnections, createTestingConnections} from "../../utils/test-utils";
import {DayData} from "./entity/DayData";
import {DateTimeData} from "./entity/DateTimeData";
import {DateTimeDataNoPrecision} from "./entity/DateTimeDataNoPrecision";
import {DayDataString} from "./entity/DayDataString";

process.env.TZ = "UTC";

const date = new Date("2020-04-22");
const dayString = date.toISOString().split("T")[0];
const datetime = new Date("2020-05-04T09:32:19.271Z");
const datetimeNp = new Date("2020-05-04T09:32:19Z");

describe("github issues > #5295 update entity with date pk", () => {

    let connections: Connection[];

    before(async () => {
        connections = await createTestingConnections({
            entities: [DayData, DayDataString, DateTimeData, DateTimeDataNoPrecision],
            schemaCreate: true,
            dropSchema: true
        });
    });
    after(() => closeTestingConnections(connections));

    describe("day entity", () => {
        before(async () => {
            // insert another dayDate entity to demonstrate, that find one does not work when passing date object.
            const dates = [new Date("2020-04-01"), new Date("2020-05-01"), new Date("2020-06-01")];
            for (let date of dates) {
                await getRepository(DayData).save(getDayDataObject(date, 2, 20));
            }
        });

        it("should create entity", async () => {
            const quantity = 10;
            const id1 = 1;
            const data = getDayDataObject(date, id1, quantity);

            const result = await getRepository(DayData).save(data);

            expect(result).to.not.be.undefined;
            expect(result.quantity).to.equal(quantity);
            expect(result.id1).to.equal(id1);
        });

        it("should get entity with find", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DayData[] = await getRepository(DayData).find({
                where: {
                    day: date,
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result.length).to.equal(1);
            expect(result[0].day).to.equal(date);
            expect(result[0].id1).to.equal(id1);
            expect(result[0].quantity).to.equal(quantity);
        });

        it("should get entity with findOne", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DayData | undefined = await getRepository(DayData).findOne(date, {
                where: {
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result ? result.day : null).to.equal(date);
            expect(result ? result.id1 : null).to.equal(id1);
            expect(result ? result.quantity : null).to.equal(quantity);
        });

        it("should update entity", async () => {
            const quantity = 20;
            const id1 = 3;
            const data = getDayDataObject(date, id1, quantity);

            const result = await getRepository(DayData).save(data);

            expect(result).to.not.be.undefined;
            expect(result.id1).to.equal(id1);
            expect(result.quantity).to.equal(quantity);
        });

        it("should remove entity", async () => {
            const data: DayData | undefined = await getRepository(DayData).findOne(date);
            let result = await getRepository(DayData).remove(<DayData>data);

            expect(result).to.not.be.undefined;
            expect(result.day).to.be.undefined;
        });
    });

    describe("day entity but day as string", () => {
        it("should create entity", async () => {
            const quantity = 10;
            const id1 = 1;
            const data = getDayDataStringObject(dayString, id1, quantity);

            const result: DayDataString = await getRepository(DayDataString).save(data);

            expect(result).to.not.be.undefined;
            expect(result.quantity).to.equal(quantity);
            expect(result.id1).to.equal(id1);
        });

        it("should get entity with find", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DayDataString[] = await getRepository(DayDataString).find({
                where: {
                    day: dayString,
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result.length).to.equal(1);
            expect(result[0].day).to.equal(dayString);
            expect(result[0].id1).to.equal(id1);
            expect(result[0].quantity).to.equal(quantity);
        });

        it("should get entity with findOne", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DayDataString | undefined = await getRepository(DayDataString).findOne(dayString, {
                where: {
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result ? result.day : null).to.equal(dayString);
            expect(result ? result.id1 : null).to.equal(id1);
            expect(result ? result.quantity : null).to.equal(quantity);
        });

        it("should update entity", async () => {
            const quantity = 20;
            const id1 = 3;
            const data = getDayDataStringObject(dayString, id1, quantity);

            const result: DayDataString = await getRepository(DayDataString).save(data);

            expect(result).to.not.be.undefined;
            expect(result.id1).to.equal(id1);
            expect(result.quantity).to.equal(quantity);
        });

        it("should remove entity", async () => {
            const data: DayDataString | undefined = await getRepository(DayDataString).findOne(dayString);
            let result = await getRepository(DayDataString).remove(<DayDataString>data);

            expect(result).to.not.be.undefined;
            expect(result.day).to.be.undefined;
        });
    });

    describe("datetime entity with precision", () => {
        it("should create entity", async () => {
            const quantity = 10;
            const id1 = 1;
            const data = getDatetimeDataObject(datetime, id1, quantity);

            const result: DateTimeData = await getRepository(DateTimeData).save(data);

            expect(result).to.not.be.undefined;
            expect(result.id1).to.equal(id1);
            expect(result.quantity).to.equal(quantity);
        });

        it("should get entity with find", async () => {
            const quantity = 10;
            const id1 = 1;

            const result: DateTimeData[] = await getRepository(DateTimeData).find({
                where: {
                    day: datetime,
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result.length).to.equal(1);
            expect(result[0].day).to.equal(datetime);
            expect(result[0].id1).to.equal(id1);
            expect(result[0].quantity).to.equal(quantity);
        });

        it("should get entity with findOne", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DateTimeData | undefined = await getRepository(DateTimeData).findOne(datetime, {
                where: {
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result ? result.day : null).to.equal(datetime);
            expect(result ? result.id1 : null).to.equal(id1);
            expect(result ? result.quantity : null).to.equal(quantity);
        });

        it("should update entity", async () => {
            const quantity = 20;
            const id1 = 3;
            const data = getDatetimeDataObject(datetime, id1, quantity);

            const result = await getRepository(DateTimeData).save(data);

            expect(result).to.not.be.undefined;
            expect(result.quantity).to.equal(quantity);
            expect(result.id1).to.equal(id1);
        });

        it("should remove entity", async () => {
            const data: DateTimeData | undefined = await getRepository(DateTimeData).findOne(datetime);
            let result = await getRepository(DateTimeData).remove(<DateTimeData>data);

            expect(result).to.not.be.undefined;
            expect(result.day).to.be.undefined;
        });
    });

    describe("datetime entity without precision", () => {
        it("should create entity", async () => {
            const quantity = 10;
            const id1 = 1;
            const data = getDateTimeDataNoPrecisionObject(datetimeNp, id1, quantity);

            const result: DateTimeDataNoPrecision = await getRepository(DateTimeDataNoPrecision).save(data);

            expect(result).to.not.be.undefined;
            expect(result.quantity).to.equal(quantity);
            expect(result.id1).to.equal(id1);
        });

        it("should get entity", async () => {
            const quantity = 10;
            const id1 = 1;

            const result: DateTimeDataNoPrecision[] = await getRepository(DateTimeDataNoPrecision).find({
                where: {
                    day: datetimeNp,
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result.length).to.equal(1);
            expect(result[0].day).to.equal(datetimeNp);
            expect(result[0].id1).to.equal(id1);
            expect(result[0].quantity).to.equal(quantity);
        });

        it("should get entity with findOne", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DateTimeDataNoPrecision | undefined = await getRepository(DateTimeDataNoPrecision).findOne(datetimeNp, {
                where: {
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result ? result.day : null).to.equal(datetimeNp);
            expect(result ? result.id1 : null).to.equal(id1);
            expect(result ? result.quantity : null).to.equal(quantity);
        });

        it("should update entity", async () => {
            const quantity = 20;
            const id1 = 3;
            const data = getDateTimeDataNoPrecisionObject(datetimeNp, id1, quantity);

            const result = await getRepository(DateTimeDataNoPrecision).save(data);

            expect(result).to.not.be.undefined;
            expect(result.id1).to.equal(id1);
            expect(result.quantity).to.equal(quantity);
        });

        it("should remove entity", async () => {
            const data: DateTimeDataNoPrecision | undefined = await getRepository(DateTimeDataNoPrecision).findOne(datetimeNp);
            let result = await getRepository(DateTimeDataNoPrecision).remove(<DateTimeDataNoPrecision>data);

            expect(result).to.not.be.undefined;
            expect(result.day).to.be.undefined;
        });
    });

    describe("datetime entity without precision but precision set", () => {
        it("should create entity", async () => {
            const quantity = 10;
            const id1 = 1;
            const data = getDateTimeDataNoPrecisionObject(datetime, id1, quantity);

            const result: DateTimeDataNoPrecision = await getRepository(DateTimeDataNoPrecision).save(data);

            expect(result).to.not.be.undefined;
            expect(result.quantity).to.equal(quantity);
            expect(result.id1).to.equal(id1);
        });

        it("should get entity", async () => {
            const quantity = 10;
            const id1 = 1;

            const result: DateTimeDataNoPrecision[] = await getRepository(DateTimeDataNoPrecision).find({
                where: {
                    day: datetime,
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result.length).to.equal(1);
            expect(result[0].day).to.equal(datetime);
            expect(result[0].id1).to.equal(id1);
            expect(result[0].quantity).to.equal(quantity);
        });

        it("should get entity with findOne", async () => {
            const id1 = 1;
            const quantity = 10;
            const result: DateTimeDataNoPrecision | undefined = await getRepository(DateTimeDataNoPrecision).findOne(datetime, {
                where: {
                    id1: id1
                }
            });

            expect(result).to.not.be.undefined;
            expect(result ? result.day : null).to.equal(datetime);
            expect(result ? result.id1 : null).to.equal(id1);
            expect(result ? result.quantity : null).to.equal(quantity);
        });

        it("should update entity", async () => {
            const quantity = 20;
            const id1 = 3;
            const data = getDateTimeDataNoPrecisionObject(datetime, id1, quantity);

            const result = await getRepository(DateTimeDataNoPrecision).save(data);

            expect(result).to.not.be.undefined;
            expect(result.id1).to.equal(id1);
            expect(result.quantity).to.equal(quantity);
        });

        it("should remove entity", async () => {
            const data: DateTimeDataNoPrecision | undefined = await getRepository(DateTimeDataNoPrecision).findOne(datetime);
            let result = await getRepository(DateTimeDataNoPrecision).remove(<DateTimeDataNoPrecision>data);

            expect(result).to.not.be.undefined;
            expect(result.day).to.be.undefined;
        });
    });
});

function getDayDataObject(date: Date, id1: number, quantity: number) {
    const data = new DayData();
    data.day = date;
    data.id1 = id1;
    data.quantity = quantity;

    return data;
}

function getDayDataStringObject(date: string, id1: number, quantity: number) {
    const data = new DayDataString();
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

function getDateTimeDataNoPrecisionObject(date: Date, id1: number, quantity: number) {
    const data = new DateTimeDataNoPrecision();
    data.day = date;
    data.id1 = id1;
    data.quantity = quantity;

    return data;
}
