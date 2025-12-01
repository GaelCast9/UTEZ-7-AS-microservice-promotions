const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la promoción es obligatorio']
    },
    type: {
        type: String,
        required: [true, 'El tipo de promoción es obligatorio'], 
        enum: ['2x1', 'PERCENTAGE', 'FLAT_DISCOUNT', 'FREE_SHIPPING'],
        default: 'PERCENTAGE'
    },
    valor: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    // --- CAMBIO IMPORTANTE: Ahora es un Array de Strings ---
    eventoAsociadoId: {
        type: [String], 
        required: [true, 'La promoción debe estar ligada a al menos un evento']
    },
    // -------------------------------------------------------
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotion', promotionSchema);