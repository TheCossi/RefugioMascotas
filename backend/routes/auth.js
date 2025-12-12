// routes/auth.js  
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../models/User.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),   
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post('/register', upload.single('foto'), async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    // Verifica si ya existe el email
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Este email ya está registrado' });

    // Convierte foto a base64 si existe
    let fotoBase64 = null;
    if (req.file) {
      fotoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    // Encripta contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    user = new User({
      nombre,
      email,
      password: hashedPassword,
      telefono,
      foto: fotoBase64
    });

    await user.save();

    // Generar JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        foto: user.foto,
        rol: user.rol || 'usuario'
      }
    });

  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

export default router;
