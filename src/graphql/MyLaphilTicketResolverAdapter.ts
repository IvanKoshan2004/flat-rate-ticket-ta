import { Arg, Query, Resolver } from "type-graphql";
import { Ticket } from "./ticket.schema";
import { TicketServicePort } from "../ports/TicketServicePort";
import { EventId } from "../domain/EventId";
import { MyLaphilPackageTicketServiceAdapter } from "../adapters/MyLaphilPackageTicketServiceAdapter";
import { MyLaphilPackageTicketDataAdapter } from "../adapters/MyLaphilPackageTicketDataAdapter";

@Resolver(() => Ticket)
export class MyLaphilTicketResolverAdapter {
    private ticketService!: TicketServicePort;
    constructor() {
        const ticketDataAdapter = new MyLaphilPackageTicketDataAdapter();
        this.ticketService = new MyLaphilPackageTicketServiceAdapter(
            ticketDataAdapter
        );
    }
    @Query(() => [Ticket])
    async getAllTickets(@Arg("id") id: Number): Promise<Ticket[]> {
        const eventId = new EventId(id);
        return this.ticketService.getEventTickets(eventId);
    }
    @Query(() => [Ticket])
    async getTicketsWithPriceLessThan(
        @Arg("id") id: Number,
        @Arg("price") price: Number
    ): Promise<Ticket[]> {
        const eventId = new EventId(id);
        const tickets = await this.ticketService.getEventTickets(eventId);
        return tickets.filter((ticket) => new Number(ticket.price) < price);
    }
}
