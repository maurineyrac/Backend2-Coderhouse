import {Router} from "express";
import { sendMail } from "../utils/mailing.js";
const router = Router();

router.get("/sendMail", async (req, res) => {
  try {
    await sendMail(
      {
        to: 'Mails de prueba',
        subject: 'Test de envio de mail',
        html: '<h1>Este es un mail de prueba</h1>'
      }
    );

    res.status(200).json({
      status: "success",
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});


export default router;  



