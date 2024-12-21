import TicketDaoMongo from "../dao/mongoDB/ticket.dao.js";
import TicketRepository from "../repositories/ticket.repository.js";

const ticketService = new TicketRepository(new TicketDaoMongo());

export default ticketService;