import { Request, Response } from "express";
import * as TicketsModel from "../models/tickets";

type Ticket = typeof TicketsModel;

export const getAllTickets =
  (model: Ticket) => async (req: Request, res: Response) => {
    const ticket = await model.getTickets();
    if (!ticket) {
      return res.status(404).send({ message: "Aucun ticket" });
    }
    res.send({ results: [ticket] });
  };

  export const deleteTicket =
    (model: Ticket) => async (req: Request, res: Response) => {
      const id = req.params.id;


      const ticketId = await model.deleteTicketById(id as string);

      if (!ticketId) {
        return res
          .status(400)
          .send({ message: "Le ticket n'a pas été supprimé" });
      }

      res.send({ results: [ticketId] });
    };

    export const createNewTicket =
      (model: Ticket) => async (req: Request, res: Response) => {
        const data = req.body;

        const ticketId = await model.createTicket(data as any);

        if (!ticketId) {
          return res
            .status(404)
            .send({ message: "Le ticket n'a pas été créé" });
        }

        res.send({ results: [ticketId] });
      };

      export const updateTicketById =
        (model: Ticket) => async (req: Request, res: Response) => {
          const data = req.body;

          const ticketId = await model.putTicketById(data as any);

          if (!ticketId) {
            return res
              .status(400)
              .send({ message: "Le ticket n'a pas été modifié" });
          }

          res.send({ results: [ticketId] });
        };