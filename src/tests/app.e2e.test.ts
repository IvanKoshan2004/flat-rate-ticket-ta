import { Ticket } from "../domain/Ticket";
import app from "../server";
import supertest from "supertest";
jest.setTimeout(10000); //for slow connections
describe("Endpoint 2e2 testing", () => {
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
});
