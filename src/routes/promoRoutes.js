const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

// Rutas base: /api/promotions

// Crear
router.post('/', promoController.createPromotion);

// Obtener TODAS
router.get('/', promoController.getPromotions);

// Obtener promociones de un EVENTO ESPECÍFICO
// Ejemplo de uso: GET /api/promotions/event/64f1b2c...
router.get('/event/:eventId', promoController.getPromotionsByEvent);

// Actualizar una promoción por su ID
// Ejemplo de uso: PUT /api/promotions/65a123...
router.put('/:id', promoController.updatePromotion);

// Eliminar una promoción por su ID
// Ejemplo de uso: DELETE /api/promotions/65a123...
router.delete('/:id', promoController.deletePromotion);

module.exports = router;