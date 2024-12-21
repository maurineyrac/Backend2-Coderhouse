import MongoDao from "./mongo.dao.js";
import { ticketModel } from "./models/ticket.model.js";
export default class TicketDaoMongo extends MongoDao {
  constructor() 
  {
    super(ticketModel);
  }
}