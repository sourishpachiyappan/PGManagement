const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema(
    {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: {
            type: String,
            required: true,
            match: /^[0-9]{6}$/
        }
    },
    { _id: false }
);

const tenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^\S+@\S+\.\S+$/
        },

        password: {
            type: String,
            required: true
        },

        dob: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        },

        age: {
            type: Number,
            min: 0
        },

        address: {
            type: addressSchema,
            required: true
        },

        mobileNo: {
            type: String,
            required: true,
            match: /^[6-9]\d{9}$/
        },

        aadharNo: {
            type: String,
            required: true,
            match: /^\d{12}$/,
            unique: true
        },

        occupationType: {
            type: String,
            enum: ['student', 'professional'],
            required: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        leavingDate: {
            type: Date,
            default: null
        },

        occupationName: {
            type: String
        },

        occupationAddress: {
            type: addressSchema
        },

        guardianName: {
            type: String,
            required: true
        },

        guardianMobile: {
            type: String,
            required: true,
            match: /^[6-9]\d{9}$/
        },

        roomType: {
            type: String
        },

        roomNumber: {
            type: Number,
            min: 1
        },

        status: {
            type: String,
            enum: ['pending', 'approved'],
            default: 'pending'
        },

        pgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pgs',
            required: true
        },

        reason: {
            type: String,
            default: null
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        }
    },
    {
        timestamps: true
    }
);

tenantSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('tenants', tenantSchema);