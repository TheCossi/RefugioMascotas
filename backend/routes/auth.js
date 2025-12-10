// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Registro con foto
router.post('/register', upload.single('foto'), async (req, res) => {
  const { nombre, email, password, telefono } = req.body;
  let foto = null;

  if (req.file) {
    foto = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Este email ya está registrado' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      nombre,
      email,
      password: hashedPassword,
      telefono,
      foto
    });

    await user.save();

    const payload = { user: { id: user.id, rol: user.rol } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        foto: user.foto,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { user: { id: user.id, rol: user.rol } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        foto: user.foto,
        rol: user.rol
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

export default router;