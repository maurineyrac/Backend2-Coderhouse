export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTicket = async (ticket) => {
    try {
      return await this.dao.create(ticket);
    } catch (error) {
      throw new Error(error);
    }
  }

}