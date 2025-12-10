import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// Crear reserva (sin login)
router.post('/', async (req, res) => {
  const { name, workshopId, workshopTitle, date } = req.body;

  try {
    const reservation = new Reservation({
      name: name || 'Invitado',
      workshopId,
      workshopTitle,
      date,
      spotsReserved: 1
    });

    await reservation.save();
    res.json({ msg: 'Reserva realizada con éxito', reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al reservar' });
  }
});

export default router;
