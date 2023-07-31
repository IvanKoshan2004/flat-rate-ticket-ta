import { Ticket } from "../domain/Ticket";

export interface TicketResolverPort {
    getAllTickets(id: Number): Promise<Ticket[]>;
    getTicketsWithPriceLessThan(id: Number, price: Number): Promise<Ticket[]>;
}
