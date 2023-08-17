import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MyLaphilTicketResolverAdapter } from "./mylaphil-ticket-graphql.resolver";
import { MyLaphilTicketModule } from "../ticket/mylaphil/mylaphil-ticket.module";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: true,
        }),
        MyLaphilTicketModule,
    ],
    providers: [MyLaphilTicketResolverAdapter],
    exports: [MyLaphilTicketResolverAdapter],
})
export class MyLaphilTicketGraphQLModule {}
