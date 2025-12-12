# Refugio Esperanza Animal - Proyecto Final DES421

Plataforma web fullstack.

## Tecnologías
- Frontend: React + Vite + React 
- Backend: Node.js + Express
- Base de datos: MongoDB Atlas
- Autenticación: JWT + bcrypt
- Subida de archivos: Multer
- Despliegue: Vercel (front) + Render (back)

## Funcionalidades
- Registro/login con foto de perfil
- CRUD de mascotas (admin)
- Filtros de adopción
- Integración WhatsApp
- 3 temas accesibles
- Chat asistente Luna

## Endpoints API
POST /api/auth/register
POST /api/auth/login
GET  /api/pets
POST /api/pets (protegida)
