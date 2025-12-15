const Joi = require('joi');

const tenantService = require('../../services/tenantService')
const Errors = require('./errorCodes');

const addressSchema = Joi.object({
    addressLine1: Joi.string().trim().required(),
    addressLine2: Joi.string().trim().allow('', null),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    pincode: Joi.string().pattern(/^[0-9]{6}$/).required()
});

const tenantSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),

    email: Joi.string().email().required(),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/)
        .required()
        .messages({
            'string.pattern.base':
                'Password must contain letters, numbers and special characters'
        }),

    dob: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/)
        .required()
        .messages({
            'string.pattern.base': 'DOB must be in DD-MM-YYYY format'
        }),

    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required(),

    age: Joi.number().integer().min(0),

    address: addressSchema.required(),

    mobileNo: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),

    aadharNo: Joi.string()
        .pattern(/^\d{12}$/)
        .required(),

    occupationType: Joi.string()
        .valid('student', 'professional')
        .required(),

    joiningDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/)
        .required(),

    leavingDate: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4}$/)
        .allow('', null),

    occupationName: Joi.string().allow('', null),

    occupationAddress: addressSchema.allow(null),

    guardianName: Joi.string().trim().required(),

    guardianMobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),

    roomType: Joi.string().allow('', null),

    roomNumber: Joi.number().integer().min(1),

    status: Joi.string()
        .valid('pending', 'approved')
        .default('pending'),

    pgId: Joi.string()
        .length(24)
        .hex()
        .required()
});


exports.validateSignup = async (req, res, next) => {
    try {
        const { error } = await tenantSchema.validate(req.body)

        if (!error) next()
        else {
            res.status(403).send({
                errorCode: 'Validation Error',
                error: error.message
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error?.message
        })
    }
}

exports.handleSignup = async (req, res) => {
    try {
        const payload = req.body

        const existingTenant = await tenantService.findOne({ aadharNo: payload.aadharNo })

        if (existingTenant) { throw Errors.ET001 }
        const newTenant = await tenantService.create(payload)

        res.status(200).json({
            message: 'Tenant created successfully',
            tenant: newTenant
        });
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }

        else {
            console.error(`Error in creating Tenant: `, error);
            res.status(500).json({ message: 'create Tenant error', error: error.message });
        }
    }
}