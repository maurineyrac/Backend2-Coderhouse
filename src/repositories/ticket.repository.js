import TicketDaoMongo from "../dao/mongoDB/ticket.dao.js";

const ticketDao = new TicketDaoMongo();

export default class TicketRepository {
  constructor() {
    this.dao = ticketDao;
  }

createTicket = async (ticket) => {
    try {
      return await this.dao.create(ticket);
    } catch (error) {
      throw new Error(error);
    }
  }

}