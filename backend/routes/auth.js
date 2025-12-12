// backend/routes/auth.js 
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../models/User.js';

const router = express.Router();

// Multer 
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Solo imágenes (jpeg, jpg, png, gif, webp)'));
  }
});

// =======================
// REGISTRO
// =======================
router.post('/register', upload.single('foto'), async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: 'No se enviaron datos' });
    }

    // Extrae datos con valores por defecto seguros
    const nombre = req.body.nombre?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;
    const telefono = req.body.telefono?.trim();

    // Valida básicas
    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: 'Nombre, email y contraseña son obligatorios' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ msg: 'Email inválido' });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verifica si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Este email ya está registrado' });
    }

    // Convierte foto a base64 si existe
    let fotoBase64 = null;
    if (req.file) {
      fotoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    // Encripta contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea usuario
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      telefono: telefono || '',
      foto: fotoBase64,
      rol: 'usuario'
    });

    await newUser.save();

    // Genera JWT
    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respuesta exitosa
    res.status(201).json({
      msg: 'Usuario creado con éxito',
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        telefono: newUser.telefono,
        foto: newUser.foto,
        rol: newUser.rol
      }
    });

  } catch (err) {
    console.error('Error en registro:', err.message);
    res.status(500).json({ msg: 'Error en el servidor', error: err.message });
  }
});

// =======================
// LOGIN
// =======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email y contraseña obligatorios' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      msg: 'Login exitoso',
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
    console.error('Error en login:', err.message);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

export default router;
