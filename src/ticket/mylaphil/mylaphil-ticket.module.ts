import { Module } from "@nestjs/common";
import { TicketServicePort } from "../ticket-service.port";
import { MyLaphilPackageTicketServiceAdapter } from "./adapters/mylaphil-package-ticket-service.adapter";
import { MyLaphilPackageTicketDataAdapter } from "./adapters/mylaphil-package-ticket-data.adapter";
import { MyLaphilTicketDataPort } from "./ports/mylaphil-ticket-data.port";

@Module({
    providers: [
        MyLaphilPackageTicketServiceAdapter,
        {
            provide: MyLaphilTicketDataPort,
            useClass: MyLaphilPackageTicketDataAdapter,
        },
        {
            provide: TicketServicePort,
            useClass: MyLaphilPackageTicketServiceAdapter,
        },
    ],
    exports: [MyLaphilPackageTicketServiceAdapter],
})
export class MyLaphilTicketModule {}
