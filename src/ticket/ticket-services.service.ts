import { Injectable } from "@nestjs/common";
import { MyLaphilPackageTicketServiceAdapter } from "./mylaphil/adapters/mylaphil-package-ticket-service.adapter";
import { EventId } from "../domain/event-id.class";

@Injectable()
export class TicketServicesService {
    constructor(
        private myLaphilPackageTicketService: MyLaphilPackageTicketServiceAdapter
    ) {}
    getMyLaphilAvailableTickets(eventId: EventId) {
        return this.myLaphilPackageTicketService.getEventTickets(eventId);
    }
}
