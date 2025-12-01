const Promotion = require('../models/Promotion');

// 1. CREAR (POST)
exports.createPromotion = async (req, res) => {
    try {
        const { nombre, type, valor, descripcion, fechaInicio, fechaFin, eventoAsociadoId } = req.body;

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ msg: 'La fecha de inicio debe ser anterior a la fecha de fin' });
        }

        // Validación extra: Asegurarnos de que sea un array o convertirlo
        let eventosIds = Array.isArray(eventoAsociadoId) ? eventoAsociadoId : [eventoAsociadoId];

        const nuevaPromocion = new Promotion({
            nombre,
            type,
            valor,
            descripcion,
            fechaInicio,
            fechaFin,
            eventoAsociadoId: eventosIds // Guardamos el array
        });

        await nuevaPromocion.save();
        res.status(201).json({ msg: 'Promoción creada exitosamente', data: nuevaPromocion });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la promoción', error: error.message });
    }
};

// 2. OBTENER TODAS (GET) -> Sin cambios, funciona igual.
exports.getPromotions = async (req, res) => {
    try {
        const promociones = await Promotion.find();
        res.status(200).json(promociones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener promociones' });
    }
};

// 3. OBTENER POR ID DE EVENTO (GET)
exports.getPromotionsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        // Mongoose buscará si 'eventId' existe DENTRO del array 'eventoAsociadoId' automaticament
        const promociones = await Promotion.find({ eventoAsociadoId: eventId });
        
        if (!promociones || promociones.length === 0) {
             return res.status(404).json({ msg: 'No hay promociones para este evento' });
        }

        res.status(200).json(promociones);
    } catch (error) {
        res.status(500).json({ msg: 'Error al buscar promociones del evento' });
    }
};

// 4. ACTUALIZAR (PUT)
exports.updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promocionActualizada = await Promotion.findByIdAndUpdate(id, req.body, { new: true });

        if (!promocionActualizada) {
            return res.status(404).json({ msg: 'Promoción no encontrada' });
        }

        res.status(200).json({ msg: 'Promoción actualizada', data: promocionActualizada });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar' });
    }
};

// 5. ELIMINAR (DELETE) -> Sin cambios
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