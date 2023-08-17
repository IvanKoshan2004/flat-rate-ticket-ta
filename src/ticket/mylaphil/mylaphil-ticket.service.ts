import { Injectable } from "@nestjs/common";
import { TicketServicePort } from "../ticket-service.port";
import { EventId } from "../../domain/event-id.class";

@Injectable()
export class TicketService {
    constructor(private ticketService: TicketServicePort) {}
    getEventTickets(eventId: string) {
        return this.ticketService.getEventTickets(new EventId(eventId));
    }
    getEventTicketsGraphQL(eventId: string) {
        return this.ticketService.getEventTickets(new EventId(eventId));
    }
}
