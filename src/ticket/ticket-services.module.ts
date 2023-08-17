import { Module } from "@nestjs/common";
import { MyLaphilTicketModule } from "./mylaphil/mylaphil-ticket.module";
import { TicketServicesService } from "./ticket-services.service";
import { TicketServicesController } from "./ticket-services.controller";

@Module({
    imports: [MyLaphilTicketModule],
    providers: [TicketServicesService],
    controllers: [TicketServicesController],
    exports: [TicketServicesService],
})
export class TicketServicesModule {}
