import { Test, TestingModule } from "@nestjs/testing";
import { MyLaphilPackageTicketServiceAdapter } from "./adapters/mylaphil-package-ticket-service.adapter";
import { MyLaphilTicketModule } from "./mylaphil-ticket.module";
import { EventId } from "../../domain/event-id.class";

jest.setTimeout(10000);
jest.retryTimes(1);

describe("MyLaphilTicketService testing", () => {
    let service: MyLaphilPackageTicketServiceAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MyLaphilTicketModule],
        }).compile();

        service = module.get<MyLaphilPackageTicketServiceAdapter>(
            MyLaphilPackageTicketServiceAdapter
        );
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });

    it("Should respond with json of an array of Tickets, if the event with id exists", async () => {
        const eventId = 1195;
        const tickets = await service.getEventTickets(new EventId(eventId));
        expect(Array.isArray(tickets)).toBeTruthy();
        tickets.forEach((ticket) => {
            expect(ticket.row).toEqual(expect.any(String));
            expect(ticket.price).toEqual(expect.any(Number));
            expect(ticket.section).toEqual(expect.any(String));
            expect(ticket.seatNumber).toEqual(expect.any(Number));
        });
    });
    it("Should throw an error if the event id passed is not a number", async () => {
        try {
            const eventId = "hello";
            await service.getEventTickets(new EventId(eventId));
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
    it("Should throw an error if the event with id doesn't exist", async () => {
        try {
            const eventId = 1109439032678912;
            await service.getEventTickets(new EventId(eventId));
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
    it("Should throw an error if the id query param is unspecified", async () => {
        try {
            const eventId = "";
            await service.getEventTickets(new EventId(eventId));
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
