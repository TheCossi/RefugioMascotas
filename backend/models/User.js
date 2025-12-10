// backend/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  telefono: { type: String },
  foto: { type: String }, 
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
  activo: { type: Boolean, default: true },
  creado: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
