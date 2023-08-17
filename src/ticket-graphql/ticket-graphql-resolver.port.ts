import { Ticket } from "../domain/ticket.gql.schema";
import { TicketServicePort } from "../ticket/ticket-service.port";
import { EventId } from "../domain/event-id.class";
import { Resolver, Query, Args, Int } from "@nestjs/graphql";

@Resolver()
export abstract class TicketResolverPort {
    constructor(private ticketService: TicketServicePort) {}

    @Query(() => [Ticket])
    async getAllTickets(
        @Args("id", { type: () => Int }) id: number
    ): Promise<Ticket[]> {
        const eventId = new EventId(id);
        return this.ticketService.getEventTickets(eventId);
    }
    @Query(() => [Ticket])
    async getTicketsWithPriceLessThan(
        @Args("id", { type: () => Int }) id: Number,
        @Args("price", { type: () => Int }) price: Number
    ): Promise<Ticket[]> {
        const eventId = new EventId(id);
        const tickets = await this.ticketService.getEventTickets(eventId);
        return tickets.filter((ticket) => new Number(ticket.price) < price);
    }
}
