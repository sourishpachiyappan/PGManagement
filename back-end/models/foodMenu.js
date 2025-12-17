const mongoose = require('mongoose');

const dayMenuSchema = new mongoose.Schema(
    {
        breakfast: {
            type: [String],
            required: true
        },
        lunch: {
            type: [String],
            required: true
        },
        dinner: {
            type: [String],
            required: true
        }
    },
    { _id: false }
);

const weeklyMenuSchema = new mongoose.Schema(
    {
        monday: { type: dayMenuSchema, required: true },
        tuesday: { type: dayMenuSchema, required: true },
        wednesday: { type: dayMenuSchema, required: true },
        thursday: { type: dayMenuSchema, required: true },
        friday: { type: dayMenuSchema, required: true },
        saturday: { type: dayMenuSchema, required: true },
        sunday: { type: dayMenuSchema, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('foods', weeklyMenuSchema);
