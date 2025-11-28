const Promotion = require('../models/Promotion');

// 1. CREAR (POST)
exports.createPromotion = async (req, res) => {
    try {
        // Agregamos 'type' y 'valor' al destructuring
        const { nombre, type, valor, descripcion, fechaInicio, fechaFin, eventoAsociadoId } = req.body;

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ msg: 'La fecha de inicio debe ser anterior a la fecha de fin' });
        }

        const nuevaPromocion = new Promotion({
            nombre,
            type,       // Guardamos el tipo (ej: '2x1')
            valor,      // Guardamos el valor numérico (ej: 50)
            descripcion,
            fechaInicio,
            fechaFin,
            eventoAsociadoId
        });

        await nuevaPromocion.save();
        res.status(201).json({ msg: 'Promoción creada exitosamente', data: nuevaPromocion });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la promoción', error: error.message });
    }
};

// 2. OBTENER TODAS (GET)
exports.getPromotions = async (req, res) => {
    try {
        const promociones = await Promotion.find();
        res.status(200).json(promociones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener promociones' });
    }
};

// 3. OBTENER POR ID DE EVENTO (GET) -> ¡Nuevo!
exports.getPromotionsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        // Busca todas las promos que tengan ese eventoAsociadoId
        const promociones = await Promotion.find({ eventoAsociadoId: eventId });
        
        if (!promociones || promociones.length === 0) {
             return res.status(404).json({ msg: 'No hay promociones para este evento' });
        }

        res.status(200).json(promociones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al buscar promociones del evento' });
    }
};

// 4. ACTUALIZAR (PUT) -> ¡Nuevo!
exports.updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        // { new: true } hace que te devuelva el objeto ya modificado, no el viejo
        const promocionActualizada = await Promotion.findByIdAndUpdate(id, req.body, { new: true });

        if (!promocionActualizada) {
            return res.status(404).json({ msg: 'Promoción no encontrada' });
        }

        res.status(200).json({ msg: 'Promoción actualizada', data: promocionActualizada });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar' });
    }
};

// 5. ELIMINAR (DELETE) -> ¡Nuevo!
exports.deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promocionEliminada = await Promotion.findByIdAndDelete(id);

        if (!promocionEliminada) {
            return res.status(404).json({ msg: 'Promoción no encontrada' });
        }

        res.status(200).json({ msg: 'Promoción eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar' });
    }
};