import { Request, Response } from "express";
import { TicketServicePort } from "../ports/TicketServicePort";
import { EventId } from "../domain/EventId";
import { MyLaphilPackageTicketServiceAdapter } from "../adapters/MyLaphilPackageTicketServiceAdapter";
import { MyLaphilPackageTicketDataAdapter } from "../adapters/MyLaphilPackageTicketDataAdapter";

function createTicketController(
    ticketService: TicketServicePort
): (req: Request, res: Response) => void {
    return async (req: Request, res: Response) => {
        const { id } = req.query;
        const eventId = new EventId(id);
        const tickets = await ticketService.getEventTickets(eventId);
        res.json(tickets);
    };
}

const ticketDataAdapter = new MyLaphilPackageTicketDataAdapter();
export const getPackageTicketsFromMyLaphil = createTicketController(
    new MyLaphilPackageTicketServiceAdapter(ticketDataAdapter)
);
