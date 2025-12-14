const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        allowNull: false
    },
    password: {
        type: String,
        required: true,
        allowNull: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        allowNull: false
    },
    aadharNo: {
        type: String,
        required: true,
        allowNull: false
    },
    mobileNo: {
        type: String,
        required: true,
        allowNull: false
    },
    role: {
        type: String,
        required: true,
        allowNull: false,
        enums: ['admin', 'manager']
    },
    status: {
        type: String,
        required: true,
        allowNull: false,
        default: 'pending'
    },
    activePg: {
        type: Boolean,
        required: true,
        default: false
    },
    assignedPG: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pgs',
      default: null,
    },
}, { timestamps: true })

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('users', userSchema)