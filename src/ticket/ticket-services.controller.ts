import { Controller, Get, Query } from "@nestjs/common";
import { TicketServicesService } from "./ticket-services.service";
import { EventId } from "../domain/event-id.class";

@Controller("/api")
export class TicketServicesController {
    constructor(
        private readonly ticketServicesService: TicketServicesService
    ) {}

    @Get()
    getPackageTicketsFromMyLaphil(@Query("id") id: string) {
        const eventId = new EventId(id);
        return this.ticketServicesService.getMyLaphilAvailableTickets(eventId);
    }
}
