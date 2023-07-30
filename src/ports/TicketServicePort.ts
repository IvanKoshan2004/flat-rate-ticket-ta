import { EventId } from "../domain/EventId";
import { Ticket } from "../domain/Ticket";

export interface TicketServicePort {
    getEventTickets(eventId: EventId): Promise<Ticket[]>;
}
