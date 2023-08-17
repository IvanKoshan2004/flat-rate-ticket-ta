import { Injectable } from "@nestjs/common";
import {
    MyLaphilTicketDataPort,
    PerformanceZonePrices,
    Seat,
    Zone,
} from "../ports/mylaphil-ticket-data.port";

@Injectable()
export class MyLaphilPackageTicketDataAdapter
    implements MyLaphilTicketDataPort
{
    async getZones(performanceId: number): Promise<Zone[]> {
        const zoneAvailabilitiesRequest = await fetch(
            `https://my.laphil.com/en/rest-proxy/TXN/Performances/ZoneAvailabilities?performanceIds=${performanceId}`
        );
        const zones: Zone[] = (await zoneAvailabilitiesRequest.json()).map(
            (el: any) => el["Zone"]
        );
        return zones;
    }
    async getSeats(eventId: number): Promise<Seat[]> {
        const seatsRequest = await fetch(
            `https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`
        );
        return seatsRequest.json();
    }
    async getPerformanceZonePrices(
        eventId: number
    ): Promise<PerformanceZonePrices[]> {
        const packagePerformancesPricesRequest = await fetch(
            `https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&modeOfSaleId=26&priceTypeId=&`
        );
        return packagePerformancesPricesRequest.json();
    }
}
