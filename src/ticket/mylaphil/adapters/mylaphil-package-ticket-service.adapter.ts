import { Injectable } from "@nestjs/common";
import { EventId } from "../../../domain/event-id.class";
import { Ticket } from "../../../domain/ticket.interface";
import {
    MyLaphilTicketDataPort,
    Zone,
} from "../ports/mylaphil-ticket-data.port";
import { TicketServicePort } from "../../ticket-service.port";

@Injectable()
export class MyLaphilPackageTicketServiceAdapter implements TicketServicePort {
    constructor(private ticketDataAdapter: MyLaphilTicketDataPort) {}

    async getEventTickets(eventId: EventId): Promise<Ticket[]> {
        if (eventId.id != parseInt(eventId.id)) {
            throw Error("Event id is not a number");
        }
        console.log("Requesting tickets for event with id " + eventId.id);
        const startTime = Date.now();
        const performanceZonePrices =
            await this.ticketDataAdapter.getPerformanceZonePrices(eventId.id);
        if (performanceZonePrices.length == 0) {
            throw Error("Event with this id doesn't exist");
        }
        const packageZonePrices = performanceZonePrices.filter(
            (el) => el.PerformanceId == 0 // PerformanceId = 0 <=> gives total price for ticket package
        );

        const zoneToPrice: Record<number, number> = {};
        packageZonePrices.forEach((el: any) => {
            zoneToPrice[el.ZoneId] = el.Price;
        });
        console.log(`Loaded prices in ${Date.now() - startTime}ms`);
        const zoneStartTime = Date.now();
        const performanceId = performanceZonePrices[0].PerformanceId;
        const [zones, seats] = await Promise.all([
            this.ticketDataAdapter.getZones(performanceId),
            this.ticketDataAdapter.getSeats(eventId.id),
        ]);
        console.log(
            `Loaded zones and seats in ${Date.now() - zoneStartTime}ms`
        );
        console.log(`Total Load Time ${Date.now() - startTime}ms`);

        console.log("Generating tickets");
        const availableSeats = seats.filter((el) => el.SeatStatusId == 0);
        const availableTickets = availableSeats.map((seat) => {
            const zoneId = seat.ZoneId;
            const seatZone = zones.find((el) => el.Id == zoneId) as Zone;
            const section = seatZone.Description;
            const price = zoneToPrice[zoneId];
            return {
                section,
                price,
                row: seat.SeatRow,
                seatNumber: parseInt(seat.SeatNumber),
            } as Ticket;
        });
        console.log("Total ticket count " + availableTickets.length);
        return availableTickets;
    }
}
