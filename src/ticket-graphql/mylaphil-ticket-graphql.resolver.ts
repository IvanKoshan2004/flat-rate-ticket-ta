import { Resolver } from "@nestjs/graphql";
import { TicketResolverPort } from "./ticket-graphql-resolver.port";
import { MyLaphilPackageTicketServiceAdapter } from "../ticket/mylaphil/adapters/mylaphil-package-ticket-service.adapter";

@Resolver()
export class MyLaphilTicketResolverAdapter extends TicketResolverPort {
    constructor(private service: MyLaphilPackageTicketServiceAdapter) {
        super(service);
    }
}
