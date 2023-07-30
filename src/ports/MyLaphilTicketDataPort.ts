export interface Zone {
    Id: number;
    Description: string;
}
export interface Seat {
    Id: number;
    ZoneId: number;
    SeatStatusId: number;
    SeatRow: number;
    SeatNumber: number;
}
export interface PerformanceZonePrices {
    ZoneId: number;
    PerformanceId: number;
    Price: number;
}

export interface MyLaphilTicketDataPort {
    getZones(performanceId: number): Promise<Zone[]>;
    getSeats(eventId: number): Promise<Seat[]>;
    getPerformanceZonePrices(eventId: number): Promise<PerformanceZonePrices[]>;
}
