const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la promoción es obligatorio']
    },
    // NUEVO CAMPO SOLICITADO
    type: {
        type: String,
        required: [true, 'El tipo de promoción es obligatorio'], 
        enum: ['2x1', 'PERCENTAGE', 'FLAT_DISCOUNT', 'FREE_SHIPPING'], // Opcional: restringe los valores permitidos
        default: 'PERCENTAGE'
    },
    // Sugerencia: Un campo "valor" ayuda a los cálculos (ej. si type es PERCENTAGE, valor es 50)
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
    eventoAsociadoId: {
        type: String, 
        required: [true, 'La promoción debe estar ligada a un evento']
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotion', promotionSchema);