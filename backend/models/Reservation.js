import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  name: { type: String, default: 'Invitado' }, 
  workshopId: { type: Number, required: true },
  workshopTitle: { type: String, required: true },
  date: { type: String, required: true },
  spotsReserved: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Reservation', reservationSchema);
