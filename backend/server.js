// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión DB
conectarDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => res.send('API Refugio Esperanza Animal corriendo'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));