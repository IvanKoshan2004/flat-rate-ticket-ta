import { Test, TestingModule } from "@nestjs/testing";
import { MyLaphilTicketResolverAdapter } from "./mylaphil-ticket-graphql.resolver";
import { MyLaphilTicketGraphQLModule } from "./mylaphil-ticket-graphql.module";
jest.setTimeout(15000);
jest.retryTimes(1);
describe("MyLaphilTicketGraphQLResolver testing", () => {
    let service: MyLaphilTicketResolverAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MyLaphilTicketGraphQLModule],
        }).compile();

        service = module.get<MyLaphilTicketResolverAdapter>(
            MyLaphilTicketResolverAdapter
        );
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });

    it("getAllTickets should respond with an array of Tickets, if the event with id exists", async () => {
        const tickets = await service.getAllTickets(1195);
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
        const tickets = await service.getTicketsWithPriceLessThan(1195, price);
        const ticketWithPriceAbove = tickets.findIndex(
            (ticket) => ticket.price > price
        );
        expect(ticketWithPriceAbove).toEqual(-1);
    });
});
