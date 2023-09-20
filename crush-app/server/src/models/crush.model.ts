import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    attractiveness: { type: Number, min: 1, max: 5, required: true },
}, {
    timestamps: true
})

export const CrushModel = mongoose.model('crush', UserSchema)
