import { Injectable } from "@nestjs/common";
import { EventId } from "../domain/event-id.class";
import { Ticket } from "../domain/ticket.interface";

export abstract class TicketServicePort {
    abstract getEventTickets(eventId: EventId): Promise<Ticket[]>;
}
