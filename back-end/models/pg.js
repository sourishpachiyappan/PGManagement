const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            default: "",
            trim: true
        },
        address: {
            addressLine1: { type: String, required: true, trim: true },
            addressLine2: { type: String, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            pincode: { type: String, required: true, trim: true }
        },
        ownerName: {
            type: String,
            required: true,
            trim: true
        },
        ownerNo: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("pgs", pgSchema);