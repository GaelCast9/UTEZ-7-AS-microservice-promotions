const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Conectar a Base de Datos
connectDB();

// 2. Middlewares
app.use(cors()); // Permite conexiones externas
app.use(express.json()); // Permite leer JSON en el body

// 3. Rutas
app.use('/promotions', require('./routes/promoRoutes'));

// 4. Ruta base para probar que el servidor está vivo
app.get('/', (req, res) => {
    res.send('Microservicio de Promociones SVCBDE - Funcionando 🚀');
});

// 5. Iniciar Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});