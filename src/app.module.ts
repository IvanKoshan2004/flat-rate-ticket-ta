import { Module } from "@nestjs/common";
import { TicketServicesModule } from "./ticket/ticket-services.module";
import { MyLaphilTicketGraphQLModule } from "./ticket-graphql/mylaphil-ticket-graphql.module";

@Module({
    imports: [TicketServicesModule, MyLaphilTicketGraphQLModule],
})
export class AppModule {}
