export interface Zone {
    Id: number;
    Description: string;
}
export interface Seat {
    Id: number;
    ZoneId: number;
    SeatStatusId: number;
    SeatRow: string;
    SeatNumber: string;
}
export interface PerformanceZonePrices {
    ZoneId: number;
    PerformanceId: number;
    Price: number;
}

export abstract class MyLaphilTicketDataPort {
    abstract getZones(performanceId: number): Promise<Zone[]>;
    abstract getSeats(eventId: number): Promise<Seat[]>;
    abstract getPerformanceZonePrices(
        eventId: number
    ): Promise<PerformanceZonePrices[]>;
}
