// utils/insertUsers.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const users = [
  {
    nombre: "Carlos Mendoza",
    email: "carlos@gmail.com",
    password: "$2b$10$L9E71/ry8ZFNvF7.XCIspeY5w3yPVvy1Y7lwYsGDTLc71nHUAuBi",
    telefono: "12345678",
    rol: "usuario",
    activo: true,
    creado: "2025-12-02T13:00:00Z"
  },
  {
    nombre: "Ana Fernández",
    email: "ana@gmail.com",
    password: "$2b$10$DqHF7EC8Ii4/adU4s0tiK.VLIYWq4nueTKyMNcAZMlU15tVoD2K1W",
    telefono: "87654321",
    rol: "admin",
    activo: true,
    creado: "2025-11-20T10:20:00Z"
  },
  {
    nombre: "Luis",
    email: "luis@gmail.com",
    password: "$2b$10$kxe4PKQYaVNdRPswv7eK.uirMr7pgdABvEA5T/PJOUAMNUJIy88l.",
    telefono: "11223344",
    rol: "usuario",
    activo: false,
    creado: "2025-10-11T09:15:00Z"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB conectado');
    await User.deleteMany(); 
    await User.insertMany(users);
    console.log('Usuarios insertados');
    mongoose.disconnect();
  })
  .catch(err => console.log('Error MongoDB:', err));
