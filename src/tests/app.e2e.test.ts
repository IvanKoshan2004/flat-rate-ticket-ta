import { Ticket } from "../domain/Ticket";
import createServer from "../server";
import supertest from "supertest";
import { Express } from "express";
jest.setTimeout(10000); //for slow connections
jest.retryTimes(3);
describe("REST endpoint 2e2 testing", () => {
    let app!: Express;
    beforeEach(async () => {
        app = await createServer();
    });
    it("Should respond with json of an array of Tickets, if the event with id exists", async () => {
        const eventId = 1195;
        const res = await supertest(app).get(`/api?id=${eventId}`);
        const tickets = JSON.parse(res.text) as Ticket[];
        expect(Array.isArray(tickets)).toBeTruthy();
        tickets.forEach((ticket) => {
            expect(ticket.row).toEqual(expect.any(String));
            expect(ticket.price).toEqual(expect.any(Number));
            expect(ticket.section).toEqual(expect.any(String));
            expect(ticket.seatNumber).toEqual(expect.any(Number));
        });
    });
    it("Should respond with Bad Request (code: 400) if the event id passed is not a number", async () => {
        const eventId = "hello";
        const res = await supertest(app).get(`/api?id=${eventId}`);
        expect(res.statusCode).toEqual(400);
    });
    it("Should respond with Bad Request (code: 400) if the event with id doesn't exist", async () => {
        const eventId = 1109439032678912;
        const res = await supertest(app).get(`/api?id=${eventId}`);
        expect(res.statusCode).toEqual(400);
    });
    it("Should respond with Bad Request (code: 400) if the id query param is unspecified", async () => {
        const res = await supertest(app).get(`/api`);
        expect(res.statusCode).toEqual(400);
    });
});
describe("GraphQL endpoint 2e2 testing", () => {
    let app!: Express;
    beforeEach(async () => {
        app = await createServer();
    });
    it("getAllTickets should respond with an array of Tickets, if the event with id exists", async () => {
        const query = `
        {
            getAllTickets(id: 1195) {
                row
                price
                seatNumber
                section
            }
        }
        `;
        const res = await supertest(app).post(`/graphql?query=${query}`);
        const tickets = res.body.data.getAllTickets as Ticket[];
        expect(Array.isArray(tickets)).toBeTruthy();
        tickets.forEach((ticket) => {
            expect(ticket.row).toEqual(expect.any(String));
            expect(ticket.price).toEqual(expect.any(Number));
            expect(ticket.section).toEqual(expect.any(String));
            expect(ticket.seatNumber).toEqual(expect.any(Number));
        });
    });
    it("getTicketsWithPriceLessThan should respond with tickets with price less than number", async () => {
        const price = Math.round((Math.random() + 0.5) * 1000);
        const query = `
        {
            getTicketsWithPriceLessThan(id: 1195, price: ${price}) {
                row
                price
                seatNumber
                section
            }
        }
        `;
        const res = await supertest(app).post(`/graphql?query=${query}`);
        const tickets = res.body.data.getTicketsWithPriceLessThan as Ticket[];
        const ticketWithPriceAbove = tickets.findIndex(
            (ticket) => ticket.price > price
        );
        expect(ticketWithPriceAbove).toEqual(-1);
    });
});
