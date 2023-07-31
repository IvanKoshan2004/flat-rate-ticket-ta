import { Request, Response } from "express";
import { TicketServicePort } from "../ports/TicketServicePort";
import { EventId } from "../domain/EventId";
import { MyLaphilPackageTicketServiceAdapter } from "../adapters/MyLaphilPackageTicketServiceAdapter";
import { MyLaphilPackageTicketDataAdapter } from "../adapters/MyLaphilPackageTicketDataAdapter";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { MyLaphilTicketResolverAdapter } from "../graphql/MyLaphilTicketResolverAdapter";
import { TicketResolverPort } from "../ports/TicketResolverPort";

function createTicketController(
    ticketService: TicketServicePort
): (req: Request, res: Response) => void {
    return async (req: Request, res: Response) => {
        const { id } = req.query;
        const eventId = new EventId(id);
        try {
            const tickets = await ticketService.getEventTickets(eventId);
            res.json(tickets);
        } catch (e) {
            res.status(400).json({
                error: e,
            });
        }
    };
}
async function createGraphQLTicketController<T extends TicketResolverPort>(
    resolverClass: new () => T
) {
    const ticketSchema = await buildSchema({
        resolvers: [resolverClass],
        emitSchemaFile: true,
    });
    return graphqlHTTP({
        schema: ticketSchema,
    });
}

const myLaphilTicketServiceAdapter = new MyLaphilPackageTicketServiceAdapter(
    new MyLaphilPackageTicketDataAdapter()
);
export const getPackageTicketsFromMyLaphil = createTicketController(
    myLaphilTicketServiceAdapter
);
export const getGraphQLPackageTicketsFromMyLaphil =
    createGraphQLTicketController(MyLaphilTicketResolverAdapter);
